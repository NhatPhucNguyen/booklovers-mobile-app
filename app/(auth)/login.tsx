import { login } from "@/apis/auth";
import AuthFormInput from "@/components/AuthFormInput";
import Button from "@/components/Button";
import FormController from "@/components/FormController";
import NavigationLink from "@/components/NavigationLink";
import { Colors } from "@/constants/Colors";
import useAuthContext from "@/hooks/useAuthContext";
import { getData, storeData } from "@/lib/storage";
import { zodResolver } from "@hookform/resolvers/zod";
import Checkbox from "expo-checkbox";
import { router } from "expo-router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { StyleSheet, Text, View } from "react-native";
import Toast from "react-native-toast-message";
import { z } from "zod";
const loginSchema = z.object({
    email: z.string({ message: "Please enter your email" }).email({
        message: "Please enter a valid email address",
    }),
    password: z
        .string({
            required_error: "Please enter your password",
        })
        .min(1, {
            message: "Please enter your password",
        }),
});
type LoginForm = z.infer<typeof loginSchema>;
const Login = () => {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginForm>({
        resolver: zodResolver(loginSchema),
    });
    const {setAuth} = useAuthContext();
    const onSubmit = async (data: LoginForm) => {
        const { accessToken, error } = await login(data.email, data.password);
        if (error) {
            Toast.show({ type: "error", text1: "Error", text2: error });
            return;
        }
        if (accessToken) {
            await storeData("token", accessToken);
            setAuth(true);
            router.replace("/home");
            return;
        }
        Toast.show({ type: "error", text1: "Error", text2: "Fail to login" });
    };
    const [isChecked, setChecked] = useState(false);
    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                Discover your favorite books with us!
            </Text>
            <View style={styles.formContainer}>
                <FormController label="Email">
                    <AuthFormInput
                        placeholder="Enter your email"
                        icon="person"
                        accessibilityLabel="email"
                        control={control}
                        name={"email"}
                        error={errors.email}
                    />
                </FormController>
                <FormController label="Password">
                    <AuthFormInput
                        placeholder="Enter your password"
                        icon="lock"
                        secureTextEntry={true}
                        accessibilityLabel="password"
                        control={control}
                        name={"password"}
                        error={errors.password}
                    />
                </FormController>
                <View style={styles.subContainer}>
                    <View style={styles.checkBoxContainer}>
                        <Checkbox
                            value={isChecked}
                            onValueChange={setChecked}
                            color={isChecked ? Colors.light.primary : undefined}
                            accessibilityLabel="checkbox"
                        />
                        <Text>Remember me</Text>
                    </View>
                    <Text>Forgot password?</Text>
                </View>
                <Button
                    title="Login"
                    style={styles.loginButton}
                    accessibilityRole="button"
                    onPress={handleSubmit(onSubmit)}
                />
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
