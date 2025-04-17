import React from "react";
import StackNavigator from "./src/navigation/StackNavigator";
import { ExpenseProvider } from "./src/contexts/ExpenseContext";
import { LanguageProvider } from "./src/contexts/LanguageContext";


const App = () => {
  return (
    <LanguageProvider>
      <ExpenseProvider>
        <StackNavigator />
      </ExpenseProvider>
    </LanguageProvider>
)
};

export default App;
