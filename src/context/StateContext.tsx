import { createContext, ReactNode, useState } from "react";

// define type for StateContext
interface StateContextType {
    errorMsg: string;
    setErrorMsg: (msg: string) => void;
    loading: boolean;
    setLoading: (loading: boolean) => void;
}

interface StateProviderProps {
    children: ReactNode;
}

// Create the StateContext with default values
const StateContext = createContext<StateContextType>({} as StateContextType);

const StateProvider: React.FC<StateProviderProps> = ({ children }) => {
    const [errorMsg, setErrorMsg] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);

    return (
        <StateContext.Provider value={{
            errorMsg, setErrorMsg,
            loading, setLoading
        }}>
            {children}
        </StateContext.Provider>
    );
}

export { StateProvider };
export default StateContext;