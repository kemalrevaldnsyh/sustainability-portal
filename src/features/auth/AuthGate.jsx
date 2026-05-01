import { useEffect, useState } from "react";
import "./slms-login.css";
import { hasSupabaseClientConfig, supabase } from "../../lib/supabaseClient";

/** Viewports at or below this show login card only (no hero); above keeps two-column layout. */
const SOLO_LOGIN_MQ = "(max-width: 1023px)";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const REMEMBER_KEY = "slms_login_remember_email";

function HeroLogoIcon() {
  return (
    <svg className="hero-logo-icon" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path d="M5 5 L22 5 L39 22 L22 39 L5 22 Z" fill="#8B1A1A" />
      <path d="M5 5 L22 15 L5 22 Z" fill="#C0392B" opacity="0.6" />
      <path d="M22 5 L39 22 L22 15 Z" fill="#6B1414" opacity="0.7" />
      <path d="M5 22 L22 15 L22 39 Z" fill="#A01A1A" opacity="0.5" />
    </svg>
  );
}

function IconMail() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <rect x="2" y="4" width="20" height="16" rx="3" />
      <path d="M2 7l10 7 10-7" />
    </svg>
  );
}

function IconLock() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <rect x="3" y="11" width="18" height="11" rx="2" />
      <path d="M7 11V7a5 5 0 0110 0v4" />
    </svg>
  );
}

function IconEyeOpen() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function IconEyeClosed() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );
}

export default function AuthGate({ children }) {
  const [soloLoginLayout, setSoloLoginLayout] = useState(() =>
    typeof window !== "undefined" ? window.matchMedia(SOLO_LOGIN_MQ).matches : false,
  );
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [emailInvalid, setEmailInvalid] = useState(false);
  const [passwordInvalid, setPasswordInvalid] = useState(false);
  const [shakeCard, setShakeCard] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [isAuthed, setIsAuthed] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const mq = window.matchMedia(SOLO_LOGIN_MQ);
    const sync = () => setSoloLoginLayout(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(REMEMBER_KEY);
      if (saved) setEmail(saved);
    } catch {
      /* ignore */
    }
  }, []);

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

  const triggerShake = () => {
    setShakeCard(true);
    window.setTimeout(() => setShakeCard(false), 400);
  };

  const login = async (e) => {
    e.preventDefault();
    setError("");
    setEmailInvalid(false);
    setPasswordInvalid(false);

    const trimmed = email.trim();
    let valid = true;
    if (!trimmed || !EMAIL_RE.test(trimmed)) {
      setEmailInvalid(true);
      valid = false;
    }
    if (!password || password.length < 6) {
      setPasswordInvalid(true);
      valid = false;
    }
    if (!valid) {
      triggerShake();
      return;
    }

    if (!supabase) {
      setError("Authentication is currently unavailable.");
      triggerShake();
      return;
    }

    setSubmitting(true);
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: trimmed,
      password,
    });
    setSubmitting(false);

    if (signInError) {
      setError(signInError.message || "Invalid credentials.");
      triggerShake();
      return;
    }

    try {
      if (remember) localStorage.setItem(REMEMBER_KEY, trimmed);
      else localStorage.removeItem(REMEMBER_KEY);
    } catch {
      /* ignore */
    }
  };

  const logout = async () => {
    if (supabase) {
      await supabase.auth.signOut();
    }
    setIsAuthed(false);
    setUserEmail("");
    setPassword("");
    setError("");
  };

  if (loading) return null;

  if (isAuthed) {
    return typeof children === "function" ? children({ logout, userEmail }) : children;
  }

  return (
    <div className={`slms-login-page${soloLoginLayout ? " slms-login-page--solo" : ""}`}>
      <div className="wrapper">
        {!soloLoginLayout && (
          <section className="hero">
            <div className="hero-bg">
              <div className="hero-noise" />
            </div>

            <div className="hero-logo">
              <HeroLogoIcon />
              <span className="hero-logo-text">Sustainability Portal</span>
            </div>

            <div className="hero-content">
              <div className="hero-eyebrow">SLMS Group · Internal Platform</div>
              <h1 className="hero-title">
                Transparency in<span>Sustainability</span>
              </h1>
              <p className="hero-desc">
                Access our certifications, licenses, policies, and compliance documentation. We believe in full transparency and accountability in our
                sustainability journey.
              </p>
            </div>
          </section>
        )}

        <section className="form-side">
          <div className={`form-card${shakeCard ? " shake" : ""}`}>
            <div className="form-badge">
              <div className="form-badge-dot" />
              <span className="form-badge-text">SLMS</span>
            </div>

            <h2 className="form-title">Sustainability Portal</h2>
            <p className="form-subtitle">Secure workspace for sustainability operations.</p>

            {!hasSupabaseClientConfig && (
              <p className="slms-config-error">System configuration is incomplete. Please contact administrator.</p>
            )}

            <form onSubmit={login} noValidate>
              <div className={`field${emailInvalid ? " has-error" : ""}`}>
                <label htmlFor="slms-email">Email</label>
                <div className="field-wrap">
                  <input
                    type="email"
                    id="slms-email"
                    name="email"
                    value={email}
                    onChange={(ev) => {
                      setEmail(ev.target.value);
                      setEmailInvalid(false);
                      setError("");
                    }}
                    placeholder="name@company.com"
                    autoComplete="email"
                  />
                  <IconMail />
                </div>
                <div className="field-error">Please enter a valid email.</div>
              </div>

              <div className={`field${passwordInvalid ? " has-error" : ""}`}>
                <label htmlFor="slms-password">Password</label>
                <div className="field-wrap">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="slms-password"
                    name="password"
                    value={password}
                    onChange={(ev) => {
                      setPassword(ev.target.value);
                      setPasswordInvalid(false);
                      setError("");
                    }}
                    placeholder="••••••••"
                    autoComplete="current-password"
                  />
                  <IconLock />
                  <button
                    type="button"
                    className="pwd-toggle"
                    onClick={() => setShowPassword((s) => !s)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <IconEyeClosed /> : <IconEyeOpen />}
                  </button>
                </div>
                <div className="field-error">Password must be at least 6 characters.</div>
              </div>

              {error ? <p className="slms-server-error">{error}</p> : null}

              <div className="form-row">
                <label className="remember">
                  <input type="checkbox" checked={remember} onChange={(ev) => setRemember(ev.target.checked)} />
                  <span>Remember me</span>
                </label>
                <button type="button" className="forgot-link" onClick={(ev) => ev.preventDefault()}>
                  Forgot password?
                </button>
              </div>

              <button className={`btn-submit${submitting ? " loading" : ""}`} type="submit" disabled={!hasSupabaseClientConfig}>
                <span className="btn-text">Sign In</span>
                <span className="btn-spinner" aria-hidden>
                  <div className="spinner-ring" />
                </span>
              </button>

              <p className="form-foot">
                Use your registered company account.
                <br />
                Having trouble?{" "}
                <a href="#" onClick={(e) => e.preventDefault()}>
                  Contact IT Support
                </a>
              </p>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
}
