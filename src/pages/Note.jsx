import React from 'react';
import { useParams } from 'react-router-dom';

const Note = () => {
  const { tokenId } = useParams();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Nota</h1>
      <p className="text-lg">Token ID: <span className="font-mono text-blue-500">{tokenId}</span></p>
    </div>
  );
};

export default Note;
