const ShippingMethod = ({ email, opciones, envios, manejarEnvio }) => (
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

export default ShippingMethod;