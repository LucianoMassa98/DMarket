import { useState, useEffect } from "react";
import LOGO from "../../public/perfil.webp";

let cachedData = null; // Cache para los datos
let cachedError = null; // Cache para errores
let cachedLoading = true; // Cache para el estado de carga
const subscribers = []; // Lista de suscriptores para notificar cambios

const fetchProductsData = async (url) => {
  try {
    const response = await fetch(url);
    const text = await response.text();
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

    const formattedData = rows.map((row, index) => ({
      id: row["Marca temporal"] || `producto-${index}`, // Generar un id único si no existe
      brand: row["Marca"] || "",
      category: row["Categoría"] || "",
      subcategory: row["Sub Categoría"] || "",
      descripcion: row["Descripción"] || "",
      estado: row["Estado"] || "",
      name: row["Nombre"] || "",
      price: row["Precio"] || "",
      img: row["URL Image"] || LOGO,
      email: row["Dirección de correo electrónico"] || "",
      originalOrder: index, // Nuevo campo para preservar el orden original
    }));

    cachedData = formattedData;
    cachedLoading = false;
    cachedError = null;
    subscribers.forEach((callback) => callback());
  } catch (err) {
    cachedError = err;
    cachedLoading = false;
    subscribers.forEach((callback) => callback());
  }
};

const useProductsData = () => {
  const url = "https://docs.google.com/spreadsheets/d/1oxRTbNzsy7ff8pVewThlLwiRGubZVBsu-WaF17sS5hI/gviz/tq?tqx=out:json";
  const [productsData, setProductsData] = useState(cachedData);
  const [loading, setLoading] = useState(cachedLoading);
  const [error, setError] = useState(cachedError);

  useEffect(() => {
    const updateState = () => {
      setProductsData(cachedData);
      setLoading(cachedLoading);
      setError(cachedError);
    };

    subscribers.push(updateState);

    if (cachedData === null && cachedLoading) {
      fetchProductsData(url);
    } else {
      updateState();
    }

    return () => {
      const index = subscribers.indexOf(updateState);
      if (index !== -1) {
        subscribers.splice(index, 1);
      }
    };
  }, [url]);

  return { productsData, loading, error };
};

export default useProductsData;
