import { useState, useEffect } from "react";

const useCommentsData = (url) => {
  const [commentsData, setCommentsData] = useState([]);
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
          emailProfesional: row["Email del profesional"] || "",
          comentarios: row["Comentarios"] || "",
          calificacion: row["Calificación"] || "",
        }));

        setCommentsData(formattedData);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, [url]);

  return { commentsData, loading, error };
};

export default useCommentsData;
