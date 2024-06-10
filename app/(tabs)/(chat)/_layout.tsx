import { Colors } from "@/constants/Colors";
import { Slot } from "expo-router";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const ChatLayout = () => {
    return (
        <SafeAreaView
            style={{ backgroundColor: Colors.light.secondary, flex: 1 }}
        >
            <Slot />
        </SafeAreaView>
    );
};

export default ChatLayout;
