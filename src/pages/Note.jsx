import React from 'react';
import { useParams } from 'react-router-dom';
import { decryptMessage } from '../utils/encryptionUtils'; // Importa la función de desencriptar

const Note = () => {
  const { token } = useParams();

  const decryptedToken = decryptMessage(token); // Desencripta el token

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Nota</h1>
      <p className="text-lg">Token encriptado: <span className="font-mono text-red-500">{token}</span></p>
      <p className="text-lg">Token desencriptado: <span className="font-mono text-blue-500">{decryptedToken}</span></p>
    </div>
  );
};

export default Note;
