import { createContext, useContext, useState } from "react";

const StateContext = createContext();

const initialFormData = {
  image: null,
  title: "",
  description: "",
  category: "",
  brand: "",
  price: "",
  salePrice: "",
  totalStock: "",
};

export const StateProvider = ({ children }) => {
  const [formData, setFormData] = useState(initialFormData);
  const [currentEditedId, setCurrentEditedId] = useState(null);

  return (
    <StateContext.Provider
      value={{
        formData,
        setFormData,
        currentEditedId,
        setCurrentEditedId,
        initialFormData,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useGlobalState = () => useContext(StateContext);
