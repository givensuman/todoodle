import app from './initializeApp'
import {
    getFirestore,
    collection,
    getDocs,
    doc,
    addDoc,
    setDoc,
    deleteDoc,
    updateDoc,
 } from 'firebase/firestore'

const db = getFirestore()

export const getLists = async uid => {
    let data = []
    let snapshot = await getDocs(collection(db, 'users', uid, 'lists'))
    snapshot.forEach(doc => data.push(
        {
            id: doc.id,
            data: doc.data()
        }
    ))
    if (data.length > 0) return data
    await addList(uid, {
        name: 'My first list ✏'
    })
    return [{
        name: 'My first list ✏'
    }]
}

export const addList = async (uid, data) => {
    let res = await addDoc(collection(db, 'users', uid, 'lists'), {...data})
    return res
}

export const deleteList = async (uid, id) => 
    await deleteDoc(doc(db, 'users', uid, 'lists', id))

export const addItem = async (uid, id, xid, data) => {
    let res = await setDoc(doc(db, 'users', uid, 'lists', id, 'items', xid), {...data})
    return res
}

export const crossOutItem = async (uid, id, xid, state) => 
    await updateDoc(doc(db, 'users', uid, 'lists', id, 'items', xid), {
        crossOut: state
    })

export const deleteItem = async (uid, id, xid) => 
    await deleteDoc(doc(db, 'users', uid, 'lists', id, 'items', xid))

export const getItems = async (uid, id) => {
    let data = []
    let snapshot = await getDocs(collection(db, 'users', uid, 'lists', id, 'items'))
    snapshot.forEach(doc => data.push(
        {
            id: doc.id,
            data: doc.data()
        }
    ))
    return data
}