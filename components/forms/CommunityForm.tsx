import { View, Text, StyleSheet, ScrollView } from "react-native";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInputControl from "./FormInputControl";
import Button from "../Button";
import { useMutation } from "react-query";
import { createGroup } from "@/apis/group";
import Toast from "react-native-toast-message";
const CommunityFormSchema = z.object({
    name: z
        .string({
            message: "Name is required",
        })
        .min(3, { message: "Name must be at least 3 characters long." }),
    description: z.string().optional(),
});
type CommunityFormType = z.infer<typeof CommunityFormSchema>;
const CommunityForm = () => {
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<CommunityFormType>({
        resolver: zodResolver(CommunityFormSchema),
    });
    const {mutateAsync:createGroupMutate} = useMutation({
        mutationFn: createGroup,
        mutationKey: "createGroup",
        onError: (error: Error) => {
            Toast.show({
                type: "error",
                text1: error.message,
            });
        },
        onSuccess: () => {
            Toast.show({
                type: "success",
                text1: "Group created !",
            });
        },
    });
    return (
        <ScrollView style={styles.container}>
            <View style={{ paddingHorizontal: 10 }}>
                <FormInputControl
                    control={control}
                    name="name"
                    label="Name"
                    error={errors.name}
                />
                <FormInputControl
                    control={control}
                    name="description"
                    label="Description"
                    multiline
                    multiHeight={300}
                    error={errors.description}
                />
                {/* <FormInputControl
                    control={control}
                    name="image"
                    label="Image URL"
                    error={errors.image}
                /> */}
                <Button
                    title="Create"
                    onPress={handleSubmit(async (data) => {
                        await createGroupMutate(data);
                    })}
                />
            </View>
        </ScrollView>
    );
};
const styles = StyleSheet.create({
    container: {},
});
export default CommunityForm;
