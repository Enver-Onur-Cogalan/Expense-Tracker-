import React, { Children, createContext, useContext } from "react";
import { useCustomStateReducer } from "../hooks/useCustomStateReducer";

const initialState = {
    expenses: [],
    categories: [],
};

const ExpenseContext = createContext();

export const ExpenseProvider = ({ children }) => {
    const [state, updateState, resetState] = useCustomStateReducer(initialState);

    return (
        <ExpenseContext.Provider value={{...state, updateState, resetState }}>
            {children}
        </ExpenseContext.Provider>
    );
};

export const useExpenseContext = () => {
    const context = useContext(ExpenseContext);
    if (!context) {
        throw new Error ('useExpenseContext must be used within an ExpenseProvider');
    }
    return context;
};