import BriefPostCard from "@/components/BriefPostCard";
import { AntDesign, Entypo, EvilIcons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import {
    Image,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const UserDetail = () => {
    const { userId } = useLocalSearchParams();
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={styles.header}>
                    <View style={styles.innerHeader}>
                        <Image
                            source={require("@/assets/images/unknown-person.png")}
                            style={styles.image}
                        />
                        <View>
                            <Text style={{ fontWeight: "500", fontSize: 24 }}>
                                User name
                            </Text>
                            <Text>
                                <Text style={{ fontWeight: "bold" }}>500+</Text>{" "}
                                connections
                            </Text>
                        </View>
                    </View>

                    <View style={styles.innerHeader}>
                        <Pressable accessibilityLabel="edit">
                            <AntDesign name="edit" size={24} color="black" />
                        </Pressable>
                        <Pressable accessibilityLabel="actions">
                            <Entypo
                                name="dots-three-vertical"
                                size={24}
                                color="black"
                            />
                        </Pressable>
                    </View>
                </View>
                <Text style={styles.sectionHeader}>Headline</Text>
                <Text>
                    In the vast expanse of nodes and edges, a random graph
                    unfolds—a tapestry of connections and relationships. Nodes,
                    representing entities, scatter unpredictably, while edges
                    weave pathways of communication and influence. Some nodes
                    stand solitary, others coalesce into clusters, forming
                    communities. Within this labyrinth, patterns emerge and
                    dissolve, a dynamic interplay of chaos and order. Amidst the
                    apparent randomness, underlying structures await discovery,
                    hinting at the interconnectedness of the world. The random
                    graph embodies the intricate dance of probability, revealing
                    the beauty and complexity of relationships in a networked
                    universe.
                </Text>
                <View style={styles.location}>
                    <EvilIcons name="location" size={24} color="black" />
                    <Text style={{ fontSize: 14 }}>Location, City</Text>
                </View>
                <Text style={styles.sectionHeader}>Groups Joined</Text>
                <View>
                    <GroupCard />
                    <GroupCard />
                    <GroupCard />
                    <GroupCard />
                    <GroupCard />
                </View>
                <Text style={styles.sectionHeader}>Activities</Text>
                <BriefPostCard postType="review" bookTitle="Book Title"/>
                <Text style={styles.sectionHeader}>Connections</Text>
            </ScrollView>
        </SafeAreaView>
    );
};
function GroupCard() {
    return (
        <View style={styles.groupCard}>
            <Image
                source={require("../../../assets/images/react-logo.png")}
                style={{ width: 50, height: 50, borderRadius: 50 }}
            />
            <Text style={{fontWeight:"bold"}}>Group name</Text>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
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
