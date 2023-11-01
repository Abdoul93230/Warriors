import React, { useState, useRef, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Importez les styles CSS de React-Quill
import "./ContactSeller.css";
// import ChatEditor from "../Admin/ChatEditor/ChatEditor";
import {
  ShoppingBag,
  Calendar,
  ArrowLeftCircle,
  // ChevronRight,
} from "react-feather";

function ContactSeller() {
  const [messages, setMessages] = useState([
    { id: 1, text: "Bonjour, comment puis-je vous aider ?", sender: "client" },
    {
      id: 2,
      text: "Bonjour ! Je suis là pour répondre à vos questions.",
      sender: "fournisseur",
    },
    // ... d'autres messages
  ]);

  const [message, setMessage] = useState("");
  const messageContainerRef = useRef(null);

  // Fonction appelée lorsque le contenu de l'éditeur change
  const handleMessageChange = (value) => {
    setMessage(value);
  };

  // Fonction appelée lorsque vous souhaitez envoyer un message
  const handleSendMessage = () => {
    if (message.trim() === "") return; // Évitez d'envoyer un message vide

    const newMessage = {
      id: messages.length + 1,
      text: message,
      sender: "client", // Définissez l'expéditeur comme "client"
    };

    setMessages([...messages, newMessage]);
    setMessage(""); // Réinitialisez l'éditeur
  };

  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="ContactSeller">
      <div className="Top">
        <ArrowLeftCircle className="i" />
        <h4>Contact Seller</h4>
      </div>
      <div className="midel1">
        <div className="left">
          <h3>Shop1103079034 Store</h3>
          <span>2 followers</span>
          <p>
            <Calendar className="i" /> Niaamey / Niger Sep 01,2023
          </p>
        </div>
        <div className="right">
          <button>Follow</button>
          <span>Business License</span>
        </div>
        <div className="use">
          <ShoppingBag />
        </div>
      </div>
      <div className="midel2" ref={messageContainerRef}>
        {messages.map((message) => (
          <div
            key={message.id}
            className={`message ${
              message.sender === "client"
                ? "client-message"
                : "fournisseur-message"
            }`}
            dangerouslySetInnerHTML={{ __html: message.text }} // Utilisez dangerouslySetInnerHTML
          />
        ))}
      </div>
      <div className="midel3">
        <ReactQuill
          value={message}
          onChange={handleMessageChange}
          placeholder="Écrivez votre message ici..."
          className="custom-editor" // Ajoutez une classe CSS personnalisée ici
        />
        <button className="button" onClick={handleSendMessage}>
          Envoyer
        </button>
      </div>
    </div>
  );
}

export default ContactSeller;
