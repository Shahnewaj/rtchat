import database from '@react-native-firebase/database';



export const SendMessage = async (ownUid, friendUid, message) => {
    try {
        return await database()
            .ref('messages/' + ownUid)
            .child(friendUid)
            .push({
                message: {
                    sender: ownUid,
                    receiver: friendUid,
                    msg: message
                }
            })
    } catch (error) {
        console.log('adding user to firebase error', error)
    }
}


export const ReceiveMessage = async (ownUid, friendUid, message) => {
    try {
        return await database()
            .ref('messages/' + friendUid)
            .child(ownUid)
            .push({
                message: {
                    sender: ownUid,
                    receiver: friendUid,
                    msg: message
                }
            })
    } catch (error) {
        console.log('adding user to firebase error', error)
    }
}