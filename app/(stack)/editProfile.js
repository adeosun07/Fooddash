import React, { useState } from 'react';
import {
	View,
	Text,
	StyleSheet,
	TextInput,
	TouchableOpacity,
	ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

const EditProfileScreen = () => {
	const router = useRouter();
	const [fullName, setFullName] = useState('Tori Adeoye');
	const [phoneNumber, setPhoneNumber] = useState('+234 813 456 7890');
	const [email, setEmail] = useState('davidadedeke@gmail.com');

	return (
		<SafeAreaView style={styles.safeArea}>
			<View style={styles.header}>
				<TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
					<Ionicons name="arrow-back" size={20} color="#3196E2" />
				</TouchableOpacity>
				<Text style={styles.headerTitle}>Edit Profile</Text>
				<View style={{ width: 40 }} />
			</View>

			<ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
				<View style={styles.avatarSection}>
					<View style={styles.avatarCircle}>
						<Text style={styles.avatarText}>TA</Text>
						<View style={styles.cameraBadge}>
							<Text style={styles.cameraBadgeText}>📷</Text>
						</View>
					</View>
					<Text style={styles.changePhotoText}>Tap to change photo</Text>
				</View>

				<View style={styles.formSection}>
					<Text style={styles.label}>Full Name</Text>
					<TextInput
						style={styles.input}
						value={fullName}
						onChangeText={setFullName}
						placeholder="Enter full name"
						placeholderTextColor="#9CA3AF"
					/>

					<Text style={styles.label}>Phone Number</Text>
					<TextInput
						style={styles.input}
						value={phoneNumber}
						onChangeText={setPhoneNumber}
						placeholder="Enter phone number"
						placeholderTextColor="#9CA3AF"
						keyboardType="phone-pad"
					/>

					<Text style={styles.label}>Email Address</Text>
					<TextInput
						style={styles.input}
						value={email}
						onChangeText={setEmail}
						placeholder="Enter email"
						placeholderTextColor="#9CA3AF"
						keyboardType="email-address"
						autoCapitalize="none"
					/>
				</View>

				<TouchableOpacity style={styles.saveButton} onPress={() => router.back()}>
					<Text style={styles.saveButtonText}>Save Changes</Text>
				</TouchableOpacity>
			</ScrollView>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	safeArea: {
		flex: 1,
		backgroundColor: '#FFFFFF',
	},
	header: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingHorizontal: 15,
		paddingVertical: 10,
	},
	headerTitle: {
		fontSize: 18,
		fontWeight: 'bold',
		color: '#000',
	},
	backButton: {
		padding: 8,
		backgroundColor: '#F0F8FF',
		borderRadius: 20,
	},
	scrollContent: {
		paddingHorizontal: 20,
		paddingBottom: 40,
	},
	avatarSection: {
		alignItems: 'center',
		marginTop: 10,
		marginBottom: 20,
	},
	avatarCircle: {
		width: 90,
		height: 90,
		borderRadius: 45,
		backgroundColor: '#3196E2',
		alignItems: 'center',
		justifyContent: 'center',
		position: 'relative',
	},
	avatarText: {
		color: '#FFFFFF',
		fontSize: 26,
		fontWeight: 'bold',
	},
	cameraBadge: {
		position: 'absolute',
		right: -2,
		bottom: -2,
		width: 26,
		height: 26,
		borderRadius: 13,
		backgroundColor: '#FFFFFF',
		alignItems: 'center',
		justifyContent: 'center',
		borderWidth: 1,
		borderColor: '#E5E7EB',
	},
	cameraBadgeText: {
		fontSize: 12,
	},
	changePhotoText: {
		marginTop: 8,
		fontSize: 12,
		color: '#6B7280',
	},
	formSection: {
		marginTop: 10,
	},
	label: {
		fontSize: 12,
		color: '#6B7280',
		marginBottom: 8,
		marginTop: 14,
	},
	input: {
		backgroundColor: '#F9FAFB',
		borderWidth: 1,
		borderColor: '#E5E7EB',
		borderRadius: 12,
		paddingHorizontal: 14,
		paddingVertical: 12,
		fontSize: 14,
		color: '#111827',
	},
	saveButton: {
		backgroundColor: '#3196E2',
		paddingVertical: 14,
		borderRadius: 12,
		alignItems: 'center',
		marginTop: 30,
	},
	saveButtonText: {
		color: '#FFFFFF',
		fontSize: 16,
		fontWeight: 'bold',
	},
});

export default EditProfileScreen;
