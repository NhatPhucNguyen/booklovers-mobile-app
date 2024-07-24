import ModalContextProvider from "@/context/ModalContext";
import { Slot } from "expo-router";
import React from "react";

const GroupLayout = () => {
    return (
        <ModalContextProvider>
            <Slot />
        </ModalContextProvider>
    );
};

export default GroupLayout;
