import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from "react-native";
import pic from "../images/profile.webp";
const ProfileScreen = () => {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            {/* Profile Header */}
            <View style={styles.header}>
                <Image
                    source={pic}
                    style={styles.profileImage}
                />
                <Text style={styles.name}>Jane Doe</Text>
                <Text style={styles.email}>jane.doe@example.com</Text>
                <TouchableOpacity style={styles.editButton}>
                    <Text style={styles.editButtonText}>Edit Profile</Text>
                </TouchableOpacity>
            </View>

            {/* Profile Details Section */}
            <View style={styles.detailsSection}>
                <Text style={styles.sectionTitle}>Personal Information</Text>
                <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Phone:</Text>
                    <Text style={styles.detailValue}>+1 234 567 890</Text>
                </View>
                <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Location:</Text>
                    <Text style={styles.detailValue}>San Francisco, CA</Text>
                </View>
                <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Profession:</Text>
                    <Text style={styles.detailValue}>Software Engineer</Text>
                </View>
            </View>

            {/* Action Buttons */}
            <View style={styles.actionsSection}>
                <TouchableOpacity style={styles.actionButton}>
                    <Text style={styles.actionButtonText}>My Projects</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton}>
                    <Text style={styles.actionButtonText}>Achievements</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton}>
                    <Text style={styles.actionButtonText}>Skills</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: "rgb(255, 255, 255)",
    },
    header: {
        alignItems: "center",
        marginBottom: 30,
        marginTop: 50,
        padding: 20,
        backgroundColor: "rgb(255, 255, 255)", // Purple header background
        borderRadius: 12,
        elevation: 10,
        shadowColor: "black",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 15,
        borderWidth: 3,
        // padding: 20,
        borderColor: "rgb(26, 152, 254)",
    },
    name: {
        fontSize: 24,
        fontWeight: "700",
        color:"black",
    },
    email: {
        fontSize: 16,
        color:"grey",
        marginBottom: 10,
    },
    editButton: {
        paddingVertical: 8,
        paddingHorizontal: 20,
        backgroundColor: "rgb(26, 152, 254)", // Light blue for edit button
        borderRadius: 8,
    },
    editButtonText: {
        fontSize: 14,
        fontWeight: "600",
        color: "#fff",
    },
    detailsSection: {
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 12,
        marginBottom: 30,
        elevation: 10,
        shadowColor: "black",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "600",
        marginBottom: 15,
        color: "#34495E",
    },
    detailRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 10,
        
    },
    detailLabel: {
        fontSize: 14,
        fontWeight: "600",
        color: "#7F8C8D",
    },
    detailValue: {
        fontSize: 14,
        color: "#34495E",
    },
    actionsSection: {
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 12,
        elevation: 10,
        shadowColor: "black",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
    },
    actionButton: {
        paddingVertical: 15,
        marginBottom: 15,
        alignItems: "center",
        backgroundColor: "rgb(26, 152, 254)", 
        borderRadius: 8,
    },
    actionButtonText: {
        fontSize: 16,
        color: "#fff",
        fontWeight: "600",
    },
});

export default ProfileScreen;
