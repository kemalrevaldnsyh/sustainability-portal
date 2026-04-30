import { Icon } from "./icons";

export function Background() {
  return (
    <div className="sp-bg">
      <svg viewBox="0 0 1440 900" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" className="sp-bg-svg">
        <defs>
          <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#d8d8d8" />
            <stop offset="100%" stopColor="#c0c0c0" />
          </linearGradient>
        </defs>
        <rect width="1440" height="900" fill="url(#skyGrad)" opacity="0.6" />
        <rect y="700" width="1440" height="200" fill="#9a9a9a" opacity="0.4" />
        {/* Tower 1 */}
        <rect x="900" y="200" width="18" height="500" fill="#888" opacity="0.35" />
        <rect x="895" y="180" width="28" height="30" fill="#888" opacity="0.35" />
        <rect x="904" y="150" width="10" height="35" fill="#888" opacity="0.35" />
        <rect x="880" y="350" width="60" height="8" fill="#888" opacity="0.35" />
        <rect x="870" y="380" width="80" height="6" fill="#888" opacity="0.35" />
        <rect x="840" y="400" width="60" height="10" fill="#888" opacity="0.3" rx="5" />
        {/* Tower 2 */}
        <rect x="1050" y="300" width="30" height="400" fill="#888" opacity="0.35" rx="4" />
        <rect x="1040" y="280" width="50" height="25" fill="#888" opacity="0.35" rx="3" />
        <rect x="1035" y="350" width="60" height="8" fill="#888" opacity="0.3" />
        <rect x="1035" y="420" width="60" height="8" fill="#888" opacity="0.3" />
        <rect x="1035" y="490" width="60" height="8" fill="#888" opacity="0.3" />
        <rect x="800" y="640" width="400" height="10" fill="#888" opacity="0.3" rx="5" />
        {/* Tower 3 */}
        <rect x="1150" y="250" width="10" height="450" fill="#888" opacity="0.3" />
        <ellipse cx="1155" cy="248" rx="12" ry="8" fill="#999" opacity="0.3" />
        {/* Trees */}
        <ellipse cx="750" cy="700" rx="60" ry="20" fill="#888" opacity="0.3" />
        <rect x="690" y="620" width="120" height="80" fill="#888" opacity="0.3" rx="4" />
        <ellipse cx="750" cy="620" rx="60" ry="20" fill="#999" opacity="0.3" />
        <ellipse cx="620" cy="700" rx="45" ry="15" fill="#888" opacity="0.3" />
        <rect x="575" y="640" width="90" height="60" fill="#888" opacity="0.3" rx="4" />
        <ellipse cx="620" cy="640" rx="45" ry="15" fill="#999" opacity="0.3" />
        {/* Left elements */}
        <rect x="200" y="500" width="25" height="200" fill="#888" opacity="0.3" />
        <rect x="240" y="450" width="20" height="250" fill="#888" opacity="0.3" />
        <rect x="300" y="400" width="12" height="300" fill="#888" opacity="0.3" />
        <line x1="300" y1="400" x2="380" y2="420" stroke="#888" strokeWidth="6" opacity="0.3" />
        <line x1="380" y1="420" x2="380" y2="480" stroke="#888" strokeWidth="4" opacity="0.3" />
      </svg>
    </div>
  );
}

export function Navbar({ onHome, notifOpen, setNotifOpen, onLogout, userEmail }) {
  const displayName = userEmail || "Signed-in User";
  return (
    <nav className="sp-navbar">
      <button onClick={onHome} className="sp-brand-btn" aria-label="Go to overview">
        <svg width="38" height="38" viewBox="0 0 38 38" fill="none">
          <path d="M4 4 L20 4 L34 20 L20 34 L4 20 Z" fill="#8B1A1A" />
          <path d="M4 4 L20 14 L4 20 Z" fill="#B22222" opacity="0.7" />
          <text x="9" y="22" fontFamily="Figtree,sans-serif" fontWeight="800" fontSize="9" fill="white">SLMS</text>
        </svg>
        <div className="sp-brand-text">
          <div className="sp-brand-title">SLMS</div>
          <div className="sp-brand-subtitle">Sustainability Portal</div>
        </div>
      </button>

      <div className="sp-nav-actions">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setNotifOpen(!notifOpen);
          }}
          className="sp-bell-btn"
          aria-label="Open notifications"
        >
          <Icon.Bell />
          <span className="sp-bell-dot" />
        </button>
        <button className="sp-user-btn" aria-label="Open user menu">
          <span className="sp-user-avatar">
            <Icon.User />
          </span>
          {displayName}
          <Icon.Chevron />
        </button>
        {onLogout && (
          <button className="sp-logout-btn" onClick={onLogout} aria-label="Logout">
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

export function NotifPanel({ open, notifications }) {
  if (!open) return null;
  return (
    <div className="sp-notif-panel">
      <p className="sp-notif-title">Notifications</p>
      {notifications.map((n, i) => (
        <div key={n.title} className={`sp-notif-item ${i < notifications.length - 1 ? "sp-notif-item-border" : ""}`}>
          <span className="sp-notif-item-title">{n.title}: </span>
          {n.body}
        </div>
      ))}
    </div>
  );
}

export function PageHeader({ title, onBack, leftAligned }) {
  return (
    <div className="sp-page-header">
      <button onClick={onBack} className="sp-back-btn" aria-label="Go back">
        <Icon.ArrowLeft />
      </button>
      {leftAligned ? (
        <h1 className="sp-page-title sp-page-title-left">{title}</h1>
      ) : (
        <>
          <h1 className="sp-page-title sp-page-title-center">{title}</h1>
          <div className="sp-header-spacer" />
        </>
      )}
    </div>
  );
}

export function Card({ onClick, children, className = "" }) {
  return (
    <button onClick={onClick} className={`sp-card ${className}`}>
      {children}
    </button>
  );
}
