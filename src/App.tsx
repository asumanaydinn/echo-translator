import React from "react";
import "../src/style/translate-form.scss"; // Adjust the path based on your file structure
import "../src/style/history.scss";

import { TranslationProvider } from "./context/TranslationContext";
import TranslateForm from "./pages/translation";
import TranslationHistory from "./pages/history";

function App() {
  return (
    <TranslationProvider>
      <div>
        <h1>EchoTranslate</h1>
        <TranslateForm />
        <TranslationHistory />
      </div>
    </TranslationProvider>
  );
}

export default App;
