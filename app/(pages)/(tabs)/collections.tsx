


import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, SafeAreaView, Image, Modal, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { images } from "../../../constants";

// Données de démonstration
const sampleRecipes = [
  { id: '1', name: 'Pasta Carbonara', image: images.logo },
  { id: '2', name: 'Chicken Curry', image: images.logo },
  { id: '3', name: 'Greek Salad', image: images.logo },
  { id: '4', name: 'Grilled Salmon', image: images.logo },
  { id: '5', name: 'Beef Bourguignon', image: images.logo },
  { id: '6', name: 'Vegetable Stir Fry', image: images.logo },
  { id: '7', name: 'Tiramisu', image: images.logo },
  { id: '8', name: 'Chocolate Mousse', image: images.logo },
];

const initialCollections = [
  {
    id: '1',
    title: 'My Recipes',
    count: '2 recipes',
    coverImage: images.logo,
    lastUpdated: 'Updated 2 days ago',
    recipes: [
      { id: '1', name: 'Pasta Carbonara', image: images.logo },
      { id: '2', name: 'Chicken Curry', image: images.logo },
    ]
  },
  {
    id: '2',
    title: 'Summer Dishes',
    count: '2 recipes',
    coverImage: images.logo,
    lastUpdated: 'Updated 1 week ago',
    recipes: [
      { id: '3', name: 'Greek Salad', image: images.logo },
      { id: '4', name: 'Grilled Salmon', image: images.logo },
    ]
  },
];

