import React from "react";

const departamentos = {
  "Rawson": { lat: -31.5667, lng: -68.5167 },
  "Capital": { lat: -31.5375, lng: -68.5364 },
  "Chimbas": { lat: -31.5000, lng: -68.5500 },
  "Rivadavia": { lat: -31.5167, lng: -68.5833 },
  "Pocito": { lat: -31.6667, lng: -68.5667 },
  "Santa Lucía": { lat: -31.5333, lng: -68.5000 },
  "Caucete": { lat: -31.6500, lng: -68.2667 },
  "San Martín": { lat: -31.5333, lng: -68.4000 },
  "Angaco": { lat: -31.4333, lng: -68.3667 },
  "Albardón": { lat: -31.3667, lng: -68.5167 },
};
const apikey = "AIzaSyArkgwsju5M6ZYuBd_Trb7spS7h0iNw5QE";
const DepartamentoMapa = ({ departamento }) => {
  const location = departamentos[departamento];

  if (!location) {
    return <p className="text-red-500 text-center">Departamento no encontrado</p>;
  }

  const mapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${location.lat},${location.lng}&zoom=12&size=600x300&maptype=roadmap&markers=color:red%7C${location.lat},${location.lng}&key=${apikey}`;

  return (
    <div className="flex flex-col items-center p-4">
      <h2 className="text-xl font-bold mb-4">Ubicación de {departamento}</h2>
      <img src={mapUrl} alt={`Mapa de ${departamento}`} className="rounded-lg shadow-lg" />
    </div>
  );
};

export default DepartamentoMapa;
