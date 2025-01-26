import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    ScrollView,
    Alert,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const HelpAndSupportScreen = ({ navigation }) => {
    const [feedback, setFeedback] = useState("");
    const [expandedFAQ, setExpandedFAQ] = useState(null);

    const handleSubmitFeedback = () => {
        if (feedback.trim()) {
            Alert.alert("Thank You", "Your feedback has been submitted!");
            setFeedback("");
        } else {
            Alert.alert("Error", "Please enter your feedback before submitting.");
        }
    };

    const toggleFAQ = (index) => {
        setExpandedFAQ(expandedFAQ === index ? null : index);
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.header}>Help & Support</Text>

            {/* FAQ Section */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>FAQs</Text>

                <TouchableOpacity style={styles.faqItem} onPress={() => toggleFAQ(0)}>
                    <View style={styles.faqQuestionContainer}>
                        <Text style={styles.faqQuestion}>How can I reset my password?</Text>
                        <Ionicons
                            name={expandedFAQ === 0 ? "chevron-up-outline" : "chevron-down-outline"}
                            size={20}
                            color="#555"
                        />
                    </View>
                    {expandedFAQ === 0 && (
                        <View style={styles.faqAnswer}>
                            <Text style={styles.faqAnswerText}>
                                To reset your password:
                                {"\n"}1. Go to the login page and tap on "Forgot Password."
                                {"\n"}2. Enter the email address associated with your account.
                                {"\n"}3. Check your email inbox for the reset link.
                                {"\n"}4. Click on the link and follow the instructions to set a new password.
                            </Text>
                        </View>
                    )}
                </TouchableOpacity>

                <TouchableOpacity style={styles.faqItem} onPress={() => toggleFAQ(1)}>
                    <View style={styles.faqQuestionContainer}>
                        <Text style={styles.faqQuestion}>How do I update my email address?</Text>
                        <Ionicons
                            name={expandedFAQ === 1 ? "chevron-up-outline" : "chevron-down-outline"}
                            size={20}
                            color="#555"
                        />
                    </View>
                    {expandedFAQ === 1 && (
                        <View style={styles.faqAnswer}>
                            <Text style={styles.faqAnswerText}>
                                To update your email address:
                                {"\n"}1. Log in to your account.
                                {"\n"}2. Navigate to "Account Settings."
                                {"\n"}3. Select the "Edit Email" option.
                                {"\n"}4. Enter your new email address and confirm it.
                                {"\n"}5. Save the changes. You may be required to verify your new email address.
                            </Text>
                        </View>
                    )}
                </TouchableOpacity>

                <TouchableOpacity style={styles.faqItem} onPress={() => toggleFAQ(2)}>
                    <View style={styles.faqQuestionContainer}>
                        <Text style={styles.faqQuestion}>How can I contact customer support?</Text>
                        <Ionicons
                            name={expandedFAQ === 2 ? "chevron-up-outline" : "chevron-down-outline"}
                            size={20}
                            color="#555"
                        />
                    </View>
                    {expandedFAQ === 2 && (
                        <View style={styles.faqAnswer}>
                            <Text style={styles.faqAnswerText}>
                                You can contact our customer support team in the following ways:
                                {"\n"}- Call us at **+1 234 567 890** for immediate assistance.
                                {"\n"}- Email us at **support@example.com** and our team will respond within 24 hours.
                                {"\n"}- Use the in-app "Support" chat feature for real-time help.
                            </Text>
                        </View>
                    )}
                </TouchableOpacity>
            </View>

            {/* Contact Section */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Contact Us</Text>
                <Text style={styles.contactText}>
                    If you need immediate assistance, feel free to reach out to us:
                </Text>
                <View style={styles.contactInfo}>
                    <Ionicons name="call-outline" size={20} color="#007BFF" />
                    <Text style={styles.contactDetails}>+1 234 567 890</Text>
                </View>
                <View style={styles.contactInfo}>
                    <Ionicons name="mail-outline" size={20} color="#007BFF" />
                    <Text style={styles.contactDetails}>support@example.com</Text>
                </View>
            </View>

            {/* Feedback Section */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Submit Feedback</Text>
                <TextInput
                    style={styles.feedbackInput}
                    placeholder="Enter your feedback here..."
                    placeholderTextColor="#aaa"
                    value={feedback}
                    onChangeText={setFeedback}
                    multiline
                />
                <TouchableOpacity style={styles.submitButton} onPress={handleSubmitFeedback}>
                    <Text style={styles.submitButtonText}>Submit Feedback</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#F9FAFB", // Light gray for better readability
    },
    header: {
        fontSize: 26,
        fontWeight: "bold",
        color: "#007BFF", // Professional blue color
        marginBottom: 20,
        marginTop: 40,
    },
    section: {
        marginBottom: 30,
        backgroundColor: "white",
        borderRadius: 10,
        padding: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: "600",
        color: "#333",
        marginBottom: 15,
    },
    faqItem: {
        flexDirection: "column",
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
    faqQuestionContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    faqQuestion: {
        fontSize: 16,
        color: "#555",
    },
    faqAnswer: {
        marginTop: 10,
        paddingLeft: 10,
    },
    faqAnswerText: {
        fontSize: 14,
        color: "#666",
        lineHeight: 20,
    },
    contactText: {
        fontSize: 16,
        color: "#666",
        marginBottom: 15,
        lineHeight: 22,
    },
    contactInfo: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
    },
    contactDetails: {
        marginLeft: 10,
        fontSize: 16,
        color: "#007BFF",
        fontWeight: "500",
    },
    feedbackInput: {
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 10,
        padding: 15,
        fontSize: 16,
        backgroundColor: "#fff",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 1,
        textAlignVertical: "top",
        height: 120,
        marginBottom: 15,
    },
    submitButton: {
        backgroundColor: "#007BFF",
        paddingVertical: 15,
        alignItems: "center",
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 3,
    },
    submitButtonText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 16,
    },
});

export default HelpAndSupportScreen;
