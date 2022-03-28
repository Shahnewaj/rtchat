import database from '@react-native-firebase/database';



export const AddUserToFirebase = async (name, email, uid) => {
    try {
        return await database().ref('/users/' + uid).set({
            name: name,
            email: email,
            uid: uid
        })
    } catch (error) {
        console.log('adding user to firebase error', error)
    }
}