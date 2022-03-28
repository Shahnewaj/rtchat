import React, { useEffect, useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, FlatList, Dimensions } from 'react-native'
import { useSelector } from 'react-redux'
import { ReceiveMessage, SendMessage } from '../firebase/chat'
import database from '@react-native-firebase/database';

const width = Dimensions.get('window').width;

const ChatScreen = ({ route }) => {
    const [message, setMessage] = useState('')
    const [allMessages, setAllMessages] = useState([])

    const userState = useSelector(state => state.app.user);
    const { name, friend } = route.params


    useEffect(() => {
        fetchMessages()
    }, [])
    const fetchMessages = async () => {
        try {
            await database()
                .ref('messages')
                .child(userState.user.uid)
                .child(friend.id)
                .on('value', snapshot => {
                    let message = [];
                    snapshot.forEach(data => {
                        message.push({
                            sentBy: data.val().message.sender,
                            receivedBy: data.val().message.receiver,
                            msg: data.val().message.msg,
                        })
                    })
                    setAllMessages(message.reverse())
                });
        } catch (err) {
            console.log(err)
        }

    }

    const handleSemdMessage = () => {
        if (message.length > 0) {
            SendMessage(userState?.user?.uid, friend?.id, message)?.then(() => {
                setMessage('')
            }).catch(err => console.log(err))

            ReceiveMessage(userState?.user?.uid, friend?.id, message)?.then(() => {
                setMessage('')
            }).catch(err => console.log(err))
        }
    }
    return (
        <View style={{ flex: 1, justifyContent: 'space-between' }}>
            <Text>{name}</Text>
            <FlatList
                inverted
                data={allMessages}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <View
                        style={{
                            marginVertical: 5, maxWidth: width / 2, alignSelf: item.sentBy === userState.user.uid ? 'flex-end' : 'flex-start',
                            backgroundColor: item.sentBy === userState.user.uid ? '#fff' : '#ddd', padding: 10, borderRadius: 20, marginHorizontal: 5
                        }}
                    >
                        <Text>{item.msg}</Text>
                    </View>
                )}
            />
            <View style={{
                margin: 20,

            }}>
                <TextInput
                    onChangeText={(text) => setMessage(text)}
                    value={message}
                    style={{
                        padding: 10, backgroundColor: '#ddd', borderColor: '#909090', borderWidth: 1, borderRadius: 10,
                    }} />
                <TouchableOpacity
                    onPress={() => handleSemdMessage()}
                    style={{ padding: 5, borderRadius: 10, backgroundColor: '#0058EC', width: 100, alignItems: 'center', marginVertical: 10, alignSelf: 'flex-end' }}>
                    <Text style={{ color: '#fff', fontWeight: 'bold' }}>Send</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default ChatScreen