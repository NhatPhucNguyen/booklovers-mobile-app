import {
    View,
    Text,
    TextInput,
    TextInputProps,
    StyleSheet,
} from "react-native";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faUser, faKeyboard } from "@fortawesome/free-regular-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";
type AuthFormInputProps = {
    icon?: "person" | "lock";
} & TextInputProps;
const AuthFormInput = (props: AuthFormInputProps) => {
    return (
        <View style={styles.inputContainer} accessibilityLabel="controller">
            {!props.icon && (
                <FontAwesomeIcon icon={faKeyboard} color="#009dff" size={24} />
            )}
            {props.icon == "person" && (
                <FontAwesomeIcon icon={faUser} color="#009dff" size={24} />
            )}
            {props.icon == "lock" && (
                <FontAwesomeIcon icon={faLock} color="#009dff" size={24} />
            )}
            <TextInput
                {...props}
                style={styles.input}
                accessibilityLabel={props.accessibilityLabel || "textInput"}
            />
        </View>
    );
};
const styles = StyleSheet.create({
    input: {
        width: "100%",
        paddingLeft: 10,
        fontSize: 18,
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        borderColor: "gray",
        padding: 10,
        borderBottomWidth: 2,
    },
});
export default AuthFormInput;
