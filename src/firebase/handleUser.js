import app from './initializeApp'
import {
    getFirestore,
    doc,
    setDoc,
    updateDoc,
    getDoc
 } from 'firebase/firestore'

const db = getFirestore()

// export const setUser = async user => {
//     await setDoc(doc(db, 'users', user.uid), 
//         {
//             name: user.displayName || '',
//             img: user.photoURL || '',
//             uid: user.uid,
//             completedTasks: user.completedTasks || 0,
//             themeIndex: user.themeIndex || 0
//         }, { merge: true }
//     )
// }

export const getUser = async user => {
    let data = await getDoc(doc(db, 'users', user.uid))
    if (data.exists()) return data.data()

    let initialUser = {
        name: user.displayName || '',
        img: user.photoURL || '',
        uid: user.uid,
        completedTasks: 0,
        themeIndex: 0
    }
    await setDoc(doc(db, 'users', user.uid), initialUser, { merge : true })
    return initialUser
}

export const completeTask = async uid => {
    const currentTasks = await getDoc(doc(db, 'users', uid))
    await updateDoc(doc(db, 'users', uid), {
        completedTasks: currentTasks.data().completedTasks + 1
    })
}

export const changeThemeIndex = async (uid, index) => 
    await updateDoc(doc(db, 'users', uid), {
        themeIndex: index
    }, { merge: true })
