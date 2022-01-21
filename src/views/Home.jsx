import React, { useState, useContext } from 'react'
import { v4 as uuidv4 } from 'uuid'

import Wrapper from '../components/Wrapper'
import Input from '../components/Input'
import List from '../components/List'
import Nav from '../components/Nav'
import Loading from '../components/Loading'
import Saving from '../components/Saving'

import { StoreContext } from '../utils/store'

import { addItem, getItems, deleteItem } from '../firebase/handleData'
import { useEffect } from 'react'

const Home = () => {

    const [index, setIndex] = useState(0)
    const [loading, setLoading] = useState(false)
    const [items, setItems] = useState([])
    const { user, lists, databaseLoad } = useContext(StoreContext)

    const handleSubmit = async input => {
        const index_ = index // in case index changes before Promise fulfilled
        if (input.length > 0) {
            const id = uuidv4()
            setItems(state => [...state, {
                id: id,
                data: {
                    content: input,
                    crossOut: false
                }
            }])
            await addItem(user.state.uid, lists.state[index_].id, id, {
                content: input,
                crossOut: false
            })
        }

    }
        
    const increaseIndex = () => 
        setIndex(state => {
            if (state === lists.state.length - 1) {
                return 0
            } else {
                return state + 1
            }
        })
    const decreaseIndex = () => 
        setIndex(state => {
            if (state === 0) {
                return lists.state.length - 1
            } else {
                return state - 1
            }
        })
    const openList = id => {
        setIndex(lists.state.findIndex(list => list.id === id))
    }
    const removeList = async id => {
        const listIndex = lists.state.findIndex(list => list.id === id)
        if (index > 0) {
            setIndex(listIndex - 1)
        }
        lists.state.splice(listIndex, 1)
    }
    const getListItems = async id => {
        setLoading(true)
        await getItems(user.state.uid, id)
            .then(res => setItems(res))
            .catch(err => console.error(err))
        setLoading(false)
    }
    const removeItem = async xid => {
        setItems(state => state.filter(item => item.id !== xid))
        databaseLoad.set(true)
        await deleteItem(user.state.uid, lists.state[index].id, xid)
            .then(() => databaseLoad.set(false))
            .catch(() => databaseLoad.set('error'))
    }
    useEffect(() => getListItems(lists.state[index].id), [index])
    return (
        <>
        <Wrapper>
            <Nav 
            data={lists.state[index] || lists.state[lists.state.length - 1]} 
            prev={decreaseIndex}
            next={increaseIndex}
            openList={openList}
            removeList={removeList}
            disabled={loading}
            />
            {loading ? <Loading /> :
            <>
                <Input 
                onSubmit={handleSubmit}
                />
                <List
                listId={lists.state[index].id}
                data={items}
                removeItem={removeItem}
                />
            </>
            }
        </Wrapper>
        <Saving />
        </>
    )
}

export default Home