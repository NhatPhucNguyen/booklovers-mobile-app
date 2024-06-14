import {
    View,
    Text,
    StyleSheet,
    TextInput,
    useWindowDimensions,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { SceneMap, TabBar, TabView } from "react-native-tab-view";
import BooksView from "@/components/discover/BooksView";
const renderTabBar = (props: any) => (
    <TabBar
        {...props}
        indicatorStyle={{ backgroundColor: "black" }}
        style={{ backgroundColor: Colors.light.background }}
        renderLabel={({ route, focused, color }) => (
            <Text style={{ color: "black", margin: 8 }}>{route.title}</Text>
        )}
    />
);
const Discover = () => {
    const layout = useWindowDimensions();

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: "first", title: "Books" },
        { key: "second", title: "Connections" },
        { key: "third", title: "Groups" },
    ]);
    return (
        <SafeAreaView
            style={{ flex: 1, backgroundColor: Colors.light.background }}
        >
            <View style={styles.searchBar}>
                <AntDesign name="search1" size={24} color="black" />
                <TextInput
                    placeholder="Search"
                    placeholderTextColor={Colors.light.placeHolder}
                    accessibilityLabel="search"
                />
            </View>
            <TabView
                navigationState={{ index, routes }}
                renderScene={SceneMap({
                    first: BooksView,
                    second: Connections,
                    third: Groups,
                })}
                onIndexChange={setIndex}
                initialLayout={{ width: layout.width }}
                style={{ marginTop: 10 }}
                renderTabBar={renderTabBar}
                lazy
            />
        </SafeAreaView>
    );
};
function Connections() {
    console.log("Connections");
    return (
        <View>
            <Text>Connections</Text>
        </View>
    );
}
function Groups() {
    return (
        <View>
            <Text>Groups</Text>
        </View>
    );
}
const styles = StyleSheet.create({
    searchBar: {
        display: "flex",
        flexDirection: "row",
        paddingHorizontal: 10,
        paddingVertical: 5,
        gap: 10,
        marginTop: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 1.0,
        elevation: 1,
        width: "90%",
        margin: "auto",
        backgroundColor: "#e3e3e3",
    },
});
export default Discover;
