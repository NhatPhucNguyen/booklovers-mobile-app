import useAuthContext from "@/hooks/useAuthContext";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { Redirect, Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import Toast from "react-native-toast-message";
import { QueryClient, QueryClientProvider } from "react-query";
import { Text } from "react-native";
import { Colors } from "@/constants/Colors";
const client = new QueryClient();
const TabsLayout = () => {
    const { isAuthenticated } = useAuthContext();
    if (!isAuthenticated) {
        return <Redirect href="/home" />;
    }
    return (
        <QueryClientProvider client={client}>
            <StatusBar style="dark" />
            <Tabs
                screenOptions={{
                    tabBarShowLabel: false,
                    headerShown: false,
                    tabBarActiveTintColor: Colors.light.primary,
                }}
            >
                <Tabs.Screen name="home" />
                <Tabs.Screen name="myPosts" />
                <Tabs.Screen name="discover" />
                <Tabs.Screen name="notifications" />
                <Tabs.Screen
                    name="(chat)"
                    options={{
                        href: null,
                    }}
                />
                <Tabs.Screen
                    name="(user)"
                    options={{
                        href: null,
                    }}
                />
                <Tabs.Screen
                    name="profile"
                    options={{
                        tabBarIcon: ({ color }) => {
                            return (
                                <TabBarIcon
                                    icon={
                                        <AntDesign
                                            name="user"
                                            size={24}
                                            color={color}
                                        />
                                    }
                                    title="Profile"
                                    color={color}
                                />
                            );
                        },
                    }}
                />
            </Tabs>
            <Toast />
        </QueryClientProvider>
    );
};
type TabBarIconProps = {
    icon: React.ReactNode;
    title: string;
    color?: string;
};
function TabBarIcon(props: TabBarIconProps) {
    return (
        <>
            {props.icon}
            <Text
                style={{
                    fontSize: 12,
                    color: props.color,
                }}
            >
                {props.title}
            </Text>
        </>
    );
}
export default TabsLayout;
