import React from "react";
import { jsPDF } from "jspdf";

const GeneratePDFButton = ({ email, productosPorEmail, envios, vendors }) => {
  const generarPDF = () => {
    const vendor = vendors.find((v) => v.correo === email);
    const productos = productosPorEmail[email]?.productos || [];
    const total = productos.reduce((acc, producto) => acc + producto.price * producto.cantidad, 0);
    const envioSeleccionado = envios[email];
    const horaRealizada = new Date().toLocaleString();

    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.setTextColor("#333");
    doc.text("Detalles del Pedido", 105, 20, { align: "center" });

    doc.setFontSize(12);
    doc.text(`Comerciante: ${vendor?.nombre || "N/A"}`, 10, 40);
    doc.text(`Hora realizada: ${horaRealizada}`, 10, 50);
    doc.text(`Método de envío: ${envioSeleccionado || "N/A"}`, 10, 60);
    doc.text("Productos:", 10, 70);

    let y = 80;
    productos.forEach((producto, index) => {
      doc.text(
        `${index + 1}. ${producto.name} (${producto.brand}) - Cantidad: ${producto.cantidad} - Precio: $${producto.price} - Total: $${producto.price * producto.cantidad}`,
        10,
        y
      );
      y += 10;
    });

    doc.text(`Total del pedido: $${total}`, 10, y + 10);

    doc.save(`Pedido_${vendor?.nombre || "sin_nombre"}.pdf`);
  };

  return (
    <div className="mt-4 text-center">
      <button
        onClick={generarPDF}
        className="bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition"
      >
        Generar PDF
      </button>
    </div>
  );
};

export default GeneratePDFButton;
