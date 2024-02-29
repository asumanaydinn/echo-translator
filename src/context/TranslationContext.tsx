import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

interface Translation {
  englishText: string;
  turkishText: string;
  id: number;
}

interface TranslationContextType {
  translations: Translation[];
  addTranslation: (englishText: string, turkishText: string) => void;
}

// Provide a default value matching the shape of TranslationContextType
const defaultValue: TranslationContextType = {
  translations: [],
  addTranslation: () => {}, // Provide a no-op function as a placeholder
};

const TranslationContext = createContext<TranslationContextType>(defaultValue);

export function useTranslation() {
  return useContext(TranslationContext);
}

export const TranslationProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  // Initialize translations state from localStorage if available
  const [translations, setTranslations] = useState<Translation[]>(() => {
    const savedTranslations = localStorage.getItem("translations");
    return savedTranslations ? JSON.parse(savedTranslations) : [];
  });

  // Update localStorage whenever translations change
  useEffect(() => {
    localStorage.setItem("translations", JSON.stringify(translations));
  }, [translations]);

  const addTranslation = (englishText: string, turkishText: string) => {
    const newTranslation: Translation = {
      englishText,
      turkishText,
      id: Date.now(),
    };

    setTranslations((prevTranslations) => [
      ...prevTranslations,
      newTranslation,
    ]);
  };

  return (
    <TranslationContext.Provider value={{ translations, addTranslation }}>
      {children}
    </TranslationContext.Provider>
  );
};
