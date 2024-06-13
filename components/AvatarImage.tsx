import Avatars from "@/constants/Avatars";
import React from "react";
import { Image } from "react-native";
type AvatarImageProps = {
    size?: "small" | "medium" | "large";
    sizeNumber?: number;
    avatarName?: string | keyof typeof Avatars;
    accessibilityLabel?: string;
    center?: boolean;
    noRadius?: boolean;
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
}: AvatarImageProps) => {
    return (
        <Image
            source={
                avatarName
                    ? Avatars[avatarName] || Avatars.default
                    : Avatars.default
            }
            style={{
                borderRadius: noRadius ? 0 : sizeNumber ? sizeNumber / 2 : 100,
                width: sizeNumber || SIZE[size || "small"],
                height: sizeNumber || SIZE[size || "small"],
                margin: center ? "auto" : 0,
            }}
            accessibilityLabel={accessibilityLabel || "image"}
        />
    );
};
export default AvatarImage;
