import { useState } from 'react';
import { encryptMessage } from '../utils/encryptionUtils'; // Cambiar a ES Modules

const useShortenUrl = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const shortenUrl = async (mensaje) => {
    setLoading(true);
    setError(null);

    try {
     
      const response = await fetch('https://link.destored.org/shorten', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ originalUrl: "https://dmarket.up.railway.app/note/" + mensaje }),
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
