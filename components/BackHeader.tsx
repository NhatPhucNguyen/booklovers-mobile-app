import { View, Text, Pressable } from "react-native";
import React from "react";
import { router } from "expo-router";
import { AntDesign } from "@expo/vector-icons";

const BackHeader = () => {
    return (
        <View style={{ paddingLeft: 5 }}>
            <Pressable
                onPress={() => {
                    router.back();
                }}
                style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 5,
                }}
            >
                <AntDesign name="arrowleft" size={24} color="black" />
                <Text style={{ fontWeight: "500" }}>Back</Text>
            </Pressable>
        </View>
    );
};

export default BackHeader;
