import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  FlatList, 
  Modal, 
  TextInput,
  Image,
  ScrollView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../../styles/global';
 import { images } from "../../../constants";


const PlanningScreen = () => {
  // État principal
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDates, setSelectedDates] = useState([]);
  const [selectedMeal, setSelectedMeal] = useState('Lunch');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [dishes, setDishes] = useState([]);

  // Données des plats
  const dishData = {
    Entrees: [
      { id: '1', name: 'Salade Cesar', prepTime: '15 min', calories: '320 kcal', image: images.logo},
      { id: '2', name: 'Soupe à l\'oignon', prepTime: '25 min', calories: '250 kcal', image: images.logo}
    ],
    Plats: [
      { id: '3', name: 'Poulet rôti', prepTime: '45 min', calories: '450 kcal', image: images.logo},
      { id: '4', name: 'Frites', prepTime: '20 min', calories: '350 kcal', image: images.logo}
    ],
    Desserts: [
      { id: '5', name: 'Tiramisu', prepTime: '30 min', calories: '420 kcal', image: images.logo },
      { id: '6', name: 'Mousse au chocolat', prepTime: '20 min', calories: '380 kcal', image: images.logo}
    ]
  };

  // Génère les jours du mois courant
  const getDaysInMonth = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    return Array.from({ length: daysInMonth }, (_, i) => new Date(year, month, i + 1));
  };

  // Change le mois (delta = -1 pour mois précédent, 1 pour suivant)
  const changeMonth = (delta) => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(newMonth.getMonth() + delta);
    setCurrentMonth(newMonth);
  };

  // Formate la date en YYYY-MM-DD
  const formatDate = (date) => date.toISOString().split('T')[0];

  // Gère la sélection des dates
  const toggleDateSelection = (date) => {
    const dateStr = formatDate(date);
    setSelectedDates(prev => 
      prev.includes(dateStr) 
        ? prev.filter(d => d !== dateStr) 
        : [...prev, dateStr]
    );
  };

  // Ajoute des plats aux dates sélectionnées
  const addDishesToSelectedDates = (dish) => {
    if (selectedDates.length === 0) {
      alert('Sélectionnez au moins une date');
      return;
    }

    const newDishes = selectedDates.flatMap(date => ({
      id: `${date}-${dish.id}-${Date.now()}`,
      date,
      meal: selectedMeal,
      category: selectedCategory,
      ...dish
    }));

    setDishes([...dishes, ...newDishes]);
    setModalVisible(false);
  };

  // Récupère les plats pour une date spécifique
  const getDishesForDate = (dateStr) => {
    return dishes.filter(dish => 
      dish.date === dateStr && dish.meal === selectedMeal
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.header}>Mon Planning Culinaire</Text>

      {/* Sélecteur de mois */}
      <View style={styles.monthSelector}>
        <TouchableOpacity onPress={() => changeMonth(-1)}>
          <Ionicons name="chevron-back" size={24} color={colors.primary} />
        </TouchableOpacity>
        
        <Text style={styles.monthText}>
          {currentMonth.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}
        </Text>
        
        <TouchableOpacity onPress={() => changeMonth(1)}>
          <Ionicons name="chevron-forward" size={24} color={colors.primary} />
        </TouchableOpacity>
      </View>

      {/* Grille des jours */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.daysGrid}>
          {getDaysInMonth().map((date, index) => {
            const dateStr = formatDate(date);
            const isSelected = selectedDates.includes(dateStr);
            
            return (
              <TouchableOpacity
                key={index}
                style={[styles.dayCard, isSelected && styles.selectedDayCard]}
                onPress={() => toggleDateSelection(date)}
              >
                <Text style={[styles.dayName, isSelected && styles.selectedDayText]}>
                  {date.toLocaleDateString('fr-FR', { weekday: 'short' })}
                </Text>
                <Text style={[styles.dayNumber, isSelected && styles.selectedDayText]}>
                  {date.getDate()}
                </Text>
                {isSelected && (
                  <Ionicons 
                    name="checkmark" 
                    size={16} 
                    color={colors.white} 
                    style={styles.checkIcon}
                  />
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      {/* Sélection repas */}
      <View style={styles.mealSelector}>
        {['Lunch', 'Dinner'].map(meal => (
          <TouchableOpacity
            key={meal}
            style={[
              styles.mealButton,
              selectedMeal === meal && styles.selectedMealButton
            ]}
            onPress={() => setSelectedMeal(meal)}
          >
            <Text style={styles.mealButtonText}>
              {meal === 'Lunch' ? 'Déjeuner' : 'Dîner'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Boutons catégories */}
      <View style={styles.categoryButtons}>
        {Object.keys(dishData).map(category => (
          <TouchableOpacity
            key={category}
            style={styles.categoryButton}
            onPress={() => {
              setSelectedCategory(category);
              setModalVisible(true);
            }}
          >
            <Text style={styles.categoryButtonText}>{category}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Liste des plats par date */}
      <FlatList
        data={selectedDates}
        contentContainerStyle={styles.dishesList}
        keyExtractor={dateStr => dateStr}
        renderItem={({ item: dateStr }) => {
          const dateDishes = getDishesForDate(dateStr);
          const date = new Date(dateStr);
          
          return (
            <View style={styles.dateSection}>
              <Text style={styles.dateTitle}>
                {date.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}
              </Text>
              
              {dateDishes.length > 0 ? (
                <FlatList
                  data={dateDishes}
                  renderItem={({ item }) => (
                    <View style={styles.dishCard}>
                      <Image source={item.image} style={styles.dishImage} />
                      <View style={styles.dishInfo}>
                        <Text style={styles.dishName}>{item.name}</Text>
                        <Text style={styles.dishDetails}>
                          {item.prepTime} • {item.calories}
                        </Text>
                      </View>
                      <TouchableOpacity 
                        onPress={() => setDishes(dishes.filter(d => d.id !== item.id))}
                        style={styles.deleteButton}
                      >
                        <Ionicons name="trash" size={20} color={colors.danger} />
                      </TouchableOpacity>
                    </View>
                  )}
                  keyExtractor={item => item.id}
                />
              ) : (
                <Text style={styles.emptyText}>Aucun plat programmé</Text>
              )}
            </View>
          );
        }}
      />

      {/* Modal de sélection des plats */}
      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>
              Ajouter à {selectedDates.length} jour(s)
            </Text>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Ionicons name="close" size={24} color={colors.text} />
            </TouchableOpacity>
          </View>

          <View style={styles.searchContainer}>
            <Ionicons name="search" size={20} color={colors.gray} />
            <TextInput
              style={styles.searchInput}
              placeholder={`Rechercher ${selectedCategory}...`}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>

          <FlatList
            data={dishData[selectedCategory]?.filter(dish => 
              dish.name.toLowerCase().includes(searchQuery.toLowerCase())
            ) || []}
            renderItem={({ item }) => (
              <TouchableOpacity 
                style={styles.dishItem}
                onPress={() => addDishesToSelectedDates(item)}
              >
                <Image source={item.image} style={styles.modalDishImage} />
                <View style={styles.dishTextContainer}>
                  <Text style={styles.dishName}>{item.name}</Text>
                  <Text style={styles.dishDetails}>
                    {item.prepTime} • {item.calories}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
            keyExtractor={item => item.id}
          />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    textAlign: 'center',
    marginVertical: 16,
  },
  monthSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 8,
    backgroundColor: colors.white,
    borderRadius: 10,
    marginBottom: 12,
  },
  monthText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
  },
  daysGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 16,
  },
  dayCard: {
    width: 60,
    height:60,
    alignItems: 'center',
    padding: 8,
    margin: 4,
    borderRadius: 10,
    backgroundColor: colors.lightGray,
  },
  selectedDayCard: {
    backgroundColor: colors.primary,
  },
  dayName: {
    fontSize: 14,
    color: colors.text,
    textTransform: 'uppercase',
  },
  dayNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
  },
  selectedDayText: {
    color: colors.white,
  },
  checkIcon: {
    position: 'absolute',
    top: 4,
    right: 4,
  },
  mealSelector: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 12,
  },
  mealButton: {
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 20,
    marginHorizontal: 8,
    backgroundColor: colors.lightGray,
  },
  selectedMealButton: {
    backgroundColor: colors.primary,
  },
  mealButtonText: {
    color: colors.text,
    fontWeight: '500',
  },
  dishesList: {
    paddingHorizontal: 20,
    height:"300px",
    paddingBottom: 80,
  },
  categoryButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  categoryButton: {
    flex: 1,
    alignItems: 'center',
    padding: 12,
    marginHorizontal: 4,
    backgroundColor: colors.white,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  categoryButtonText: {
    color: colors.primary,
    fontWeight: '500',
  },
  dateSection: {
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
  },
  dateTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
  },
  dishCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.lightGray,
    borderRadius: 8,
    padding: 10,
    marginBottom: 8,
  },
  dishImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 12,
  },
  dishInfo: {
    flex: 1,
  },
  dishName: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.text,
  },
  dishDetails: {
    fontSize: 14,
    color: colors.gray,
  },
  deleteButton: {
    padding: 4,
  },
  emptyText: {
    textAlign: 'center',
    color: colors.gray,
    paddingVertical: 12,
  },
  modalContainer: {
    flex: 1,
    paddingTop: 40,
    backgroundColor: colors.background,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 20,
    paddingHorizontal: 16,
    margin: 16,
    height: 40,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    color: colors.text,
  },
  dishItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },
  modalDishImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 16,
  },
  dishTextContainer: {
    flex: 1,
  },
});

export default PlanningScreen;



