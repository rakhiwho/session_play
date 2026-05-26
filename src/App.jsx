import "./App.css";

import { Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import AuthPage from "./pages/AuthPage.tsx";
import HomePage from "./pages/HomePage.tsx";

function App() {
  return (
    <div className="min-h-screen  bg-[#0a1929] text-white">
      <Toaster position="top-right" richColors theme="dark" />
      <section id="center">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth" element={<AuthPage />} />
        </Routes>
      </section>
    </div>
  );
}

export default App;
