import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import axios from "axios";

axios.defaults.withCredentials = true;
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <StrictMode>
   <link rel="preconnect" href="https://fonts.googleapis.com"/>
<link
  rel="preconnect"
  href="https://fonts.gstatic.com"
  crossOrigin="anonymous"
/>
<link href="https://fonts.googleapis.com/css2?family=Bitcount+Prop+Single+Ink:wght@100..900&family=Dhurjati&family=Felipa&family=Michroma&family=Plaster&family=Press+Start+2P&display=swap" rel="stylesheet"/>
   <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
