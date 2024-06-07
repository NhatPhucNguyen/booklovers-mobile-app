import { verifyToken } from "@/apis/auth";
import { getData, removeData } from "@/lib/storage";
import { SplashScreen } from "expo-router";
import { createContext, useCallback, useEffect, useState } from "react";
type AuthContextValue = {
    isAuthenticated: boolean;
    setAuth: (value: boolean) => void;
};
export const AuthContext = createContext<AuthContextValue | null>(null);
const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [isAuthenticated, setAuthenticated] = useState(false);
    const setAuth = useCallback((value: boolean) => {
        setAuthenticated(value);
    }, []);
    useEffect(() => {
        const validateUser = async () => {
            const token = await getData("token");
            if (!token) {
                setAuthenticated(false);
            }
            const { success } = await verifyToken();
            if (success) {
                setAuthenticated(true);
            } else {
                await removeData("token");
                setAuthenticated(false);
            }
            await SplashScreen.hideAsync();
        };
        validateUser();
    }, []);
    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                setAuth,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;
