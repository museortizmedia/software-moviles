import React, {useState, useEffect} from "react";
import ReactDOM from "react-dom/client";
import "./style.css";
import PageContactsList from "./pages/PageContactsList";
import PageContactsCreator from "./pages/PageContactsCreator";
import CommonButton from "./components/CommonButton";
import FullScreenLoader from "./components/FullScreenLoader";
import { getAllContacts } from "./services/indexedDB";

function App() {
  const listRef = React.useRef();

  const refresh = () => {
    window.location.reload();
  };

  const [isOpen, SetIsOpen] = useState(false);
  const [currentContact, setCurrentContact] = useState({});

  const handleEdit = (form) =>
  {
    setCurrentContact(form);
    SetIsOpen(true);
  }

  // Loader
  const [isLoading, SetIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      SetIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
    {isLoading && (
      <FullScreenLoader/>
    )}

    <div className="min-h-screen bg-gray-100 p-8 max-w-6xl mx-auto space-y-10">
      <h1 className="text-3xl font-bold">Gestión de Contactos</h1>
      <div className="flex justify-end">
        <CommonButton onClick={() => SetIsOpen(true)} >
          + Nuevo Contacto
        </CommonButton>
      </div>
      <PageContactsCreator isOpen={isOpen} SetIsOpen={SetIsOpen} currentContact={currentContact} onContactCreated={refresh} onContactEdited={refresh} />
      <PageContactsList ref={listRef} handleEdit={handleEdit} />
    </div>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then(() => console.log("Service Worker registrado"))
      .catch(err => console.log("Error:", err));
  });
}