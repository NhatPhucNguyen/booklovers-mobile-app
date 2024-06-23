/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = "#0a7ea4";
const tintColorDark = "#fff";

export const Colors = {
    light: {
        text: "#11181C",
        background: "#fff",
        tint: tintColorLight,
        icon: "#687076",
        tabIconDefault: "#687076",
        tabIconSelected: tintColorLight,
        primary: "#0080FF",
        secondary: "#EDF6FF",
        like: "#ff4e4e",
        brown: "#8B4513",
        green: "#008000",
        lightBlue: "#D8E4F0",
        placeHolder: "#A9A9A9",
        inputBackground: "#c3e0dd",
        red: "#cb0505",
    },
    dark: {
        text: "#ECEDEE",
        background: "#151718",
        tint: tintColorDark,
        icon: "#9BA1A6",
        tabIconDefault: "#9BA1A6",
        tabIconSelected: tintColorDark,
    },
};
