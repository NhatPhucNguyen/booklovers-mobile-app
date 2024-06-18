import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import BackHeader from "@/components/BackHeader";

const BookDetails = () => {
    return (
        <SafeAreaView>
            <BackHeader />
            <Text>BookDetails</Text>
        </SafeAreaView>
    );
};

export default BookDetails;
