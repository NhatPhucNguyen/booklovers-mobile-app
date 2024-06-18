import { Slot } from "expo-router";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
const client = new QueryClient();
const BooksLayout = () => {
    return (
        <QueryClientProvider client={client}>
            <Slot />
        </QueryClientProvider>
    );
};

export default BooksLayout;
