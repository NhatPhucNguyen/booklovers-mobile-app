import { Colors } from "@/constants/Colors";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import {
    Control,
    Controller,
    FieldError,
    FieldValues,
    Path,
    useForm,
} from "react-hook-form";
import {
    Image,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TextInputProps,
    View,
} from "react-native";
import { z } from "zod";
import FormController from "./FormController";
import Button from "./Button";
import { User } from "@/apis/user";
const DEFAULT_AVATAR = "unknown-person.png";
const EditUserSchema = z.object({
    name: z.string().min(1, {
        message: "Name is required",
    }),
    headline: z.optional(z.string()),
    about: z.optional(z.string()),
    avatar: z.optional(z.string()),
    location: z.optional(z.string()),
});
type EditUserForm = z.infer<typeof EditUserSchema>;
const EditUserForm = ({ user }: { user: User }) => {
    const {
        control,
        formState: { errors },
        handleSubmit,
    } = useForm<EditUserForm>({
        resolver: zodResolver(EditUserSchema),
        defaultValues: {
            name: user.name,
            headline: user.headline,
            about: user.about,
            location: user.location,
        },
    });
    const onSubmit = (data: EditUserForm) => {
        console.log(data);
    };
    return (
        <View>
            <Text style={styles.header}>Edit Profile</Text>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
                <ScrollView>
                    <Image
                        accessibilityLabel="image"
                        source={require(`@/assets/images/${DEFAULT_AVATAR}`)}
                        style={styles.image}
                    />
                    <View style={{ paddingBottom: 50, paddingHorizontal: 10 }}>
                        <EditUserForm.Controller
                            control={control}
                            label="Name"
                            name="name"
                            autoCapitalize="words"
                            maxLength={255}
                            accessibilityLabel="name"
                            error={errors.name}
                        />
                        <EditUserForm.Controller
                            control={control}
                            label="Headline"
                            name="headline"
                            autoCapitalize="words"
                            maxLength={255}
                            accessibilityLabel="headline"
                        />
                        <EditUserForm.Controller
                            control={control}
                            label="About"
                            name="about"
                            multiline
                            numberOfLines={4}
                            autoCapitalize="sentences"
                            maxLength={1000}
                            accessibilityLabel="about"
                        />
                        <EditUserForm.Controller
                            control={control}
                            label="Location"
                            name="location"
                            autoComplete="address-line1"
                            dataDetectorTypes="address"
                            accessibilityLabel="location"
                        />
                        <Button
                            title="Save"
                            style={{ width: 200, margin: "auto" }}
                            accessibilityRole="button"
                            onPress={handleSubmit(onSubmit)}
                        />
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
};
type ControllerProps<Type extends FieldValues> = {
    error?: FieldError;
    control: Control<Type>;
    name: Path<Type>;
    label: string;
} & TextInputProps;
EditUserForm.Controller = function <Type extends FieldValues>(
    props: ControllerProps<Type>
) {
    return (
        <Controller
            control={props.control}
            render={({ field: { onChange, value, onBlur } }) => {
                return (
                    <FormController label={props.label}>
                        <TextInput
                            {...props}
                            style={[
                                styles.input,
                                props.multiline && { height: 200 },
                            ]}
                            value={value}
                            onChangeText={onChange}
                            onBlur={onBlur}
                        />
                        {props.error && (
                            <Text style={styles.errorInput}>
                                {props.error.message}
                            </Text>
                        )}
                    </FormController>
                );
            }}
            name={props.name as Path<Type>}
        />
    );
};
const styles = StyleSheet.create({
    header: {
        textAlign: "center",
        fontSize: 16,
        fontWeight: "600",
        marginTop: 10,
    },
    image: {
        width: 100,
        height: 100,
        margin: "auto",
        marginTop: 20,
    },
    input: {
        width: "100%",
        paddingHorizontal: 10,
        paddingVertical: 5,
        fontSize: 18,
        backgroundColor: Colors.light.inputBackground,
        borderRadius: 10,
        textAlignVertical: "top",
    },
    errorInput: {
        color: "red",
        fontSize: 12,
        marginTop: 5,
    },
});
export default EditUserForm;
