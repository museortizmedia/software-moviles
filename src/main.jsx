import React from "react";
import ReactDOM from "react-dom/client";
import "./style.css";
import App from './App'

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Registro del Service Worker
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then(() => console.log("Service Worker registrado ✅"))
      .catch(err => console.log("Error al registrar SW:", err));
  });
}