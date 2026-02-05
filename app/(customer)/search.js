import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

const SearchScreen = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  // Mock data
  const recentSearches = ['Mama T Kitchen', 'Shawarma', 'Pizza'];
  const popularSearches = ['Jollof Rice', 'Fried Rice', 'Chicken', 'Suya', 'Shawarma', 'Pasta'];

  // Component for the Search Header
  const Header = () => (
    <View style={styles.header}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backArrow}>←</Text>
      </TouchableOpacity>
      <Text style={styles.headerTitle}>Search</Text>
      <View style={{ width: 40 }} />
    </View>
  );

  // Component for Popular Chips/Tags
  const SearchChips = ({ data }) => (
    <View style={styles.chipsContainer}>
      {data.map((item, index) => (
        <TouchableOpacity key={index} style={styles.chip}>
          <Text style={styles.chipText}>{item}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header />
      
      {/* Search Input Bar */}
      <View style={styles.searchBarContainer}>
        <View style={styles.searchBar}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.input}
            placeholder="Search food or restaurants"
            placeholderTextColor="#9CA3AF"
            value={searchQuery}
            onChangeText={(text) => setSearchQuery(text)}
            onFocus={() => setIsSearching(true)}
          />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {!isSearching && searchQuery === '' ? (
          /* Empty State Illustration View */
          <View style={styles.emptyStateContainer}>
            <View style={styles.illustrationCircle}>
              <View style={styles.magnifier}>
                <Text style={{ fontSize: 60 }}>🔍</Text>
              </View>
              {/* Floating food icons */}
              <Text style={[styles.foodEmoji, { top: 10, right: -10 }]}>🍕</Text>
              <Text style={[styles.foodEmoji, { bottom: 30, left: -20 }]}>🍔</Text>
              <Text style={[styles.foodEmoji, { bottom: 10, right: 0 }]}>🍜</Text>
            </View>
            
            <Text style={styles.titleText}>Find your favorite meal</Text>
            <Text style={styles.subtitleText}>
              Search for restaurants, dishes, or cuisines. Discover delicious options near you!
            </Text>

            <View style={styles.popularSection}>
               <View style={styles.sectionHeader}>
                  <Text style={styles.trendingIcon}>📈</Text>
                  <Text style={styles.sectionTitle}>Popular right now</Text>
               </View>
               <SearchChips data={popularSearches} />
            </View>
          </View>
        ) : (
          /* Search History and Popular View */
          <View style={styles.historyContainer}>
            {/* Recent Searches */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionIcon}>🕒</Text>
                <Text style={styles.sectionTitleHeavy}>Recent Searches</Text>
              </View>
              {recentSearches.map((item, index) => (
                <TouchableOpacity key={index} style={styles.historyItem}>
                  <Text style={styles.historyText}>{item}</Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Popular Searches */}
            <View style={[styles.section, { marginTop: 30 }]}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionIcon}>📈</Text>
                <Text style={styles.sectionTitleHeavy}>Popular Searches</Text>
              </View>
              <SearchChips data={popularSearches} />
            </View>
          </View>
        )}
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
    paddingHorizontal: 20,
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
  backArrow: {
    fontSize: 20,
    color: '#3196E2',
  },
  searchBarContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 45,
    fontSize: 14,
    color: '#000',
  },
  scrollContent: {
    paddingBottom: 40,
  },
  // Empty State Styles
  emptyStateContainer: {
    alignItems: 'center',
    paddingHorizontal: 40,
    marginTop: 40,
  },
  illustrationCircle: {
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: '#F0F8FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  magnifier: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#3196E2',
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  foodEmoji: {
    position: 'absolute',
    fontSize: 24,
    backgroundColor: '#FFF',
    borderRadius: 15,
    padding: 5,
    elevation: 3,
  },
  titleText: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitleText: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 40,
  },
  // History State Styles
  historyContainer: {
    paddingHorizontal: 20,
    marginTop: 10,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionIcon: {
    fontSize: 18,
    marginRight: 10,
  },
  sectionTitle: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  sectionTitleHeavy: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  historyItem: {
    paddingVertical: 15,
  },
  historyText: {
    fontSize: 14,
    color: '#6B7280',
  },
  chipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  chip: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 10,
    marginBottom: 10,
  },
  chipText: {
    fontSize: 13,
    color: '#4B5563',
  },
  trendingIcon: {
    fontSize: 14,
    marginRight: 8,
  },
  popularSection: {
    width: '100%',
  },
  section: {
    width: '100%',
  },
});

export default SearchScreen;