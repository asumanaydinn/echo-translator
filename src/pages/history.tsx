import React from "react";
import { useTranslation } from "../context/TranslationContext";

const TranslationHistory = () => {
  const { translations } = useTranslation();

  return (
    <div className="history">
      <img src="../assets/logo.png" alt="logo" />
      <ul>
        {translations.map(({ id, englishText, turkishText }) => (
          <li key={id}>
            <strong>English:</strong> {englishText} | <strong>Turkish:</strong>{" "}
            {turkishText}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TranslationHistory;
