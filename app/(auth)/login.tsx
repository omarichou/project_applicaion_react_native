import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Link, router } from 'expo-router';

const Login = ({ navigation }: { navigation: any }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    // Ici, vous ajouterez la logique de connexion
    console.log(formData);
    router.push('/home');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Bienvenue</Text>
      
      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Entrer votre email"
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
      
      <Text style={styles.forgotPassword}>Mot de passe oublié ?</Text>
      
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Se connecter</Text>
      </TouchableOpacity>
      

      <Link href="/signup" asChild>
        <TouchableOpacity>
          <Text style={styles.signupText}>Pas encore de compte ? S'inscrire</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
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
  forgotPassword: {
    fontSize: 14,
    color: '#FF6B6B',
    textAlign: 'right',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#FF6B6B',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  signupText: {
    fontSize: 16,
    color: '#4ECDC4',
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
});

export default Login;