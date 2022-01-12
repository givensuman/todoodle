import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

import Temp from '../components/Temp'
import Wrapper from '../components/Wrapper'
import Input from '../components/Input'
import List from '../components/List'

const Home = () => {
    const [list, setList] = useState([])
    const handleSubmit = input => 
        setList(state => [...state, {
            id: uuidv4(),
            content: input
        }])
    const handleDelete = key => {
        let shallow = list
        shallow.splice(shallow.findIndex(element => element.id === key), 1)
        setList(shallow)
        console.log(key)
        console.log(list)
    }
    return (
        <>
        <Wrapper>
        <Temp path='/' />
        <Input 
        onSubmit={handleSubmit}
        />
        <List 
        data={list} 
        onDelete={handleDelete}
        />
        </Wrapper>
        </>
    )
}

export default Home