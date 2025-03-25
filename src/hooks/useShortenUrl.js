import { useState } from "react";
import encryptMessage from "../utils/encryptMessage";

const useShortenUrl = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const shortenUrl = async (mensaje, email) => {
    setLoading(true);
    setError(null);

    try {
      const horaActual = new Date().toISOString();
      const mensajeCompleto = `${mensaje} - ${email} - ${horaActual}`;
      const mensajeEncriptado = encryptMessage(mensajeCompleto);

      console.log("Cuerpo de la solicitud:", { originalUrl: mensajeEncriptado });

      const response = await fetch("https://link.destored.org/shorten", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ originalUrl: mensajeEncriptado }),
      });

      const data = await response.json();
      if (!response.ok) {
        console.error("Error del servidor:", data);
        throw new Error(`Error: ${data.message || response.statusText}`);
      }

      return data.shortenedUrl; // Asegurarse de devolver el enlace acortado
    } catch (err) {
      setError(err.message);
      console.error("Error en shortenUrl:", err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { shortenUrl, loading, error };
};

export default useShortenUrl;
