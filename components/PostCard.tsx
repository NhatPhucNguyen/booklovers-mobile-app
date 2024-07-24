import { likePost } from "@/apis/post";
import Avatars from "@/constants/Avatars";
import { Colors } from "@/constants/Colors";
import useAuthContext from "@/hooks/useAuthContext";
import { Review } from "@/interfaces/Book";
import { Discussion } from "@/interfaces/Group";
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
    groupName?: string;
    isJoined?: boolean;
    post: Discussion;
};
type ReviewPostType = {
    postType: "review";
    hideTitle?: boolean;
    title?: string;
    post: Review;
};
type PostCardProps = (GroupPostType | ReviewPostType) & {
    actions?: {
        onEdit?: () => void;
        onDelete?: () => void;
    };
    onFeed?: boolean;
};
const ICON_SIZE = 18;
const PostCard = (props: PostCardProps) => {
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
        props.post.likes?.find((item) => item.id === user?.id) ? true : false
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
                            <HeaderInfo
                                avatar={props.post.author.avatar}
                                authorName={props.post.author.name}
                                updatedAt={props.post.updatedAt}
                                rating={
                                    props.postType == "review"
                                        ? props.post.rating
                                        : undefined
                                }
                            />
                            {props.post.author.id == user?.id && (
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
            <Text>{props.post.content || "No content"}</Text>
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
type HeaderInfoProps = (
    | { onFeed: true; title: string }
    | { onFeed?: false }
) & { authorName: string; avatar?: string; updatedAt: Date; rating?: number };
function HeaderInfo(props: HeaderInfoProps) {
    return (
        <View style={styles.headerInfoContainer}>
            <Image
                source={Avatars[props.avatar || "default"]}
                style={styles.image}
            />
            <View>
                {props.onFeed ? (
                    <>
                        <Text style={styles.cardTitle}>{props.title}</Text>
                        <Text style={{ fontWeight: "500", fontSize: 12 }}>
                            {props.authorName}
                            {" - "}
                            <Text style={{ fontWeight: "300" }}>
                                {calculateTimeDiff(props.updatedAt)}
                            </Text>
                        </Text>
                    </>
                ) : (
                    <View
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                        }}
                    >
                        <Text style={{ fontWeight: "600", fontSize: 14 }}>
                            {props.authorName}
                            {" - "}
                            <Text style={{ fontWeight: "300" }}>
                                {calculateTimeDiff(props.updatedAt)}
                            </Text>
                        </Text>
                        {props.rating && (
                            <Rating
                                startingValue={props.rating}
                                readonly
                                imageSize={12}
                            />
                        )}
                    </View>
                )}
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.light.background,
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
    cardTitle: {
        fontSize: 16,
        fontWeight: "bold",
    },
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
    headerInfoContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
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
        width: 40,
        height: 40,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: Colors.light.primary,
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
export default PostCard;
