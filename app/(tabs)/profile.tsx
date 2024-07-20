import { logout } from "@/apis/auth";
import { User, getCurrentUser } from "@/apis/user";
import AvatarImage from "@/components/AvatarImage";
import LoadingScreen from "@/components/LoadingScreen";
import CommunityForm from "@/components/forms/CommunityForm";
import { Colors } from "@/constants/Colors";
import ModalContextProvider, { useModalContext } from "@/context/ModalContext";
import useAuthContext from "@/hooks/useAuthContext";
import { router } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useQuery } from "react-query";
const Profile = () => {
    const { setAuth } = useAuthContext();
    const { data: user, isLoading } = useQuery<User>({
        queryFn: getCurrentUser,
        queryKey: "currentUser",
    });
    const { openModal } = useModalContext();
    if (isLoading) {
        return <LoadingScreen />;
    }
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.section}>
                <AvatarImage center avatarName={user?.avatar} size="large" />
                <Text style={styles.name}>{user?.name}</Text>
                <Pressable
                    style={styles.button}
                    onPress={() => {
                        router.push({
                            pathname: "/(user)/[userId]",
                            params: { userId: user?.id },
                        });
                    }}
                >
                    <Text style={styles.buttonText}>View Profile</Text>
                </Pressable>
            </View>
            <View style={styles.section}>
                <Option title="Create Community" onPress={openModal} />
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
            <ModalContextProvider.Modal title="Create Community">
                <CommunityForm />
            </ModalContextProvider.Modal>
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
    container: {
        backgroundColor: Colors.light.background,
        flex: 1,
        paddingHorizontal: 20,
    },
    section: {
        paddingVertical: 20,
        borderBottomWidth: 2,
        borderBottomColor: Colors.light.placeHolder,
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
    name: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
        marginTop: 10,
    },
});
export default Profile;
