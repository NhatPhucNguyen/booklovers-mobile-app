import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Slot } from "expo-router";
import { Colors } from "@/constants/Colors";

const AuthLayout = () => {
    return (
        <SafeAreaView style={styles.container}>
            <Slot />
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.light.background,
        alignItems: "center",
        paddingLeft: 20,
        paddingRight: 20
    },
});
export default AuthLayout;
