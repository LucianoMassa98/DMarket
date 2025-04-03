const PaymentMethod = ({ email }) => (
    <>
      <label className="block text-lg font-semibold text-green-700">Tipo de Pago</label>
      <div className="mt-2 flex gap-4">
        <label className="flex items-center">
          <input type="checkbox" name={`pago-${email}`} value="efectivo" className="mr-2" />
          Efectivo
        </label>
        <label className="flex items-center">
          <input type="checkbox" name={`pago-${email}`} value="transferencia" className="mr-2" />
          Transferencia
        </label>
        <label className="flex items-center">
          <input type="checkbox" name={`pago-${email}`} value="tarjeta" className="mr-2" />
          Tarjeta
        </label>
      </div>
    </>
  );

export default PaymentMethod;