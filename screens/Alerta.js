import { View, Text, StyleSheet, FlatList } from "react-native";
import React, { useState, useEffect } from "react";
import FooterMenu from "../components/Menus/FooterMenu";

const Alerta = () => {
  const [alertas, setAlertas] = useState([]);
  const [mensajeAdvertencia, setMensajeAdvertencia] = useState("");

  useEffect(() => {
    // Aquí podrías realizar una solicitud a tu servidor para obtener las últimas alertas de gas
    // y luego establecerlas en el estado utilizando setAlertas
    const obtenerAlertas = async () => {
      try {
        // Realizar solicitud al servidor para obtener las alertas de gas
        const respuesta = await fetch('https://apk-alerta.onrender.com/api/v1/gas-data');
        const datos = await respuesta.json();
        // Establecer las alertas en el estado
        setAlertas(datos);
      } catch (error) {
        console.error('Error al obtener las alertas:', error);
      }
    };

    // Llamar a la función para obtener las alertas cuando el componente se monta
    obtenerAlertas();

    // Establecer el mensaje de advertencia
    setMensajeAdvertencia("¡Advertencia! Se han detectado niveles de gas peligrosos.");
  }, []);

  const renderAlerta = ({ item }) => (
    <View style={styles.alertaContainer}>
      <Text style={styles.fechaHora}>{item.fecha} - {item.hora}</Text>
      <Text style={styles.mensaje}>{item.mensaje}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={{ flex: 1, justifyContent: "flex-end" }}>
        <Text style={styles.advertencia}>{mensajeAdvertencia}</Text>
        <FlatList
          data={alertas}
          renderItem={renderAlerta}
          keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={() => (
            <View style={styles.alertaContainer}>
              <Text>No hay alertas disponibles</Text>
            </View>
          )}
        />
        <FooterMenu />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFCCCC", // Fondo de color rojo claro
    margin: 10,
    justifyContent: "space-between",
    marginTop: 40,
  },
  alertaContainer: {
    backgroundColor: "#fff",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    elevation: 3,
  },
  fechaHora: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  mensaje: {
    fontSize: 14,
  },
  advertencia: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    color: "red",
  },
});

export default Alerta;