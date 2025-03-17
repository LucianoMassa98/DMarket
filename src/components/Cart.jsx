import React, { useState } from "react";
import { ShoppingCart, ChevronDown, ArrowLeft } from "lucide-react"; // Iconos

const Cart = ({ carrito, eliminarDelCarrito, vendors }) => {
  const [isOpen, setIsOpen] = useState(false);
  // Agrupar productos por email
  const productosPorEmail = carrito.reduce((acc, producto) => {
    acc[producto.email] = acc[producto.email] || { productos: [], envio: "envio", phone: producto.phone, vendor: vendors[producto.email] };
    acc[producto.email].productos.push(producto);
    return acc;
  }, {});

  // Función para manejar el cambio en método de envío por cada email
  const manejarEnvio = (email, metodo) => {
    productosPorEmail[email].envio = metodo;
  };

  // Función para enviar pedido a WhatsApp
  const enviarPedidoWhatsApp = (email) => {
    // Buscar el vendor en el array vendors por su email
    const vendor = vendors.find(v => v.correo == email);
    // Validar si el vendor existe
    if (!vendor) {
        console.error("Vendor no encontrado.");
        return;
    }

    let mensaje = "🛒 *Pedido realizado desde Digital Market*%0A%0A";

    productosPorEmail[email].productos.forEach((producto) => {
        mensaje += `📌 ${producto.name+ " "+ producto.brand+ " "+producto.tags} x${producto.cantidad} / $${producto.price} - $${producto.price * producto.cantidad}%0A`;
    });

    mensaje += `%0A💰 *Total:* $${productosPorEmail[email].productos.reduce((acc, p) => acc + p.price * p.cantidad, 0)}%0A`;
    mensaje += `🚚 *Método de envío:* ${productosPorEmail[email].envio === "envio" ? "Envío a domicilio" : "Retiro en puerta"}`;

    const url = `https://wa.me/${vendor.whatsapp}?text=${mensaje}`;
    window.open(url, "_blank");
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
  <div className="relative w-8 h-8 bg-gradient-to-r from-green-600 to-yellow-400 rounded-full absolute -top-2 -left-2"></div>
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
                {Object.keys(productosPorEmail).map((email) => (
                  <div key={email} className="border p-4 rounded-lg shadow">
                    <h3 className="text-lg font-bold text-green-700">Pedido para {findVendor(email).nombre}</h3>
                    {findVendor(email) && (
    <div className="mt-2">
      <p className="text-sm text-gray-400">Días laborables: {findVendor(email)?.dias}</p>
      <p className="text-sm text-gray-400">Horarios: {findVendor(email)?.horarios}</p>
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
    // Verificamos si el método de entrega incluye "Retiro en el local" o "Envíos a domicilio" o "Ambas opciones"
    (findVendor(email)?.entrega === "Retiro en el local" || 
    findVendor(email)?.entrega === "Envíos a domicilio" || 
    findVendor(email)?.entrega === "Ambas opciones") && (
      <>
        <label className="block text-lg font-semibold text-green-700">Método de Envío</label>
        <div className="mt-2 flex gap-4">
          {findVendor(email)?.entrega === "Envíos a domicilio" || findVendor(email)?.entrega === "Ambas opciones" ? (
            <label className="flex items-center">
              <input
                type="radio"
                name={`envio-${email}`}
                value="envio"
                defaultChecked
                onChange={() => manejarEnvio(email, "envio")}
                className="mr-2"
              />
              Envío
            </label>
          ) : null}

          {findVendor(email)?.entrega === "Retiro en el local" || findVendor(email)?.entrega === "Ambas opciones" ? (
            <label className="flex items-center">
              <input
                type="radio"
                name={`envio-${email}`}
                value="retiro"
                onChange={() => manejarEnvio(email, "retiro")}
                className="mr-2"
              />
              Retiro en puerta
            </label>





          ) : null}
        </div>
      </>
    )
  }
</div>


                    <div className="mt-4 text-center">
                      <button
                        onClick={() => enviarPedidoWhatsApp(email)}
                        className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition"
                      >
                        Enviar pedido por WhatsApp
                      </button>
                    </div>

                  



                  </div>
                ))}
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
