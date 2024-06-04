import AuthFormInput from "@/components/AuthFormInput";
import Button from "@/components/Button";
import FormController from "@/components/FormController";
import NavigationLink from "@/components/NavigationLink";
import { Colors } from "@/constants/Colors";
import Checkbox from "expo-checkbox";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
const Login = () => {
    const [isChecked, setChecked] = useState(false);
    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                Discover your favorite books with us!
            </Text>
            <View style={styles.formContainer}>
                <FormController label="Username">
                    <AuthFormInput
                        placeholder="Enter your username/email"
                        icon="person"
                    />
                </FormController>
                <FormController label="Password">
                    <AuthFormInput
                        placeholder="Enter your username/email"
                        icon="person"
                    />
                </FormController>
                <View style={styles.subContainer}>
                    <View style={styles.checkBoxContainer}>
                        <Checkbox
                            value={isChecked}
                            onValueChange={setChecked}
                            color={isChecked ? Colors.light.primary : undefined}
                        />
                        <Text>Remember me</Text>
                    </View>
                    <Text>Forgot password?</Text>
                </View>
                <Button title="Login" style={styles.loginButton} />
                <NavigationLink href={"/register"} style={styles.link}>
                    Create account
                </NavigationLink>
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    text: {
        fontSize: 30,
        fontFamily: "Literata-Regular",
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
export default Login;
