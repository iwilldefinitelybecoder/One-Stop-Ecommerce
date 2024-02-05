import { createContext, useContext, useState } from 'react';

export const ComponentContext = createContext(null);

export const useComponent = () => {
    return useContext(ComponentContext);
}

const ComponentProvider = ({children}) => {

    const [ loadProgress,setLoadProgress ] = useState(-1);
    
    return (
        <ComponentContext.Provider value={{ loadProgress,setLoadProgress}}>
            {children}
        </ComponentContext.Provider>
    )
}

export default ComponentProvider;