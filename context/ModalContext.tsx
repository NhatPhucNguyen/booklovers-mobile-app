import { AntDesign } from "@expo/vector-icons";
import { createContext, useCallback, useContext, useState } from "react";
import { Pressable, Modal as ReactModal } from "react-native";
import {
    SafeAreaView
} from "react-native-safe-area-context";
type ModalContextValue = {
    visible: boolean;
    openModal: () => void;
    closeModal: () => void;
};

export const ModalContext = createContext<ModalContextValue | null>(null);

const ModalContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [visible, setVisible] = useState(false);
    const openModal = useCallback(() => {
        setVisible(true);
    }, [visible]);
    const closeModal = useCallback(() => {
        setVisible(false);
    }, [visible]);
    return (
        <ModalContext.Provider value={{ visible, openModal, closeModal }}>
            {children}
        </ModalContext.Provider>
    );
};
export const useModalContext = () => {
    const context = useContext(ModalContext);
    if (!context) {
        throw new Error("useModalContext must be used within a ModalProvider");
    }
    return context;
};

ModalContextProvider.Modal = function Modal({
    children,
}: {
    children: React.ReactNode;
}) {
    const { visible, closeModal } = useModalContext();
    return (
        <ReactModal
            visible={visible}
            animationType="slide"
            presentationStyle="formSheet"
        >
            <SafeAreaView>
                <Pressable
                    style={{
                        position: "absolute",
                        right: 0,
                        top: 0,
                        zIndex: 10,
                        padding: 10,
                    }}
                    onPress={() => {
                        closeModal();
                    }}
                >
                    <AntDesign name="close" size={20} color="black" />
                </Pressable>
                {children}
            </SafeAreaView>
        </ReactModal>
    );
};
export default ModalContextProvider;
