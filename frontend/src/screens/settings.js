import React, { useState } from "react";
import { View, Text, StyleSheet, Switch, TouchableOpacity, Alert } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const SettingsScreen = ({ navigation }) => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [notificationsEnabled, setNotificationsEnabled] = useState(true);

    const handleToggleDarkMode = () => setIsDarkMode((prev) => !prev);
    const handleToggleNotifications = () => setNotificationsEnabled((prev) => !prev);
    const handleLogout = () => {
        Alert.alert("Logout", "Are you sure you want to log out?", [
            { text: "Cancel", style: "cancel" },
            { text: "Yes", onPress: () => navigation.navigate("Login") },
        ]);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Settings</Text>

            {/* Dark Mode */}
            <View style={styles.settingItem}>
                <View style={styles.settingLeft}>
                    <Ionicons name="moon-outline" size={24} color="#007BFF" />
                    <Text style={styles.settingText}>Dark Mode</Text>
                </View>
                <Switch
                    trackColor={{ false: "#ddd", true: "#007BFF" }}
                    thumbColor={isDarkMode ? "white" : "#f4f4f4"}
                    onValueChange={handleToggleDarkMode}
                    value={isDarkMode}
                />
            </View>

            {/* Notifications */}
            <View style={styles.settingItem}>
                <View style={styles.settingLeft}>
                    <Ionicons name="notifications-outline" size={24} color="#007BFF" />
                    <Text style={styles.settingText}>Enable Notifications</Text>
                </View>
                <Switch
                    trackColor={{ false: "#ddd", true: "#007BFF" }}
                    thumbColor={notificationsEnabled ? "white" : "#f4f4f4"}
                    onValueChange={handleToggleNotifications}
                    value={notificationsEnabled}
                />
            </View>

            {/* Account Settings */}
            <TouchableOpacity
                style={styles.settingItem}
                onPress={() => navigation.navigate("AccountSettings")}
            >
                <View style={styles.settingLeft}>
                    <Ionicons name="person-outline" size={24} color="#007BFF" />
                    <Text style={styles.settingText}>Account Settings</Text>
                </View>
                <Ionicons name="chevron-forward-outline" size={20} color="#777" />
            </TouchableOpacity>

            {/* Help & Support */}
            <TouchableOpacity
                style={styles.settingItem}
                onPress={() => navigation.navigate("HelpAndSupport")}
            >
                <View style={styles.settingLeft}>
                    <Ionicons name="help-circle-outline" size={24} color="#007BFF" />
                    <Text style={styles.settingText}>Help & Support</Text>
                </View>
                <Ionicons name="chevron-forward-outline" size={20} color="#777" />
            </TouchableOpacity>

            {/* Logout */}
            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#F9FAFB", // Light gray background
    },
    header: {
        fontSize: 26,
        fontWeight: "bold",
        marginBottom: 30,
        marginTop:40,
        color: "#007BFF", // Blue header color
    },
    settingItem: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 15,
        paddingHorizontal: 10,
        backgroundColor: "white",
        borderRadius: 10,
        marginBottom: 15,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2, // Adds shadow for Android
    },
    settingLeft: {
        flexDirection: "row",
        alignItems: "center",
    },
    settingText: {
        marginLeft: 10,
        fontSize: 16,
        fontWeight: "500",
        color: "#333", // Darker text for better contrast
    },
    logoutButton: {
        marginTop: 30,
        backgroundColor: "#007BFF", // Red for logout
        paddingVertical: 15,
        alignItems: "center",
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 3,
    },
    logoutText: {
        color: "white",
        fontWeight: "600",
        fontSize: 16,
    },
});

export default SettingsScreen;
