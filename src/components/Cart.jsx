import React, { useState } from "react";
import { ShoppingCart, ChevronDown, ArrowLeft, Info } from "lucide-react"; // Iconos
import useShortenUrl from "../hooks/useShortenUrl";
import LoadingSpinner from "./LoadingSpinner"; // Componente de carga

const Cart = ({ carrito, eliminarDelCarrito, vendors }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { shortenUrl, loading, error } = useShortenUrl(); // Mover el hook aquí

  // Estado para manejar el tipo de envío por email
  const [envios, setEnvios] = useState(
    carrito.reduce((acc, producto) => {
      acc[producto.email] = "envio"; // Valor predeterminado
      return acc;
    }, {})
  );

  // Calcular la cantidad total de productos en el carrito
  const totalProductos = carrito.reduce((acc, producto) => acc + producto.cantidad, 0);

  // Agrupar productos por email
  const productosPorEmail = carrito.reduce((acc, producto) => {
    acc[producto.email] = acc[producto.email] || { productos: [], phone: producto.phone, vendor: vendors[producto.email] };
    acc[producto.email].productos.push(producto);
    return acc;
  }, {});

  // Función para manejar el cambio en método de envío por cada email
  const manejarEnvio = (email, metodo) => {
    setEnvios((prevEnvios) => ({
      ...prevEnvios,
      [email]: metodo,
    }));
  };

  // Función para enviar pedido a WhatsApp
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

    let mensaje = "🛒 *Pedido realizado desde Digital Market*%0A%0A";

    productosPorEmail[email].productos.forEach((producto) => {
      mensaje += `📌 ${producto.name + " " + producto.brand + " " + producto.descripcion} x${producto.cantidad} / $${producto.price} - $${producto.price * producto.cantidad}%0A`;
    });

    mensaje += `%0A💰 *Total:* $${productosPorEmail[email].productos.reduce((acc, p) => acc + p.price * p.cantidad, 0)}%0A`;

    mensaje += `🚚 *Método de envío:* ${envioSeleccionado === "envio" ? "Envío a domicilio" : "Retiro en puerta"}%0A`;

    mensaje += `💳 *Forma(s) de pago:* ${formasDePagoSeleccionadas.join(", ")}%0A`;

    const detalle = productosPorEmail[email].detalle || "";
    if (detalle) {
      mensaje += `%0A🔍 *Detalle:* ${detalle}`;
    }

    if (envioSeleccionado === "envio") {
      mensaje += `%0A📍 *Nota:* Proporciona tu ubicación si no eres cliente habitual del comerciante.`;
    } else if (envioSeleccionado === "retiro") {
      mensaje += `%0A📍 *Ubicación para retiro:* ${vendor.ubicacion}`;
    }

    shortenUrl(mensaje, email)
  .then((res) => {
    console.log("Pedido enviado con éxito:", JSON.stringify(res));
    mensaje += `%0A🔗 *NotaPedido:* ${"link.destored.org/" + res.shortUrl}`;
    const url = `https://wa.me/${vendor.whatsapp}?text=${mensaje}`;
    window.open(url, "_blank");
  })
  .catch((err) => {
    console.error("Error al enviar el pedido:", err);
  })
  .finally(() => {
    setLoading(true); // Muestra el spinner

    setTimeout(() => {
      setLoading(false); // Oculta el spinner después de unos segundos
    }, 3000);
  }); 
  };

  const findVendor = (email) => {
    return vendors.find(v => v.correo === email);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 bg-gradient-to-r from-black via-green-800 to-yellow-500 text-white px-4 py-3 rounded-full shadow-lg hover:scale-105 transition transform flex items-center gap-2"
      >
        <div className="relative w-8 h-8 bg-gradient-to-r from-green-600 to-yellow-400 rounded-full absolute -top-2 -left-2 flex items-center justify-center">
          {/* Mostrar el total de productos en el círculo */}
          {totalProductos > 0 && (
            <span className="text-white font-semibold text-sm">{totalProductos}</span>
          )}
        </div>
        <ShoppingCart size={20} />
        <span>Carrito</span>
      </button>

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
                  // Asegurar que el método de envío por defecto sea "envío" si no hay opción de retiro
                  if (
                    findVendor(email)?.entrega !== "Retiro en el local" &&
                    findVendor(email)?.entrega !== "Ambas opciones"
                  ) {
                    productosPorEmail[email].envio = "envio";
                  }

                  return (
                    <div key={email} className="border p-4 rounded-lg shadow">
                      <h3 className="text-lg font-bold text-green-700">Pedido para {findVendor(email).nombre}</h3>
                      {findVendor(email) && (
                        <div className="mt-2">
                          <p className="text-sm text-gray-400">Días laborables: {findVendor(email)?.dias}</p>
                          <p className="text-sm text-gray-400">Horarios: {findVendor(email)?.horarios}</p>
                          {findVendor(email)?.ubicacion && (
                            <p className="text-sm text-blue-500 mt-2 flex items-center">
                              <Info size={16} className="mr-1" />
                              <a href={findVendor(email)?.ubicacion} target="_blank" rel="noopener noreferrer">
                                Ver ubicación del comerciante
                              </a>
                            </p>
                          )}
                          {findVendor(email)?.montoEnvioGratis && (
                            <p className="text-sm text-green-600 font-semibold mt-2">
                              🚚 Envío gratis a partir de ${findVendor(email)?.montoEnvioGratis}
                            </p>
                          )}
                        </div>
                      )}
                      <ul>
                        {productosPorEmail[email].productos.map((producto, index) => (
                          <li key={index} className="py-2 flex justify-between items-center border-b">
                            <div>
                              <span className="mr-2">{producto.name}</span>
                              <span className="text-sm text-gray-500">x {producto.cantidad}</span>
                              <span className="text-sm text-gray-500"> / ${producto.price}</span>
                            </div>
                            <span className="font-semibold">${producto.price * producto.cantidad}</span>
                            <button
                              onClick={() => eliminarDelCarrito(producto.id)}
                              className="text-red-500 hover:text-red-700 text-sm"
                            >
                              Eliminar
                            </button>
                          </li>
                        ))}
                      </ul>
                   

                      <div className="mt-4">
  { 
    (findVendor(email)?.entrega === "Retiro en el local" || 
    findVendor(email)?.entrega === "Envíos a domicilio" || 
    findVendor(email)?.entrega === "Ambas opciones") && (() => {
      // Determinar opciones disponibles
      const opciones = [];
if (findVendor(email)?.entrega === "Envíos a domicilio" || findVendor(email)?.entrega === "Ambas opciones") {
  opciones.push("envio");
}
if (findVendor(email)?.entrega === "Retiro en el local" || findVendor(email)?.entrega === "Ambas opciones") {
  opciones.push("retiro");
}

// Si ya hay una opción seleccionada, mantenerla; si no, usar la primera opción disponible
const opcionSeleccionada = opciones.includes(envios[email])
  ? envios[email]
  : opciones[0];


      return (
        <>
          <label className="block text-lg font-semibold text-green-700">Método de Envío</label>
          <div className="mt-2 flex gap-4">
            {opciones.includes("envio") && (
              <label className="flex items-center">
                <input
                  type="radio"
                  name={`envio-${email}`}
                  value="envio"
                  checked={envios[email] === "envio"}
                  onChange={() => manejarEnvio(email, "envio")}
                  className="mr-2"
                />
                Envío
              </label>
            )}

            {opciones.includes("retiro") && (
              <label className="flex items-center">
                <input
                  type="radio"
                  name={`envio-${email}`}
                  value="retiro"
                  checked={envios[email] === "retiro"}
                  onChange={() => manejarEnvio(email, "retiro")}
                  className="mr-2"
                />
                Retiro en puerta
              </label>
            )}
          </div>
          
        </>
      );
    })()
  }
</div>



                      <div className="mt-4">
                        <label className="block text-lg font-semibold text-green-700">Tipo de Pago</label>
                        <div className="mt-2 flex gap-4">
                          <label className="flex items-center">
                            <input
                              type="checkbox"
                              name={`pago-${email}`}
                              value="efectivo"
                              className="mr-2"
                            />
                            Efectivo
                          </label>
                          <label className="flex items-center">
                            <input
                              type="checkbox"
                              name={`pago-${email}`}
                              value="transferencia"
                              className="mr-2"
                            />
                            Transferencia
                          </label>
                          <label className="flex items-center">
                            <input
                              type="checkbox"
                              name={`pago-${email}`}
                              value="tarjeta"
                              className="mr-2"
                            />
                            Tarjeta
                          </label>
                        </div>
                      </div>

                      <div className="mt-4">
                        <label className="block text-lg font-semibold text-green-700">Agregar Detalle</label>
                        <div className="mt-2">
                          <button
                            onClick={() => {
                              const detalleDiv = document.getElementById(`detalle-${email}`);
                              detalleDiv.style.display = detalleDiv.style.display === "none" ? "block" : "none";
                            }}
                            className="text-blue-500 underline"
                          >
                            Mostrar/Ocultar
                          </button>
                          <textarea
                            id={`detalle-${email}`}
                            style={{ display: "none" }}
                            onChange={(e) => (productosPorEmail[email].detalle = e.target.value)}
                            className="w-full mt-2 p-2 border rounded"
                            placeholder="Escribe un detalle adicional..."
                          ></textarea>
                        </div>
                      </div>

                      <div className="mt-4 text-center">
                        <button
                          onClick={() => enviarPedidoWhatsApp(email)}
                          className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition"
                        >
                          Enviar pedido por WhatsApp
                        </button>
                      </div>
                      {loading && (
                     <div className="flex justify-center items-center min-h-screen bg-black">
                     <LoadingSpinner />
                   </div>
                      )}

                    </div>
                  );
                })}
                <p className="text-sm text-gray-500 text-center mt-6">
                  Si tu pedido no tiene un envío gratis, el costo es de $600 x km desde el local del comerciante hacia tu punto de entrega.
                </p>
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
