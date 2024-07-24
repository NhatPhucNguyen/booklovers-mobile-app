import { getGroupById } from "@/apis/group";
import { getDiscussionsByGroupId } from "@/apis/post";
import { getCurrentUser } from "@/apis/user";
import AvatarImage from "@/components/AvatarImage";
import BackHeader from "@/components/BackHeader";
import LoadingScreen from "@/components/LoadingScreen";
import PostCard from "@/components/PostCard";
import ModalContextProvider, { useModalContext } from "@/context/ModalContext";
import { MaterialIcons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import {
    FlatList,
    Image,
    Pressable,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useInfiniteQuery, useQuery } from "react-query";

const GroupDiscussionView = () => {
    const { groupId } = useLocalSearchParams<{ groupId: string }>();
    const { openModal, visible } = useModalContext();
    const {
        data: group,
        isLoading,
        isError,
    } = useQuery({
        queryFn: () => getGroupById(groupId!),
        queryKey: groupId!,
    });
    const { data: user, isLoading: isLoadingUser } = useQuery({
        queryFn: getCurrentUser,
        queryKey: "currentUser",
    });
    const {
        data: posts,
        isLoading: isLoadingPosts,
        isError: isErrorPosts,
        hasNextPage,
        isFetchingNextPage,
        fetchNextPage,
    } = useInfiniteQuery({
        queryFn: ({ pageParam = 1 }) => {
            return getDiscussionsByGroupId(groupId!);
        },
        queryKey: ["discussions", groupId!],
        getNextPageParam: (lastPage, allPages) => {
            return lastPage.length > 0 ? allPages.length + 1 : undefined;
        },
    });
    if (isLoading || isLoadingUser) {
        return <LoadingScreen />;
    }
    if (!group || isError) {
        return (
            <SafeAreaView>
                <BackHeader />
                <Text>Group not found</Text>
            </SafeAreaView>
        );
    }
    return (
        <SafeAreaView>
            <FlatList
                ListHeaderComponent={
                    <View style={{ marginBottom: 10 }}>
                        <Image
                            source={require("../../../assets/images/main-background.png")}
                            style={styles.groupBackground}
                        />
                        <View style={styles.container}>
                            <Text style={styles.groupName}>{group.name}</Text>
                            <View style={styles.groupMember}>
                                <MaterialIcons
                                    name="groups"
                                    size={20}
                                    color="black"
                                />
                                <Text>
                                    <Text style={{ fontWeight: "bold" }}>
                                        {group._count.members}
                                    </Text>{" "}
                                    Members
                                </Text>
                            </View>
                        </View>
                        <View style={styles.discussTrigger}>
                            <AvatarImage border avatarName={user?.avatar} />
                            <Pressable
                                onPress={() => {
                                    openModal();
                                }}
                            >
                                <Text>Have something to share ...</Text>
                            </Pressable>
                        </View>
                    </View>
                }
                data={posts?.pages.flat()}
                renderItem={({ item }) => {
                    return (
                        <View style={{ padding: 5 }}>
                            <PostCard
                                postType="group"
                                key={item.id}
                                post={item}
                                isJoined
                            />
                        </View>
                    );
                }}
                ListEmptyComponent={
                    <Text
                        style={{
                            textAlign: "center",
                            fontSize: 20,
                        }}
                    >
                        Group do not have any discussions
                    </Text>
                }
                numColumns={1}
                style={{ minHeight: "100%" }}
            />
            <ModalContextProvider.Modal title="Create Discussion">
                <Text>Discussion Form</Text>
            </ModalContextProvider.Modal>
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    groupBackground: {
        width: "100%",
        height: 150,
    },
    container: {
        padding: 10,
    },
    groupName: {
        fontSize: 20,
        fontWeight: "bold",
    },
    groupMember: {
        flexDirection: "row",
        display: "flex",
        gap: 10,
        alignItems: "center",
        marginTop: 5,
    },
    discussTrigger: {
        flexDirection: "row",
        display: "flex",
        gap: 10,
        alignItems: "center",
        backgroundColor: "#f5f5f5",
        borderRadius: 10,
        paddingHorizontal: 10,
    },
});
export default GroupDiscussionView;
