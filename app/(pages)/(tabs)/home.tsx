

import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  FlatList, 
  Image, 
  Modal, 
  Pressable, 
  ScrollView 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../../styles/global';
import { images } from "../../../constants";

const dishes = [
  {
    id: '1',
    name: 'Salade César',
    category: 'Entrée',
    rating: 4.8,
    prepTime: '15 min',
    image: images.logo,
    description: 'Une délicieuse salade avec poulet grillé, croûtons et sauce césar maison. Préparée avec des ingrédients frais et une touche spéciale de notre chef. Parfaite pour un déjeuner léger mais nourrissant.',
    ingredients: ['Laitue romaine', 'Poulet grillé', 'Croûtons', 'Parmesan', 'Sauce César', 'Jus de citron', 'Poivre noir']
  },
  {
    id: '2',
    name: 'Poulet Rôti',
    category: 'Plat',
    rating: 4.6,
    prepTime: '45 min',
    image: images.logo,
    description: 'Poulet rôti à la perfection avec des herbes de Provence. Cuit lentement pour une viande tendre et juteuse. Servi avec ses légumes de saison rôtis et une sauce au jus de cuisson.',
    ingredients: ['Poulet entier', 'Herbes de Provence', 'Beurre', 'Ail', 'Citron', 'Sel', 'Poivre', 'Thym']
  },
  {
    id: '3',
    name: 'Tiramisu',
    category: 'Dessert',
    rating: 4.9,
    prepTime: '30 min',
    image: images.logo,
    description: 'Dessert italien classique à base de mascarpone et café. Préparé avec des biscuits cuillère imbibés de café fort et une crème onctueuse au mascarpone. Saupoudré de cacao pour finir.',
    ingredients: ['Mascarpone', 'Œufs', 'Sucre', 'Café fort', 'Cacao en poudre', 'Biscuits cuillère', 'Amaretto (optionnel)']
  },
  {
    id: '4',
    name: 'Bruschetta',
    category: 'Entrée',
    rating: 4.5,
    prepTime: '10 min',
    image: images.logo,
    description: 'Toasts grillés garnis de tomates fraîches, basilic et ail. Un antipasti italien simple mais délicieux. Parfait pour commencer un repas ou comme encas léger.',
    ingredients: ['Pain baguette', 'Tomates mûres', 'Ail', 'Basilic frais', 'Huile d\'olive extra vierge', 'Sel', 'Poivre']
  },
  {
    id: '5',
    name: 'Pâtes Carbonara',
    category: 'Plat',
    rating: 4.7,
    prepTime: '25 min',
    image: images.logo,
    description: 'Pâtes crémeuses avec lardons et sauce aux œufs. Une recette authentique romaine avec des spaghettis al dente, des œufs frais, du pecorino et du guanciale (ou pancetta).',
    ingredients: ['Spaghettis', 'Guanciale ou pancetta', 'Œufs', 'Pecorino romano', 'Poivre noir', 'Sel']
  },
  {
    id: '6',
    name: 'Mousse au Chocolat',
    category: 'Dessert',
    rating: 4.9,
    prepTime: '20 min',
    image: images.logo,
    description: 'Mousse légère et aérienne au chocolat noir. Préparée avec du chocolat noir de qualité supérieure pour un goût intense. Servie froide avec éventuellement une touche de crème chantilly.',
    ingredients: ['Chocolat noir 70%', 'Œufs frais', 'Sucre', 'Crème fraîche', 'Extrait de vanille', 'Sel']
  },
];

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tous');
  const [selectedDish, setSelectedDish] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = (dishId) => {
    if (favorites.includes(dishId)) {
      setFavorites(favorites.filter(id => id !== dishId));
    } else {
      setFavorites([...favorites, dishId]);
    }
  };

  const filteredDishes = dishes.filter(dish => {
    const matchesSearch = dish.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'Tous' || dish.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['Tous', 'Entrée', 'Plat', 'Dessert'];

  const renderDishItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.dishCard}
      onPress={() => {
        setSelectedDish(item);
        setModalVisible(true);
      }}
    >
      <Image source={item.image} style={styles.dishImage} />
      <View style={styles.dishInfo}>
        <View style={styles.dishHeader}>
          <Text style={styles.dishName}>{item.name}</Text>
          <TouchableOpacity 
            onPress={(e) => {
              e.stopPropagation();
              toggleFavorite(item.id);
            }}
            style={styles.favoriteIcon}
          >
            <Ionicons 
              name={favorites.includes(item.id) ? "heart" : "heart-outline"} 
              size={24} 
              color={favorites.includes(item.id) ? colors.primary : colors.gray} 
            />
          </TouchableOpacity>
        </View>
        <View style={styles.dishMeta}>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={16} color={colors.primary} />
            <Text style={styles.ratingText}>{item.rating}</Text>
          </View>
          <Text style={styles.prepTime}>{item.prepTime}</Text>
        </View>
        <Text style={styles.dishCategory}>{item.category}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Rayane</Text>
      </View>

      <View style={styles.searchSection}>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color={colors.gray} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Rechercher un plat..."
            placeholderTextColor={colors.gray}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      <View style={styles.categoriesContainer}>
        {categories.map(category => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryButton,
              selectedCategory === category && styles.categoryButtonActive
            ]}
            onPress={() => setSelectedCategory(category)}
          >
            <Text style={[
              styles.categoryText,
              selectedCategory === category && styles.categoryTextActive
            ]}>
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filteredDishes}
        renderItem={renderDishItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.dishesList}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="fast-food-outline" size={50} color={colors.gray} />
            <Text style={styles.emptyText}>Aucun plat trouvé</Text>
            <Text style={styles.emptySubText}>Essayez une autre recherche ou catégorie</Text>
          </View>
        }
      />

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
                      <Ionicons 
                        name={favorites.includes(selectedDish.id) ? "heart" : "heart-outline"} 
                        size={28} 
                        color={favorites.includes(selectedDish.id) ? colors.primary : colors.gray} 
                      />
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
                  
                  <Text style={styles.modalSubtitle}>Ingrédients :</Text>
                  <View style={styles.ingredientsList}>
                    {selectedDish.ingredients.map((ingredient, index) => (
                      <View key={index} style={styles.ingredientItem}>
                        <Ionicons name="ellipse" size={8} color={colors.primary} style={styles.ingredientIcon} />
                        <Text style={styles.ingredientText}>{ingredient}</Text>
                      </View>
                    ))}
                  </View>
                </>
              )}
              
              <Pressable
                style={styles.modalCloseButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalCloseText}>Fermer</Text>
              </Pressable>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    padding: 20,
    paddingTop: 50,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
  },
  searchSection: {
    paddingHorizontal: 20,
    paddingBottom: 15,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.lightGray,
    borderRadius: 25,
    paddingHorizontal: 15,
    height: 50,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: '100%',
    color: colors.text,
    fontSize: 16,
  },
  categoriesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 10,
  },
  categoryButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: colors.lightGray,
    borderRadius: 15,
  },
  categoryButtonActive: {
    backgroundColor: colors.primary,
  },
  categoryText: {
    fontSize: 14,
    color: colors.gray,
    fontWeight: '500',
  },
  categoryTextActive: {
    color: colors.white,
  },
  dishesList: {
    paddingHorizontal: 20,
    paddingBottom: 80,
  },
  dishCard: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderRadius: 15,
    marginBottom: 15,
    overflow: 'hidden',
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  dishImage: {
    width: 100,
    height: 100,
  },
  dishInfo: {
    flex: 1,
    padding: 15,
  },
  dishHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dishName: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 5,
    flex: 1,
  },
  favoriteIcon: {
    padding: 5,
  },
  dishMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  prepTime: {
    color: colors.gray,
    fontSize: 14,
  },
  dishCategory: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '500',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 50,
  },
  emptyText: {
    fontSize: 18,
    color: colors.gray,
    marginTop: 15,
    textAlign: 'center',
  },
  emptySubText: {
    fontSize: 14,
    color: colors.gray,
    marginTop: 5,
    textAlign: 'center',
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
    marginBottom: 10,
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
});