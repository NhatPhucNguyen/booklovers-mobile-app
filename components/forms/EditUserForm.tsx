import { User, updateUser } from "@/apis/user";
import { Colors } from "@/constants/Colors";
import { useModalContext } from "@/context/ModalContext";
import { Feather } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { router, useLocalSearchParams } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import {
    Control,
    Controller,
    FieldError,
    FieldValues,
    Path,
    useForm,
} from "react-hook-form";
import {
    FlatList,
    Image,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TextInputProps,
    View,
} from "react-native";
import Animated, {
    Easing,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from "react-native-reanimated";
import { useMutation, useQueryClient } from "react-query";
import { z } from "zod";
import AvatarImage from "../AvatarImage";
import Button from "../Button";
import FormController from "./FormController";
import Avatars from "@/constants/Avatars";
import Toast from "react-native-toast-message";
const EditUserSchema = z.object({
    name: z
        .string()
        .min(1, {
            message: "Name is required",
        })
        .trim(),
    headline: z.optional(z.string().trim()),
    about: z.optional(z.string().trim()),
    avatar: z.optional(z.string().trim()),
    location: z.optional(z.string().trim()),
});
export type EditUserData = z.infer<typeof EditUserSchema>;
const EditUserForm = ({ user }: { user: User }) => {
    const { userId } = useLocalSearchParams();
    const client = useQueryClient();
    const { closeModal } = useModalContext();
    const [showImagePicker, setShowImagePicker] = useState(false);
    const {
        control,
        formState: { errors },
        handleSubmit,
        setValue,
        watch,
    } = useForm<EditUserData>({
        resolver: zodResolver(EditUserSchema),
        defaultValues: {
            name: user.name,
            headline: user.headline,
            about: user.about,
            location: user.location,
        },
    });
    const { mutateAsync: updateUserMutate } = useMutation({
        mutationFn: (user: EditUserData) => updateUser(user),
        mutationKey: ["updateUser"],
        onSuccess: () => {
            client.invalidateQueries("currentUser");
            client.invalidateQueries(userId);
            router.navigate({
                pathname: "/[userId]",
                params: { userId },
            });
        },
    });
    const onSubmit = async (data: EditUserData) => {
        await updateUserMutate(data);
        Toast.show({ type: "success", text1: "Profile updated!" });
        closeModal();
    };
    const setAvatar = (avatar: string) => {
        setValue("avatar", avatar);
    };
    return (
        <View>
            <Text style={styles.header}>Edit Profile</Text>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
                <ScrollView>
                    <View
                        style={{
                            width: 100,
                            margin: "auto",
                            marginTop: 20,
                        }}
                    >
                        <AvatarImage
                            avatarName={watch("avatar") || user.avatar}
                            center
                            sizeNumber={100}
                        />
                        <Pressable
                            style={styles.changeImgButton}
                            onPress={() => {
                                setShowImagePicker(true);
                            }}
                        >
                            <Feather name="edit-3" size={24} color="white" />
                        </Pressable>
                    </View>
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
            {showImagePicker && (
                <EditUserForm.ImageSelectView
                    close={() => {
                        setShowImagePicker(false);
                    }}
                    setAvatar={setAvatar}
                />
            )}
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
EditUserForm.ImageSelectView = function ({
    close,
    setAvatar,
}: {
    close: () => void;
    setAvatar: (avatar: string) => void;
}) {
    const opacity = useSharedValue(0);
    const config = {
        duration: 500,
        easing: Easing.bezier(0.5, 0.01, 0, 1),
    };

    const style = useAnimatedStyle(() => {
        return {
            opacity: withTiming(opacity.value, config),
        };
    });

    const renderAvatar = useCallback(({ item }: { item: string }) => {
        return (
            <Pressable
                style={{
                    margin: 5,
                }}
                onPress={() => {
                    setAvatar(item);
                    close();
                }}
            >
                <AvatarImage avatarName={item} center sizeNumber={150} />
            </Pressable>
        );
    }, []);
    useEffect(() => {
        opacity.value = 1;
    }, []);
    return (
        <Animated.View style={[styles.changeImageView, style]}>
            <View>
                <FlatList
                    data={Object.keys(Avatars)}
                    renderItem={renderAvatar}
                    keyExtractor={(item) => item}
                    numColumns={2} // Adjust the number of columns here
                    contentContainerStyle={styles.imageList}
                    style={{ width: "100%", marginTop: 20 }}
                />
            </View>
            <Button
                title="Close"
                onPress={close}
                style={{ width: 200, margin: "auto" }}
            />
        </Animated.View>
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
        borderRadius: 50,
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
    changeImgButton: {
        position: "absolute",
        bottom: 0,
        left: 0,
        backgroundColor: "#00BBA5",
        borderRadius: 50,
        padding: 1,
    },
    changeImageView: {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        backgroundColor: "#c0fff8",
        zIndex: 20,
        height: "100%",
    },
    imageList: {
        alignItems: "flex-start",
        margin: "auto",
    },
});
export default EditUserForm;
