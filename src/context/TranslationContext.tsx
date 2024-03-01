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
  setSelectedHistoryItem: React.Dispatch<React.SetStateAction<string>>;
  selectedHistoryItem: string;
}

const defaultValue: TranslationContextType = {
  translations: [],
  addTranslation: () => {},
  selectedHistoryItem: "",
  setSelectedHistoryItem: () => {},
};

const TranslationContext = createContext<TranslationContextType>(defaultValue);

export function useTranslation() {
  return useContext(TranslationContext);
}

export const TranslationProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [translations, setTranslations] = useState<Translation[]>(() => {
    const savedTranslations = localStorage.getItem("translations");
    return savedTranslations ? JSON.parse(savedTranslations) : [];
  });

  const [selectedHistoryItem, setSelectedHistoryItem] = useState("");

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
    <TranslationContext.Provider
      value={{
        translations,
        addTranslation,
        selectedHistoryItem,
        setSelectedHistoryItem,
      }}
    >
      {children}
    </TranslationContext.Provider>
  );
};
