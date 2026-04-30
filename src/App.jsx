import { Suspense, lazy } from "react";
import AuthGate from "./features/auth/AuthGate.jsx";
import "./features/auth/AuthGate.css";

const SustainabilityPortal = lazy(() => import("./features/sustainability/SustainabilityPortal.jsx"));

export default function App() {
  return (
    <AuthGate>
      {({ logout, userEmail }) => (
        <Suspense
          fallback={
            <div className="app-loading">
              <div className="app-loading-card">
                <div className="app-loading-bar short" />
                <div className="app-loading-bar" />
                <div className="app-loading-bar" />
              </div>
            </div>
          }
        >
          <SustainabilityPortal onLogout={logout} userEmail={userEmail} />
        </Suspense>
      )}
    </AuthGate>
  );
}
