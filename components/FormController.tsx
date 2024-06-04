import { View, Text, StyleSheet, TextInput } from "react-native";
import React from "react";

const FormController = ({
    children,
    label,
}: {
    children: React.ReactNode;
    label?: string;
}) => {
    return (
        <View style={styles.container}>
            {label && <Text style={styles.label}>{label}</Text>}
            {children}
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        width: "100%",
        marginBottom: 20,
    },
    label: {
        fontSize: 18,
        fontWeight: "bold"
    },
});
export default FormController;
