import { encryptMessage } from "./encryptionUtils"; // Cambiar a ES Modules

import useShortenUrl from "../hooks/useShortenUrl"; // Cambiar a ES Modules



export const generarMensajeWhatsApp = async (
  productos,
  envioSeleccionado,
  formasDePagoSeleccionadas,
  detalle,
  vendor
) => {
  let mensaje = "🛒 *Pedido realizado desde Digital Market*%0A%0A";

  productos.forEach((producto) => {
    mensaje += `📌 ${producto.name} ${producto.brand} ${producto.descripcion} x${producto.cantidad} / $${producto.price} - $${producto.price * producto.cantidad}%0A`;
  });

  mensaje += `%0A💰 *Total:* $${productos.reduce((acc, p) => acc + p.price * p.cantidad, 0)}%0A`;
  mensaje += `🚚 *Método de envío:* ${envioSeleccionado === "envio" ? "Envío a domicilio" : "Retiro en puerta"}%0A`;
  mensaje += `💳 *Forma(s) de pago:* ${formasDePagoSeleccionadas.join(", ")}%0A`;

  if (detalle) {
    mensaje += `%0A🔍 *Detalle:* ${detalle}`;
  }

  if (envioSeleccionado === "retiro") {
    mensaje += `%0A📍 *Ubicación para retiro:* ${vendor.ubicacion}`;
  }

// add link to shorten url
  const mensajeEncriptado = encryptMessage(mensaje);
// use short url
  try{
const { shortenUrl, loading, error } = useShortenUrl();
  const shortenedUrl = await shortenUrl(mensajeEncriptado);
  if (shortenedUrl) {
    mensaje += `%0A%0A*Link para ver el pedido:* ${shortenedUrl}`;
  } else {
    console.log("Error al acortar la URL:", error);
  }
  }catch(err){
    console.log(err)
  }




  return mensaje;
};
