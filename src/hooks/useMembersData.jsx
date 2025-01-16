import { useState, useEffect } from "react";

const useMembersData = (url) => {
  const [membersData, setMembersData] = useState([]);
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
          createdAt: row["Marca temporal"] || "",
          dni: row["D.N.I"] || "",
          certificados: row["Certificados"] || "",
          domicilio: row["Domicilio"] || "",
          whatsapp: row["WhatsApp"] || "",
          estado: row["Estado"] || "",
          nombre: row["Nombre"] || "",
          apellido: row["Apellido"] || "",
          departamento: row["Departamento"] || "",
          servicio: row["Servicio"] || "",
          correo: row["Dirección de correo electrónico"] || "",
          image: row["image"] || "",
        }));

        setMembersData(formattedData);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, [url]);

  return { membersData, loading, error };
};

export default useMembersData;
