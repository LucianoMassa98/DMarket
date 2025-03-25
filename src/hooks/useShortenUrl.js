import { useState } from 'react';
import { encryptMessage } from '../utils/encryptionUtils'; // Cambiar a ES Modules

const useShortenUrl = (mensaje, email) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const shortenUrl = async () => {
    setLoading(true);
    setError(null);

    try {
      // Obtener la hora actual
      const horaActual = new Date().toISOString();

      // Crear el mensaje completo
      const mensajeCompleto = `${mensaje} - ${email} - ${horaActual}`;

      // Encriptar el mensaje completo
      const mensajeEncriptado = encryptMessage(mensajeCompleto);

      const response = await fetch('https://dmarket.up.railway.app/shorten', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ originalUrl: mensajeEncriptado }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { shortenUrl, loading, error };
};

export default useShortenUrl;
