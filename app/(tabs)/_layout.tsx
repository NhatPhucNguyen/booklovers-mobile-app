import { Colors } from "@/constants/Colors";
import useAuthContext from "@/hooks/useAuthContext";
import { Redirect, Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
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
            <SafeAreaView style={styles.container}>
                <Slot />
            </SafeAreaView>
            <Toast />
        </QueryClientProvider>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.light.background,
        alignItems: "center",
    },
});
export default TabsLayout;
