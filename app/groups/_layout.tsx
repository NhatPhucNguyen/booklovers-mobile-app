import { Colors } from "@/constants/Colors";
import ModalContextProvider from "@/context/ModalContext";
import { Slot } from "expo-router";
import React from "react";
import { View } from "react-native";
import Toast from "react-native-toast-message";
import { QueryClient, QueryClientProvider } from "react-query";
const client = new QueryClient();
const GroupLayout = () => {
    return (
        <QueryClientProvider client={client}>
            <ModalContextProvider>
                <View style={{backgroundColor:Colors.light.background}}>
                    <Slot />
                </View>
                <Toast />
            </ModalContextProvider>
        </QueryClientProvider>
    );
};

export default GroupLayout;
