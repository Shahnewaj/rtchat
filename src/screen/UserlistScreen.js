import { View, Text, TouchableOpacity, Button, FlatList, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { signOut } from '../firebase/authMethods'
import { useDispatch, useSelector } from 'react-redux';
import { appSetUser } from '../store/actions/app';
import database from '@react-native-firebase/database';


const UserlistScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const userState = useSelector(state => state.app.user);
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(false)


    useEffect(() => {
        fetchUserList()
    }, [])


    const fetchUserList = async () => {
        await setLoading(true)
        await database()
            .ref('/users/')
            .on('value', snapshot => {
                const uid = userState.user.uid
                let userList = [];
                snapshot.forEach(item => {
                    if (item.val().uid !== uid) {
                        userList.push({
                            userName: item.val().name,
                            userEmail: item.val().email,
                            id: item.val().uid
                        })
                    }
                })
                setUsers(userList)
            });
        await setLoading(false)
    }

    const handleSignout = () => {
        dispatch(appSetUser(null))
        if (!!userState) {
            signOut()?.then(() => {
                console.log('User signed out!',)
            })
                .catch((err) => console.log(err))
        }
        navigation.popToTop()
    }

    return (
        <View>
            <Text style={{ fontSize: 20, fontWeight: 'bold', marginVertical: 10 }}>{loading != true && 'UserlistScreen'}</Text>
            {users.length > 0 &&

                <FlatList
                    data={users}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={styles.userItem}
                            onPress={() => navigation.navigate('Chat', {
                                name: item.userName,
                                friend: item,
                            })}
                        >
                            <Text>{item.userName}</Text>
                            <Text>{item.userEmail}</Text>
                        </TouchableOpacity>
                    )}
                />


            }
            <Button
                title="Sign Out"
                onPress={() => handleSignout()}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    userItem: {
        padding: 10,
        margin: 5,
        borderBottomWidth: 1
    }
})

export default UserlistScreen