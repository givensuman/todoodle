import React, { useContext, useState } from 'react'
import { Button } from 'react-bootstrap'
import { CheckLg, XLg } from 'react-bootstrap-icons'
import styled from '@emotion/styled'
import { AnimatePresence, motion } from 'framer-motion'

import { completeTask } from '../firebase/handleUser'
import { crossOutItem } from '../firebase/handleData'
import { StoreContext } from '../utils/store'

const Item = styled.div`
    background-color: ${
        props => props.crossOut ? 'rgba(255,255,255, 0.5)' : 'white'
    };
    padding: 0.5em;
    margin: 0.5em;
    border-radius: 0.3em;
    font-weight: 500;
    cursor: pointer;
    max-width: 500px;
    width: 100%;
    min-width: 200px;
    display: flex;
    align-items: center;
    transition: box-shadow 0.5s;
    transform: ${props => props.close ? `translateX(-100vw)` : props.finish ? `translateX(100vw)` : `translateX(0)`};
    transition: transform 0.3s;
`

const Text = styled.span`
    cursor: pointer;
`

const StyledButton = styled(Button)`
    border: none;
    color: black;
    margin-left: auto;
    &:hover {
        color: white;
    }
`

const ListItem = ({ item, removeItem, listId }) => {

    const [crossOut, setCrossOut] = useState(item.data.crossOut)
    const [close, setClose] = useState(false)
    const [finish, setFinish] = useState(false)

    const { user, databaseLoad } = useContext(StoreContext)
    return (
        <Item className='shadow' finish={finish} close={close} crossOut={crossOut} 
        onClick={async () => {
            let state = !crossOut
            setCrossOut(state)
            await crossOutItem(user.state.uid, listId, item.id, state)
        }}
        >
            <Text>
            {item.data.content}
            </Text>
            {!close || finish ?
            !crossOut ? 
            <StyledButton
            size='sm'
            variant='outline-danger'
            onClick={() => {
                setClose(true)
                setTimeout(() => removeItem(item.id), 300)
            }}
            >
                <XLg 
                style={{
                    position: 'relative',
                    bottom: '2px'
                }}
                />
            </StyledButton>
            :
            <StyledButton 
            size='sm'
            variant='outline-success'
            onClick={async () => {
                setFinish(true)
                setTimeout(() => removeItem(item.id), 300)
                databaseLoad.set(true)
                await completeTask(user.state.uid)
                    .then(() => {
                        databaseLoad.set(false)
                        user.set({...user.state, completedTasks: user.state.completedTasks + 1})
                    })
                    .catch(() => databaseLoad.set('error'))
            }}
            >
                <CheckLg
                style={{
                    position: 'relative',
                    bottom: '2px'
                }}
                />
            </StyledButton>
            : null}
        </Item>
    )
}

const StyledContainer = styled.div`
    margin-top: 3em;
    width: 100%;
`

const List = ({ data, removeItem, listId }) => {
    return (
        <AnimatePresence>
        <motion.div
                initial={{ x: 500 }}
                animate={{ x: 0 }}
        >
        <StyledContainer className='col center'>
            {data && data.length > 0 ?
            data.map(item => 
            <ListItem 
            key={item.id}
            item={item}
            removeItem={removeItem}
            listId={listId}
            />
            )
            : null}
        </StyledContainer>
        </motion.div>
        </AnimatePresence>
    )
}

export default List