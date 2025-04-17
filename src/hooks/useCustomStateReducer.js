import { useReducer, useRef } from "react";

const reducer = (state, action) => {
    switch (action.type) {
        case 'UPDATE':
            return {...state, ...action.payload};
        case 'RESET':
            return action.payload;
        default:
            throw new Error(`Unknown action type: ${action.type}`);
    }
};

export function useCustomStateReducer(initialState) {
    const initialRef = useRef(initialState);
    const [state, dispatch] = useReducer(reducer, initialState);

    const updateState = (newValues) => {
        dispatch({ type: 'UPDATE', payload: newValues });
    };

    const resetState= () => {
        dispatch({ type: 'RESET', payload: initialRef.current });
    };

    return [state, updateState, resetState];
}