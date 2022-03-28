import React, { useEffect } from 'react'
import { View, Button } from 'react-native'
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { googleSignIn, } from '../firebase/authMethods';
import { useDispatch, useSelector } from 'react-redux';
import { appSetUser } from '../store/actions/app';
import { AddUserToFirebase } from '../firebase/user';



const LoginScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const userState = useSelector(state => state.app.user);

    useEffect(() => {
        GoogleSignin.configure({
            webClientId: '1091047888246-fsaq7qd5r43hh4acna8ir2s8c79ljgtc.apps.googleusercontent.com',
        });
    }, []);

    useEffect(() => {
        if (!!userState) {
            navigation.navigate('Userlist')
        }
    }, [userState])


    const handleGoogleSignIn = () => {
        if (!!userState) {
            navigation.navigate('Userlist')
        } else {
            googleSignIn()?.then((res) => {
                if (!!res) {
                    dispatch(appSetUser(res))
                    AddUserToFirebase(res?.user?.displayName, res?.user?.email, res?.user?.uid)
                    navigation.navigate('Userlist')
                }
            }
            ).catch((err) => console.log(err))
        }
    }



    return (
        <View>
            <Button
                title="Google Sign-In"
                onPress={() => handleGoogleSignIn()}
            />
        </View>
    )
}

export default LoginScreen;