

import React, { useState } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  TouchableOpacity, 
  Image, 
  StyleSheet, 
  TextInput, 
  Modal, 
  Pressable,
  ScrollView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../../styles/global';
import { images } from "../../../constants";

const initialFavorites = [
  {
    id: '1',
    name: 'Salade César',
    rating: 4.8,
    image: images.logo,
    category: 'Entrée',
    prepTime: '15 min',
    description: 'Une délicieuse salade avec poulet grillé, croûtons et sauce césar maison.',
    ingredients: ['Laitue romaine', 'Poulet grillé', 'Croûtons', 'Parmesan', 'Sauce César'],
    note: '' // Ajout du champ note pour chaque plat
  },
  {
    id: '2',
    name: 'Paella',
    rating: 4.6,
    image: images.logo,
    category: 'Plat',
    prepTime: '45 min',
    description: 'Plat espagnol traditionnel à base de riz, fruits de mer et légumes.',
    ingredients: ['Riz', 'Moules', 'Crevettes', 'Poulet', 'Poivrons', 'Petits pois'],
    note: ''
  },
  {
    id: '3',
    name: 'Soupe à l\'oignon',
    rating: 4.9,
    image: images.logo,
    category: 'Entrée',
    prepTime: '30 min',
    description: 'Soupe française classique avec des oignons caramélisés et du fromage gratiné.',
    ingredients: ['Oignons', 'Beurre', 'Bouillon de bœuf', 'Pain', 'Fromage gruyère'],
    note: ''
  },
  {
    id: '4',
    name: 'Tiramisu',
    rating: 4.7,
    image: images.logo,
    category: 'Dessert',
    prepTime: '20 min',
    description: 'Dessert italien à base de mascarpone et café.',
    ingredients: ['Mascarpone', 'Œufs', 'Sucre', 'Café', 'Cacao', 'Biscuits cuillère'],
    note: ''
  },
];

const FavoritesScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDish, setSelectedDish] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [notesModalVisible, setNotesModalVisible] = useState(false);
  const [currentNote, setCurrentNote] = useState('');
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
    const updatedFavorites = favorites.filter(item => item.id !== id);
    setFavorites(updatedFavorites);
    if (selectedDish && selectedDish.id === id) {
      setModalVisible(false);
    }
  };

  const openNotesModal = (dish) => {
    setSelectedDish(dish);
    setCurrentNote(dish.note || '');
    setNotesModalVisible(true);
  };

  const saveNote = () => {
    if (selectedDish) {
      const updatedFavorites = favorites.map(item => {
        if (item.id === selectedDish.id) {
          return { ...item, note: currentNote };
        }
        return item;
      });
      
      setFavorites(updatedFavorites);
      setSelectedDish(prev => ({ ...prev, note: currentNote }));
      setNotesModalVisible(false);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.itemContainer}
      onPress={() => {
        setSelectedDish(item);
        setModalVisible(true);
      }}
    >
      <Image source={item.image} style={styles.itemImage} />
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.name}</Text>
        <View style={styles.ratingContainer}>
          <Ionicons name="star" size={16} color={colors.primary} />
          <Text style={styles.ratingText}>{item.rating}</Text>
        </View>
      </View>
      <View style={styles.actionsContainer}>
        <TouchableOpacity 
          onPress={(e) => {
            e.stopPropagation();
            openNotesModal(item);
          }}
          style={styles.threeDots}
        >
          <Ionicons name="ellipsis-vertical" size={20} color={colors.gray} />
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={(e) => {
            e.stopPropagation();
            toggleFavorite(item.id);
          }}
        >
          <Ionicons name="heart" size={24} color={colors.primary} />
        </TouchableOpacity>
      </View>
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

      {/* Modal pour les détails du plat */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <ScrollView contentContainerStyle={styles.modalScrollContent}>
              {selectedDish && (
                <>
                  <Image source={selectedDish.image} style={styles.modalImage} />
                  <View style={styles.modalHeader}>
                    <Text style={styles.modalTitle}>{selectedDish.name}</Text>
                    <TouchableOpacity 
                      onPress={() => toggleFavorite(selectedDish.id)}
                      style={styles.modalFavorite}
                    >
                      <Ionicons name="heart" size={28} color={colors.primary} />
                    </TouchableOpacity>
                  </View>
                  
                  <View style={styles.modalMeta}>
                    <Text style={styles.modalCategory}>{selectedDish.category}</Text>
                    <View style={styles.modalRating}>
                      <Ionicons name="star" size={18} color={colors.primary} />
                      <Text style={styles.modalRatingText}>{selectedDish.rating}</Text>
                    </View>
                    <Text style={styles.modalTime}>{selectedDish.prepTime}</Text>
                  </View>
                  
                  <Text style={styles.modalDescription}>{selectedDish.description}</Text>
                  
                  <Text style={styles.modalSubtitle}>Ingredients:</Text>
                  <View style={styles.ingredientsList}>
                    {selectedDish.ingredients.map((ingredient, index) => (
                      <View key={index} style={styles.ingredientItem}>
                        <Ionicons name="ellipse" size={8} color={colors.primary} style={styles.ingredientIcon} />
                        <Text style={styles.ingredientText}>{ingredient}</Text>
                      </View>
                    ))}
                  </View>

                  {selectedDish.note ? (
                    <>
                      <Text style={styles.modalSubtitle}>Your Note:</Text>
                      <Text style={styles.noteText}>{selectedDish.note}</Text>
                    </>
                  ) : (
                    <Text style={styles.noNoteText}>No note added yet</Text>
                  )}
                </>
              )}
              
              <Pressable
                style={styles.modalCloseButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalCloseText}>Close</Text>
              </Pressable>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Modal pour les notes */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={notesModalVisible}
        onRequestClose={() => setNotesModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <ScrollView contentContainerStyle={styles.modalScrollContent}>
              {selectedDish && (
                <>
                  <View style={styles.modalHeader}>
                    <Text style={styles.modalTitle}>Add Note for {selectedDish.name}</Text>
                    <Pressable
                      style={styles.modalClose}
                      onPress={() => setNotesModalVisible(false)}
                    >
                      <Ionicons name="close" size={24} color="#666" />
                    </Pressable>
                  </View>

                  <TextInput
                    style={styles.noteInput}
                    multiline
                    numberOfLines={6}
                    placeholder="Write your personal notes about this dish..."
                    value={currentNote}
                    onChangeText={setCurrentNote}
                  />

                  <View style={styles.noteButtonsContainer}>
                    <Pressable
                      style={[styles.noteButton, styles.cancelButton]}
                      onPress={() => setNotesModalVisible(false)}
                    >
                      <Text style={styles.noteButtonText}>Cancel</Text>
                    </Pressable>
                    <Pressable
                      style={[styles.noteButton, styles.saveButton]}
                      onPress={saveNote}
                    >
                      <Text style={styles.noteButtonText}>Save Note</Text>
                    </Pressable>
                  </View>
                </>
              )}
            </ScrollView>
          </View>
        </View>
      </Modal>
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
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  threeDots: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 10,
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '90%',
    backgroundColor: colors.white,
    borderRadius: 20,
    maxHeight: '80%',
  },
  modalScrollContent: {
    padding: 20,
  },
  modalImage: {
    width: '100%',
    height: 200,
    borderRadius: 15,
    marginBottom: 15,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    flex: 1,
  },
  modalFavorite: {
    padding: 5,
    marginLeft: 10,
  },
  modalClose: {
    padding: 5,
  },
  modalMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    flexWrap: 'wrap',
  },
  modalCategory: {
    backgroundColor: colors.lightPrimary,
    color: colors.primary,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 10,
    fontSize: 14,
    fontWeight: '500',
    marginRight: 10,
    marginBottom: 5,
  },
  modalRating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
    marginBottom: 5,
  },
  modalRatingText: {
    marginLeft: 5,
    color: colors.primary,
    fontWeight: 'bold',
  },
  modalTime: {
    color: colors.gray,
    marginBottom: 5,
  },
  modalDescription: {
    color: colors.text,
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
  },
  modalSubtitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 10,
  },
  ingredientsList: {
    marginBottom: 20,
  },
  ingredientItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  ingredientIcon: {
    marginRight: 10,
  },
  ingredientText: {
    color: colors.text,
    fontSize: 16,
  },
  noteText: {
    color: colors.text,
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
    backgroundColor: colors.lightGray,
    padding: 15,
    borderRadius: 10,
  },
  noNoteText: {
    color: colors.gray,
    fontStyle: 'italic',
    marginBottom: 20,
  },
  modalCloseButton: {
    backgroundColor: colors.primary,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  modalCloseText: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 16,
  },
  noteInput: {
    backgroundColor: colors.lightGray,
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    color: colors.text,
    minHeight: 150,
    textAlignVertical: 'top',
    marginBottom: 20,
  },
  noteButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  noteButton: {
    flex: 1,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: colors.lightGray,
  },
  saveButton: {
    backgroundColor: colors.primary,
  },
  noteButtonText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default FavoritesScreen;