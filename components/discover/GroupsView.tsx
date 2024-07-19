import {
    View,
    Text,
    FlatList,
    ActivityIndicator,
    StyleSheet,
    Image,
    Pressable,
} from "react-native";
import React from "react";
import { useInfiniteQuery } from "react-query";
import { getGroups } from "@/apis/group";
import { Group } from "../../interfaces/Group";
import { textLimitConvert } from "@/utils/textLimitConvert";
import { Colors } from "@/constants/Colors";
import { router } from "expo-router";

const GroupsView = () => {
    const {
        data,
        isLoading,
        isError,
        hasNextPage,
        isFetchingNextPage,
        fetchNextPage,
    } = useInfiniteQuery({
        queryFn: ({ pageParam = 1 }) => {
            return getGroups({ startIndex: pageParam });
        },
        queryKey: ["groups"],
        getNextPageParam: (lastPage, allPages) => {
            return lastPage.length > 0 ? allPages.length + 1 : undefined;
        },
    });
    if (isLoading) {
        return <ActivityIndicator />;
    }
    if (isError || !data?.pages) {
        return <Text>No groups found</Text>;
    }
    return (
        <View style={styles.container}>
            <FlatList
                data={data?.pages.flat()}
                renderItem={({ item }) => {
                    return (
                        <GroupItem
                            key={item.id}
                            name={item.name}
                            numberOfMembers={item._count.members}
                            description={item.description}
                            groupId={item.id}
                        />
                    );
                }}
                numColumns={2}
                ListEmptyComponent={<Text>No groups found</Text>}
                keyExtractor={(item) => item.id}
                onEndReached={() => {
                    if (!isFetchingNextPage && hasNextPage) {
                        fetchNextPage();
                    }
                }}
                ListFooterComponent={() => {
                    return isFetchingNextPage ? <ActivityIndicator /> : null;
                }}
                ListHeaderComponent={
                    <Text style={styles.header}>Group you may know</Text>
                }
            />
        </View>
    );
};
type GroupItemProps = {
    name: string;
    numberOfMembers: number;
    description?: string;
    groupId: string;
};
const MAX_GROUP_NAME_LENGTH = 20;
const MAX_GROUP_DESCRIPTION_LENGTH = 50;
function GroupItem({
    name,
    numberOfMembers,
    description,
    groupId,
}: GroupItemProps) {
    return (
        <Pressable
            style={styles.groupItem}
            onPress={() => {
                router.push({
                    pathname: "/groups/[previewGroupId]",
                    params: {
                        previewGroupId: groupId,
                    },
                });
            }}
        >
            <Image
                source={require("@/assets/images/main-background.png")}
                style={styles.backgroundImage}
            />
            <Image
                source={require("@/assets/images/main-logo.png")}
                style={styles.groupLogo}
            />
            <View style={styles.groupInfo}>
                <Text style={styles.groupName}>
                    {textLimitConvert(name, MAX_GROUP_NAME_LENGTH)}
                </Text>
                <Text style={styles.numberOfMembers}>
                    {numberOfMembers} members
                </Text>
                <Text style={styles.description}>
                    {textLimitConvert(
                        description,
                        MAX_GROUP_DESCRIPTION_LENGTH
                    )}
                </Text>
            </View>
        </Pressable>
    );
}
const styles = StyleSheet.create({
    groupItem: {
        width: "46%",
        backgroundColor: Colors.light.background,
        marginHorizontal: "2%",
        marginVertical: 10,
        height: 250,
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
    container: {
        minHeight: "100%",
    },
    header: {
        fontSize: 20,
        fontWeight: "bold",
        marginVertical: 10,
        marginLeft: 10,
    },
    backgroundImage: {
        width: "100%",
        height: 100,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    groupLogo: {
        width: 50,
        height: 50,
        borderRadius: 25,
        position: "absolute",
        top: 70,
        left: "20%",
        marginLeft: -25,
        borderWidth: 2,
        borderColor: Colors.light.primary,
    },
    groupName: {
        fontSize: 15,
        textAlign: "left",
        fontWeight: "bold",
    },
    groupInfo: {
        marginLeft: 10,
        marginTop: 25,
    },
    numberOfMembers: {
        fontSize: 12,
        color: "#666",
    },
    description: {
        fontSize: 13,
        marginTop: 5,
    },
});
export default GroupsView;
