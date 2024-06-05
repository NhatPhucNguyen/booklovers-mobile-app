import AuthFormInput from "@/components/AuthFormInput";
import Button from "@/components/Button";
import FormController from "@/components/FormController";
import NavigationLink from "@/components/NavigationLink";
import { Colors } from "@/constants/Colors";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { StyleSheet, Text, View } from "react-native";
import { z } from "zod";
const PASSWORD_REGEX = new RegExp(
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
);
const registerSchema = z
    .object({
        name: z
            .string({ message: "Please enter your name" })
            .min(3, { message: "Name must be at least 3 characters long" })
            .max(255, { message: "Name must be at most 255 characters long" }),
        email: z.string({ message: "Please enter your email" }).email({
            message: "Please enter a valid email address",
        }),
        password: z
            .string({ message: "Please enter your password" })
            .min(8, {
                message: "Password must be at least 8 characters long",
            })
            .regex(PASSWORD_REGEX, {
                message:
                    "Password must contain at least one uppercase letter, one lowercase letter, one special symbol and one number",
            }),
        confirmPassword: z.string({ message: "Please confirm your password" }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Confirm password must match password",
        path: ["confirmPassword"],
    });
type RegisterForm = z.infer<typeof registerSchema>;
const Register = () => {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterForm>({
        resolver: zodResolver(registerSchema),
    });
    const onSubmit = (data: RegisterForm) => console.log(data);
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Let's start here</Text>
            <View style={styles.formContainer}>
                <FormController label="Name">
                    <AuthFormInput
                        control={control}
                        placeholder="Enter your name"
                        icon="person"
                        accessibilityLabel="name"
                        error={errors.name}
                        name={"name"}
                    />
                </FormController>
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
                        accessibilityLabel="password"
                        control={control}
                        name={"password"}
                        error={errors.password}
                        secureTextEntry
                    />
                </FormController>
                <FormController label="Confirm Password">
                    <AuthFormInput
                        placeholder="Confirm your password"
                        icon="lock"
                        accessibilityLabel="confirmPassword"
                        control={control}
                        name={"confirmPassword"}
                        error={errors.confirmPassword}
                        secureTextEntry
                    />
                </FormController>
                <Button
                    title="Sign Up"
                    accessibilityRole="button"
                    style={styles.signUpButton}
                    onPress={handleSubmit(onSubmit)}
                />
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
