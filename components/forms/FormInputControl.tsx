/**
 * A custom input control component that should be used with react-hook-form.
 *
 * @template Type - The type of the form values.
 *
 * @param {ControllerProps<Type>} props - The props for the FormInputControl component.
 * @param {FieldError} props.error - The error object for the input control.
 * @param {Control<Type>} props.control - The control object from react-hook-form.
 * @param {Path<Type>} props.name - The name of the input control.
 * @param {string} props.label - The label for the input control.
 * @param {TextInputProps} props - The additional props for the TextInput component.
 *
 * @returns {JSX.Element} The rendered FormInputControl component.
 */
import { Colors } from "@/constants/Colors";
import React from "react";
import {
  Control,
  Controller,
  FieldError,
  FieldValues,
  Path,
} from "react-hook-form";
import { StyleSheet, Text, TextInput, TextInputProps } from "react-native";
import FormController from "./FormController";
type ControllerProps<Type extends FieldValues> = {
    error?: FieldError;
    control: Control<Type>;
    name: Path<Type>;
    label: string;
} & TextInputProps;

const FormInputControl = <Type extends FieldValues>(
    props: ControllerProps<Type>
) => {
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
export default FormInputControl;
