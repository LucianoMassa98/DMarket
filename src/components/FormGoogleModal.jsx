import React, { useState } from "react";

const FormGoogleModal = ({ isOpen, closeModal, googleFormUrl }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-gray-600 bg-opacity-50 z-50 flex justify-center items-center"
      onClick={closeModal}
    >
      <div
        className="relative bg-white rounded-lg shadow-lg max-w-4xl w-full p-6"
        onClick={(e) => e.stopPropagation()} // Evitar que se cierre al hacer clic dentro del modal
      >
        <button
          className="absolute top-4 right-4 text-gray-600 text-xl"
          onClick={closeModal}
        >
          &times;
        </button>
        <div className="overflow-auto">
          <iframe
            src={googleFormUrl}
            width="100%"
            height="500"
            className="rounded-lg"
            title="Formulario de Google"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default FormGoogleModal;
