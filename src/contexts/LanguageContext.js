import React, { createContext, useContext, useState } from "react";
import i18n from "../locales/i18n";

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
    const [locale, setLocale] = useState(i18n.locale);

    const changeLanguage = (lang) => {
        i18n.locale = lang;
        setLocale(lang);
    };

    return (
        <LanguageContext.Provider value={{ locale, changeLanguage}}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => useContext(LanguageContext);