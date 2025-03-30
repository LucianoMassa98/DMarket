import { useState, useEffect } from "react";
import LOGO from "../../public/perfil.webp";

let cachedData = []; // Cache para los datos, inicializado como array vacío
let cachedError = null; // Cache para errores
let cachedLoading = true; // Cache para el estado de carga
const subscribers = []; // Lista de suscriptores para notificar cambios

const fetchProductsData = async (url) => {
  try {
    // Realiza una solicitud para obtener los datos de productos desde la URL proporcionada
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

    // Formatea los datos para que sean más fáciles de usar en el componente
    const formattedData = rows.map((row, index) => ({
      id: row["Marca temporal"] || `producto-${index}`, // Generar un id único si no existe
      brand: row["Marca"] || "",
      descripcion: row["Descripción"] || "",
      name: row["Nombre"] || "",
      price: row["Precio"] || "",
      img: row["URL Image"] || LOGO,
      email: row["Dirección de correo electrónico"] || "",
    }));

    // Actualiza la cache con los datos obtenidos
    cachedData = formattedData;
    cachedLoading = false;
    cachedError = null;
    subscribers.forEach((callback) => callback()); // Notifica a los suscriptores
  } catch (err) {
    // Manejo de errores y notificación a los suscriptores
    cachedError = err;
    cachedLoading = false;
    subscribers.forEach((callback) => callback());
  }
};

const useFeaturedProducts = () => {
  const url = "https://docs.google.com/spreadsheets/d/1NWLb4Yq9grfBrE1qL7TW0JqVJ-bArCluWceRgvtSg7M/gviz/tq?tqx=out:json";
  const [productOfertsData, setProductOfertsData] = useState(cachedData); // Estado para los datos de productos
  const [loading, setLoading] = useState(cachedLoading); // Estado para el indicador de carga
  const [error, setError] = useState(cachedError); // Estado para el manejo de errores

  useEffect(() => {
    const updateState = () => {
      // Actualiza los estados con los valores de la cache
      setProductOfertsData(cachedData);
      setLoading(cachedLoading);
      setError(cachedError);
    };

    // Agrega la función de actualización a la lista de suscriptores
    subscribers.push(updateState);

    // Si no hay datos en la cache, inicia la carga de datos
    if (cachedData.length === 0 && cachedLoading) {
      fetchProductsData(url);
    } else {
      updateState(); // Actualiza el estado inmediatamente si ya hay datos en la cache
    }

    return () => {
      // Elimina la función de actualización de la lista de suscriptores al desmontar
      const index = subscribers.indexOf(updateState);
      if (index !== -1) {
        subscribers.splice(index, 1);
      }
    };
  }, [url]);

  // Devuelve los datos, el estado de carga y los errores para ser usados en los componentes
  return { productOfertsData, loading, error };
};

export default useFeaturedProducts;
