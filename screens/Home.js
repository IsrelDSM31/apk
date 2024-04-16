import React, { useContext, useState, useEffect } from 'react';
import { Text, View, Image, StyleSheet, StatusBar, Dimensions, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FooterMenu from '../components/Menus/FooterMenu';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const Home = () => {
  const [gasData, setGasData] = useState([]);
  const navigation = useNavigation(); 

  useEffect(() => {
    fetchDataAndPopulateTable();
    // Fetch data every 10 seconds (adjust the interval as needed)
    const intervalId = setInterval(fetchDataAndPopulateTable, 10000);

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  async function fetchDataAndPopulateTable() {
    try {
      const response = await fetch('https://apk-alerta.onrender.com/api/v1/gas-data');
      const data = await response.json();
      setGasData(data);
    } catch (error) {
      console.error('Error al obtener los datos:', error);
    }
  }

  const handleLogout = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      <Image
        source={require('../assets/app.jpg')}
        style={styles.backgroundImage}
        resizeMode="cover"
      />
      
      <View style={styles.content}>
        <Image
          source={require('../assets/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>ALERTA</Text>
        
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.tableContainer}>
            <Text style={styles.pageTitle}>DATOS DE GAS</Text>
            <View style={styles.table}>
              <View style={styles.headerRow}>
                <Text style={[styles.headerCell, styles.headerCellGas]}>Cantidad de Gas</Text>
                <Text style={[styles.headerCell, styles.headerCellFecha]}>Fecha</Text>
                <Text style={[styles.headerCell, styles.headerCellHora]}>Hora</Text>
              </View>
              {gasData.map((item, index) => (
                <View key={index} style={styles.row}>
                  <Text style={[styles.cell, item.cantidad_gas > 0 ? styles.redText : null]}>{item.cantidad_gas}</Text>
                  <Text style={[styles.cell, styles.cellFecha]}>{item.fecha}</Text>
                  <Text style={[styles.cell, styles.cellHora]}>{item.hora}</Text>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
        
        <FooterMenu/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6495ED', // Azul como si estuviera saliendo humo
    paddingTop: StatusBar.currentHeight || 0,
  },
  backgroundImage: {
    position: 'absolute',
    width: screenWidth,
    height: screenHeight,
    zIndex: -1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tableContainer: {
    marginVertical: 20,
  },
  pageTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  table: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 5,
    width: screenWidth * 0.9,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: '#000',
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  headerCell: {
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
  },
  headerCellGas: {
    backgroundColor: '#f0f0f0',
  },
  headerCellFecha: {
    backgroundColor: '#e0e0e0',
  },
  headerCellHora: {
    backgroundColor: '#d0d0d0',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: '#000',
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  cell: {
    flex: 1,
    textAlign: 'center',
  },
  redText: {
    color: 'red',
  },
});

export default Home;