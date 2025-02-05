import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface RecentSearch {
  id: string;
  query: string;
  timestamp: string;
}

const mockRecentSearches: RecentSearch[] = [
  {
    id: '1',
    query: 'İstanbul gezilecek yerler',
    timestamp: '2 saat önce',
  },
  {
    id: '2',
    query: 'Paris ucuz oteller',
    timestamp: '1 gün önce',
  },
  {
    id: '3',
    query: 'Roma restoranları',
    timestamp: '2 gün önce',
  },
  {
    id: '4',
    query: 'Londra pub önerileri',
    timestamp: '3 gün önce',
  },
  {
    id: '5',
    query: 'Amsterdam bisiklet kiralama',
    timestamp: '4 gün önce',
  },
];

export default function Search() {
  const [searchQuery, setSearchQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState<RecentSearch[]>(mockRecentSearches);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      const newSearch: RecentSearch = {
        id: Date.now().toString(),
        query: searchQuery,
        timestamp: 'Şimdi',
      };
      setRecentSearches([newSearch, ...recentSearches.slice(0, 9)]);
      setSearchQuery('');
    }
  };

  const handleDeleteSearch = (id: string) => {
    setRecentSearches(recentSearches.filter(search => search.id !== id));
  };

  const renderSearchItem = ({ item }: { item: RecentSearch }) => (
    <View style={styles.searchItem}>
      <TouchableOpacity 
        style={styles.searchContent}
        onPress={() => setSearchQuery(item.query)}
      >
        <Ionicons name="time-outline" size={20} color="#666" />
        <View style={styles.searchTexts}>
          <Text style={styles.searchQuery}>{item.query}</Text>
          <Text style={styles.searchTime}>{item.timestamp}</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleDeleteSearch(item.id)}>
        <Ionicons name="close" size={20} color="#666" />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color="#666" />
          <TextInput
            style={styles.searchInput}
            placeholder="Seyahat planları, yerler, topluluklar..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={handleSearch}
            returnKeyType="search"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={20} color="#666" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <View style={styles.recentContainer}>
        <View style={styles.recentHeader}>
          <Text style={styles.recentTitle}>Son Aramalar</Text>
          {recentSearches.length > 0 && (
            <TouchableOpacity onPress={() => setRecentSearches([])}>
              <Text style={styles.clearText}>Tümünü Temizle</Text>
            </TouchableOpacity>
          )}
        </View>
        <FlatList
          data={recentSearches}
          renderItem={renderSearchItem}
          keyExtractor={item => item.id}
          style={styles.recentList}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
  },
  recentContainer: {
    flex: 1,
  },
  recentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  recentTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  clearText: {
    color: '#007AFF',
    fontSize: 14,
  },
  recentList: {
    flex: 1,
  },
  searchItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  searchContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchTexts: {
    marginLeft: 12,
    flex: 1,
  },
  searchQuery: {
    fontSize: 16,
    color: '#333',
  },
  searchTime: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
}); 