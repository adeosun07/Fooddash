import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

const RateReviewScreen = () => {
  const router = useRouter();
  const [rating, setRating] = useState(0);
  const [selectedTags, setSelectedTags] = useState([]);
  const [comment, setComment] = useState('');

  // Data for the feedback chips
  const feedbackOptions = [
    { id: 'fast', label: 'Fast', icon: '⚡' },
    { id: 'polite', label: 'Polite', icon: '😊' },
    { id: 'careful', label: 'Careful handling', icon: '📦' },
    { id: 'spilled', label: 'Spilled', icon: '🥘' }, // Example of a negative tag
  ];

  const toggleTag = (id) => {
    if (selectedTags.includes(id)) {
      setSelectedTags(selectedTags.filter((tagId) => tagId !== id));
    } else {
      setSelectedTags([...selectedTags, id]);
    }
  };

  const handleDone = () => {
    // Submit rating and feedback
    console.log('Rating:', rating);
    console.log('Tags:', selectedTags);
    console.log('Comment:', comment);
    
    // Navigate back to orders
    router.replace('/(customer)/orders');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerIconContainer} onPress={() => router.back()}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Rate Our Services</Text>
        <TouchableOpacity style={styles.headerIconContainer}>
          <View style={styles.helpIcon}>
            <Text style={styles.helpText}>?</Text>
          </View>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Success Illustration Section */}
        <View style={styles.successSection}>
          <View style={styles.checkCircle}>
            <View style={styles.checkMark}>
              <Text style={{ color: '#FFF', fontSize: 30, fontWeight: 'bold' }}>✓</Text>
            </View>
          </View>
          <Text style={styles.successTitle}>Order Delivered!</Text>
          <Text style={styles.successSubtitle}>Enjoy your food, Tori</Text>
        </View>

        {/* Rating Section */}
        <View style={styles.ratingSection}>
          <Text style={styles.sectionTitle}>How was the delivery?</Text>
          <View style={styles.starsRow}>
            {[1, 2, 3, 4, 5].map((star) => (
              <TouchableOpacity key={star} onPress={() => setRating(star)}>
                <Text style={[styles.starIcon, { color: rating >= star ? '#FF7A45' : '#E5E7EB' }]}>
                  ★
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Chips/Tags Section */}
        <View style={styles.tagsContainer}>
          {feedbackOptions.map((item) => {
            const isSelected = selectedTags.includes(item.id);
            const isNegative = item.id === 'spilled'; // Styling for specific negative tags
            
            return (
              <TouchableOpacity
                key={item.id}
                onPress={() => toggleTag(item.id)}
                style={[
                  styles.tag,
                  isSelected && (isNegative ? styles.tagSelectedNegative : styles.tagSelectedPositive)
                ]}
              >
                <Text style={styles.tagIcon}>{item.icon}</Text>
                <Text style={[styles.tagLabel, isSelected && (isNegative ? styles.textNegative : styles.textPositive)]}>
                  {item.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Text Input */}
        <TextInput
          style={styles.textInput}
          placeholder="Something else..."
          placeholderTextColor="#9CA3AF"
          multiline
          value={comment}
          onChangeText={setComment}
        />
      </ScrollView>

      {/* Footer Button */}
      <View style={styles.footer}>
        <TouchableOpacity 
          style={[styles.doneButton, rating === 0 && styles.doneButtonDisabled]}
          disabled={rating === 0}
          onPress={handleDone}
        >
          <Text style={styles.doneButtonText}>Done</Text>
        </TouchableOpacity>
      </View>
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
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1F2937',
  },
  headerIconContainer: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backArrow: {
    fontSize: 22,
    color: '#3196E2',
  },
  helpIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#3196E2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  helpText: {
    color: '#3196E2',
    fontSize: 14,
    fontWeight: 'bold',
  },
  scrollContent: {
    paddingHorizontal: 25,
    alignItems: 'center',
    paddingBottom: 40,
  },
  successSection: {
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 40,
  },
  checkCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#E0F2FE',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkMark: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#3196E2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  successTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1F2937',
    marginBottom: 8,
  },
  successSubtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  ratingSection: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 15,
  },
  starsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  starIcon: {
    fontSize: 40,
    marginHorizontal: 5,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 30,
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 12,
    margin: 6,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  tagSelectedPositive: {
    borderColor: '#3196E2',
    backgroundColor: '#F0F9FF',
  },
  tagSelectedNegative: {
    borderColor: '#FF7A45',
    backgroundColor: '#FFF7ED',
  },
  tagIcon: {
    marginRight: 8,
    fontSize: 14,
  },
  tagLabel: {
    fontSize: 13,
    color: '#4B5563',
    fontWeight: '500',
  },
  textPositive: { color: '#3196E2' },
  textNegative: { color: '#FF7A45' },
  textInput: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    paddingVertical: 10,
    fontSize: 14,
    color: '#1F2937',
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  doneButton: {
    backgroundColor: '#3196E2',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  doneButtonDisabled: {
    backgroundColor: '#BFDBFE',
  },
  doneButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default RateReviewScreen;
