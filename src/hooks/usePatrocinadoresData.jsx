import { useState, useEffect } from "react";

const useMembersData = () => {

  const url ="https://docs.google.com/spreadsheets/d/1GTLET6nuLtoNu_t3uXRY7rNUeHASVOx5tJ8N6ZiTyvg/gviz/tq?tqx=out:json";

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
          title: row["Title"],
          message: row["Message"],
          urlCta: row["CTA"],
          image: row["Image"],
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
