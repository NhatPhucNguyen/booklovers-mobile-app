import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import FormController from "@/components/FormController";
import AuthFormInput from "@/components/AuthFormInput";

const Register = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Let's start here</Text>
            <View>
                <FormController label="Name">
                    <AuthFormInput
                        placeholder="Enter your name"
                        icon="person"
                    />
                </FormController>
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    text: {
        fontSize: 30,
        fontFamily: "Literata-Regular",
        marginBottom: 20,
    },
    container: {
        marginTop: "30%",
        maxWidth: "90%",
    },
    formContainer: {
        marginTop: 20,
    },
    subContainer: {
        justifyContent: "space-between",
        width: "100%",
        display: "flex",
        flexDirection: "row",
    },
    checkBoxContainer: {
        display: "flex",
        flexDirection: "row",
        gap: 10,
    },
    loginButton: {
        backgroundColor: Colors.light.primary,
        width: "80%",
        margin: "auto",
        marginTop: 25,
        borderRadius: 25,
    },
    link: {
        textAlign: "center",
        marginTop: 20,
    },
});
export default Register;
