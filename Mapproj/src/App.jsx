import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout";
import UploadPage from "./components/trial";

export default function App() {
  // Set the title dynamically when the component mounts
  useEffect(() => {
    document.title = "Disable Friendly Map"; // Change the title here
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="upload" element={<UploadPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
