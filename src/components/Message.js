import React, { useState, useEffect } from 'react'
import { Text, View, StatusBar, TouchableOpacity, FlatList, Image } from 'react-native'
import { HomeStyle } from './ConstStyle'
// import Message from './Message';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
// import { isTemplateElement } from '@babel/types';
import auth from '@react-native-firebase/auth'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import firestore from '@react-native-firebase/firestore'


const Message = ({user , navigation}) => {
    //console.log(user)
    const [users,setUsers] = useState(null)
    const getUsers = async ()=>{
             const querySanp = await firestore().collection('users').where('uid','!=',user.uid).get()
             const allusers = querySanp.docs.map(docSnap=>docSnap.data())
            //  console.log(allusers)
             setUsers(allusers)
    }

    useEffect(()=>{
        getUsers()
    },[])

    return (
        <>
            <StatusBar backgroundColor="#fff" barStyle="dark-content" />
            <View style={HomeStyle.continerStyle}>
                <View style={HomeStyle.headerStyle}>
                    <View style={{
                        backgroundColor: "#fff",
                        width: "30%",
                        height: "100%",
                        justifyContent: "center",
                        alignItems: "flex-start",
                        paddingLeft: 10
                    }}>
                        <MaterialIcons name="account-circle" size={34} color="#00f" style={{
                            // marginRight: 50

                        }}
                            onPress={() =>
                                navigation.navigate('Profile')
                            // {
                            //     firestore().collection('users')
                            //     .doc(user.uid)
                            //     .update({
                            //       status:firestore.FieldValue.serverTimestamp()
                            //     })
                            // }
                            }
                        />
                    </View>
                    <View style={{
                        backgroundColor: "#fff",
                        width: "70%",
                        height: "100%",
                        justifyContent: "center",
                        alignItems: "flex-start",
                        paddingLeft: 25
                    }}>


                        <Text style={HomeStyle.headerTitle}>All Messages</Text>
                    </View>
                </View>
                <FlatList
                    data={users}
                    keyExtractor={item => item.uid}
                    renderItem={({ item }) => (
                        <>
                            <TouchableOpacity style={HomeStyle.itemStyle}
                                onPress={() => navigation.navigate("Chat" , {name:item.name , uid:item.uid , 
                                    status :typeof(item.status) =="string"? item.status : item.status
                                
                                })}
                            >
                                <View style={{ width: "85%", height: '100%', }}>
                                    <View style={{
                                        width: '95%',
                                        flexDirection: "row",
                                        //backgroundColor: "#f0f",
                                        marginTop: 10,
                                        height: 20,
                                        justifyContent: "center"
                                    }}>

                                        <View style={{
                                            alignItems: "flex-start",
                                            width: "50%",
                                            // backgroundColor: "#f0f",
                                        }}>
                                            {/* <Text style={{
                                                color: "#333"
                                            }}>{item.msg_Time}</Text> */}
                                        </View>

                                        <View style={{
                                            alignItems: "flex-end",
                                            width: "50%",
                                            // backgroundColor: "#00f",
                                        }}>
                                            <Text style={{
                                                color: "#333"
                                            }}>{item.name}</Text>
                                        </View>



                                    </View>


                                    <View style={{
                                        // backgroundColor:"#ff0",
                                        width: "95%",
                                        marginTop: 5
                                    }}>
                                        <Text style={{ color: "#333" }}>{item.email}</Text>
                                    </View>

                                </View>
                                <View style={{
                                    width: '15%',
                                    height: '100%',
                                    justifyContent: "center",
                                    alignItems: 'center'
                                }}>
                                    <Image source={{
                                        uri: item.pic
                                    }}
                                        style={HomeStyle.imgStyle}
                                    />
                                </View>



                            </TouchableOpacity>
                        </>
                    )}
                />

            </View>


        </>
    )

}



// const navigator = createStackNavigator(
//     {
//         Home: Home,
//         Message: Message

//     }, {
//     headerMode: "none"
// }

// )

// export default createAppContainer(navigator)

export default Message


