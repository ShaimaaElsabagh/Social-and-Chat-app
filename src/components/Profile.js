
import React, { useEffect, useState } from 'react'
import { Text, View, StatusBar, TouchableOpacity, FlatList, Image, ActivityIndicator } from 'react-native'
import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'
const Profile = ({ props, user }) => {
    const [profile, setProfile] = useState('')

    useEffect(() => {
        firestore().collection('users').doc(user.uid).get().then(docSnap => {
            setProfile(docSnap.data())
        })
    }, [])

    if (!profile) {
        return (
            <>
                <ActivityIndicator color="#00f" size={22} style={{ alignSelf: "center" }} />
            </>
        )
    }

    return (
        <>
            <View style={{
                width: "100%",
                height: '100%',
                backgroundColor: "#fff",
                //    justifyContent:"center",
                alignItems: "center"
            }}>

                <View style={{
                     width: '100%',
                     height: 50,
                     alignItems: "center",
                      justifyContent: "center",
                     backgroundColor: "#fff",
                     borderBottomColor: "#ccc",
                     borderBottomWidth: 0.5,
                     
                }}>
                   
                   

                        <Text style={{
                            fontSize: 18,
                            color: "#333",
                        }}>Your Profile</Text>
                    </View>
              

                <Image source={{ uri: profile.pic }} style={{
                    width: 250,
                    height: 250,
                    borderRadius: 125,
                    marginTop: 10,
                    borderColor: "#ccc",
                    borderWidth: 1
                }}

                />

                <View
                    style={{
                        width: '90%',
                        alignSelf: "center",
                        height: 60,
                        backgroundColor: "#00f",
                        marginTop: 10,
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: 10
                    }}

                >
                    <Text style={{ color: "#fff", fontSize: 20 }}>{profile.name}</Text>
                </View>

                <View
                    style={{
                        width: '90%',
                        alignSelf: "center",
                        height: 60,
                        backgroundColor: "#00f",
                        marginTop: 10,
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: 10
                    }}

                >
                    <Text style={{ color: "#fff", fontSize: 20 }}>{profile.email}</Text>
                </View>



                <TouchableOpacity
                    style={{
                        width: '90%',
                        alignSelf: "center",
                        height: 60,
                        backgroundColor: "#00f",
                        marginTop: 10,
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: 10
                    }}
                    onPress={() => {
                        firestore().collection('users')
                            .doc(user.uid)
                            .update({
                                status: firestore.FieldValue.serverTimestamp()
                            }).then(() => {
                                auth().signOut()
                            })
                    }}
                >
                    <Text style={{ color: "#fff", fontSize: 20 }}>Log out</Text>
                </TouchableOpacity>


            </View>
        </>
    )
}


export default Profile