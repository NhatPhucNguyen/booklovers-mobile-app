import { verifyToken } from "@/apis/auth";
import { getData, removeData } from "@/lib/storage";
import { hideAsync } from "expo-splash-screen";
import { jwtDecode } from "jwt-decode";
import { createContext, useCallback, useEffect, useState } from "react";
type AuthContextValue = {
    isAuthenticated: boolean;
    setAuth: (value: boolean) => Promise<void>;
    user: User | null;
};
type User = {
    id: string;
    email: string;
};
export const AuthContext = createContext<AuthContextValue | null>(null);
const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [isAuthenticated, setAuthenticated] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const setAuth = useCallback(async (value: boolean) => {
        if (value) {
            const token = (await getData("token")) as string;
            const { id, email } = jwtDecode(token) as {
                id: string;
                email: string;
            };
            setUser({ id, email });
        } else {
            setUser(null);
        }
        setAuthenticated(value);
    }, []);
    useEffect(() => {
        const validateUser = async () => {
            const token = await getData("token");
            if (!token) {
                setAuthenticated(false);
                setUser(null);
                await hideAsync();
                return;
            }
            const { success } = await verifyToken();
            if (success) {
                const { id, email } = jwtDecode(token) as {
                    id: string;
                    email: string;
                };
                setUser({ id, email });
                setAuthenticated(true);
            } else {
                await removeData("token");
                setAuthenticated(false);
                setUser(null);
            }
            await hideAsync();
        };
        validateUser();
    }, []);
    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                setAuth,
                user,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;
