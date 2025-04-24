import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Import AOS
import 'aos/dist/aos.css';

createRoot(document.getElementById("root")!).render(<App />);
