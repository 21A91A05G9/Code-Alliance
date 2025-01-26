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
  ActivityIndicator,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { launchImageLibrary } from 'react-native-image-picker';


const AccountSettingsScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [userData, setUserData] = useState({
    userId: "",
    username: "",
    email: "",
    password: "********", 
  });
  const [profilePicture, setProfilePicture] = useState("https://via.placeholder.com/150");


  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Fetch the userId from AsyncStorage
        const userInfo = await AsyncStorage.getItem("userInfo");
        const user = JSON.parse(userInfo);

        console.log("Retrieved User Info:", user);  

        if (user) {
          // Use the userId to fetch the user details from the backend
          const response = await fetch(`http://localhost:5000/api/account/fetchDetails/${user.userId}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          });

          const data = await response.json();
          console.log(data);
          if (response.ok) {
            setUserData({
              userId: data.userId,
              username: data.username,
              email: data.email,
              password: "********", // Keep masked
            });
          } else {
            Alert.alert("Error", data.message || "Failed to fetch user data.");
          }
        } else {
          Alert.alert("Error", "User ID not found in AsyncStorage.");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        Alert.alert("Error", "Unable to load user data. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []); // Run once when the component mounts

  const handleOpenModal = (title, currentValue) => {
    setModalTitle(title);
    setInputValue(currentValue);
    setIsModalVisible(true);
  };

  const handleSaveInput = async () => {
    try {
      const endpoint =
        modalTitle === "Username"
          ? "/api/account/username"
          : modalTitle === "Email"
          ? "/api/account/email"
          : "/api/account/password";

      const body =
        modalTitle === "Password"
          ? { userId: userData.userId, currentPassword: "current_password", newPassword: inputValue }
          : { userId: userData.userId, [`new${modalTitle}`]: inputValue };

      const response = await fetch(`http://localhost:5000${endpoint}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert("Success", `${modalTitle} updated successfully.`);
        setUserData((prevData) => ({
          ...prevData,
          [modalTitle.toLowerCase()]: modalTitle === "Password" ? "********" : inputValue,
        }));
      } else {
        Alert.alert("Error", data.message);
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong.");
    }
    setIsModalVisible(false);
  };
  
  
  const handleChangePicture = async () => {
    // try {
    //   const result = await launchImageLibrary({
    //     mediaType: 'photo',
    //     quality: 1,
    //     includeBase64: false, // Ensure you get a file URI (not base64)
    //   });
  
    //   if (!result.didCancel && result.assets && result.assets.length > 0) {
    //     const imageUri = result.assets[0].uri;
    //     console.log('Selected Image URI:', imageUri);
  
    //     const fileType = result.assets[0].type || 'image/jpeg';
  
    //     const formData = new FormData();
    //     formData.append('profilePicture', {
    //       uri: imageUri,
    //       type: fileType, // Dynamically set the file type based on the selected image
    //       name: 'profile.jpg', // Ensure a valid file name
    //     });
    //     formData.append('userId', userData.userId);
  
    //     const response = await fetch('http://localhost:5000/api/account/profile-picture', {
    //       method: 'PUT',
    //       body: formData, // Send the FormData object with the image file
    //     });
  
    //     const data = await response.json();
  
    //     if (response.ok) {
    //       Alert.alert('Success', 'Profile picture updated successfully.');
    //       setProfilePicture(data.profilePicture); // Update the UI with the new image
    //     } else {
    //       Alert.alert('Error', data.message || 'Failed to update profile picture.');
    //     }
    //   }
    // } catch (error) {
    //   console.error('Error updating profile picture:', error);
    //   Alert.alert('Error', 'Failed to change profile picture.');
    // }
  };
  
  

  


  if (isLoading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#007BFF" />
      </View>
    );
  }

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
        <Text style={styles.settingText}>{userData.password}</Text>
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
