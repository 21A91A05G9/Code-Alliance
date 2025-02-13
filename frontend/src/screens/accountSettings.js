import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
  Modal,
  TextInput,
  Button,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { launchImageLibrary } from "react-native-image-picker";
import axios from "axios";

const AccountSettingsScreen = ({ navigation }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [userData, setUserData] = useState({
    _id: "",
    username: "",
    email: "",
    password: "********",
  });
  const [profilePicture, setProfilePicture] = useState("https://via.placeholder.com/150");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userInfo = await AsyncStorage.getItem("userInfo");
        if (userInfo) {
          const user = JSON.parse(userInfo);
          setUserData(user);
        }
      } catch (error) {
        console.error("Error retrieving user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleOpenModal = (title, currentValue) => {
    setModalTitle(title);
    setInputValue(currentValue);
    setIsModalVisible(true);
  };

  const handleSaveInput = async () => {
    try {
      const endpoint =
        modalTitle === "Username"
          ? "/account/username"
          : modalTitle === "Email"
          ? "/account/email"
          : "/account/password";
  
      const body = { userId: userData._id, [`new${modalTitle}`]: inputValue };
  
      const response = await axios.put(`http://localhost:5000/api${endpoint}`, body);
  
      if (response.status === 200) {
        Alert.alert("Success", `${modalTitle} updated successfully.`);
  
        const updatedUserData = {
          ...userData,
          [modalTitle.toLowerCase()]: modalTitle === "Password" ? "********" : inputValue,
        };
  
        // Update state
        setUserData(updatedUserData);
  
        // Store updated data in AsyncStorage
        await AsyncStorage.setItem("userInfo", JSON.stringify(updatedUserData));
      } else {
        Alert.alert("Error", response.data.message);
      }
    } catch (error) {
      console.error("Error updating user info:", error);
      Alert.alert("Error", "Something went wrong.");
    }
    setIsModalVisible(false);
  };
  
  const handleChangePicture = async () => {
    try {
      const result = await launchImageLibrary({
        mediaType: "photo",
        quality: 1,
        includeBase64: false,
      });

      if (!result.didCancel && result.assets && result.assets.length > 0) {
        const imageUri = result.assets[0].uri;
        console.log("Selected Image URI:", imageUri);

        const fileType = result.assets[0].type || "image/jpeg";

        const formData = new FormData();
        formData.append("profilePicture", {
          uri: imageUri,
          type: fileType,
          name: "profile.jpg",
        });
        formData.append("userId", userData._id);

        const response = await axios.put(
          "http://localhost:5000/api/account/profile-picture",
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );

        if (response.status === 200) {
          Alert.alert("Success", "Profile picture updated successfully.");
          setProfilePicture(response.data.profilePicture);
        } else {
          Alert.alert("Error", response.data.message || "Failed to update profile picture.");
        }
      }
    } catch (error) {
      console.error("Error updating profile picture:", error);
      Alert.alert("Error", "Failed to change profile picture.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Account Settings</Text>

      {/* Profile Picture */}
      <View style={styles.profileSection}>
        <Image source={{ uri: profilePicture }} style={styles.profileImage} />
        <TouchableOpacity style={styles.editPictureButton} onPress={handleChangePicture}>
          <Text style={styles.editPictureButtonText}>Change Picture</Text>
        </TouchableOpacity>
      </View>

      {/* Username */}
      <View style={styles.settingItem}>
        <Ionicons name="person-outline" size={24} color="#007BFF" />
        <Text style={styles.settingText}>{userData.username}</Text>
        <TouchableOpacity onPress={() => handleOpenModal("Username", userData.username)}>
          <Ionicons name="create-outline" size={20} color="rgb(26, 152, 254)" />
        </TouchableOpacity>
      </View>

      {/* Email */}
      <View style={styles.settingItem}>
        <Ionicons name="mail-outline" size={24} color="#007BFF" />
        <Text style={styles.settingText}>{userData.email}</Text>
        <TouchableOpacity onPress={() => handleOpenModal("Email", userData.email)}>
          <Ionicons name="create-outline" size={20} color="rgb(26, 152, 254)" />
        </TouchableOpacity>
      </View>

      {/* Password */}
      <View style={styles.settingItem}>
        <Ionicons name="lock-closed-outline" size={24} color="#007BFF" />
        <Text style={styles.settingText}>{"*********"}</Text>
        <TouchableOpacity onPress={() => handleOpenModal("Password", "********")}>
          <Ionicons name="create-outline" size={20} color="rgb(26, 152, 254)" />
        </TouchableOpacity>
      </View>

      {/* Modal for Input */}
      <Modal animationType="slide" transparent={true} visible={isModalVisible} onRequestClose={() => setIsModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit {modalTitle}</Text>
            <TextInput
              style={styles.input}
              placeholder={`Enter new ${modalTitle}`}
              value={inputValue}
              onChangeText={setInputValue}
              secureTextEntry={modalTitle === "Password"}
            />
            <View style={styles.modalButtons}>
              <Button title="Cancel" onPress={() => setIsModalVisible(false)} color="grey" />
              <Button title="Save" onPress={handleSaveInput} color="rgb(26, 152, 254)" />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",
  },
  header: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 30,
    marginTop: 40,
    color: "#007BFF",
  },
  profileSection: {
    alignItems: "center",
    marginBottom: 30,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: "rgb(26, 152, 254)",
  },
  editPictureButton: {
    backgroundColor: "rgb(26, 152, 254)",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  editPictureButtonText: {
    color: "white",
    fontWeight: "600",
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  settingText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: "rgb(73, 113, 116)",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "rgb(73, 113, 116)",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    fontSize: 16,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default AccountSettingsScreen;