export default function CollectionPage() {
  const [collections, setCollections] = useState(initialCollections);
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [isSelectModalVisible, setIsSelectModalVisible] = useState(false);
  const [selectedCollection, setSelectedCollection] = useState(null);
  const [newCollectionName, setNewCollectionName] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRecipes, setSelectedRecipes] = useState([]);

  // Filtrer les recettes basées sur la recherche
  const filteredRecipes = sampleRecipes.filter(recipe => 
    recipe.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateCollection = () => {
    if (newCollectionName.trim()) {
      const newCollection = {
        id: Date.now().toString(),
        title: newCollectionName,
        count: '0 recipes',
        coverImage: images.logo,
        lastUpdated: 'Updated just now',
        recipes: []
      };
      setCollections([...collections, newCollection]);
      setNewCollectionName('');
      setIsCreateModalVisible(false);
    }
  };

  const openCollectionDetails = (collection) => {
    setSelectedCollection(collection);
    setIsViewModalVisible(true);
  };

  const openSelectRecipesModal = () => {
    setSelectedRecipes([]);
    setSearchQuery('');
    setIsSelectModalVisible(true);
  };

  const toggleRecipeSelection = (recipe) => {
    setSelectedRecipes(prev => {
      const isSelected = prev.some(r => r.id === recipe.id);
      if (isSelected) {
        return prev.filter(r => r.id !== recipe.id);
      } else {
        return [...prev, recipe];
      }
    });
  };

  const addSelectedRecipes = () => {
    if (selectedRecipes.length > 0 && selectedCollection) {
      const updatedCollections = collections.map(collection => {
        if (collection.id === selectedCollection.id) {
          // Éviter les doublons
          const newRecipes = selectedRecipes.filter(newRecipe => 
            !collection.recipes.some(existing => existing.id === newRecipe.id)
          );
          
          return {
            ...collection,
            recipes: [...collection.recipes, ...newRecipes],
            count: `${collection.recipes.length + newRecipes.length} recipes`,
            lastUpdated: 'Updated just now'
          };
        }
        return collection;
      });
      
      setCollections(updatedCollections);
      setSelectedCollection(prev => ({
        ...prev,
        recipes: [...prev.recipes, ...selectedRecipes],
        count: `${prev.recipes.length + selectedRecipes.length} recipes`,
        lastUpdated: 'Updated just now'
      }));
      setIsSelectModalVisible(false);
    }
  };

  const removeRecipe = (recipeId) => {
    if (selectedCollection) {
      const updatedCollections = collections.map(collection => {
        if (collection.id === selectedCollection.id) {
          const updatedRecipes = collection.recipes.filter(r => r.id !== recipeId);
          return {
            ...collection,
            recipes: updatedRecipes,
            count: `${updatedRecipes.length} recipes`,
            lastUpdated: 'Updated just now'
          };
        }
        return collection;
      });
      
      setCollections(updatedCollections);
      setSelectedCollection(prev => ({
        ...prev,
        recipes: prev.recipes.filter(r => r.id !== recipeId),
        count: `${prev.recipes.length - 1} recipes`,
        lastUpdated: 'Updated just now'
      }));
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Your Collections</Text>
        </View>

        {/* Create New Collection Button */}
        <TouchableOpacity 
          style={styles.createButton}
          onPress={() => setIsCreateModalVisible(true)}
        >
          <View style={styles.createButtonContent}>
            <Ionicons name="add-circle" size={28} color="#FF6B6B" />
            <Text style={styles.createButtonText}>Create New Collection</Text>
          </View>
        </TouchableOpacity>

        {/* Collections List */}
        <FlatList
          data={collections}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity 
              style={styles.collectionCard}
              onPress={() => openCollectionDetails(item)}
            >
              <Image source={item.coverImage} style={styles.collectionImage} />
              <View style={styles.collectionInfo}>
                <Text style={styles.collectionTitle}>{item.title}</Text>
                <View style={styles.recipesPreview}>
                  {item.recipes.slice(0, 3).map((recipe, index) => (
                    <View key={`${item.id}-${recipe.id}-${index}`} style={styles.recipePreviewItem}>
                      <Image source={recipe.image} style={styles.recipePreviewImage} />
                    </View>
                  ))}
                  {item.recipes.length > 3 && (
                    <View style={styles.moreRecipes}>
                      <Text style={styles.moreRecipesText}>+{item.recipes.length - 3}</Text>
                    </View>
                  )}
                </View>
                <View style={styles.collectionMeta}>
                  <Text style={styles.collectionCount}>{item.count}</Text>
                  <Text style={styles.collectionUpdated}>{item.lastUpdated}</Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#999" />
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />

        {/* Modal for creating new collection */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={isCreateModalVisible}
          onRequestClose={() => setIsCreateModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <TouchableOpacity 
                style={styles.closeButton}
                onPress={() => setIsCreateModalVisible(false)}
              >
                <Ionicons name="close" size={24} color="#666" />
              </TouchableOpacity>

              <Text style={styles.modalTitle}>Create New Collection</Text>
              <TextInput
                style={styles.input}
                placeholder="Collection name"
                value={newCollectionName}
                onChangeText={setNewCollectionName}
              />
              <TouchableOpacity 
                style={styles.createCollectionButton}
                onPress={handleCreateCollection}
              >
                <Text style={styles.createButtonText2}>Create Collection</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Modal for viewing/editing collection */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={isViewModalVisible}
          onRequestClose={() => setIsViewModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={[styles.modalContent, styles.viewModalContent]}>
              <TouchableOpacity 
                style={styles.closeButton}
                onPress={() => setIsViewModalVisible(false)}
              >
                <Ionicons name="close" size={24} color="#666" />
              </TouchableOpacity>

              {selectedCollection && (
                <>
                  <Text style={styles.modalTitle}>{selectedCollection.title}</Text>
                  
                  <FlatList
                    data={selectedCollection.recipes}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                      <View style={styles.recipeItem}>
                        <Image source={item.image} style={styles.recipeImage} />
                        <Text style={styles.recipeName}>{item.name}</Text>
                        <TouchableOpacity 
                          onPress={() => removeRecipe(item.id)}
                          style={styles.removeButton}
                        >
                          <Ionicons name="trash" size={20} color="#FF6B6B" />
                        </TouchableOpacity>
                      </View>
                    )}
                    ListEmptyComponent={
                      <Text style={styles.emptyText}>No recipes in this collection yet</Text>
                    }
                    contentContainerStyle={styles.recipesListContent}
                  />

                  <TouchableOpacity 
                    style={styles.addButton}
                    onPress={openSelectRecipesModal}
                  >
                    <Text style={styles.addButtonText}>Add Recipes</Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
          </View>
        </Modal>

        {/* Modal for selecting recipes */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={isSelectModalVisible}
          onRequestClose={() => setIsSelectModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={[styles.modalContent, styles.viewModalContent]}>
              <TouchableOpacity 
                style={styles.closeButton}
                onPress={() => setIsSelectModalVisible(false)}
              >
                <Ionicons name="close" size={24} color="#666" />
              </TouchableOpacity>

              <Text style={styles.modalTitle}>Select Recipes</Text>
              
              <View style={styles.searchContainer}>
                <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
                <TextInput
                  style={styles.searchInput}
                  placeholder="Search recipes..."
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                />
              </View>

              <FlatList
                data={filteredRecipes}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <TouchableOpacity 
                    style={[
                      styles.selectableRecipeItem,
                      selectedRecipes.some(r => r.id === item.id) && styles.selectedRecipeItem
                    ]}
                    onPress={() => toggleRecipeSelection(item)}
                  >
                    <Image source={item.image} style={styles.recipeImage} />
                    <Text style={styles.recipeName}>{item.name}</Text>
                    {selectedRecipes.some(r => r.id === item.id) && (
                      <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
                    )}
                  </TouchableOpacity>
                )}
                contentContainerStyle={styles.recipesListContent}
              />

              <TouchableOpacity 
                style={[
                  styles.addSelectedButton,
                  selectedRecipes.length === 0 && styles.disabledButton
                ]}
                onPress={addSelectedRecipes}
                disabled={selectedRecipes.length === 0}
              >
                <Text style={styles.addButtonText}>
                  Add Selected ({selectedRecipes.length})
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 25,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  createButton: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  createButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  createButtonText: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: '600',
    color: '#FF6B6B',
  },
  createButtonText2: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
  listContent: {
    paddingBottom: 100,
  },
  collectionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  collectionImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
    marginRight: 15,
  },
  collectionInfo: {
    flex: 1,
  },
  collectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  recipesPreview: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  recipePreviewItem: {
    marginRight: 8,
  },
  recipePreviewImage: {
    width: 40,
    height: 40,
    borderRadius: 8,
  },
  moreRecipes: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  moreRecipesText: {
    fontSize: 12,
    color: '#666',
  },
  collectionMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  collectionCount: {
    fontSize: 14,
    color: '#666',
  },
  collectionUpdated: {
    fontSize: 12,
    color: '#999',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 25,
    width: '90%',
    maxHeight: '60%',
  },
  viewModalContent: {
    maxHeight: '80%',
  },
  closeButton: {
    alignSelf: 'flex-end',
    marginBottom: 15,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  createCollectionButton: {
    backgroundColor: '#FF6B6B',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
  },
  recipeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  recipeImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 15,
  },
  recipeName: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  removeButton: {
    padding: 8,
  },
  emptyText: {
    textAlign: 'center',
    color: '#999',
    marginVertical: 20,
    fontSize: 16,
  },
  addButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  recipesListContent: {
    paddingBottom: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    color: '#333',
  },
  selectableRecipeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  selectedRecipeItem: {
    backgroundColor: '#f5f5f5',
  },
  addSelectedButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  disabledButton: {
    backgroundColor: '#cccccc',
  },
});