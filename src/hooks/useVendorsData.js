import { useState, useEffect } from "react";

const useVendorsData = () => {
  const url = "https://docs.google.com/spreadsheets/d/1wjr2AXxzonM3Lul8YbBYE_FmLOG2K9jizHsP6UKzEpE/gviz/tq?tqx=out:json";

  const [vendorsData, setVendorsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(url)
      .then((response) => response.text())
      .then((text) => {
        const jsonData = JSON.parse(
          text.replace("/*O_o*/\ngoogle.visualization.Query.setResponse(", "").replace(");", "")
        );
        const headers = jsonData.table.cols.map((col) => col.label);
        const rows = jsonData.table.rows.map((row) => {
          const rowData = {};
          row.c.forEach((cell, index) => {
            if (cell && cell.v) {
              rowData[headers[index]] = cell.v;
            }
          });
          return rowData;
        });

        const formattedData = rows.map((row) => ({
          createdAt: row["Marca temporal"],
          whatsapp: row["Whatsapp"],
          estado: row["Estado"] || "",
          nombre: row["Nombre y Apellido"],
          departamento: row["Departamento"],
          entrega: row["Sistema de entregas"],
          correo: row["Dirección de correo electrónico"],
          dias: row["Días laborables"],
          horarios: row["Horarios"],
          image: row["URL Image"] || "",
          ubicacion: row["URL ubicación"] || "",
          montoEnvioGratis: row["¿Desde qué monto de compra ofrecerás envío gratis?"] || "",

        }));

        setVendorsData(formattedData);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, [url]);

  return { vendorsData, loading, error };
};

export default useVendorsData;
