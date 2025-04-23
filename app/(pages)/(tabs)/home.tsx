// import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
// import { Link } from 'expo-router';

// export default function HomePage() {
//   return (
//     <View style={styles.container}>
//       {/* Header */}
//       <View style={styles.header}>
//         <Text style={styles.title}>Rayane</Text>
//       </View>

//       {/* Search Section */}
//       <View style={styles.searchSection}>
//         {/* <Text style={styles.searchLabel}>Q: recherche</Text> */}
//         <TextInput
//           style={styles.searchInput}
//           placeholder="Tapez votre recherche..."
//           placeholderTextColor="#999"
//         />
//       </View>

//       {/* Categories */}
//       <View style={styles.categoriesContainer}>
//         <View style={styles.categoryRow}>
//           {/* <Text style={styles.categoryLabel}>Tous:</Text> */}
//           <TouchableOpacity style={styles.categoryButton}>
//             <Text style={styles.categoryText}>Tous</Text>
//           </TouchableOpacity>
//         </View>

//         <View style={styles.categoryRow}>
//           {/* <Text style={styles.categoryLabel}>Plats:</Text> */}
//           <TouchableOpacity style={styles.categoryButton}>
//             <Text style={styles.categoryText}>Entrée</Text>
//           </TouchableOpacity>
//         </View>

//         <View style={styles.categoryRow}>
//           {/* <Text style={styles.categoryLabel}>Plats:</Text> */}
//           <TouchableOpacity style={styles.categoryButton}>
//             <Text style={styles.categoryText}>Plats</Text>
//           </TouchableOpacity>
//         </View>

//         <View style={styles.categoryRow}>
//           {/* <Text style={styles.categoryLabel}>Plats:</Text> */}
//           <TouchableOpacity style={styles.categoryButton}>
//             <Text style={styles.categoryText}>Desserts</Text>
//           </TouchableOpacity>
//         </View>
        
//       </View>

//       {/* Bottom Navigation */}
    
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   header: {
//     padding: 20,
//     paddingTop: 50,
//     borderBottomWidth: 1,
//     borderBottomColor: '#eee',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#333',
//   },
//   searchSection: {
//     padding: 20,
//     paddingBottom: 15,
//     borderBottomWidth: 1,
//     borderBottomColor: '#eee',
//   },
//   searchLabel: {
//     fontSize: 16,
//     color: '#333',
//     marginBottom: 10,
//   },
//   searchInput: {
//     height: 40,
//     backgroundColor: '#f5f5f5',
//     borderRadius: 20,
//     paddingHorizontal: 15,
//     fontSize: 16,
//   },
//   categoriesContainer: {
//     display: "flex",
//     justifyContent:"center",
//     flexDirection:"row",
//     gap:"2rem",
//     //  justifyContent:"space-between",
//     padding: 20,
//   },
//   categoryRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 15,
//   },
//   categoryLabel: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginRight: 10,
//     color: '#333',
//   },
//   categoryButton: {
//     paddingHorizontal: 15,
//     paddingVertical: 8,
//     backgroundColor: '#f0f0f0',
//     borderRadius: 15,
//   },
//   categoryText: {
//     fontSize: 14,
//     color: '#333',
//   },
//   bottomNav: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     paddingVertical: 15,
//     borderTopWidth: 1,
//     borderTopColor: '#eee',
//     backgroundColor: '#fff',
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     right: 0,
//   },
//   navItem: {
//     alignItems: 'center',
//   },
//   navText: {
//     fontSize: 12,
//     color: '#999',
//   },
//   navTextActive: {
//     fontSize: 12,
//     color: '#FF6B6B',
//     fontWeight: 'bold',
//   },
// });


import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, Image } from 'react-native';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../../styles/global';
import { images } from "../../../constants";

// Données des plats
const dishes = [
  {
    id: '1',
    name: 'Salade César',
    category: 'Entrée',
    rating: 4.8,
    prepTime: '15 min',
    image: images.logo,
  },
  {
    id: '2',
    name: 'Poulet Rôti',
    category: 'Plat',
    rating: 4.6,
    prepTime: '45 min',
    image: images.logo,
  },
  {
    id: '3',
    name: 'Tiramisu',
    category: 'Dessert',
    rating: 4.9,
    prepTime: '30 min',
    image: images.logo,
  },
  {
    id: '4',
    name: 'Bruschetta',
    category: 'Entrée',
    rating: 4.5,
    prepTime: '10 min',
    image: images.logo,
  },
  {
    id: '5',
    name: 'Pâtes Carbonara',
    category: 'Plat',
    rating: 4.7,
    prepTime: '25 min',
    image: images.logo,
  },
  {
    id: '6',
    name: 'Mousse au Chocolat',
    category: 'Dessert',
    rating: 4.9,
    prepTime: '20 min',
    image: images.logo,
  },
];

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tous');
  
  // Filtrer les plats selon la recherche et la catégorie
  const filteredDishes = dishes.filter(dish => {
    const matchesSearch = dish.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'Tous' || dish.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Catégories disponibles
  const categories = ['Tous', 'Entrée', 'Plat', 'Dessert'];

  const renderDishItem = ({ item }) => (
    <TouchableOpacity style={styles.dishCard}>
      <Image source={item.image} style={styles.dishImage} />
      <View style={styles.dishInfo}>
        <Text style={styles.dishName}>{item.name}</Text>
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
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Rayane</Text>
      </View>

      {/* Search Section */}
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

      {/* Categories */}
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

      {/* Dishes List */}
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

      {/* Bottom Navigation */}
      {/* <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="home" size={24} color={colors.primary} />
          <Text style={styles.navTextActive}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="heart-outline" size={24} color={colors.gray} />
          <Text style={styles.navText}>Favorites</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="bookmark-outline" size={24} color={colors.gray} />
          <Text style={styles.navText}>Collection</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="person-outline" size={24} color={colors.gray} />
          <Text style={styles.navText}>Profile</Text>
        </TouchableOpacity>
      </View> */}
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
  dishName: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 5,
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
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: colors.lightGray,
    backgroundColor: colors.white,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  navItem: {
    alignItems: 'center',
  },
  navText: {
    fontSize: 12,
    color: colors.gray,
    marginTop: 5,
  },
  navTextActive: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: 'bold',
    marginTop: 5,
  },
});