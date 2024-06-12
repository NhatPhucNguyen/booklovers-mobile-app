import { logout } from "@/apis/auth";
import { Colors } from "@/constants/Colors";
import useAuthContext from "@/hooks/useAuthContext";
import { router } from "expo-router";
import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
const Profile = () => {
    const { setAuth } = useAuthContext();
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.section}>
                <Image
                    accessibilityLabel="image"
                    source={require("../../assets/images/unknown-person.png")}
                    style={styles.image}
                />
                <Pressable
                    style={styles.button}
                    onPress={() => {
                        router.push({
                            pathname: "/[userId]",
                            params: { userId: "myId" },
                        });
                    }}
                >
                    <Text style={styles.buttonText}>View Profile</Text>
                </Pressable>
            </View>
            <View style={styles.section}>
                <Option title="Create Community" />
                <Option title="My Connections" />
            </View>
            <View style={[styles.section, { borderBottomWidth: 0 }]}>
                <Option title="Manage Account" />
                <Option title="Settings" />
                <Option title="Help" />
                <Option
                    title="Logout"
                    onPress={async () => {
                        await logout();
                        setAuth(false);
                        router.replace("/login");
                    }}
                />
            </View>
        </SafeAreaView>
    );
};
function Option({ title, onPress }: { title: string; onPress?: () => void }) {
    return (
        <Pressable onPress={onPress}>
            <Text style={styles.optionText}>{title}</Text>
        </Pressable>
    );
}
const styles = StyleSheet.create({
    container: { paddingHorizontal: 20, marginTop: 20 },
    section: {
        paddingVertical: 20,
        borderBottomWidth: 2,
        borderBottomColor: Colors.light.placeHolder,
    },
    image: {
        width: 100,
        height: 100,
        margin: "auto",
    },
    button: {
        margin: "auto",
        marginTop: 20,
        borderWidth: 2,
        paddingHorizontal: 20,
        borderColor: Colors.light.primary,
        borderRadius: 20,
        paddingVertical: 1,
    },
    buttonText: {
        color: Colors.light.primary,
        fontSize: 16,
        textAlign: "center",
        fontWeight: "bold",
    },
    optionText: {
        fontSize: 18,
        marginBottom: 10,
        fontWeight: "bold",
    },
});
export default Profile;
