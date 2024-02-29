import React, { useState } from "react";
import { useTranslation } from "../context/TranslationContext";

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
  const { addTranslation } = useTranslation();
  const [inputText, setInputText] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const translatedText = await translateText(inputText);
      addTranslation(inputText, translatedText);
      setInputText(""); // Clear the input after successful submission
      setError(null); // Reset error state if previous attempt had failed
    } catch (error) {
      setError("Failed to translate. Please try again."); // Set error message for the user
    }
  };

  return (
    <form onSubmit={handleSubmit} className="translate-form">
      <input
        type="text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Enter text in English"
        className="translate-input"
      />
      <button type="button" onClick={startListening} disabled={isListening}>
        {isListening ? "Listening..." : "Speak"}
      </button>
      <button type="submit" className="translate-button">
        Translate
      </button>
      {error && <p className="translate-error">{error}</p>}
    </form>
  );
};

export default TranslateForm;
