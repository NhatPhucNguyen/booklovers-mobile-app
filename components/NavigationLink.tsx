import { Link } from "expo-router";
import { LinkProps } from "expo-router/build/link/Link";
import React from "react";
import { StyleSheet } from "react-native";
const NavigationLink = (props: LinkProps) => {
    return (
        <Link {...props} style={[styles.link, props.style]}>
            {props.children}
        </Link>
    );
};
const styles = StyleSheet.create({
    link: {
        color: "#009dff",
        fontSize: 16,
    },
});
export default NavigationLink;
