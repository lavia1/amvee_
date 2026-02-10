import React, { createContext, useContext, useState } from "react";
import Axios from "axios";

const PartsContext = createContext();
export const useParts = () => useContext(PartsContext);

export const PartsProvider = ({ children }) => {
  const [parts, setParts] = useState([]);

  const fetchParts = async () => {
    const res = await Axios.get(
      `${process.env.REACT_APP_API_BASE_URL}/api/parts`
    );

    // 🔥 TÄMÄ piilottaa nollat
    setParts(res.data.filter(p => p.stock > 0));
  };

  return (
    <PartsContext.Provider value={{ parts, fetchParts }}>
      {children}
    </PartsContext.Provider>
  );
};
