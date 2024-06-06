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
import {
    Control,
    Controller,
    FieldError,
    FieldValues,
    Path,
} from "react-hook-form";
type AuthFormInputProps<Type extends FieldValues> = {
    icon?: "person" | "lock";
    error?: FieldError;
    control?: Control<Type>;
    name?: Path<Type>;
} & TextInputProps;
const AuthFormInput = <Type extends FieldValues>(
    props: AuthFormInputProps<Type>
) => {
    return (
        <View>
            <View style={styles.inputContainer} accessibilityLabel="controller">
                {!props.icon && (
                    <FontAwesomeIcon
                        icon={faKeyboard}
                        color="#009dff"
                        size={24}
                    />
                )}
                {props.icon == "person" && (
                    <FontAwesomeIcon icon={faUser} color="#009dff" size={24} />
                )}
                {props.icon == "lock" && (
                    <FontAwesomeIcon icon={faLock} color="#009dff" size={24} />
                )}
                {props.control ? (
                    <Controller
                        control={props.control}
                        render={({ field: { onChange, onBlur, value } }) => {
                            return (
                                <TextInput
                                    {...props}
                                    style={styles.input}
                                    onChangeText={onChange}
                                    onBlur={onBlur}
                                    value={value}
                                    accessibilityLabel={
                                        props.accessibilityLabel || "textInput"
                                    }
                                    placeholderTextColor={"#bdbdbd"}
                                />
                            );
                        }}
                        name={props.name as Path<Type>}
                    />
                ) : (
                    <TextInput
                        {...props}
                        style={styles.input}
                        accessibilityLabel={
                            props.accessibilityLabel || "textInput"
                        }
                        placeholderTextColor={"#585858"}
                    />
                )}
            </View>
            {props.error && (
                <Text style={styles.errorMessage} accessibilityLabel="error-message">{props.error.message}</Text>
            )}
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
    errorMessage: {
        color: "red",
        fontSize: 16,
        marginTop: 5,
    },
});
export default AuthFormInput;
