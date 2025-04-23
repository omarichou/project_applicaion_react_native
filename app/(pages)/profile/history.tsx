

import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
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
      },
      {
        img: images.logo,
        name: "Poisson Blanc",
        time: "19:45",
        calories: "450 cal",
      },
      {
        img: images.logo,
        name: "Tiramisu",
        time: "20:15",
        calories: "280 cal",
      },
    ],
  },
  {
    date: "Hier",
    items: [
      { img: images.logo, name: "Bourak", time: "13:00", calories: "380 cal" },
      {
        img: images.logo,
        name: "Poisson Blanc",
        time: "20:00",
        calories: "450 cal",
      },
      {
        img: images.logo,
        name: "Tiramisu",
        time: "20:30",
        calories: "280 cal",
      },
    ],
  },
];

export default function HistoryPage() {
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
              <Text style={styles.dayCalories}>Total: 1,050 cal</Text>
            </View>

            {day.items.map((item, itemIndex) => (
              <TouchableOpacity key={itemIndex} style={styles.itemContainer}>
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
});
