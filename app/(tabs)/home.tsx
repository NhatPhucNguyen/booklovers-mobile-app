import { View, Text } from "react-native";
import React from "react";
import Button from "@/components/Button";
import { logout } from "@/apis/auth";
import { router } from "expo-router";
import useAuthContext from "@/hooks/useAuthContext";
import { removeData } from "@/lib/storage";

const Home = () => {
    const { setAuth } = useAuthContext();
    return (
        <View>
            <Text>Home</Text>
            <Button
                title="Logout"
                onPress={async () => {
                    await logout();
                    await removeData("token");
                    setAuth(false);
                    router.replace("/login");
                }}
            />
        </View>
    );
};

export default Home;
