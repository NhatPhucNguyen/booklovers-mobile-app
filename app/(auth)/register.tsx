import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import FormController from "@/components/FormController";
import AuthFormInput from "@/components/AuthFormInput";
import Button from "@/components/Button";
import NavigationLink from "@/components/NavigationLink";

const Register = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Let's start here</Text>
            <View style={styles.formContainer}>
                <FormController label="Name">
                    <AuthFormInput
                        placeholder="Enter your name"
                        icon="person"
                        accessibilityLabel="name"
                    />
                </FormController>
                <FormController label="Email">
                    <AuthFormInput
                        placeholder="Enter your email"
                        icon="person"
                        accessibilityLabel="email"
                    />
                </FormController>
                <FormController label="Password">
                    <AuthFormInput
                        placeholder="Enter your password"
                        icon="lock"
                        accessibilityLabel="password"
                    />
                </FormController>
                <FormController label="Confirm Password">
                    <AuthFormInput
                        placeholder="Confirm your password"
                        icon="lock"
                        accessibilityLabel="confirmPassword"
                    />
                </FormController>
                <Button title="Sign Up" accessibilityRole="button" style={styles.signUpButton}/>
                <NavigationLink href={"/login"} style={styles.link}>
                    Already have an account?
                </NavigationLink>
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    text: {
        fontSize: 30,
        fontFamily: "Literata-Regular"
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
    signUpButton: {
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
