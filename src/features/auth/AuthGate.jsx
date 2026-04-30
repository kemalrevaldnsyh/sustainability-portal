import { useEffect, useState } from "react";
import "./AuthGate.css";
import { hasSupabaseClientConfig, supabase } from "../../lib/supabaseClient";

export default function AuthGate({ children }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [isAuthed, setIsAuthed] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      return;
    }

    let mounted = true;
    const bootstrap = async () => {
      const { data } = await supabase.auth.getSession();
      if (mounted) {
        const sessionEmail = data.session?.user?.email || "";
        setIsAuthed(Boolean(data.session));
        setUserEmail(sessionEmail);
        setLoading(false);
      }
    };
    bootstrap();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthed(Boolean(session));
      setUserEmail(session?.user?.email || "");
    });

    return () => {
      mounted = false;
      authListener.subscription.unsubscribe();
    };
  }, []);

  const login = async (e) => {
    e.preventDefault();
    if (!supabase) {
      setError("Authentication is currently unavailable.");
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
    setUserEmail("");
    setEmail("");
    setPassword("");
    setError("");
  };

  if (loading) return null;

  if (isAuthed) {
    return typeof children === "function" ? children({ logout, userEmail }) : children;
  }

  return (
    <div className="auth-wrap">
      <div className="auth-card">
        <div className="auth-brand">SLMS</div>
        <h1 className="auth-title">Sustainability Portal</h1>
        <p className="auth-subtitle">Secure workspace for sustainability operations.</p>
        {!hasSupabaseClientConfig && (
          <p className="auth-error">System configuration is incomplete. Please contact administrator.</p>
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
          <p className="auth-hint">Use your registered company account.</p>
        </form>
      </div>
    </div>
  );
}
