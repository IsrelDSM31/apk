import React from 'react';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const FooterMenu = () => {
  // hooks
  const navigation = useNavigation();
  const route = useRoute();
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <FontAwesome5 name="home" style={styles.iconStyle}  
        color={route.name === "Home"  && 'orange'} />
        <Text> HOME</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('About')}>
        <FontAwesome5 name="info-circle" 
        style={styles.iconStyle} 
        color={route.name === "About"  && 'orange'}/>
        <Text>  Informacion</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Alerta')}>
        <FontAwesome5 name="bell" style={styles.iconStyle}  color={route.name === "Alerta"  && 'orange'} />
        <Text> Alerta</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Account')}>
        <FontAwesome5 name="user" style={styles.iconStyle} 
         color={route.name === "Account"  && 'orange'} />
        <Text>Cuenta</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    margin: 10,
    justifyContent: 'space-between',
    marginTop: 40, // Mover los iconos hacia arriba
  },
  iconStyle: {
    marginBottom: 3,
    alignSelf: 'center',
    fontSize: 25,
  },
});

export default FooterMenu;


