import React, { useEffect, useState } from "react";
import { useTranslation } from "../context/TranslationContext";
import { MicNoneRounded } from "@mui/icons-material";

declare var SpeechRecognition: any;

declare global {
  interface Window {
    SpeechRecognition: typeof SpeechRecognition;
    webkitSpeechRecognition: any;
  }
}

// Define a function for translating text
const translateText = async (text: string): Promise<string> => {
  try {
    const encodedText = encodeURIComponent(text);
    const url = `https://api.mymemory.translated.net/get?q=${encodedText}&langpair=en|tr`; // English to Turkish translation
    const response = await fetch(url);
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.responseStatus); // Handle HTTP errors
    }
    return data.responseData.translatedText;
  } catch (error) {
    console.error("Translation error:", error);
    throw error; // Re-throw to handle it in the calling function
  }
};

const TranslateForm: React.FC = () => {
  const { addTranslation, selectedHistoryItem, translations } =
    useTranslation();
  const [inputText, setInputText] = useState<string>("");

  const [translatedText, setTranslatedText] = useState("");

  const [isListening, setIsListening] = useState(false);

  const speechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new speechRecognition();

  recognition.onstart = () => {
    setIsListening(true);
  };

  recognition.onresult = (event: any) => {
    setIsListening(false);
    const transcript = Array.from(event.results)
      .map((result: any) => result[0])
      .map((result: any) => result.transcript)
      .join("");
    setInputText(transcript);
    recognition.stop();
  };

  recognition.onend = () => {
    setIsListening(false);
  };

  const startListening = () => {
    recognition.start();
  };

  useEffect(() => {
    if (selectedHistoryItem !== "") {
      setInputText(selectedHistoryItem);
    }
  }, [selectedHistoryItem]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const translatedText = await translateText(inputText);
      if (!translations.find((b) => b.englishText === inputText)) {
        addTranslation(inputText, translatedText);
      }
      setTranslatedText(translatedText);
    } catch (error) {
      console.log("Failed to translate. Please try again."); // Set error message for the user
    }
  };

  return (
    <form onSubmit={handleSubmit} className="translate-form">
      <div className="input-container">
        <div className="microphone">
          {isListening && "Listening..."}

          <button
            type="button"
            className="microphone-button"
            onClick={startListening}
            disabled={isListening}
          >
            <MicNoneRounded />
          </button>
        </div>

        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Enter text in English"
          className="translate-input"
        />

        <button
          type="submit"
          className="translate-button"
          disabled={inputText === ""}
        >
          Translate
        </button>
      </div>

      <div className="translate-text">
        {translatedText === "" ? (
          <div style={{ color: "#B5B6B7" }}>
            Translated text will be appear here
          </div>
        ) : (
          translatedText
        )}
      </div>
    </form>
  );
};

export default TranslateForm;
