import Button from "@/components/Button";
import { useFonts } from "expo-font";
import { router } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useCallback } from "react";
import { Image, ImageBackground, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
SplashScreen.preventAutoHideAsync();
export default function Index() {
    const [fontsLoaded, fontError] = useFonts({
        "Literata-Regular": require("../assets/fonts/Literata-Regular.ttf"),
    });
    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded || fontError) {
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded, fontError]);

    if (!fontsLoaded && !fontError) {
        return null;
    }
    return (
        <SafeAreaView style={styles.container} onLayout={onLayoutRootView} accessibilityLabel="container">
            <ImageBackground
                source={require("../assets/images/main-background.png")}
                resizeMode="cover"
                style={styles.image}
                accessibilityLabel="backgroundImage"
            >
                <View style={styles.logoContainer}>
                    <Image
                        source={require("../assets/images/transparent-logo.png")}
                        style={styles.logo}
                        accessibilityLabel="logo"
                    />
                    <View style={styles.subContainer}>
                        <Text style={styles.text}>
                            The world of books at your fingertips. Join us now!
                        </Text>
                        <View style={styles.buttonContainer}>
                            <Button
                                title="Get Started"
                                style={styles.button}
                                onPress={() => {
                                    router.push("/login");
                                }}
                                accessibilityRole="button"
                            />
                        </View>
                    </View>
                </View>
            </ImageBackground>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    image: {
        flex: 1,
        width: "100%",
    },
    logoContainer: {
        backgroundColor: "#201f1fc0",
        height: "100%",
        flex: 1,
    },
    logo: {
        width: "100%",
        height: 200,
    },
    subContainer: {
        height: "100%",
        flex: 1,
        justifyContent: "center",
    },
    text: {
        color: "#ffffff",
        fontSize: 30,
        textAlign: "center",
        fontFamily: "Literata-Regular",
    },
    buttonContainer: {
        margin: 20,
        fontSize: 20,
        marginTop: 60,
    },
    button: {
        backgroundColor: "#79240a",
    },
});
