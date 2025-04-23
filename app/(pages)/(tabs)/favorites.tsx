import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../../styles/global';
import { images } from "../../../constants";

const FavoritesScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const initialFavorites = [
    {
      id: '1',
      name: 'Salade cesar',
      rating: 4.8,
      image: images.logo,
    },
    {
      id: '2',
      name: 'Paella',
      rating: 4.6,
      image: images.logo,
    },
    {
      id: '3',
      name: 'Soupe',
      rating: 4.9,
      image: images.logo,
    },
    {
      id: '4',
      name: 'Tiramisu',
      rating: 5.7,
      image: images.logo,
    },
  ];

  const [favorites, setFavorites] = useState(initialFavorites);

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query === '') {
      setFavorites(initialFavorites);
    } else {
      const filtered = initialFavorites.filter(item =>
        item.name.toLowerCase().includes(query.toLowerCase())
      );
      setFavorites(filtered);
    }
  };

  const toggleFavorite = (id) => {
    // Si vous voulez implémenter la suppression des favoris
    setFavorites(prev => prev.filter(item => item.id !== id));
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.itemContainer}
      onPress={() => console.log('Pressed:', item.name)}
    >
      <Image source={item.image} style={styles.itemImage} />
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.name}</Text>
        <View style={styles.ratingContainer}>
          <Ionicons name="star" size={16} color={colors.primary} />
          <Text style={styles.ratingText}>{item.rating}</Text>
        </View>
      </View>
      <TouchableOpacity onPress={() => toggleFavorite(item.id)}>
        <Ionicons name="heart" size={24} color={colors.primary} />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Favorites</Text>
      
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color={colors.gray} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search favorites..."
          placeholderTextColor={colors.gray}
          value={searchQuery}
          onChangeText={handleSearch}
          clearButtonMode="while-editing"
        />
      </View>
      
      {favorites.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="heart-dislike" size={50} color={colors.gray} />
          <Text style={styles.emptyText}>No favorites found</Text>
          {searchQuery !== '' && (
            <Text style={styles.emptySubText}>Try a different search term</Text>
          )}
        </View>
      ) : (
        <FlatList
          data={favorites}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.lightGray,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 50,
    color: colors.text,
    fontSize: 16,
  },
  listContainer: {
    paddingBottom: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
    resizeMode: 'cover',
  },
  itemDetails: {
    flex: 1,
    marginLeft: 15,
  },
  itemName: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 5,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    marginLeft: 5,
    color: colors.primary,
    fontWeight: 'bold',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  emptyText: {
    fontSize: 18,
    color: colors.gray,
    marginTop: 15,
  },
  emptySubText: {
    fontSize: 14,
    color: colors.gray,
    marginTop: 5,
  },
});

export default FavoritesScreen;