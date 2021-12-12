import React, { useState } from "react"
import { View, Text, Image, StatusBar, Dimensions, StyleSheet, TouchableOpacity , ToastAndroid , ActivityIndicator } from 'react-native'
import { launchImageLibrary } from 'react-native-image-picker';
import { TextInput, Button } from 'react-native-paper'
import storage from '@react-native-firebase/storage'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
// import { v4 as uuidv4 } from 'uuid';
export default function Signup({navigation}) {
    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [pass, setPass] = useState("")
    const [loading, setloading] = useState(false)
    const [image, setImage] = useState(null)

     if(loading){
         return(
             <>
             <ActivityIndicator color="#00f" size={22} style={{alignSelf:"center"}}/>
             </>
         )
     }

    const UserSignup= async ()=>{
        setloading(true)
        if(!email || !pass || !image || !name){
            alert("Please complete fields")
        }

      try{
        const result= await auth().createUserWithEmailAndPassword(email , pass)
        firestore().collection('users').doc(result.user.uid).set({
          name:name,
          email:result.user.email,
          uid:result.user.uid,
          pic:image,
          status : 'online'
        })
        setloading(false)
      }catch(err){
          alert("something is wrong")
      }

    }
    const pickImageAndUpload = () => {
        launchImageLibrary({ quality: 0.5 }, (fileobj) => {

            const uploadTask = storage().ref().child(`/userprofile/${Date.now()}`).putFile(fileobj.assets[0].uri)
            uploadTask.on('state_changed',
                (snapshot) => {

                    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    if (progress == 100) {
                        setTimeout(() => {
                            ToastAndroid.showWithGravity(
                        'Image is uploaded',
                              ToastAndroid.SHORT,
                              ToastAndroid.BOTTOM,
                            );
                          }, 250);
                    }

                },
                (error) => {
                    alert("error uploading image")
                },
                () => {
                    uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                        setImage(downloadURL)
                    });
                }
            );
        })
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

                    <TextInput
                        value={name}
                        label="Name.."
                        onChangeText={(value) => {
                            setName(value)
                        }}
                        
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
                        onPress={() => pickImageAndUpload()}
                    >
                        <Text style={{ color: "#fff", fontSize: 20 }}>Select profile photo</Text>
                    </TouchableOpacity>

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
                            UserSignup()

                        }}
                    >
                        <Text style={{ color: "#fff", fontSize: 20 }}>Sign up</Text>
                    </TouchableOpacity>


                    <TouchableOpacity
                        onPress={() =>
                            {navigation.goBack()}
                        }
                    >
                        <Text style={{ fontFamily: "underline", alignSelf: "center", marginTop: 5, fontSize: 17 }}>Already an account</Text>
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