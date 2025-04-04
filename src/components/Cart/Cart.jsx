import React, { useState } from "react";
import { ArrowLeft, ShoppingCart, Trash2, X } from "lucide-react"; // Importar Trash2
import CartHeader from "./CartHeader";
import CartItem from "./CartItem";
import ShippingMethod from "./ShippingMethod";
import PaymentMethod from "./PaymentMethod";
import AdditionalDetails from "./AdditionalDetails";
import LoadingSpinner from "../LoadingSpinner";
import { generarMensajeWhatsApp } from "../../utils/whatsappUtils"; // Importar la nueva función

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
    setCarrito((prevCarrito) => prevCarrito.filter((producto) => producto.email !== email));
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
                        className="absolute top-4 right-4 text-red-500 hover:text-red-700"
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
                          <h3 className="text-lg font-bold text-green-700">Pedido para {vendor.nombre}</h3>
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
                      <div className="mt-4 text-center">
                        <button
                          onClick={() => enviarPedidoWhatsApp(email)}
                          className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition"
                        >
                          Enviar pedido por WhatsApp
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
