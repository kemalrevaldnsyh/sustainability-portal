import { useEffect, useState } from "react";
import "./AuthGate.css";
import { hasSupabaseClientConfig, supabase } from "../../lib/supabaseClient";

export default function AuthGate({ children }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [isAuthed, setIsAuthed] = useState(false);

  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      return;
    }

    let mounted = true;
    const bootstrap = async () => {
      const { data } = await supabase.auth.getSession();
      if (mounted) {
        setIsAuthed(Boolean(data.session));
        setLoading(false);
      }
    };
    bootstrap();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthed(Boolean(session));
    });

    return () => {
      mounted = false;
      authListener.subscription.unsubscribe();
    };
  }, []);

  const login = async (e) => {
    e.preventDefault();
    if (!supabase) {
      setError("Supabase client is not configured.");
      return;
    }
    setError("");
    setLoading(true);
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });
    if (signInError) {
      setError(signInError.message || "Invalid credentials.");
    }
    setLoading(false);
  };

  const logout = async () => {
    if (supabase) {
      await supabase.auth.signOut();
    }
    setIsAuthed(false);
    setEmail("");
    setPassword("");
    setError("");
  };

  if (loading) {
    return (
      <div className="auth-wrap">
        <div className="auth-card">
          <h1 className="auth-title">Loading...</h1>
        </div>
      </div>
    );
  }

  if (isAuthed) {
    return typeof children === "function" ? children({ logout }) : children;
  }

  return (
    <div className="auth-wrap">
      <div className="auth-card">
        <div className="auth-brand">SLMS</div>
        <h1 className="auth-title">Sustainability Portal</h1>
        <p className="auth-subtitle">Secure access with Supabase authentication.</p>
        {!hasSupabaseClientConfig && (
          <p className="auth-error">Missing auth env: set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.</p>
        )}
        <form onSubmit={login} className="auth-form">
          <label className="auth-label">
            Email
            <input className="auth-input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@company.com" required />
          </label>
          <label className="auth-label">
            Password
            <input className="auth-input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required />
          </label>
          {error && <p className="auth-error">{error}</p>}
          <button className="auth-btn" type="submit" disabled={!hasSupabaseClientConfig}>
            Sign In
          </button>
          <p className="auth-hint">Use a registered Supabase Auth account.</p>
        </form>
      </div>
    </div>
  );
}
