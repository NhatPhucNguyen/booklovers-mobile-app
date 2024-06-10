import useAuthContext from "@/hooks/useAuthContext";
import { Redirect, Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import Toast from "react-native-toast-message";
import { QueryClient, QueryClientProvider } from "react-query";
const TabsLayout = () => {
    const { isAuthenticated } = useAuthContext();
    if (!isAuthenticated) {
        return <Redirect href="/home" />;
    }
    const client = new QueryClient();
    return (
        <QueryClientProvider client={client}>
            <StatusBar style="dark" />
            <Tabs>
                <Tabs.Screen
                    name="home"
                    options={{
                        headerShown: false,
                    }}
                />
                <Tabs.Screen
                    name="profile"
                    options={{
                        headerShown: false,
                    }}
                />
                <Tabs.Screen
                    name="myPosts"
                    options={{
                        headerShown: false,
                    }}
                />
                <Tabs.Screen
                    name="discover"
                    options={{
                        headerShown: false,
                    }}
                />
                <Tabs.Screen
                    name="notifications"
                    options={{
                        headerShown: false,
                    }}
                />
                <Tabs.Screen
                    name="(chat)"
                    options={{
                        href: null,
                        headerShown: false,
                    }}
                />
            </Tabs>
            <Toast />
        </QueryClientProvider>
    );
};
export default TabsLayout;
