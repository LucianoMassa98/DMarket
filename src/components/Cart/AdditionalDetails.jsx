const AdditionalDetails = ({ email, productosPorEmail }) => (
  <>
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
  </>
);

export default AdditionalDetails;
