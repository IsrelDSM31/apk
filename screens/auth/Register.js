import { View, Text, StyleSheet, Alert, TextInput } from "react-native";
import React, { useState } from "react";
import InputBox from '../../components/Forms/InputBox';
import SubmitButton from "../../components/Forms/SubmitButton";
import axios from "axios";

const Register = ({ navigation }) => {
    // states 
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    // btn function
    const handleSubmit = async () => {
        try {
            setLoading(true)
            if (!name || !email || !password) {
                Alert.alert('Error', 'Por favor completa todos los campos.');
                setLoading(false);
                return;
            }
            setLoading(false);
            const  {data} = await axios.post('/auth/register',{name,email,password});
            alert(data && data.message);
            navigation.navigation('Login')
            console.log("Register Data ==> ", { name, email, password });
        } catch (error) {
            alert(error.response.data.message);
            setLoading(false);
            console.log(error);
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.pageTitle}>Registro</Text>
            <View style={{ marginVertical: 20 }}>
                <InputBox
                    inputTitle={'Nombre'}
                    value={name}
                    setValue={setName}
                />
                <InputBox
                    inputTitle={'Email'}
                    keyboardType="email-address"
                    autoCompleteType="email"
                    value={email}
                    setValue={setEmail}
                />
                <InputBox
                    inputTitle={'Contraseña'}
                    secureTextEntry={true}
                    autoCompleteType="password"
                    value={password}
                    setValue={setPassword}
                />
            </View>
            <SubmitButton btnTile="Registrarse" 
            loading={loading} 
            handleSubmit={handleSubmit} />
            <Text style={styles.linkText}>
                ¿Ya tienes cuenta? Inicia sesión? {" "}
                <Text style={styles.link} onPress={() => navigation.navigate("Login")}>
                    Login
                </Text>
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "#73C6B6",
        paddingHorizontal: 20,
    },
    pageTitle: {
        fontSize: 40,
        fontWeight: "bold",
        textAlign: "center",
        color: "#1e2225",
        marginBottom: 20,
    },
    linkText: {
        textAlign: "center",
        marginTop: 20,
    },
    link: {
        color: "blue",
        fontWeight: "bold",
    },
});

export default Register;






