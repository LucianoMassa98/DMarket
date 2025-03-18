import { useState, useEffect } from "react";
import LOGO from "../../public/perfil.webp";

const useProductsData = () => {

  const url ="https://docs.google.com/spreadsheets/d/1oxRTbNzsy7ff8pVewThlLwiRGubZVBsu-WaF17sS5hI/gviz/tq?tqx=out:json";

  const [productsData, setProductsData] = useState([]);
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
          id: row["Marca temporal"] || "",
          brand: row["Marca"] || "",
          category: row["Categoría"] || "",
          subcategory: row["Sub Categoría"] || "",
          descripcion: row["Descripción"] || "",
          estado: row["Estado"] || "",
          name: row["Nombre"] || "",
          price: row["Precio"] || "",
          cantidad: row["Cantidad"] || "",
          img: row["URL Image"] || LOGO,
          email: row["Dirección de correo electrónico"] || "",
        }));

        setProductsData(formattedData);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, [url]);

  return { productsData, loading, error };
};

export default useProductsData;
