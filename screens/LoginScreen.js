import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import firebaseApp from "../firebase";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithRedirect,
} from "firebase/auth";
import { addDoc } from "firebase/firestore";
const auth = getAuth(firebaseApp);

const LoginScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullname, setFullname]=useState('')
  const [phone, setPhone]=useState('')
  const [identification, setIdentification]=useState('')
  const [isLogin, setIsLogin]=useState(true)
  
  const navigation = useNavigation()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        navigation.replace("Home")
      }
    })

    return unsubscribe
  }, [])
  
  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth,email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
        try {
          addDoc(collection(db, "usersInfo"), {
            fullname: fullname,
            phone: phone,
            identification: identification,
            role: "user",
            userId: user.uid
          });
  
          navigation.navigate("UsersList");
        } catch (error) {
          console.log(error)
        }
      })
      .catch(error => alert(error.message))
  }

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
    //sIWEP(auth, email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
        console.log('Logged in with:', user.email);
        
      })
      .catch(error => alert(error.message))
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
    >{!isLogin &&
        <View style={styles.inputContainer}>
            <TextInput
                placeholder="Nombre completo"
                value={fullname}
                onChangeText={text => setFullname(text)}
                style={styles.input}
                />
            <TextInput
            label="Id"
            placeholder="Identificación"
            value={identification}
            onChangeText={text => setIdentification(text)}
            style={styles.input}
            />
            <TextInput
            placeholder="Teléfono"
            value={phone}
            onChangeText={text => setPhone(text)}
            style={styles.input}
            keyboardType="phone-pad"
            />
      </View>
    }
      
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={text => setEmail(text)}
          style={styles.input}
          email-address
        />
        <TextInput
          placeholder="Contraseña"
          value={password}
          onChangeText={text => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />
      </View>

      <View style={styles.buttonContainer}>
        {isLogin && 
        <TouchableOpacity
          onPress={handleLogin}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Iniciar sesión</Text>
        </TouchableOpacity>
        }
        {!isLogin &&
        <TouchableOpacity
          onPress={handleSignUp}
          style={[styles.button]}
        >
          <Text style={styles.buttonText}>Registrarse</Text>
        </TouchableOpacity>
        }
        <TouchableOpacity
          onPress={() => setIsLogin(!isLogin)}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>
            {!isLogin ?"Tengo cuenta. Iniciar sesión" :
            "No tengo cuenta. Registrarme"}</Text>
        </TouchableOpacity>
        
      </View>
    </KeyboardAvoidingView>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    width: '80%'
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  button: {
    backgroundColor: '#0782F9',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonOutline: {
    backgroundColor: 'white',
    marginTop: 5,
    borderColor: '#0782F9',
    borderWidth: 2,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  buttonText2: {
    //color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  buttonOutlineText: {
    color: '#0782F9',
    fontWeight: '700',
    fontSize: 16,
  }
})