

import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { images } from "../../../constants";


export default function ProfilePage() {
  return (
    <View style={styles.container}>
      {/* Header avec avatar */}
      <View style={styles.profileHeader}>
        <Image
          source={images.logo} 
          style={styles.avatar}
        />
        <Text style={styles.profileName}>Rayane Ks</Text>
        <Text style={styles.profileEmail}>rayane@example.com</Text>
      </View>
      
      {/* Menu des actions */}
      <View style={styles.menuContainer}>
        <Link href="/profile/edit" asChild>
          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="person-outline" size={24} color="#666" />
            <Text style={styles.menuText}>Modifier Profil</Text>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>
        </Link>
        
        <View style={styles.divider} />
        
        <Link href="/profile/history" asChild>
          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="time-outline" size={24} color="#666" />
            <Text style={styles.menuText}>Historique</Text>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>
        </Link>
        
        <View style={styles.divider} />
        
        <TouchableOpacity style={styles.menuItem}>
          <Ionicons name="log-out-outline" size={24} color="#e74c3c" />
          <Text style={[styles.menuText, styles.logoutText]}>Déconnexion</Text>
        </TouchableOpacity>
      </View>

    
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  profileHeader: {
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
    backgroundColor: 'white',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
    borderWidth: 3,
    borderColor: '#FF6B6B',
  },
  profileName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 16,
    color: '#666',
  },
  menuContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginHorizontal: 20,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 18,
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    marginLeft: 16,
    color: '#333',
  },
  logoutText: {
    color: '#e74c3c',
  },
  divider: {
    height: 1,
    backgroundColor: '#f0f0f0',
    marginLeft: 40, // Align with icon + margin
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 12,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  navItem: {
    alignItems: 'center',
  },
  navText: {
    fontSize: 12,
    marginTop: 4,
    color: '#666',
  },
});