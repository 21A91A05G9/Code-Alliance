import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";

// Import screens
import HomeScreen from "../screens/home";
import ProfileScreen from "../screens/profile";
// import SettingsScreen from "./screens/SettingsScreen";
// import HelpScreen from "./screens/HelpScreen";

// Create the Tab Navigator
const Tab = createBottomTabNavigator();

const bottomNavigator = () => {
    return (
        <NavigationContainer>
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
                        } else if (route.name === "Help") {
                            iconName = focused ? "help-circle" : "help-circle-outline";
                        }

                        return <Ionicons name={iconName} size={size} color={color} />;
                    },
                    tabBarActiveTintColor: "tomato",
                    tabBarInactiveTintColor: "gray",
                    headerShown: false, // Hide the header for all screens
                })}
            >
                <Tab.Screen name="Home" component={HomeScreen} />
                <Tab.Screen name="Profile" component={ProfileScreen} />
                {/* <Tab.Screen name="Settings" component={SettingsScreen} /> */}
                {/* <Tab.Screen name="Help" component={HelpScreen} /> */}
            </Tab.Navigator>
        </NavigationContainer>
    );
};

export default bottomNavigator;
