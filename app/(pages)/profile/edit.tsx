

// import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
// import { router } from 'expo-router';
// import { images } from "../../../constants";

// export default function EditProfile() {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>modifier le profil</Text>
      
//       {/* Section Photo de profil */}
//       <View style={{ alignItems:"center" , marginTop:"2rem"}}>
//         {/* <Text style={styles.sectionTitle}>Modifier la photo</Text> */}
//         <Image
//           source={images.logo}
//           style={{borderRadius:'50%' }}
//         />
//       </View>
      
//       {/* Champ Nom */}
//       <View style={styles.inputGroup}>
//         <Text style={styles.label}>Nom</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="changer le nom"
//           defaultValue="Rayane"
//         />
//       </View>
      
//       {/* Champ Prénom */}
//       <View style={styles.inputGroup}>
//         <Text style={styles.label}>Prénom</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="changer le Prénom"
//           defaultValue="Ks"
//         />
//       </View>
      
//       {/* Bouton Modifier */}
//       <TouchableOpacity 
//         style={styles.saveButton}
//         onPress={() => router.back()}
//       >
//         <Text style={styles.saveButtonText}>Modifier</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }





// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//     backgroundColor: '#fff',
//   },
//   header: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 24,
//   },
//   section: {
//     marginBottom: 24,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 16,
//   },
//   formGroup: {
//     marginBottom: 16,
//   },
//   label: {
//     marginBottom: 8,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ddd',
//     borderRadius: 4,
//     padding: 12,
//   },
//   historySection: {
//     marginTop: 32,
//   },
//   historyDate: {
//     fontWeight: 'bold',
//     marginTop: 8,
//   },
//   historyItem: {
//     marginLeft: 16,
//     marginVertical: 4,
//   },
//   saveButton: {
//     backgroundColor: '#FF6B6B',
//     padding: 16,
//     borderRadius: 8,
//     alignItems: 'center',
//     marginTop: 32,
//   },
//   saveButtonText: {
//     color: 'white',
//     fontWeight: 'bold',
//   },
// });

import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, SafeAreaView, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { images } from "../../../constants";

export default function EditProfile() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Modifier le profil</Text>
          <View style={{ width: 24 }} /> {/* Pour l'alignement */}
        </View>

        {/* Photo de profil */}
        <View style={styles.avatarSection}>
          <Image
            source={images.logo}
            style={styles.avatar}
          />
          <TouchableOpacity style={styles.editAvatarButton}>
            <Ionicons name="camera" size={20} color="#FF6B6B" />
            <Text style={styles.editAvatarText}>Modifier la photo</Text>
          </TouchableOpacity>
        </View>

        {/* Formulaire */}
        <View style={styles.formContainer}>
          {/* Champ Nom */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Nom</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Entrez votre nom"
                defaultValue="Rayane"
              />
              <Ionicons name="create-outline" size={20} color="#999" />
            </View>
          </View>

          {/* Champ Prénom */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Prénom</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Entrez votre prénom"
                defaultValue="Ks"
              />
              <Ionicons name="create-outline" size={20} color="#999" />
            </View>
          </View>

          {/* Champ Email (ajouté pour plus de complétude) */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Entrez votre email"
                defaultValue="rayane@example.com"
                keyboardType="email-address"
              />
              <Ionicons name="mail-outline" size={20} color="#999" />
            </View>
          </View>
        </View>

        {/* Bouton Sauvegarder */}
        <TouchableOpacity 
          style={styles.saveButton}
          onPress={() => router.back()}
        >
          <Text style={styles.saveButtonText}>Enregistrer les modifications</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  container: {
    flexGrow: 1,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingBottom: 10,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
  },
  avatarSection: {
    alignItems: 'center',
    marginVertical: 30,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#FF6B6B',
  },
  editAvatarButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
  },
  editAvatarText: {
    marginLeft: 5,
    color: '#FF6B6B',
    fontWeight: '500',
  },
  formContainer: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    fontWeight: '500',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    paddingVertical: 8,
  },
  saveButton: {
    backgroundColor: '#FF6B6B',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
    marginTop: 30,
    shadowColor: '#FF6B6B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  saveButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
});