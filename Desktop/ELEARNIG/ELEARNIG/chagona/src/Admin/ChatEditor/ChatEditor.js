import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Importez les styles CSS de React-Quill
import "./ChatEditor.css";
function ChatEditor() {
  const [message, setMessage] = useState("");

  // Fonction appelée lorsque le contenu de l'éditeur change
  const handleMessageChange = (value) => {
    setMessage(value);
  };

  // Fonction appelée lorsque vous souhaitez envoyer un message
  const handleSendMessage = () => {
    // Vous pouvez envoyer le contenu du message à votre serveur ou effectuer d'autres actions ici
    console.log("Message envoyé :", message);
    // Réinitialisez l'éditeur après l'envoi
    setMessage("");
  };

  return (
    <div>
      <ReactQuill
        value={message}
        onChange={handleMessageChange}
        placeholder="Écrivez votre message ici..."
        className="custom-editor" // Ajoutez une classe CSS personnalisée ici
      />
      <button onClick={handleSendMessage}>Envoyer</button>
    </div>
  );
}

export default ChatEditor;
