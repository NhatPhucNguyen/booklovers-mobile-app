import { Colors } from "@/constants/Colors";
import ModalContextProvider from "@/context/ModalContext";
import useAuthContext from "@/hooks/useAuthContext";
import { AntDesign } from "@expo/vector-icons";
import { Redirect, Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Text } from "react-native";
import Toast from "react-native-toast-message";
import { QueryClient, QueryClientProvider } from "react-query";
const client = new QueryClient();
const TabsLayout = () => {
    const { isAuthenticated } = useAuthContext();
    if (!isAuthenticated) {
        return <Redirect href="/home" />;
    }
    return (
        <ModalContextProvider>
            <QueryClientProvider client={client}>
                <StatusBar style="dark" />
                <Tabs
                    screenOptions={{
                        tabBarShowLabel: false,
                        headerShown: false,
                        tabBarActiveTintColor: Colors.light.primary,
                    }}
                >
                    <Tabs.Screen
                        name="home"
                        options={{
                            tabBarIcon: ({ color }) => {
                                return (
                                    <TabBarIcon
                                        icon={
                                            <AntDesign
                                                name="home"
                                                size={24}
                                                color={color}
                                            />
                                        }
                                        title="Home"
                                        color={color}
                                    />
                                );
                            },
                        }}
                    />
                    <Tabs.Screen name="myPosts" />
                    <Tabs.Screen
                        name="discover"
                        options={{
                            tabBarIcon: ({ color }) => {
                                return (
                                    <TabBarIcon
                                        icon={
                                            <AntDesign
                                                name="search1"
                                                size={24}
                                                color={color}
                                            />
                                        }
                                        title="Discover"
                                        color={color}
                                    />
                                );
                            },
                        }}
                    />
                    <Tabs.Screen name="notifications" />
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
                        name="(group)"
                        options={{
                            href: null,
                        }}
                    />
                </Tabs>
                <Toast />
            </QueryClientProvider>
        </ModalContextProvider>
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
