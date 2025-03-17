import { useState, useEffect } from "react";

const useRidersData = () => {

  const url ="https://docs.google.com/spreadsheets/d/1ldO1LX0Np5Z39qQFxaOxdSPWbDBUaVXqnWtWRjGmnjA/gviz/tq?tqx=out:json";

  
  const [ridersData, setRidersData] = useState([]);
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
          vehiculo: row["Vehículo"],
          correo: row["Dirección de correo electrónico"],
          dias: row["Días laborables"],
          horarios: row["Horarios"],
          image: row["URL Image"] || "",
        }));

        setRidersData(formattedData);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, [url]);

  return { ridersData, loading, error };
};

export default useRidersData;
