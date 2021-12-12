import React, { useCallback, useEffect, useState , handleFocus } from 'react'
import { Text, View, StatusBar, TextInput , AsyncStorage , TouchableOpacity } from 'react-native'
import { MessageStyle } from './ConstStyle'
import { GiftedChat, Bubble, Send, Composer , InputToolbar } from 'react-native-gifted-chat'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import AntDesign from 'react-native-vector-icons/AntDesign'
import firestore from '@react-native-firebase/firestore'
// import { TouchableOpacity } from 'react-native-gesture-handler'
const Chat = ({user , route}) => {
    
    const [messages, setMessages] = useState([]);
    const {uid} = route.params;
     const getAllMessages = async ()=>{
        const docid  = uid > user.uid ? user.uid+ "-" + uid : uid+"-"+user.uid 
        const querySanp = await firestore().collection('chatrooms')
        .doc(docid)
        .collection('messages')
        .orderBy('createdAt',"desc")
        .get()
       const allmsg =   querySanp.docs.map(docSanp=>{
            return {
                ...docSanp.data(),
                createdAt:docSanp.data().createdAt.toDate()
            }
        })
        setMessages(allmsg)

    
     }

    useEffect(() => {
        const docid  = uid > user.uid ? user.uid+ "-" + uid : uid+"-"+user.uid 
        const messageRef = firestore().collection('chatrooms')
        .doc(docid)
        .collection('messages')
        .orderBy('createdAt',"desc")

      const unSubscribe =  messageRef.onSnapshot((querySnap)=>{
            const allmsg =   querySnap.docs.map(docSanp=>{
             const data = docSanp.data()
             if(data.createdAt){
                 return {
                    ...docSanp.data(),
                    createdAt:docSanp.data().createdAt.toDate()
                }
             }else {
                return {
                    ...docSanp.data(),
                    createdAt:new Date()
                }
             }
                
            })
            setMessages(allmsg)
        })

        return ()=>{
          unSubscribe()
        }

        

    }, [])

    const onSend =(messageArray) => {
        const msg = messageArray[0]
        const mymsg = {
            ...msg,
            sentBy:user.uid,
            sentTo:uid,
            createdAt:new Date()
        }
       setMessages(previousMessages => GiftedChat.append(previousMessages,mymsg))
       const docid  = uid > user.uid ? user.uid+ "-" + uid : uid+"-"+user.uid 
 
       firestore().collection('chatrooms')
       .doc(docid)
       .collection('messages')
       .add({...mymsg,createdAt:firestore.FieldValue.serverTimestamp()})


      }


    const renderBubble = props => {
        return (
            <Bubble
                {...props}
                wrapperStyle={{
                    right: {
                        backgroundColor: "#00f"
                    }
                }}

                textStyle={{
                    right: {
                        color: "#fff"
                    }
                }}
            />
        )
    }


    const renderSend = props => {
        return (
            <Send {...props}>
                <View style={{
                    width: 50,
                    //  backgroundColor:"#00f",
                    justifyContent: 'center',
                    height: '100%',
                    justifyContent: "center",
                    alignItems: "center",
                    marginRight: 10



                }}>
                    <MaterialCommunityIcons name="send-circle"
                        color="#00f"
                        size={32}
                    />



                </View>
            </Send>

        )
    }

    const scrollToBottomComponent = props => {
        return (
            <FontAwesome name="angle-double-down" size={22} color="#fff" />
        )
    }



  
    return (
        <>
            <StatusBar backgroundColor="#fff" barStyle="dark-content" />
          
    

<View style={{
    width:"100%",
    height:'100%',
    backgroundColor:'#fff'
}}>
            <GiftedChat
                messages={messages}
                onSend={text => onSend(text)}
                user={{
                    _id: user.uid,
                }}
                placeholderTextColor="#333"
                
                renderBubble={renderBubble}
                renderSend={renderSend}
                scrollToBottom
                scrollToBottomComponent={scrollToBottomComponent}
                //renderInputToolbar={renderInputToolbar}
                renderInputToolbar={(componentProps) => (
                    <>
      
                    <InputToolbar
                      {...componentProps}
                      primaryStyle={{
                        backgroundColor: "#fff",
                        alignItems: "flex-end",
                        justifyContent: "space-around",
                        paddingLeft:10,
                        width:'100%',
                        height:50,
                        flexDirection:'row-reverse',
                        
                      }}
                      
                      
                      
                    />
                    </>
       )}
            />

</View>

        </>
    )

}


export default Chat
///BKGJzLEtZlUrqMS9yX27sBOzXLs1-I5XpX2CNqucG5Wnj6J8uL0u5r6m1



// match /user/{userID}{
//     allow read : if request.auth !=null;
//     allow write : if request.auth.uid == userID
//     }
//     //BKGJzLEtZlUrqMS9yX27sBOzXLs1-I5XpX2CNqucG5Wnj6J8uL0u5r6m1/messages/{msgdoc}
//     match /chatrooms/{chatid}/messages/{msgdoc}{
//     allow read , write: if request.auth.uid in chatid.split("-")[0];
    
//     }












