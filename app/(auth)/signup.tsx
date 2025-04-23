import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { router , Link } from 'expo-router';

const Signup = ({ navigation }: { navigation: any }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    // Ici, vous ajouterez la logique d'inscription
    console.log(formData);
    router.push('/login');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Bienvenue</Text>
      
      <Text style={styles.label}>Nom</Text>
      <TextInput
        style={styles.input}
        placeholder="Entrer votre nom"
        value={formData.lastName}
        onChangeText={(text) => handleChange('lastName', text)}
      />
      
      <Text style={styles.label}>Prénom</Text>
      <TextInput
        style={styles.input}
        placeholder="Entrer votre prénom"
        value={formData.firstName}
        onChangeText={(text) => handleChange('firstName', text)}
      />
      
      <Text style={styles.label}>Adresse Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Entrer votre Adresse Email"
        keyboardType="email-address"
        value={formData.email}
        onChangeText={(text) => handleChange('email', text)}
      />
      
      <Text style={styles.label}>Mot de passe</Text>
      <TextInput
        style={styles.input}
        placeholder="Entrer votre mot de passe"
        secureTextEntry
        value={formData.password}
        onChangeText={(text) => handleChange('password', text)}
      />
      
      <Text style={styles.label}>Confirmez votre mot de passe</Text>
      <TextInput
        style={styles.input}
        placeholder="Entrer votre mot de passe"
        secureTextEntry
        value={formData.confirmPassword}
        onChangeText={(text) => handleChange('confirmPassword', text)}
      />
      
      {/* <Text style={styles.note}>Aujourd'hui, un accueil chaleureux vous attend !</Text> */}
      
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Créer un compte</Text>
      </TouchableOpacity>

      <Link href="/login" asChild>
        <TouchableOpacity>
          <Text style={styles.signupText} >Déjà un compte ? Se connecter</Text>
        </TouchableOpacity>
      </Link>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#FF6B6B',
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#555',
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 20,
    backgroundColor: '#f9f9f9',
  },
  note: {
    fontSize: 14,
    color: '#888',
    marginBottom: 30,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  button: {
    backgroundColor: '#FF6B6B',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  signupText: {
    marginBlock:"1rem",
    fontSize: 16,
    color: '#4ECDC4',
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
});

export default Signup;