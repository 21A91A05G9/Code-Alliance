import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Image,
    Modal,
    TextInput,
    Alert,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import leet from "../images/leet.png";
import geek from "../images/geek.png";
import chef from "../images/chef.jpeg";
import axios from "axios";

const HomeScreen = ({ navigation }) => {
    const [leetUsername, setLeetUsername] = useState("");
    const [gfgUsername, setGfgUsername] = useState("");
    const [chefUsername, setChefUsername] = useState("");
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [currentUsername, setCurrentUsername] = useState("");
    const [platformToEdit, setPlatformToEdit] = useState("");

    // Fetch saved usernames from AsyncStorage
    useEffect(() => {
        
        const fetchUsernames = async () => {
            try {
                const leet = await AsyncStorage.getItem("leetUsername");
                const gfg = await AsyncStorage.getItem("gfgUsername");
                const chef = await AsyncStorage.getItem("chefUsername");

                setLeetUsername(leet || ""); // Default to empty if not set
                setGfgUsername(gfg || "");
                setChefUsername(chef || "");
            } catch (error) {
                console.error("Error fetching usernames:", error);
            }
        };

        fetchUsernames();
    }, []);

    const openChatbot = () => {
        Alert.alert("Chatbot", "Chatbot button clicked!");
        navigation.navigate("chatBot");
    };

    const openEditModal = (platform) => {
        setPlatformToEdit(platform);
        setCurrentUsername(
            platform === "LeetCode"
                ? leetUsername
                : platform === "GeeksForGeeks"
                ? gfgUsername
                : chefUsername
        );
        setEditModalVisible(true);
    };

    const saveUsername = async () => {
        if (!currentUsername.trim()) {
            Alert.alert("Validation Error", "Username cannot be empty!");
            return;
        }
    
        try {
            const userInfo = await AsyncStorage.getItem("userInfo");
            const user = JSON.parse(userInfo);
            console.log(user)
            
            const response = await axios.post("http://localhost:5000/api/platform/validate-username", {
                username: currentUsername,
                platform: platformToEdit,
                userId: user._id,
            });
    
            console.log("Response:", response);
    
            if (response.data.validUser) {
                console.log("Success:", response.data);
                // Save the username in AsyncStorage
                if (platformToEdit === "LeetCode") {
                    await AsyncStorage.setItem("leetUsername", currentUsername);
                    setLeetUsername(currentUsername);
                } else if (platformToEdit === "GeeksForGeeks") {
                    await AsyncStorage.setItem("gfgUsername", currentUsername);
                    setGfgUsername(currentUsername);
                } else if (platformToEdit === "CodeChef") {
                    await AsyncStorage.setItem("chefUsername", currentUsername);
                    setChefUsername(currentUsername);
                }
    
                setEditModalVisible(false);
                Alert.alert("Success", `${platformToEdit} username updated successfully!`);
            } else {
                Alert.alert("Validation Error", response.data.error || "Invalid Username. Please try again.");
            }
        } catch (error) {
            console.error("Error saving username:", error);
            Alert.alert("Error", "Failed to validate username. Please try again later.");
        }
    };
    

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.featuresSection}>
                    <Text style={styles.featuresTitle}>View Profiles</Text>
                    <View style={styles.featureCards}>
                        {/* Platform Cards */}
                        {[{ name: "LeetCode", image: leet, username: leetUsername },
                          { name: "GeeksForGeeks", image: geek, username: gfgUsername },
                          { name: "CodeChef", image: chef, username: chefUsername }]
                            .map(({ name, image, username }) => (
                                <View style={styles.card} key={name}>
                                    <Image source={image} style={styles.cardImage} />
                                    <Text style={styles.cardText}>{name}</Text>
                                    <View style={styles.cardButtons}>
                                        <TouchableOpacity
                                            style={styles.cardButton}
                                            onPress={() => Alert.alert(`${name} Profile`, `Username: ${username || "Not Set"}`)}
                                        >
                                            <Text style={styles.cardButtonText}>View</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={[styles.cardButton, styles.secondaryButton]}
                                            onPress={() => openEditModal(name)}
                                        >
                                            <Text style={styles.cardButtonText}>Edit</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            ))}
                    </View>
                </View>
            </ScrollView>

            <TouchableOpacity style={styles.chatbotButton} onPress={openChatbot}>
                <Ionicons name="chatbubble-ellipses-outline" size={30} color="white" />
            </TouchableOpacity>

            {/* Modal for Editing Username */}
            <Modal
                visible={editModalVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setEditModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Edit {platformToEdit} Username</Text>
                        <TextInput
                            style={styles.modalInput}
                            value={currentUsername}
                            onChangeText={setCurrentUsername}
                            placeholder={`Enter your ${platformToEdit} username`}
                        />
                        <TouchableOpacity style={styles.saveButton} onPress={saveUsername}>
                            <Text style={styles.saveButtonText}>Save</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.cancelButton}
                            onPress={() => setEditModalVisible(false)}
                        >
                            <Text style={styles.cancelButtonText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 10,
        backgroundColor: "white",
    },
    featuresSection: {
        marginBottom: 40,
    },
    featuresTitle: {
        fontSize: 24,
        fontWeight: "600",
        marginBottom: 15,
        color: "rgb(73, 113, 116)",
    },
    featureCards: {
        flexDirection: "row",
        justifyContent: "space-between",
        flexWrap: "wrap",
        marginBottom: 30,
    },
    card: {
        alignItems: "center",
        backgroundColor: "rgb(255, 255, 255)",
        padding: 20,
        borderRadius: 12,
        elevation: 5,
        shadowColor: "black",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        width: "45%",
        marginBottom: 20,
    },
    cardImage: {
        width: 70,
        height: 70,
        marginBottom: 15,
        borderRadius: 10,
    },
    cardText: {
        fontSize: 14,
        fontWeight: "500",
        color: "rgb(73, 113, 116)",
        marginBottom: 10,
    },
    cardButtons: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
    },
    cardButton: {
        flex: 1,
        alignItems: "center",
        paddingVertical: 8,
        marginHorizontal: 5,
        backgroundColor: "rgb(26, 152, 254)",
        borderRadius: 8,
    },
    secondaryButton: {
        backgroundColor: "rgb(106, 137, 162)",
    },
    cardButtonText: {
        color: "#fff",
        fontWeight: "600",
        fontSize: 12,
    },
    chatbotButton: {
        position: "absolute",
        bottom: 20,
        right: 20,
        backgroundColor: "rgb(26, 152, 254)",
        borderRadius: 30,
        width: 60,
        height: 60,
        justifyContent: "center",
        alignItems: "center",
        elevation: 5,
    },
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
        backgroundColor: "white",
        padding: 20,
        borderRadius: 10,
        width: "80%",
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 15,
    },
    modalInput: {
        borderWidth: 1,
        borderColor: "rgb(73, 113, 116)",
        padding: 10,
        marginBottom: 20,
        fontSize: 16,
        borderRadius: 8,
    },
    saveButton: {
        backgroundColor: "rgb(26, 152, 254)",
        paddingVertical: 10,
        alignItems: "center",
        borderRadius: 8,
    },
    saveButtonText: {
        color: "white",
        fontWeight: "600",
    },
    cancelButton: {
        marginTop: 10,
        backgroundColor: "rgb(255, 100, 100)",
        paddingVertical: 10,
        alignItems: "center",
        borderRadius: 8,
    },
    cancelButtonText: {
        color: "white",
        fontWeight: "600",
    },
});

export default HomeScreen;
