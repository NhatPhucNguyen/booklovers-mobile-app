import ModalContextProvider from "@/context/ModalContext";
import { Slot } from "expo-router";
import React from "react";

const UserLayout = () => {
    return (
        <ModalContextProvider>
            <Slot />
        </ModalContextProvider>
    );
};

export default UserLayout;
