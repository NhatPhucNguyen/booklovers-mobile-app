import Avatars from "@/constants/Avatars";
import { Colors } from "@/constants/Colors";
import React from "react";
import { ColorValue, Image } from "react-native";
type AvatarImageProps = {
    size?: "small" | "medium" | "large";
    sizeNumber?: number;
    avatarName?: string | keyof typeof Avatars;
    accessibilityLabel?: string;
    center?: boolean;
    noRadius?: boolean;
    border?: boolean;
    borderColor?: ColorValue;
};
const SIZE = {
    small: 50,
    medium: 70,
    large: 100,
};
const AvatarImage = ({
    size,
    sizeNumber,
    avatarName,
    accessibilityLabel,
    center,
    noRadius,
    border,
    borderColor,
}: AvatarImageProps) => {
    return (
        <Image
            source={
                avatarName
                    ? Avatars[avatarName] || Avatars.default
                    : Avatars.default
            }
            style={{
                borderRadius: noRadius ? 0 : sizeNumber ? sizeNumber / 2 : 50,
                width: sizeNumber || SIZE[size || "small"],
                height: sizeNumber || SIZE[size || "small"],
                margin: center ? "auto" : 0,
                borderWidth: border ? 2 : 0,
                borderColor: borderColor || Colors.light.primary,
            }}
            accessibilityLabel={accessibilityLabel || "image"}
        />
    );
};
export default AvatarImage;
