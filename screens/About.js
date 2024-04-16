import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import FooterMenu from "../components/Menus/FooterMenu";

const About = () => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.imageContainer}>
          <Image
            source={require('../assets/logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.description}>
          "Software innovations" ofrece una aplicación móvil diseñada para brindar seguridad y tranquilidad a los usuarios en sus hogares. La aplicación proporciona alertas instantáneas sobre niveles de gas peligrosos, ayudando a prevenir accidentes y proteger a las familias.
        </Text>
        <Text style={styles.sectionTitle}>Funcionalidades Principales:</Text>
        <Text style={styles.listItem}>1. <Text style={styles.listItemText}>Alertas en Tiempo Real: "Software innovations" monitorea constantemente los niveles de gas en el ambiente y envía alertas instantáneas al dispositivo móvil del usuario en caso de detectar concentraciones peligrosas de gas.</Text></Text>
        <Text style={styles.sectionTitle}>Consejos de Seguridad:</Text>
        <Text style={styles.listItemText}>- "Software innovations" ofrece consejos útiles sobre cómo prevenir fugas de gas, qué hacer en caso de emergencia y cómo mantener seguros los sistemas de gas en el hogar.</Text>
        <Text style={styles.sectionTitle}>Beneficios:</Text>
        <Text style={styles.listItemText}>- Seguridad Residencial: Protege a tu familia y a tu hogar contra los peligros de las fugas de gas.</Text>
        <Text style={styles.listItemText}>- Tranquilidad: Recibe alertas instantáneas en tu dispositivo móvil estés donde estés, para una mayor tranquilidad.</Text>
        <Text style={styles.listItemText}>- Plataformas Disponibles: iOS y Android Disponibilidad: "Software innovations" está disponible para su descarga gratuita en la App Store y Google Play Store.</Text>
        <FooterMenu />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
    backgroundColor: '#FFEBEE', // Fondo rojo claro
  },
  content: {
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  logo: {
    width: 200,
    height: 200,
  },
  description: {
    marginBottom: 20,
    fontSize: 16,
    textAlign: "center",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  listItem: {
    marginBottom: 10,
  },
  listItemText: {
    marginLeft: 10,
  },
});

export default About;
