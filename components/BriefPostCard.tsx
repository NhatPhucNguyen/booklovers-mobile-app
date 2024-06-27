import { likePost } from "@/apis/post";
import Avatars from "@/constants/Avatars";
import { Colors } from "@/constants/Colors";
import useAuthContext from "@/hooks/useAuthContext";
import { Review } from "@/interfaces/Book";
import { calculateTimeDiff } from "@/utils/calculateTimeDiff";
import { AntDesign } from "@expo/vector-icons";
import { faComments, faHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Rating } from "react-native-ratings";
import { useMutation, useQueryClient } from "react-query";
type GroupPostType = {
    postType: "group";
    groupName: string;
    isJoined?: boolean;
};
type ReviewPostType = {
    postType: "review";
    hideTitle?: boolean;
    title?: string;
};
type BriefPostCardProps = (GroupPostType | ReviewPostType) & {
    post: Review;
    modified?: boolean;
    actions?: {
        onEdit?: () => void;
        onDelete?: () => void;
    };
};
const ICON_SIZE = 18;
const BriefPostCard = (props: BriefPostCardProps) => {
    const client = useQueryClient();
    const { user } = useAuthContext();
    const { mutateAsync: likePostMutate } = useMutation({
        mutationFn: likePost,
        mutationKey: "likePost",
        onSuccess: () => {
            client.invalidateQueries();
        },
    });
    const [isPressLike, setPressLike] = React.useState(
        props.post.likes?.find((item) => item.id === user?.id)
            ? true
            : false
    );
    const [count, setCount] = React.useState(props.post._count.likes || 0);
    const handlePressLike = async () => {
        setPressLike(!isPressLike);
        setCount(isPressLike ? count - 1 : count + 1);
        await likePostMutate(props.post.id);
    };
    return (
        <View style={styles.container}>
            <View style={styles.section} accessibilityLabel="card-header">
                <View style={styles.header}>
                    <View>
                        <View
                            style={styles.postType}
                            accessibilityLabel="post-name"
                        >
                            {props.postType == "group" ? (
                                <Text style={{ color: Colors.light.brown }}>
                                    {props.groupName}
                                </Text>
                            ) : (
                                <View>
                                    <Rating
                                        type="star"
                                        imageSize={18}
                                        startingValue={props.post.rating || 0}
                                        readonly
                                        tintColor={Colors.light.secondary}
                                    />
                                </View>
                            )}
                            {props.modified && (
                                <View style={styles.action}>
                                    <Pressable onPress={props.actions?.onEdit}>
                                        <AntDesign
                                            name="edit"
                                            size={18}
                                            color={Colors.light.primary}
                                        />
                                    </Pressable>
                                    <Pressable
                                        onPress={props.actions?.onDelete}
                                    >
                                        <AntDesign
                                            name="delete"
                                            size={18}
                                            color={Colors.light.red}
                                        />
                                    </Pressable>
                                </View>
                            )}
                        </View>
                    </View>

                    {props.postType == "group" && !props.isJoined && (
                        <Pressable
                            style={styles.joinButton}
                            accessibilityLabel="join-button"
                        >
                            <Text style={styles.joinText}>Join</Text>
                        </Pressable>
                    )}
                </View>
            </View>
            <View style={styles.section} accessibilityLabel="card-body">
                <View style={styles.creatorContainer}>
                    <Image
                        source={Avatars[props.post.author.avatar || "default"]}
                        style={styles.image}
                    />
                    <Text style={styles.name}>{props.post.author.name}</Text>
                    <Text style={{ fontWeight: "300" }}>
                        {calculateTimeDiff(props.post.updatedAt)}
                    </Text>
                </View>
                {props.postType === "review" && !props.hideTitle && (
                    <Text style={styles.title}>{props.title}</Text>
                )}
            </View>
            <Text style={styles.content}>
                {props.post.content || "No content"}
            </Text>
            <View
                style={styles.interactionContainer}
                accessibilityLabel="card-footer"
            >
                <Pressable
                    style={styles.iconWrapper}
                    onPress={handlePressLike}
                    accessibilityLabel="like-button"
                >
                    {isPressLike ? (
                        <FontAwesomeIcon
                            icon={faHeartSolid}
                            size={ICON_SIZE}
                            color={Colors.light.like}
                            testID="like-icon-pressed"
                        />
                    ) : (
                        <FontAwesomeIcon
                            icon={faHeart}
                            size={ICON_SIZE}
                            testID="like-icon"
                        />
                    )}
                    <Text style={styles.iconText}>{count}</Text>
                </Pressable>
                <Pressable
                    style={styles.iconWrapper}
                    accessibilityLabel="comment-button"
                >
                    <FontAwesomeIcon icon={faComments} size={ICON_SIZE} />
                    <Text style={styles.iconText}>N/A</Text>
                </Pressable>
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.light.secondary,
        elevation: 3,
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
    },
    postType: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        alignItems: "center",
    },
    action: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 15,
    },
    title: {
        fontSize: 16,
        fontWeight: "bold",
    },
    content: {},
    section: {
        width: "100%",
        borderBottomWidth: 2,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        paddingBottom: 5,
        borderBottomColor: Colors.light.primary,
        marginBottom: 10,
    },
    header: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        zIndex: 5,
    },
    joinButton: {
        backgroundColor: Colors.light.primary,
        width: 50,
        paddingVertical: 5,
        borderRadius: 5,
    },
    joinText: {
        color: Colors.light.background,
        textAlign: "center",
    },
    image: {
        width: 20,
        height: 20,
        borderRadius: 50,
    },
    creatorContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        marginBottom: 5,
    },
    name: {
        fontWeight: "bold",
        color: Colors.light.primary,
    },
    interactionContainer: {
        display: "flex",
        flexDirection: "row",
        marginTop: 10,
        gap: 20,
    },
    iconWrapper: {
        display: "flex",
        flexDirection: "row",
        gap: 5,
        alignItems: "center",
    },
    iconText: {
        fontWeight: "bold",
    },
});
export default BriefPostCard;
