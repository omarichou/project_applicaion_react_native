

import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';
import { Link } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../styles/global';
import { images } from "../../constants";

const { width } = Dimensions.get('window');

const Welcome = () => {
  return (
    <LinearGradient
      colors={[colors.primaryLight, colors.background]}
      style={styles.container}
    >
      {/* Logo et titre */}
      <View style={styles.header}>
        <Image 
          source={ images.logo} 
          style={styles.logo}
        />
        <Text style={styles.title}>Cook IT</Text>
        <Text style={styles.subtitle}>Vos repas, votre plaisir, notre mission !</Text>
      </View>

      {/* Illustration */}
      {/* <Image 
        source={ images.logo} 
        style={styles.illustration}
      /> */}

      {/* Boutons d'action */}
      <View style={styles.buttonsContainer}>
        <Link href="/signup" asChild>
          <TouchableOpacity style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>Commencer</Text>
            <Ionicons name="arrow-forward" size={24} color="white" />
          </TouchableOpacity>
        </Link>

        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>Vous avez déjà un compte ? </Text>
          <Link href="/login" asChild>
            <TouchableOpacity>
              <Text style={styles.loginLink}>Se connecter</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingVertical: 50,
  },
  header: {
    alignItems: 'center',
    marginTop: 30,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
    borderRadius:"50%"
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: colors.gray,
    textAlign: 'center',
    maxWidth: '80%',
    lineHeight: 24,
  },
  illustration: {
    width: width * 0.9,
    height: width * 0.7,
    resizeMode: 'contain',
  },
  buttonsContainer: {
    width: '100%',
    marginBottom: 40,
  },
  primaryButton: {
    backgroundColor: colors.primary,
    padding: 18,
    borderRadius: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 5,
  },
  primaryButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 10,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginText: {
    color: colors.gray,
    fontSize: 16,
  },
  loginLink: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Welcome;