import React, { useState, useContext } from 'react'
import {
    Stack,
    Button,
    Modal,
    Form,
    Spinner
} from 'react-bootstrap'
import styled from '@emotion/styled'

import { addList } from '../firebase/handleData'
import { StoreContext } from '../utils/store'

import Wrapper from './Wrapper'

const Container = styled.div`
    max-width: 500px;
    margin: 15% auto 0;
`

const NoLists = () => {

    const { user, lists } = useContext(StoreContext)

    const [showModal, setShowModal] = useState(false)
    const openModal = () => setShowModal(true)
    const closeModal = () => setShowModal(false)
    const [newListTitle, setNewListTitle] = useState('My new list ✏')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    const createNewList = async title => {
        setLoading(true)
        await addList(user.state.uid, { name: title })
            .then(res => {
                lists.set(state => [...state, {
                    id: res.id,
                    data: {
                        name: title
                    }
                }]
                )
                setShowModal(false)
                setLoading(false)
            })
            .catch(() => {
                setLoading(false)
                setError(true)
            })
    }

    return (
        <>

        <Wrapper style={{ minHeight: '100%' }}>
            <Container>
            <Stack justify='center' align='center' gap={2}>
                <h1>It looks like you don't have any lists.</h1>
                <h3>Let's get you started!</h3>
                <Button onClick={openModal}>Create New List</Button>
            </Stack>
            </Container>
        </Wrapper>

        <Modal show={showModal} onHide={closeModal}>
            <Modal.Header closeButton>
                <Modal.Title>Create a new to-do list</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Label>Give your list a title</Form.Label>
                <Form.Control 
                type='text'
                placeholder='My new list ✏'
                onChange={e => setNewListTitle(e.target.value)}
                />
                <Container 
                w='100'
                justify='center'
                align='center'
                value={newListTitle}
                style={{ marginTop: '10px' }}
                >
                    <Button
                    disabled={loading}
                    onClick={() => createNewList(newListTitle)}
                    >
                    {
                        !loading ? error ? 'Something went wrong' : 'Save' :
                        <Stack direction='horizontal' gap={2}>
                        <Spinner 
                        as='span'
                        animation='border'
                        size='sm'
                        role='status'
                        aria-hidden='true'
                        />
                        <span>Loading</span>
                        </Stack> 
                    }
                    </Button>
                </Container>
            </Modal.Body>
        </Modal>
        </>
    )
}

export default NoLists