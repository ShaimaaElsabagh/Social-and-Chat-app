

import React, { useState, useEffect } from 'react'
import {
    Text,
    View,
    StatusBar,
    TouchableOpacity,
    FlatList,
    Image,
    TouchableNativeFeedback,
    TextInput,
    Modal,
    AsyncStorage,
    StyleSheet,
    PermissionsAndroid
} from 'react-native'
import { HomeStyle } from './ConstStyle'
import Message from './Message';
import Chat from './Chat'

import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Entypo from 'react-native-vector-icons/Entypo'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import * as ImagePicker from 'react-native-image-picker';
import ActionButton from 'react-native-action-button';




const Home = props => {

    function renderPost() {
        return (
            <Modal

                visible={Add_Modal_Vis}
                onRequestClose={() => {
                    setVis(false)
                }}
            >


                <View style={{ width: '100%', height: '100%', backgroundColor: "#fff" }}>
                    <View style={{ width: '100%', height: 45, backgroundColor: "#fff", flexDirection: "row" }}>



                        <TouchableOpacity style={{
                            width: '80%',
                            height: "100%",
                            justifyContent: "center",
                            alignItems: "flex-start",
                            paddingLeft: 15
                        }}
                            onPress={() => {
                                addItem()
                            }}

                        >
                            <Text style={{ color: "#00f", fontSize: 18 }}>Add Post</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{
                            width: "20%",
                            height: '100%',
                            alignItems: "flex-end",
                            justifyContent: "center",
                            paddingRight: 15
                        }}
                            onPress={() => {
                                setVis(false)
                            }}
                        >
                            <AntDesign name="arrowleft" color="#00f" size={25} />
                        </TouchableOpacity>


                    </View>


                    <TextInput
                        style={{
                            justifyContent: "center",
                            alignItems: "center",
                            fontSize: 18,
                            textAlign: 'center',
                            width: '90%',
                            // backgroundColor:'#f0f',
                            alignSelf: 'center',
                            color: '#333'
                        }}
                        value={Add_post_content}
                        onChangeText={(value) => {
                            setAdd_post_content(value)
                        }}
                        placeholder="What`s on your mind ?"
                        multiline
                        numberOfLines={4}
                        placeholderTextColor="#999"
                    />

                    <View style={{
                        width: "100%",
                        height: 400,
                        // backgroundColor: "#f0f",
                        justifyContent: "center",
                        alignItems: "center"
                    }}>

                        {
                            photo_uri ? (<Image
                                source={{ uri: photo_uri }}
                                style={styles.images}
                            />) : (
                                <Image
                                    source={{ uri: "none" }}
                                    style={styles.images}
                                />
                            )

                        }

                    </View>
                    <ActionButton buttonColor="rgba(0,0,255,0.5)">
                        <ActionButton.Item buttonColor='#9b59b6' title="camera" >
                            <AntDesign name="camera" style={styles.actionButtonIcon} onPress={() => {launchCamera()}} />
                        </ActionButton.Item>
                        <ActionButton.Item buttonColor='#3498db' title="photo" onPress={() => { select_first_photo() }}>
                            <FontAwesome name="photo" style={styles.actionButtonIcon} />
                        </ActionButton.Item>
                        {/* <ActionButton.Item buttonColor='#349b' title="camera" onPress={() => { launchCamera() }}>
                            <FontAwesome name="camera" style={styles.actionButtonIcon} />
                        </ActionButton.Item> */}

                    </ActionButton>

                </View>
            </Modal>
        )
    }
    const [Add_Modal_Vis, setVis] = useState(false)
    const [Add_post_content, setAdd_post_content] = useState("")
    const [photo_data, setphoto_data] = useState()
    const [photo_uri, setphoto_uri] = useState()
    const options = {
        title: 'Select Avatar',
        storageOptions: {
            skipBackup: true,
            path: 'images',
        },
    };
    const [posts, setPosts] = useState([
        {
            // id: '1',
            user_name: 'Shaimaa Elsabagh',
            post_time: "4 hours age",
            post_content: 'Hi this is test',
            user_img: "https://th.bing.com/th/id/R.d8c88f892c58773f1d09eac0b5247d9f?rik=04nGhl484F1QjQ&pid=ImgRaw&r=0",
            post_img: "https://th.bing.com/th/id/R.d8c88f892c58773f1d09eac0b5247d9f?rik=04nGhl484F1QjQ&pid=ImgRaw&r=0",
            liked: true,
            num_likes: 1,
            comments: "5",


        },
        {
            // id: '2',
            user_name: 'Rewaa Elnagar',
            post_time: "Just now",
            post_content: 'Hello everyone',
            user_img: "https://th.bing.com/th/id/OIP.UrpZi0AY9mG7MRtobpqt0wHaE9?pid=ImgDet&rs=1",
            post_img: "none",
            liked: false,
            num_likes: 12,
            comments: "0",


        },
        {
            // id: '3',
            user_name: 'Mariam Ghanem',
            post_time: "38 mins ago",
            post_content: 'Hi this is test',
            user_img: "https://th.bing.com/th/id/R.d8c88f892c58773f1d09eac0b5247d9f?rik=04nGhl484F1QjQ&pid=ImgRaw&r=0",
            post_img: "https://th.bing.com/th/id/OIP.UrpZi0AY9mG7MRtobpqt0wHaE9?pid=ImgDet&rs=1",
            liked: false,
            num_likes: 0,
            comments: "12",


        },

        {
            // id: '4',
            user_name: 'Kholoud Draz',
            post_time: "1 day",
            post_content: 'hello',
            user_img: "https://th.bing.com/th/id/R.d8c88f892c58773f1d09eac0b5247d9f?rik=04nGhl484F1QjQ&pid=ImgRaw&r=0",
            post_img: "none",
            liked: false,
            num_likes: 7,
            comments: "7",


        }
    ]);


    const Get_Data = async () => {
        let arr = await AsyncStorage.getItem("posts")
        arr = JSON.parse(arr)

        if (arr == null) {
            arr = posts
        } else {
            setPosts(arr)
        }
    }


    useEffect(() => {
        Get_Data()
        requestCameraPermission();
    }, [])


    const Set_Data = async (arr) => {
        await AsyncStorage.setItem("posts", JSON.stringify(arr))
    }




    const requestCameraPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                    title: "Cool Photo App Camera Permission",
                    message: "Cool Photo App needs access to your camera " + "so you can take awesome pictures.",
                    buttonNeutral: "Ask Me Later",
                    buttonNegative: "Cancel",
                    buttonPositive: "OK"
                },
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log('You can use the camera');
            } else {
                console.log('Camera permission denied');
            }
        } catch (err) {
            console.warn(err);
        }
    };


    function select_first_photo() {

        let options = {
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };
        ImagePicker.launchImageLibrary({ options, includeBase64: true }, (res) => {


            if (res.didCancel) {
                console.log('User cancelled image picker');
            } else if (res.error) {
                console.log('ImagePicker Error: ', res.error);
            } else if (res.customButton) {
                console.log('User tapped custom button: ', res.customButton);
                alert(res.customButton);
            } else {

                setphoto_data(res.assets[0])
                setphoto_uri(res.assets[0].uri)
            }
        });


    }




    function launchCamera() {

        let options = {
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };
        ImagePicker.launchCamera(options, res => {
            console.log('Response = ', res);

            if (res.didCancel) {
                console.log('User cancelled image picker');
            } else if (res.error) {
                console.log('ImagePicker Error: ', res.error);
            } else if (res.customButton) {
                console.log('User tapped custom button: ', res.customButton);
                alert(res.customButton);
            } else {
                setphoto_data(res.assets[0])
                setphoto_uri(res.assets[0].uri)
            }
        });


        //     setphoto_data(response.data)
        //    setphoto_uri(response)
        //    setfileUri(response.uri)









    }

    const addItem = async () => {
        if (Add_post_content != '' && photo_uri ) {
            let newObj = {
                post_content: Add_post_content,
                post_time: "Just now",
                user_name: 'Shaimaa Elsabagh',
                user_img: "https://th.bing.com/th/id/R.d8c88f892c58773f1d09eac0b5247d9f?rik=04nGhl484F1QjQ&pid=ImgRaw&r=0",
                liked: false,
                num_likes: 0,
                comments: "0",
                post_img: photo_uri,
            }

            posts.unshift(newObj)
            Set_Data(posts)
        } else {
            null
        }


        setPosts(posts)
        setAdd_post_content("")
        setphoto_uri("")
        setVis(false)
    }



    const Change_Like = (item) => {
        if (item.liked == true) {
            item.liked = !item.liked
            item.num_likes = item.num_likes - 1
            setPosts([...posts])
        } else {
            item.liked = !item.liked
            item.num_likes = item.num_likes + (1)
            setPosts([...posts])
        }
        Set_Data(posts)
    }

    const Delete= async(i)=> {
        
        let newArr= posts.filter((item , index) => i !=index)
          setPosts(newArr);
          Set_Data(posts)

    }

    return (
        <>
            <StatusBar backgroundColor="#fff" barStyle="dark-content" />

            <View style={{
                width: "100%",
                height: "100%",
                backgroundColor: "#fff",
                // alignItems: "center"
            }}>
                <View
                    style={{
                        width: '100%',
                        height: 60,
                        backgroundColor: "#fff",
                        flexDirection: 'row',
                        justifyContent: "center"
                    }}>


                    <View style={{
                        width: '25%',
                        height: '100%',
                        // backgroundColor: '#0',
                        justifyContent: 'center',
                        alignItems: "center",
                    }}>
                        <TouchableNativeFeedback
                            background={TouchableNativeFeedback.Ripple(
                                "#ccc",
                                false,
                                22.5,

                            )}
                            onPress={() =>
                                props.navigation.navigate("Message")
                            }>
                            <View >
                                <Entypo
                                    name="chat"
                                    size={27}
                                    color="#00f"

                                />
                            </View>
                        </TouchableNativeFeedback>


                    </View>


                    <View
                        style={{
                            width: '50%',
                            height: '100%',
                            backgroundColor: '#fff',
                            justifyContent: 'center',
                            alignItems: "center",
                            // paddingLeft: 45

                        }}>

                        <Text
                            style={{
                                color: "#333",
                                fontSize: 20,
                                fontWeight: 'bold',
                            }}>
                            Social Media App
                        </Text>
                    </View>


                    <View style={{
                        width: '25%',
                        height: '100%',
                        // backgroundColor: '#0',
                        justifyContent: 'center',
                        alignItems: "center",
                    }}>
                        <TouchableNativeFeedback
                            background={TouchableNativeFeedback.Ripple(
                                "#ccc",
                                false,
                                22.5,

                            )}
                            onPress={() =>
                                setVis(true)
                            }>
                            <View >
                                <Entypo
                                    name="plus"
                                    size={27}
                                    color="#00f"

                                />
                            </View>
                        </TouchableNativeFeedback>


                    </View>


                </View>

                <FlatList
                    data={posts}
                    keyExtractor={(item, index) => index.toString()}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item , index }) => (
                        <>
                            <View style={{
                                backgroundColor: "#f8f8f8",
                                width: '95%',
                                marginBottom: 20,
                                borderRadius: 10,
                                elevation: 2,
                                alignSelf: 'center'
                            }}>
                                <View style={{
                                    flexDirection: "row",
                                    // justifyContent: 'flex-end',
                                    // padding: 15,
                                    //  backgroundColor: "#ff0",
                                     marginTop:10,
                                     width:'98%',
                                     alignSelf:"center"

                                    
                                }}>

                                    <TouchableOpacity style={{width:"10%" , justifyContent:"flex-start" , alignItems:"flex-start"}}
                                    onPress={()=> {Delete(index)}}
                                    >
                                        <AntDesign name="close" size={25} color="#333" />
                                    </TouchableOpacity>

                                    <View style={{ justifyContent: "center", marginRight: 10  , width:"70%" , }}>
                                        <Text style={{ fontWeight: "bold", fontSize: 14 }}>{item.user_name}</Text>
                                        <Text style={{ color: "#666", fontSize: 12 }}>{item.post_time}</Text>
                                    </View>

                                    <View style={{
                                        width: "20%",
                                        height: '100%',
                                        // backgroundColor: "#f00",
                                        // justifyContent:"center",
                                        // alignItems:"center"
                                    }}>
                                        <Image style={{
                                            width: 55,
                                            height: 55,
                                            borderRadius: 27.5
                                        }}
                                            source={{ uri: item.user_img }}
                                        />
                                    </View>




                                </View>


                                <Text style={{ fontSize: 14, paddingLeft: 15  , paddingRight:15 , paddingTop:5}}>{item.post_content}</Text>


                                {
                                    item.post_img != 'none' ? (
                                        <Image style={{
                                            width: '100%',
                                            height: 250,
                                            marginTop: 15
                                        }}
                                            source={{ uri: item.post_img }}
                                        />
                                    ) : (
                                        <View style={{
                                            width: "92%",
                                            borderBottomColor: '#dddddd',
                                            borderBottomWidth: 1,
                                            alignSelf: "center",
                                            marginTop: 15
                                        }}>

                                        </View>
                                    )
                                }

                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: "space-around",
                                    padding: 15,
                                    width: "100%"

                                }}>
                                    <TouchableOpacity style={{
                                        flexDirection: "row",
                                        justifyContent: "center",
                                        borderRadius: 5,
                                        width: "30%",
                                        alignItems: "center",
                                        // padding:2 
                                    }}>
                                        <Text style={{ fontSize: 12, fontWeight: "bold", color: "#333", marginRight: 5 }}>
                                            {item.comments == 1 ? (
                                                "1 comment"
                                            ) : (

                                                item.comments > 1 ? (
                                                    item.comments + " comments"
                                                ) : ("comment")
                                            )}
                                        </Text>
                                        <EvilIcons name="comment" size={25} />
                                    </TouchableOpacity>

                                    <TouchableOpacity style={{
                                        flexDirection: "row",
                                        justifyContent: "center",
                                        borderRadius: 5,
                                        width: "30%",
                                        alignItems: "center",
                                        backgroundColor: item.liked ? "rgba(0, 0 , 255, 0.2)" : null
                                    }}
                                        onPress={() => {

                                            Change_Like(item)
                                        }}
                                    >
                                        <Text style={{ fontSize: 14, fontWeight: "bold", color: item.liked ? "#00f" : "#333", marginRight: 5, marginBottom: 2 }}>
                                            {item.num_likes == 1 ? (
                                                "1 like"
                                            ) : (

                                                item.num_likes > 1 ? (
                                                    item.num_likes + " likes"
                                                ) : ("like")
                                            )}
                                        </Text>
                                        {
                                            item.liked ? (
                                                <Entypo name="heart" size={25} color="#00f" />
                                            ) : (
                                                <Entypo name="heart-outlined" size={25} color="#333" />
                                            )
                                        }

                                    </TouchableOpacity>
                                </View>
                            </View>

                        </>
                    )}
                />


            </View>
            {renderPost()}
        </>
    )
}


export default Home
const styles = StyleSheet.create({
    actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: 'white',
    },
    images: {
        width: "100%",
        height: "90%",
        // borderColor: 'black',
        borderWidth: 1,
        marginHorizontal: 3,
        borderRadius: 5
    },
});




