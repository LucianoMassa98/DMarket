import { useState } from 'react';

// Función independiente para acortar URLs
export const shortenUrl = async (mensaje) => {
  try {
    const response = await fetch('https://link.destored.org/shorten', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ originalUrl: `https://dmarket.up.railway.app/note/${mensaje}` }),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.shortenedUrl; // Devuelve directamente el enlace acortado
  } catch (err) {
    console.error("Error al acortar la URL:", err.message);
    return null;
  }
};

// Hook que utiliza la función shortenUrl
const useShortenUrl = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const shortenUrlWithState = async (mensaje) => {
    setLoading(true);
    setError(null);

    try {
      return await shortenUrl(mensaje);
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { shortenUrl: shortenUrlWithState, loading, error };
};

export default useShortenUrl;
