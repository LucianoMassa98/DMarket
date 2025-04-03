import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import CartHeader from "./CartHeader";
import CartItem from "./CartItem";
import ShippingMethod from "./ShippingMethod";
import PaymentMethod from "./PaymentMethod";
import AdditionalDetails from "./AdditionalDetails";
import LoadingSpinner from "../LoadingSpinner";

const Cart = ({ carrito, eliminarDelCarrito, vendors }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [envios, setEnvios] = useState(
    carrito.reduce((acc, producto) => {
      acc[producto.email] = "envio";
      return acc;
    }, {})
  );

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

  const enviarPedidoWhatsApp = (email) => {
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
    let mensaje = "🛒 *Pedido realizado desde Digital Market*%0A%0A";

    const productos = productosPorEmail[email]?.productos || [];
    productos.forEach((producto) => {
      mensaje += `📌 ${producto.name} ${producto.brand} ${producto.descripcion} x${producto.cantidad} / $${producto.price} - $${producto.price * producto.cantidad}%0A`;
    });

    mensaje += `%0A💰 *Total:* $${productos.reduce((acc, p) => acc + p.price * p.cantidad, 0)}%0A`;
    mensaje += `🚚 *Método de envío:* ${envioSeleccionado === "envio" ? "Envío a domicilio" : "Retiro en puerta"}%0A`;
    mensaje += `💳 *Forma(s) de pago:* ${formasDePagoSeleccionadas.join(", ")}%0A`;

    const detalle = productosPorEmail[email]?.detalle || "";
    if (detalle) {
      mensaje += `%0A🔍 *Detalle:* ${detalle}`;
    }

    if (envioSeleccionado === "retiro") {
      mensaje += `%0A📍 *Ubicación para retiro:* ${vendor.ubicacion}`;
    }

    const url = `https://wa.me/${vendor.whatsapp}?text=${mensaje}`;
    window.open(url, "_blank");
    setLoading(false);
  };

  const findVendor = (email) => vendors.find((v) => v.correo === email);

  return (
    <>
      <CartHeader setIsOpen={setIsOpen} totalProductos={totalProductos} />
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white w-full h-full p-6 overflow-y-auto relative">
            <div className="relative bg-green-500 w-full h-24 flex items-center rounded-b-full">
              <button
                onClick={() => setIsOpen(false)}
                className="absolute left-4 top-8 text-white text-lg flex items-center"
              >
                <ArrowLeft size={24} className="mr-2" /> Volver
              </button>
              <h2 className="text-2xl font-semibold text-white text-center w-full">Carrito</h2>
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
                    <div key={email} className="border p-4 rounded-lg shadow">
                      <h3 className="text-lg font-bold text-green-700">Pedido para {vendor.nombre}</h3>
                      
                      <h3 className="text-lg font-bold text-green-500 flex items-center">
                        <svg className="w-5 h-5 text-green-500 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c1.657 0 3-1.343 3-3S13.657 2 12 2 9 3.343 9 5s1.343 3 3 3zm0 0v13m0 0H9m3 0h3" />
                        </svg>
                        Envíos Gratis desde los ${vendor.montoEnvioGratis}
                      </h3>
                      <h3 className="text-lg font-bold text-gray-400 flex items-center">
                        <svg className="w-5 h-5 text-gray-400 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16l-4-4m0 0l4-4m-4 4h16" />
                        </svg>
                        Tarifa de ${vendor.tarifaKm} / Km
                      </h3>

                      <ul>
                        {productosPorEmail[email].productos.map((producto, index) => (
                          <li key={index} className="flex justify-between items-center py-2 border-b">
                            <span className="text-gray-700">
                              {producto.name} {producto.brand} - {producto.cantidad} - ${producto.price} - ${producto.price * producto.cantidad}
                            </span>
                            <button
                              onClick={() => eliminarDelCarrito(producto.id)}
                              className="text-red-500 hover:underline"
                            >
                              Eliminar
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
    </>
  );
};

export default Cart;
