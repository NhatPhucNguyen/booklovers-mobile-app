import { verifyToken } from "@/apis/auth";
import AuthContextProvider from "@/context/AuthContext";
import { getData, removeData } from "@/lib/storage";
import { Stack, router } from "expo-router";
import { useEffect, useState } from "react";

export default function RootLayout() {
    useEffect(() => {
        const validateUser = async () => {
            const token = await getData("token");
            console.log(token);
            if (!token) {
                router.replace("/");
            }
            const { success } = await verifyToken();
            if (success) {
                router.replace("/home");
            } else {
                await removeData("token");
                router.replace("/");
            }
        };
        validateUser();
    }, []);
    return (
        <AuthContextProvider>
            <Stack>
                <Stack.Screen
                    name="(tabs)"
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="index"
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="(auth)"
                    options={{
                        headerShown: false,
                    }}
                />
            </Stack>
        </AuthContextProvider>
    );
}
