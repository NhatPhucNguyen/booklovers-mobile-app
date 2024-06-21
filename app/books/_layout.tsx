import ModalContextProvider from "@/context/ModalContext";
import { Slot } from "expo-router";
import React from "react";
import Toast from "react-native-toast-message";
import { QueryClient, QueryClientProvider } from "react-query";
const client = new QueryClient();
const BooksLayout = () => {
    return (
        <QueryClientProvider client={client}>
            <ModalContextProvider>
                <Slot />
                <Toast />
            </ModalContextProvider>
        </QueryClientProvider>
    );
};

export default BooksLayout;
