import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import React from "react";
import { router, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useMutation, useQuery } from "react-query";
import { getGroupById, joinGroup } from "@/apis/group";
import LoadingScreen from "@/components/LoadingScreen";
import BackHeader from "@/components/BackHeader";
import { Colors } from "@/constants/Colors";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import Button from "@/components/Button";
import AvatarImage from "@/components/AvatarImage";
import Toast from "react-native-toast-message";

const PreviewGroup = () => {
    const { previewGroupId } = useLocalSearchParams<{
        previewGroupId: string;
    }>();
    const {
        data: group,
        isLoading,
        isError,
    } = useQuery({
        queryFn: () => getGroupById(previewGroupId!),
        queryKey: ["group", previewGroupId],
    });
    const { mutateAsync: joinGroupMutate, isLoading: isLoadingGroupJoin } =
        useMutation({
            mutationFn: joinGroup,
            mutationKey: ["joinGroup"],
            onError: (error: Error) => {
                Toast.show({
                    text1: error.message,
                    type: "error",
                });
            },
            onSuccess: () => {
                router.push({
                    pathname: "/",
                    params: {
                        groupId: previewGroupId,
                    },
                });
            },
        });
    if (isLoading) {
        return <LoadingScreen />;
    }
    if (isError || !group) {
        return (
            <SafeAreaView>
                <Text>No group found</Text>
            </SafeAreaView>
        );
    }
    return (
        <SafeAreaView
            style={{
                minHeight: "100%",
                backgroundColor: Colors.light.background,
            }}
        >
            <BackHeader />
            <ScrollView style={styles.container}>
                <View>
                    <Image
                        source={require("@/assets/images/main-background.png")}
                        style={styles.backgroundImage}
                    />
                    <View style={styles.groupLogoContainer}>
                        <Image
                            source={require("@/assets/images/main-logo.png")}
                            style={styles.logo}
                        />
                        <Text style={styles.groupName}>{group.name}</Text>
                    </View>
                </View>
                <View style={{ marginTop: 70 }}>
                    <View style={styles.groupStatsContainer}>
                        <View style={styles.groupStatsCard}>
                            <MaterialIcons
                                name="groups"
                                size={24}
                                color="black"
                                style={styles.groupStatsTitle}
                            />
                            <Text style={styles.groupStatsTitle}>
                                {group._count.members} members
                            </Text>
                        </View>
                        <View style={styles.groupStatsCard}>
                            <MaterialCommunityIcons
                                name="post"
                                size={24}
                                color="black"
                                style={styles.groupStatsTitle}
                            />
                            <Text style={styles.groupStatsTitle}>
                                {group._count.posts} posts
                            </Text>
                        </View>
                    </View>
                    <Text style={styles.sectionHeader}>About</Text>
                    <Text style={styles.description}>{group.description}</Text>
                    <Text style={styles.sectionHeader}>Create By</Text>
                    <View style={styles.creatorCard}>
                        <AvatarImage avatarName={group.creator.avatar} border />
                        <View>
                            <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                                {group.creator?.name}
                            </Text>
                            <Text>
                                {new Date(group.createdAt).toLocaleDateString(
                                    "en-US",
                                    {
                                        month: "long",
                                        year: "numeric",
                                    }
                                )}
                            </Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
            <Button
                title={isLoadingGroupJoin ? "Joining..." : "Join"}
                onPress={async () => {
                    await joinGroupMutate(previewGroupId!);
                }}
                style={styles.joinButton}
            />
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    backgroundImage: {
        width: "100%",
        height: 120,
    },
    groupLogoContainer: {
        position: "absolute",
        top: 80,
        display: "flex",
        width: "100%",
        alignItems: "center",
    },
    logo: {
        width: 80,
        height: 80,
        borderRadius: 40,
        borderColor: "white",
        borderWidth: 1,
    },
    groupName: {
        textAlign: "center",
        fontSize: 18,
        fontWeight: "600",
    },
    groupStatsContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 10,
        gap: 20,
    },
    groupStatsCard: {
        width: "40%",
        backgroundColor: "#e2e2e2",
        padding: 10,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 1.0,
        elevation: 1,
    },
    groupStatsTitle: {
        textAlign: "center",
    },
    sectionHeader: {
        fontSize: 20,
        fontWeight: "bold",
        marginTop: 20,
        marginBottom: 10,
    },
    description: {
        fontSize: 16,
    },
    joinButton: {
        backgroundColor: Colors.light.primary,
        padding: 10,
        borderRadius: 10,
        marginBottom: 10,
        marginHorizontal: 10,
    },
    creatorCard: {
        display: "flex",
        flexDirection: "row",
        marginTop: 10,
        gap: 10,
        alignContent: "center",
    },
});
export default PreviewGroup;
