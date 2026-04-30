import { Suspense, lazy } from "react";

const SustainabilityPortal = lazy(() => import("./features/sustainability/SustainabilityPortal.jsx"));

export default function App() {
  return (
    <Suspense fallback={<div style={{ padding: 24, fontFamily: "sans-serif" }}>Loading portal...</div>}>
      <SustainabilityPortal />
    </Suspense>
  );
}
