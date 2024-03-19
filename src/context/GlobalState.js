import React, { createContext, useContext, useState } from 'react';

const ApiContext = createContext();

export const ApiProvider = ({ children }) => {
  const [render, setRender] = useState(false);

  const setRenderFlag = () => {
    setRender(true);
  };

  const setRenderFlagFalse = () => {
    setRender(false);
  };
  return (
    <ApiContext.Provider value={{ render, setRenderFlag ,setRenderFlagFalse}}>
      {children}
    </ApiContext.Provider>
  );
};

export const useApiContext = () => {
  return useContext(ApiContext);
};
