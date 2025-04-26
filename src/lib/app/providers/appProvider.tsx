import React, { useContext, useEffect, useMemo } from "react";
import { App } from "../app"
import { BaseTemplate } from "@/lib/template/baseTemplate";


type AppContextType = {
    app: App;
};
type AppProviderProps = {
    children: React.ReactNode;
    template: BaseTemplate;
};

const AppContext = React.createContext<AppContextType | null>(null);

export function NarraUIProvider({ children, template }: AppProviderProps) {
    const app = useMemo<App>(() => {
        const app = new App({});
        return app;
    }, []);
    const majorVersion = parseInt(React.version.split(".")[0], 10);
    const contextValue: AppContextType = {
        app,
    };

    useEffect(() => {
        app.setTemplate(template);
    }, [template]);

    /**
     * https://react.dev/blog/2024/12/05/react-19#context-as-a-provider
     * 
     * In React 19, the Context API has been updated to allow for a more efficient way of providing context values.
     * ```typescript
     * const ThemeContext = createContext('');
     * 
     * function App({children}) {
     *   return (
     *     <ThemeContext value="dark">
     *       {children}
     *     </ThemeContext>
     *   );  
     * }
     * ```
     */
    if (majorVersion < 19) {
        return (
            <AppContext.Provider value={contextValue}>
                {children}
            </AppContext.Provider>
        )
    } else {
        return (
            <AppContext value={contextValue}>
                {children}
            </AppContext>
        )
    }
}

export function useApp(): AppContextType {
    const value = useContext(AppContext);
    if (!value) throw new Error("useApp can only be used within a NarraUIProvider");

    return value;
}
