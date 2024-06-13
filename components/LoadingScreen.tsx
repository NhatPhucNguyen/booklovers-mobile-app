import React from "react";
import { ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const LoadingScreen = () => {
    return (
        <SafeAreaView
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#ffffff",
            }}
        >
            <ActivityIndicator size="large" />
        </SafeAreaView>
    );
};

export default LoadingScreen;
