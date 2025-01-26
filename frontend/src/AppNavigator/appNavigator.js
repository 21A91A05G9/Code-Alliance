import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

// Import screens
import RegisterScreen from "../screens/register";
import HomeScreen from "../screens/home";
import LoginScreen from "../screens/login";
import ProfileScreen from "../screens/profile";
import SettingsScreen from "../screens/settings";
import PotdScreen from "../screens/potd";
import NotificationsScreen from "../screens/notifications";
import AccountSettingsScreen from "../screens/accountSettings";
import HelpAndSupportScreen from "../screens/help";
import ChatbotScreen from "../screens/chatBot";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Hidden Account Settings Screen Navigator
const SettingsStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="SettingsMain" component={SettingsScreen} />
            <Stack.Screen name="AccountSettings" component={AccountSettingsScreen} />
            <Stack.Screen name="HelpAndSupport" component={HelpAndSupportScreen} />
        </Stack.Navigator>
    );
};

// HomeStack Navigator
const HomeStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="chatBot" component={ChatbotScreen} />
        </Stack.Navigator>
    );
};

// Bottom Tab Navigator
const BottomTabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    if (route.name === "Home") {
                        iconName = focused ? "home" : "home-outline";
                    } else if (route.name === "Profile") {
                        iconName = focused ? "person" : "person-outline";
                    } else if (route.name === "Settings") {
                        iconName = focused ? "settings" : "settings-outline";
                    } else if (route.name === "Potd") {
                        iconName = focused ? "calendar" : "calendar-outline";
                    } else if (route.name === "Notifications") {
                        iconName = focused ? "notifications" : "notifications-outline";
                    }

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: "rgb(26, 152, 254)",
                tabBarInactiveTintColor: "rgb(73, 113, 116)",
                tabBarStyle: {
                    backgroundColor: "rgb(204, 231, 253)",
                    borderTopWidth: 0,
                    height: 60,
                    paddingTop: 8,
                },
                headerStyle: {
                    height: 150,
                    backgroundColor: "rgb(26, 152, 254)",
                    borderBottomRightRadius: 45,
                    borderBottomLeftRadius: 45,
                },
                headerTintColor: "rgb(239, 245, 245)",
                headerTitleStyle: {
                    fontWeight: "bold",
                    fontSize: 30,
                    paddingLeft: 15,
                    paddingTop: 25,
                    fontFamily: "poppins",
                },
                headerShown: true,
            })}
        >
            <Tab.Screen
                name="Home"
                component={HomeStack} // Use HomeStack for the Home screen
                options={({ navigation }) => ({
                    headerTitle: "Hey, Coder!!!",
                    headerRight: () => (
                        <Ionicons
                            name="person-circle-outline"
                            size={50}
                            color="rgb(239, 245, 245)"
                            style={{ marginRight: 20 }}
                            onPress={() => navigation.navigate("Profile")}
                        />
                    ),
                })}
            />

            <Tab.Screen
                name="Profile"
                component={ProfileScreen}
                options={{ headerShown: false }}
            />
            <Tab.Screen
                name="Potd"
                component={PotdScreen}
                options={{ headerShown: false }}
            />
            <Tab.Screen
                name="Notifications"
                component={NotificationsScreen}
                options={{ headerShown: false }}
            />
            <Tab.Screen
                name="Settings"
                component={SettingsStack} // Embed the AccountSettingsScreen here
                options={{ headerShown: false }}
            />
        </Tab.Navigator>
    );
};

// Main App Navigator
const AppNavigator = () => {
    return (
       
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Register" component={RegisterScreen} />
                <Stack.Screen name="Main" component={BottomTabNavigator} />
            </Stack.Navigator>
        </NavigationContainer>
       
    );
};

export default AppNavigator;
