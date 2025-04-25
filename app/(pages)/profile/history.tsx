
import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Modal,
  Pressable,
} from "react-native";
import { images } from "../../../constants";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

// Tableau d'objets pour l'historique avec images et noms
let array_historique = [
  {
    date: "Aujourd'hui",
    items: [
      {
        img: images.logo,
        name: "Salade César",
        time: "12:30",
        calories: "320 cal",
        category: "Entrée",
        description: "Salade fraîche avec poulet grillé, croûtons et sauce césar maison",
        ingredients: ["Laitue romaine", "Poulet grillé", "Croûtons", "Parmesan", "Sauce César"]
      },
      {
        img: images.logo,
        name: "Poisson Blanc",
        time: "19:45",
        calories: "450 cal",
        category: "Plat principal",
        description: "Filet de bar cuit à la vapeur avec légumes de saison",
        ingredients: ["Filet de bar", "Citron", "Herbes de Provence", "Courgettes", "Carottes"]
      },
      {
        img: images.logo,
        name: "Tiramisu",
        time: "20:15",
        calories: "280 cal",
        category: "Dessert",
        description: "Dessert italien à base de café et mascarpone",
        ingredients: ["Mascarpone", "Œufs", "Sucre", "Café", "Cacao"]
      },
    ],
  },
  {
    date: "Hier",
    items: [
      { 
        img: images.logo, 
        name: "Bourak", 
        time: "13:00", 
        calories: "380 cal",
        category: "Entrée",
        description: "Feuilles de brick farcies à la viande hachée et aux épices",
        ingredients: ["Feuilles de brick", "Viande hachée", "Oignons", "Persil", "Épices"]
      },
      {
        img: images.logo,
        name: "Poisson Blanc",
        time: "20:00",
        calories: "450 cal",
        category: "Plat principal",
        description: "Filet de bar cuit à la vapeur avec légumes de saison",
        ingredients: ["Filet de bar", "Citron", "Herbes de Provence", "Courgettes", "Carottes"]
      },
      {
        img: images.logo,
        name: "Tiramisu",
        time: "20:30",
        calories: "280 cal",
        category: "Dessert",
        description: "Dessert italien à base de café et mascarpone",
        ingredients: ["Mascarpone", "Œufs", "Sucre", "Café", "Cacao"]
      },
    ],
  },
];

export default function HistoryPage() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const openItemDetails = (item) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <Ionicons name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.title}>Historique</Text>
          <TouchableOpacity style={styles.filterButton}>
            <Ionicons name="filter" size={20} color="#FF6B6B" />
            <Text style={styles.filterText}>Filtrer</Text>
          </TouchableOpacity>
        </View>

        {array_historique.map((day, index) => (
          <View key={index} style={styles.dayContainer}>
            <View style={styles.dayHeader}>
              <Text style={styles.dayTitle}>{day.date}</Text>
              <Text style={styles.dayCalories}>
                Total: {day.items.reduce((sum, item) => sum + parseInt(item.calories), 0)} cal
              </Text>
            </View>

            {day.items.map((item, itemIndex) => (
              <TouchableOpacity 
                key={itemIndex} 
                style={styles.itemContainer}
                onPress={() => openItemDetails(item)}
              >
                <Image source={item.img} style={styles.itemImage} />
                <View style={styles.itemDetails}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <View style={styles.itemMeta}>
                    <Text style={styles.itemTime}>{item.time}</Text>
                    <Text style={styles.itemCalories}>{item.calories}</Text>
                  </View>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#999" />
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </ScrollView>

      {/* Modal pour les détails du plat */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {selectedItem && (
              <ScrollView contentContainerStyle={styles.modalScrollContent}>
                <Image source={selectedItem.img} style={styles.modalImage} />
                
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>{selectedItem.name}</Text>
                  <Pressable
                    style={styles.modalClose}
                    onPress={() => setModalVisible(false)}
                  >
                    <Ionicons name="close" size={24} color="#666" />
                  </Pressable>
                </View>

                <View style={styles.modalMeta}>
                  <Text style={styles.modalCategory}>{selectedItem.category}</Text>
                  <Text style={styles.modalTime}>{selectedItem.time}</Text>
                  <Text style={styles.modalCalories}>{selectedItem.calories}</Text>
                </View>

                <Text style={styles.modalDescription}>{selectedItem.description}</Text>

                <Text style={styles.modalSubtitle}>Ingrédients :</Text>
                <View style={styles.ingredientsList}>
                  {selectedItem.ingredients.map((ingredient, index) => (
                    <View key={index} style={styles.ingredientItem}>
                      <Ionicons name="ellipse" size={8} color="#FF6B6B" style={styles.ingredientIcon} />
                      <Text style={styles.ingredientText}>{ingredient}</Text>
                    </View>
                  ))}
                </View>
              </ScrollView>
            )}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  backButton: {
    padding: 8,
  },
  safeArea: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  container: {
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 25,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
  },
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  filterText: {
    marginLeft: 5,
    color: "#FF6B6B",
    fontWeight: "500",
  },
  dayContainer: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  dayHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  dayTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  dayCalories: {
    fontSize: 14,
    color: "#666",
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f8f8f8",
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 12,
    marginRight: 15,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
    marginBottom: 5,
  },
  itemMeta: {
    flexDirection: "row",
  },
  itemTime: {
    fontSize: 13,
    color: "#666",
    marginRight: 15,
  },
  itemCalories: {
    fontSize: 13,
    color: "#FF6B6B",
    fontWeight: "500",
  },
  // Styles pour le modal
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 20,
    maxHeight: "80%",
  },
  modalScrollContent: {
    padding: 20,
  },
  modalImage: {
    width: "100%",
    height: 200,
    borderRadius: 15,
    marginBottom: 15,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    flex: 1,
  },
  modalClose: {
    padding: 5,
    marginLeft: 10,
  },
  modalMeta: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    flexWrap: "wrap",
  },
  modalCategory: {
    backgroundColor: "#FF6B6B20",
    color: "#FF6B6B",
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 10,
    fontSize: 14,
    fontWeight: "500",
    marginRight: 10,
    marginBottom: 5,
  },
  modalTime: {
    color: "#666",
    fontSize: 14,
    marginRight: 10,
    marginBottom: 5,
  },
  modalCalories: {
    color: "#FF6B6B",
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 5,
  },
  modalDescription: {
    color: "#333",
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
  },
  modalSubtitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 10,
  },
  ingredientsList: {
    marginBottom: 20,
  },
  ingredientItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  ingredientIcon: {
    marginRight: 10,
  },
  ingredientText: {
    color: "#333",
    fontSize: 16,
  },
});