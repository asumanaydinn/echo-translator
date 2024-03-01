import React from "react";
import "../src/style/translate-form.scss"; // Adjust the path based on your file structure
import "../src/style/history.scss";
import "../src/style/header.scss";
import "../src/style/layout.scss";

import { TranslationProvider } from "./context/TranslationContext";
import TranslateForm from "./pages/translation";
import TranslationHistory from "./pages/history";
import Header from "./components/header";

function App() {
  return (
    <TranslationProvider>
      <div className="layout">
        <Header />
        <div className="body">
          <TranslationHistory />

          <TranslateForm />
        </div>
      </div>
    </TranslationProvider>
  );
}

export default App;
