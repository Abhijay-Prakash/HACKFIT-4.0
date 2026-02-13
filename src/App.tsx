import { useState, useEffect } from "react";
import LoadingScreen from "./components/LoadingScreen";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Register from "./pages/RegisterPage";
import { useSmoothScroll } from "./hooks/useSmoothScroll";


export default function App() {
  const [isLoading, setIsLoading] = useState(() => {
    // Check if this is a fresh visit (not a page refresh or navigation)
    const hasVisited = sessionStorage.getItem("hackfit-visited");
    return !hasVisited;
  });

  // Initialize smooth scrolling
  useSmoothScroll();

  useEffect(() => {
    // Mark as visited for this session
    sessionStorage.setItem("hackfit-visited", "true");
  }, []);

  if (isLoading) {
    return <LoadingScreen onLoadComplete={() => setIsLoading(false)} />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}
