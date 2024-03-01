import React from "react";
import { useTranslation } from "../context/TranslationContext";

const TranslationHistory = () => {
  const { translations, setSelectedHistoryItem } = useTranslation();

  return (
    <div className="history">
      <div className="history-list">
        {translations.map(({ id, englishText, turkishText }) => (
          <div
            key={id}
            className="history-list-item"
            onClick={() => setSelectedHistoryItem(englishText)}
          >
            {englishText}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TranslationHistory;
