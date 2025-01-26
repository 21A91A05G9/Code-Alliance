import React from "react";
import { View, Text, StyleSheet } from "react-native";

const NotificationsScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Notification Screen</Text>
            <Text>Customize your app preferences here.</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
    },
});

export default NotificationsScreen;
