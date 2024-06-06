import { Colors } from "@/constants/Colors";
import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
const AuthLayout = () => {
    return (
        <>
            <StatusBar style="dark"/>
            <SafeAreaView style={styles.container}>
                <Slot />
            </SafeAreaView>
            <Toast />
        </>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.light.background,
        alignItems: "center",
        paddingLeft: 20,
        paddingRight: 20,
    },
});
export default AuthLayout;
