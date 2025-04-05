import React, { useState } from "react";
import { ArrowLeft, ShoppingCart, Trash2, X, FileText } from "lucide-react"; // Importar Trash2 y FileText
import { jsPDF } from "jspdf"; // Importar jsPDF
import CartHeader from "./CartHeader";
import CartItem from "./CartItem";
import ShippingMethod from "./ShippingMethod";
import PaymentMethod from "./PaymentMethod";
import AdditionalDetails from "./AdditionalDetails";
import LoadingSpinner from "../LoadingSpinner";
import { generarMensajeWhatsApp } from "../../utils/whatsappUtils"; // Importar la nueva función
import GeneratePDFButton from "./GeneratePDFButton"; // Importar el nuevo componente

const Cart = ({ carrito, eliminarDelCarrito, vendors }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [envios, setEnvios] = useState(
    carrito.reduce((acc, producto) => {
      acc[producto.email] = "envio";
      return acc;
    }, {})
  );
  const [modalConfirm, setModalConfirm] = useState({ isOpen: false, email: null });

  const totalProductos = carrito.reduce((acc, producto) => acc + producto.cantidad, 0);
  const productosPorEmail = carrito.reduce((acc, producto) => {
    acc[producto.email] = acc[producto.email] || { productos: [], phone: producto.phone, vendor: vendors[producto.email] };
    acc[producto.email].productos.push(producto);
    return acc;
  }, {});

  const manejarEnvio = (email, metodo) => {
    setEnvios((prevEnvios) => ({
      ...prevEnvios,
      [email]: metodo,
    }));
  };

  const eliminarPedidoCompleto = (email) => {
    const productosAEliminar = carrito.filter((producto) => producto.email === email);
    productosAEliminar.forEach((producto) => eliminarDelCarrito(producto.id));
    setModalConfirm({ isOpen: false, email: null });
  };

  const enviarPedidoWhatsApp = async (email) => {
    const vendor = vendors.find((v) => v.correo === email);
    if (!vendor) {
      console.error("Vendor no encontrado.");
      return;
    }

    const envioSeleccionado = envios[email];
    const formasDePagoSeleccionadas = Array.from(
      document.querySelectorAll(`input[name="pago-${email}"]:checked`)
    ).map((input) => input.value);

    if (!envioSeleccionado) {
      alert("Por favor, selecciona un método de envío.");
      return;
    }

    if (formasDePagoSeleccionadas.length === 0) {
      alert("Por favor, selecciona al menos una forma de pago.");
      return;
    }

    setLoading(true);

    try {
      const mensaje = await generarMensajeWhatsApp(
        productosPorEmail[email]?.productos || [],
        envioSeleccionado,
        formasDePagoSeleccionadas,
        productosPorEmail[email]?.detalle || "",
        vendor
      );

      const url = `https://wa.me/${vendor.whatsapp}?text=${mensaje}`;
      window.open(url, "_blank");
    } catch (error) {
      console.error("Error al generar el mensaje de WhatsApp:", error);
    } finally {
      setLoading(false);
    }
  };

  const generarPDF = (email) => {
    const vendor = vendors.find((v) => v.correo === email);
    if (!vendor) {
      console.error("Vendor no encontrado.");
      return;
    }

    const envioSeleccionado = envios[email];
    const formasDePagoSeleccionadas = Array.from(
      document.querySelectorAll(`input[name="pago-${email}"]:checked`)
    ).map((input) => input.value);

    if (!envioSeleccionado) {
      alert("Por favor, selecciona un método de envío antes de generar el PDF.");
      return;
    }

    if (formasDePagoSeleccionadas.length === 0) {
      alert("Por favor, selecciona al menos una forma de pago antes de generar el PDF.");
      return;
    }

    const productos = productosPorEmail[email]?.productos || [];
    const total = productos.reduce((acc, producto) => acc + producto.price * producto.cantidad, 0);
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

  const findVendor = (email) => vendors.find((v) => v.correo === email);

  return (
    <>
      <CartHeader setIsOpen={setIsOpen} totalProductos={totalProductos} />
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white w-full h-full p-6 overflow-y-auto relative">
            {/* header */}
            <div className="relative bg-green-500 w-full h-24 flex items-center rounded-lg shadow-lg">
              <button
                onClick={() => setIsOpen(false)}
                className="absolute left-4 top-8 text-white text-lg flex items-center"
              >
                <ArrowLeft size={24} className="mr-2" /> Volver
              </button>
              <ShoppingCart 
                size={32} 
                className="absolute right-4 text-white" 
              />
            </div>
            {carrito.length > 0 ? (
              <div className="mt-6 space-y-6">
                {Object.keys(productosPorEmail).map((email) => {
                  const vendor = findVendor(email);
                  const opciones = [];
                  if (vendor?.entrega === "Envíos a domicilio" || vendor?.entrega === "Ambas opciones") {
                    opciones.push("envio");
                  }
                  if (vendor?.entrega === "Retiro en el local" || vendor?.entrega === "Ambas opciones") {
                    opciones.push("retiro");
                  }
                  return (
                    <div key={email} className="border p-4 rounded-lg shadow relative">
                      {/* Botón para eliminar todo el pedido */}
                      <button
                        onClick={() => setModalConfirm({ isOpen: true, email })}
                        className="absolute top-1 right-1 text-red-500 hover:text-red-700 mb-6"
                      >
                        <X size={24} />
                      </button>
                      <div className="flex items-center space-x-4">
                        <img
                          src={vendor.imagen || "/perfil.webp"}
                          alt={vendor.nombre}
                          className="w-16 h-16 rounded-full object-cover"
                        />
                        <div>
                          <h3 className="text-lg font-bold text-green-700">Comerciante: {vendor.nombre}</h3>
                          {vendor.ubicacion && (
                            <p className="text-blue-500 text-sm flex items-center">
                              <svg
                                className="w-4 h-4 text-blue-500 mr-1"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M12 2C8.686 2 6 4.686 6 8c0 4.418 6 12 6 12s6-7.582 6-12c0-3.314-2.686-6-6-6z"
                                />
                              </svg>
                              {vendor.ubicacion}
                            </p>
                          )}
                          {vendor.dias && vendor.horarios && (
                            <p className="text-gray-500 text-sm mt-1">
                              <strong>Días:</strong> {vendor.dias} <strong>Horarios:</strong> {vendor.horarios}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="mt-4">
                        <div className="flex items-center text-green-500">
                          <svg
                            className="w-5 h-5 mr-2"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 8c1.657 0 3-1.343 3-3S13.657 2 12 2 9 3.343 9 5s1.343 3 3 3zm0 0v13m0 0H9m3 0h3"
                            />
                          </svg>
                          Envíos Gratis desde los ${vendor.montoEnvioGratis}
                        </div>
                        <div className="flex items-center text-gray-400 mt-2">
                          <svg
                            className="w-5 h-5 mr-2"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M8 16l-4-4m0 0l4-4m-4 4h16"
                            />
                          </svg>
                          Tarifa de ${vendor.tarifaKm} / Km
                        </div>
                      </div>
                      <ul className="mt-4">
                        {productosPorEmail[email].productos.map((producto, index) => (
                          <li key={index} className="flex justify-between items-center py-2 border-b">
                            <span className="text-gray-700">
                              {producto.name} {producto.brand} - {producto.cantidad} - ${producto.price} - ${producto.price * producto.cantidad}
                            </span>
                            <button
                              onClick={() => eliminarDelCarrito(producto.id)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <Trash2 size={20} />
                            </button>
                          </li>
                        ))}
                      </ul>
                      <div className="mt-4 text-right font-bold text-green-700">
                        Total del pedido: $
                        {productosPorEmail[email].productos.reduce((acc, producto) => acc + producto.price * producto.cantidad, 0)}
                      </div>
                      <ShippingMethod
                        email={email}
                        opciones={opciones}
                        envios={envios}
                        manejarEnvio={manejarEnvio}
                      />
                      <PaymentMethod email={email} />
                      <AdditionalDetails email={email} productosPorEmail={productosPorEmail} />
                      <div className="mt-4 flex justify-center space-x-4">
                        <button
                          onClick={() => enviarPedidoWhatsApp(email)}
                          className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition flex items-center"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 mr-2"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                            stroke="none"
                          >
                            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.553 4.115 1.516 5.857L0 24l6.293-1.516A11.94 11.94 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm6.076 17.076c-.253.705-1.482 1.353-2.04 1.435-.518.075-1.19.106-3.785-1.61-3.18-2.11-5.26-7.48-5.42-7.83-.16-.35-1.29-2.91-1.24-3.91.05-1 .65-1.48.88-1.68.23-.2.51-.25.68-.25h.49c.16 0 .37-.03.57.43.2.46.76 1.85.83 1.98.07.13.12.3.02.48-.1.18-.15.3-.3.46-.15.15-.3.34-.43.46-.15.15-.3.3-.13.58.18.3.79 1.3 1.7 2.1 1.17 1.03 2.1 1.35 2.4 1.5.3.15.47.13.64-.08.18-.2.75-.88.95-1.18.2-.3.4-.25.68-.15.28.1 1.78.84 2.08.99.3.15.5.23.57.36.08.13.08.74-.18 1.45z" />
                          </svg>
                          Enviar pedido
                        </button>
                        <button
                          onClick={() => generarPDF(email)}
                          className="bg-black text-white py-2 px-4 rounded-md hover:bg-black transition flex items-center"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 mr-2"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                            stroke="none"
                          >
                            <path d="M19 2H5c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 18H7v-2h5v2zm5-4H7v-2h10v2zm0-4H7V8h10v4z" />
                          </svg>
                          Generar PDF
                        </button>
                      </div>
                      {loading && (
                        <div className="loading-overlay bg-black bg-opacity-50 absolute inset-0 flex justify-center items-center">
                          <LoadingSpinner />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-gray-500 text-center mt-6">No hay productos en el carrito.</p>
            )}
          </div>
        </div>
      )}
      {modalConfirm.isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p className="text-lg font-semibold mb-4">¿Estás seguro de que deseas eliminar todo el pedido?</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setModalConfirm({ isOpen: false, email: null })}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
              >
                Cancelar
              </button>
              <button
                onClick={() => eliminarPedidoCompleto(modalConfirm.email)}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
