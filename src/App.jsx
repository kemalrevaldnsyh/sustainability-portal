import { Suspense, lazy } from "react";
import AuthGate from "./features/auth/AuthGate.jsx";

const SustainabilityPortal = lazy(() => import("./features/sustainability/SustainabilityPortal.jsx"));

export default function App() {
  return (
    <AuthGate>
      {({ logout, userEmail }) => (
        <Suspense fallback={null}>
          <SustainabilityPortal onLogout={logout} userEmail={userEmail} />
        </Suspense>
      )}
    </AuthGate>
  );
}
