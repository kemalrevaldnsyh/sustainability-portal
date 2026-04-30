import { Suspense, lazy } from "react";
import AuthGate from "./features/auth/AuthGate.jsx";

const SustainabilityPortal = lazy(() => import("./features/sustainability/SustainabilityPortal.jsx"));

export default function App() {
  return (
    <AuthGate>
      {({ logout }) => (
        <Suspense fallback={<div style={{ padding: 24, fontFamily: "sans-serif" }}>Loading portal...</div>}>
          <SustainabilityPortal onLogout={logout} />
        </Suspense>
      )}
    </AuthGate>
  );
}
