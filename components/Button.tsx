import React from "react";
import {
    StyleSheet,
    TouchableOpacity,
    TouchableOpacityProps,
    Text,
} from "react-native";
type ButtonProps = TouchableOpacityProps & {
    title?: string;
};
const Button = (props: ButtonProps) => {
    return (
        <TouchableOpacity
            {...props}
            style={[styles.defaultButton, props.style]}
        >
            {props.children ?? <Text style={styles.text}>{props.title}</Text>}
        </TouchableOpacity>
    );
};
const styles = StyleSheet.create({
    defaultButton: {
        backgroundColor: "#E1876C",
        padding: 10,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center",
    },
    text: {
        color: "#ffffff",
        fontSize: 20,
        textAlign: "center",
        fontWeight: "bold",
    },
});
export default Button;
