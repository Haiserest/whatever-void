import { useState, useEffect } from "react";
import { usePapaParse } from "react-papaparse";

export const useGoogleSheet = (url) => { 
  const { readRemoteFile } = usePapaParse();

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!url) return;

    setLoading(true);

    readRemoteFile(url, {
      complete: (results) => {
        const parsedData = parserData(results.data);
        setData(parsedData);
        setLoading(false);
      },
      error: (error) => {
        console.error("Error reading Google Sheet:", error);
        setLoading(false);
      }
    });
  }, [url, readRemoteFile]);

  return { loading, data };
};

function parserData(data) {
  const header = data.at(0);
  const lists = data.filter((_, index) => index > 0);
  return { header, lists };
}