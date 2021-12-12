import React, { useState } from "react"
import { View, Text, Image, StatusBar, Dimensions, StyleSheet, TouchableOpacity, ToastAndroid, ActivityIndicator } from 'react-native'
import { TextInput, Button } from 'react-native-paper'
import auth from '@react-native-firebase/auth'
export default function Login({navigation }) {
    const [email, setEmail] = useState("")
    const [pass, setPass] = useState("")
    const [loading, setloading] = useState(false)

    
    if (loading) {
        return (
            <>
                <ActivityIndicator color="#00f" size={22} style={{ alignSelf: "center" }} />
            </>
        )
    }
    const UserLogin = async () => {
        setloading(true)
        if (!email || !pass) {
            setTimeout(() => {
                ToastAndroid.showWithGravity(
                    'please Enter all data',
                    ToastAndroid.SHORT,
                    ToastAndroid.BOTTOM,
                );
            }, 250)
            setloading(false)
            return

        }
        // else if (email != user.email) {
        //    
        // }
        try {
            const result = await auth().signInWithEmailAndPassword(email, pass)
            setloading(false)
        } catch (err) {
            // setloading(false)
            // if(email != result.email){
                setloading(false)
                setTimeout(() => {
                    ToastAndroid.showWithGravity(
                        'email not found',
                        ToastAndroid.SHORT,
                        ToastAndroid.BOTTOM,
                    );
                }, 250)
            // }
            
        
                    

            // alert("something went wrong")
            // setloading(false)
        }


    }
    return (
        <>
            <StatusBar backgroundColor="#fff" barStyle="dark-content" />
            <View style={Styles.continer}>
                <View style={{ alignItems: "center" }}>
                    <Text style={Styles.text}>Welcome</Text>
                    <Image source={require("./welcome.png")} style={Styles.image}
                        resizeMode="center"
                    />
                </View>
                <View style={{
                    marginTop: 5
                }}>

                    <TextInput
                        value={email}
                        label="Email.."
                        onChangeText={(value) => {
                            setEmail(value)
                        }}
                        mode="outlined"
                        style={{
                            width: '95%',
                            alignSelf: "center",
                            textAlign: "left"
                        }}

                    />

                    <TextInput
                        value={pass}
                        label="Password.."
                        onChangeText={(value) => {
                            setPass(value)
                        }}
                        secureTextEntry
                        mode="outlined"
                        style={{
                            width: '95%',
                            alignSelf: "center",
                            textAlign: "left"
                        }}
                    />




                    <TouchableOpacity
                        style={{
                            width: '95%',
                            alignSelf: "center",
                            height: 55,
                            backgroundColor: "#00f",
                            marginTop: 10,
                            alignItems: "center",
                            justifyContent: "center"
                        }}
                        onPress={() => {
                            UserLogin()
                        }}
                    >
                        <Text style={{ color: "#fff", fontSize: 20 }}>Log in</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() =>
                        navigation.navigate('signup')
                    }>
                        <Text style={{ fontFamily: "underline", alignSelf: "center", marginTop: 5, fontSize: 17 }}>Don't have an account ?</Text>
                    </TouchableOpacity>




                </View>
            </View>
        </>
    )
}

const Styles = StyleSheet.create({
    continer: {
        width: "100%",
        height: "100%",
        backgroundColor: "#fff"
    },
    text: {
        color: "#00f",
        fontSize: 22,
        fontWeight: "bold",
        margin: 10
    },
    image: {
        width: 200,
        height: 200,
        borderRadius: 100,
    }
})