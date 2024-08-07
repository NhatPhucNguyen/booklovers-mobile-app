import { getGroups } from "@/apis/group";
import { User, getUserById } from "@/apis/user";
import AvatarImage from "@/components/AvatarImage";
import EditUserForm from "@/components/forms/EditUserForm";
import LoadingScreen from "@/components/LoadingScreen";
import { Colors } from "@/constants/Colors";
import ModalContextProvider, { useModalContext } from "@/context/ModalContext";
import { getData } from "@/lib/storage";
import { AntDesign, Entypo, EvilIcons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { hideAsync, preventAutoHideAsync } from "expo-splash-screen";
import { jwtDecode } from "jwt-decode";
import React, { useEffect } from "react";
import {
    ActivityIndicator,
    Image,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useQuery } from "react-query";

preventAutoHideAsync();
const UserDetail = () => {
    const { userId } = useLocalSearchParams();
    const [isCurrentUser, setCurrentUser] = React.useState(false);
    const { openModal } = useModalContext();
    const {
        data: user,
        isError,
        isLoading,
    } = useQuery<User>({
        queryFn: () => getUserById(userId as string),
        queryKey: [userId],
        onSuccess: async () => {
            await hideAsync();
        },
        onError: async () => {
            await hideAsync();
        },
    });
    const { data: joinedGroups, isLoading: isLoadingGroups } = useQuery({
        queryFn: () => getGroups({ join: true, userId: userId as string }),
        queryKey: ["groups", userId],
    });
    useEffect(() => {
        const verifyUser = async () => {
            const token = await getData("token");
            if (!token) {
                setCurrentUser(false);
                return;
            }
            const { id } = jwtDecode(token) as { id: string };
            if (id !== userId) {
                setCurrentUser(false);
                return;
            }
            setCurrentUser(true);
        };
        verifyUser();
    }, [userId]);
    if (isLoading) {
        return <LoadingScreen />;
    }
    if (!user || isError) {
        return (
            <SafeAreaView style={styles.container}>
                <Text>User not found</Text>
            </SafeAreaView>
        );
    }
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={styles.header}>
                    <View style={styles.innerHeader}>
                        <AvatarImage avatarName={user.avatar} size="medium" />
                        <View>
                            <Text style={{ fontWeight: "500", fontSize: 24 }}>
                                {user.name}
                            </Text>
                            <Text>
                                <Text style={{ fontWeight: "bold" }}>500+</Text>{" "}
                                connections
                            </Text>
                        </View>
                    </View>

                    {isCurrentUser && (
                        <View style={styles.innerHeader}>
                            <Pressable accessibilityLabel="edit">
                                <AntDesign
                                    name="edit"
                                    size={24}
                                    color="black"
                                    onPress={() => {
                                        openModal();
                                    }}
                                />
                            </Pressable>
                            <Pressable accessibilityLabel="actions">
                                <Entypo
                                    name="dots-three-vertical"
                                    size={24}
                                    color="black"
                                />
                            </Pressable>
                        </View>
                    )}
                </View>
                {user.headline && (
                    <Text style={styles.sectionHeader}>{user.headline}</Text>
                )}
                <Text>
                    {user.about ||
                        "This user has not written anything about themselves"}
                </Text>
                {user.location && (
                    <View style={styles.location}>
                        <EvilIcons name="location" size={24} color="black" />
                        <Text style={{ fontSize: 14 }}>{user.location}</Text>
                    </View>
                )}
                <Text style={styles.sectionHeader}>Groups Joined</Text>
                <View>
                    {isLoadingGroups && <ActivityIndicator />}
                    {joinedGroups ? (
                        <>
                            {joinedGroups.map((group) => {
                                return (
                                    <Pressable
                                        key={group.id}
                                        onPress={() => {
                                            router.push({
                                                pathname: "/(group)/[groupId]",
                                                params: {
                                                    groupId: group.id,
                                                },
                                            });
                                        }}
                                    >
                                        <GroupCard name={group.name} />
                                    </Pressable>
                                );
                            })}
                        </>
                    ) : (
                        <Text>No groups joined</Text>
                    )}
                </View>
                <Text style={styles.sectionHeader}>Activities</Text>
                <Text style={styles.sectionHeader}>Connections</Text>
            </ScrollView>
            <ModalContextProvider.Modal>
                <EditUserForm user={user} />
            </ModalContextProvider.Modal>
        </SafeAreaView>
    );
};
function GroupCard({ name }: { name: string }) {
    return (
        <View style={styles.groupCard}>
            <Image
                source={require("../../../assets/images/main-logo.png")}
                style={{ width: 50, height: 50, borderRadius: 50 }}
            />
            <Text style={{ fontWeight: "bold" }}>{name}</Text>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
        backgroundColor: Colors.light.background,
        minHeight: "100%",
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    header: {
        marginTop: 20,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
    },
    innerHeader: {
        display: "flex",
        flexDirection: "row",
        gap: 10,
    },
    sectionHeader: {
        fontSize: 20,
        marginVertical: 10,
        fontWeight: "500",
    },
    location: {
        display: "flex",
        flexDirection: "row",
        gap: 10,
        alignItems: "center",
        marginTop: 5,
    },
    groupCard: {
        display: "flex",
        flexDirection: "row",
        gap: 10,
        alignItems: "center",
        marginTop: 5,
    },
});
export default UserDetail;
