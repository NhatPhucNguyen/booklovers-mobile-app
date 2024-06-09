import { Colors } from "@/constants/Colors";
import { faComments, faHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
const ICON_SIZE = 18;
const BriefPostCard = () => {
    const [isPressLike, setPressLike] = React.useState(false);
    const handlePressLike = () => {
        setPressLike(!isPressLike);
    };
    return (
        <View style={styles.container}>
            <View style={styles.section} accessibilityLabel="card-header">
                <View style={styles.header}>
                    <View >
                        <Text style={styles.postType} accessibilityLabel="post-name">group/groupname</Text>
                    </View>

                    <Pressable style={styles.joinButton} accessibilityLabel="join-button">
                        <Text style={styles.joinText}>Join</Text>
                    </Pressable>
                </View>
            </View>
            <View style={styles.section} accessibilityLabel="card-body">
                <View style={styles.creatorContainer}>
                    <Image
                        source={require("../assets/images/unknown-person.png")}
                        style={styles.image}
                    />
                    <Text style={styles.name}>Creator name</Text>
                    <Text style={{ fontWeight: "300" }}>2 hours ago</Text>
                </View>
                <Text style={styles.title}>Title goes here</Text>
            </View>
            <Text style={styles.content}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Voluptatem, nemo...see more
            </Text>
            <View style={styles.interactionContainer} accessibilityLabel="card-footer">
                <Pressable style={styles.iconWrapper} onPress={handlePressLike} accessibilityLabel="like-button">
                    {isPressLike ? (
                        <FontAwesomeIcon
                            icon={faHeartSolid}
                            size={ICON_SIZE}
                            color={Colors.light.like}
                            testID="like-icon-pressed"
                        />
                    ) : (
                        <FontAwesomeIcon icon={faHeart} size={ICON_SIZE} testID="like-icon"/>
                    )}
                    <Text style={styles.iconText}>12</Text>
                </Pressable>
                <Pressable style={styles.iconWrapper} accessibilityLabel="comment-button">
                    <FontAwesomeIcon icon={faComments} size={ICON_SIZE} />
                    <Text style={styles.iconText}>12</Text>
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
        fontSize: 14,
        fontWeight: "bold",
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
