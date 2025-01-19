import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./components/GoogleAuth";
import ReactGA from "react-ga4";

ReactGA.initialize("G-8XH412W7YR");
// ReactGA.pageview(window.location.pathname);
ReactGA.send({
  hitType: "pageview",
  page: window.location.pathname,
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
