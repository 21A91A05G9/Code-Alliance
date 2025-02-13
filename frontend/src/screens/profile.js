import React, { useState, useEffect } from "react";
import { 
    View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, TextInput, Modal, Alert
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import pic from "../images/profile.webp";

const ProfileScreen = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [userData, setUserData] = useState({
        _id: "",
        username: "",
        email: "",
        phone: "",
        location: "",
        profession: "",
    });
    
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userInfo = await AsyncStorage.getItem("userInfo");
                if (userInfo) {
                    const user = JSON.parse(userInfo);
                    
                    setUserData(user);
                    console.log(user);
                }
            } catch (error) {
                console.error("Error retrieving user data:", error);
            }
        };
    
        fetchUserData();
    }, []);

    const handleUpdateProfile = async () => {
        try {
            const response = await axios.put("http://localhost:5000/api/profile/update-profile", 
                userData
            );

            if (response.status === 200) {
                await AsyncStorage.setItem("userInfo", JSON.stringify(response.data.user));
                setModalVisible(false);
                Alert.alert("Success", "Profile updated successfully");
            }
        } catch (error) {
            console.error("Error updating profile:", error);
            Alert.alert("Error", "Failed to update profile. Please try again.");
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {/* Profile Header */}
            <View style={styles.header}>
                <Image source={pic} style={styles.profilePicture} />
                <Text style={styles.name}>{userData.username}</Text>
                <Text style={styles.email}>{userData.email}</Text>
                <TouchableOpacity style={styles.editButton} onPress={() => setModalVisible(true)}>
                    <Text style={styles.editButtonText}>Edit Profile</Text>
                </TouchableOpacity>
            </View>

            {/* Profile Details Section */}
            <View style={styles.detailsSection}>
                <Text style={styles.sectionTitle}>Personal Information</Text>
                <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Phone:</Text>
                    <Text style={styles.detailValue}>{userData.phone}</Text>
                </View>
                <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Location:</Text>
                    <Text style={styles.detailValue}>{userData.location}</Text>
                </View>
                <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Profession:</Text>
                    <Text style={styles.detailValue}>{userData.profession}</Text>
                </View>
            </View>

            {/* Edit Profile Modal */}
            <Modal visible={modalVisible} animationType="slide" transparent>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Edit Profile</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Username"
                            value={userData.username}
                            onChangeText={(text) => setUserData({ ...userData, username: text })}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Email"
                            value={userData.email}
                            onChangeText={(text) => setUserData({ ...userData, email: text })}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Phone"
                            value={userData.phone}
                            onChangeText={(text) => setUserData({ ...userData, phone: text })}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Location"
                            value={userData.location}
                            onChangeText={(text) => setUserData({ ...userData, location: text })}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Profession"
                            value={userData.profession}
                            onChangeText={(text) => setUserData({ ...userData, profession: text })}
                        />
                        <View style={styles.modalButtons}>
                            <TouchableOpacity style={styles.saveButton} onPress={handleUpdateProfile}>
                                <Text style={styles.buttonText}>Save</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
                                <Text style={styles.buttonText}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
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
    profilePicture: {
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
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
    },
    modalContent: {
        width: "85%",
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 12,
        elevation: 10,
        shadowColor: "black",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: "700",
        textAlign: "center",
        marginBottom: 15,
        color: "#34495E",
    },
    input: {
        width: "100%",
        height: 45,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 12,
        backgroundColor: "#F9F9F9",
    },
    modalButtons: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10,
    },
    saveButton: {
        flex: 1,
        paddingVertical: 10,
        backgroundColor: "rgb(26, 152, 254)",
        borderRadius: 8,
        alignItems: "center",
        marginRight: 5,
    },
    cancelButton: {
        flex: 1,
        paddingVertical: 10,
        backgroundColor: "rgb(255, 69, 58)",
        borderRadius: 8,
        alignItems: "center",
        marginLeft: 5,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: "600",
        color: "#fff",
    },
    
});

export default ProfileScreen;
