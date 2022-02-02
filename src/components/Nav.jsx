import React, { useState, useContext, useEffect } from 'react'
import {
    Button,
    Navbar,
    Modal,
    Form,
    Container,
    Spinner,
    Stack,
    Dropdown,
    OverlayTrigger,
    Tooltip, 
    Badge
} from 'react-bootstrap'
import { ChevronLeft, ChevronRight, Trash, PlusLg, PaintBucket, CheckLg } from 'react-bootstrap-icons'
import styled from '@emotion/styled'

import { addList, deleteList } from '../firebase/handleData'
import { StoreContext } from '../utils/store'
import  { useWindowDimensions } from '../utils/dimensions'
import themeArray from '../styles/theme'
import { changeThemeIndex } from '../firebase/handleUser'

const StyledStack = styled(Stack)`
    margin: 2em auto 0;
`
const Divider = styled.hr`
    margin-bottom: 1.5em;
`
const StyledPaintBucket = styled(PaintBucket)`
    cursor: pointer;
    transition: transform ease 0.2s;
    &:hover {
        transform: rotate(17deg);
    }
`
const Preview = styled.div`
    ${props => props.theme}
    height: 30px;
    width: 100%;
`

const Nav = ({ data, removeList, next, prev, openList, disabled }) => {

    const { user, lists, databaseLoad, theme } = useContext(StoreContext)

    const [showModal, setShowModal] = useState(false)
    const openModal = () => setShowModal(true)
    const closeModal = () => setShowModal(false)
    const [newListTitle, setNewListTitle] = useState('My new list ✏')
    const [loading, setLoading] = useState(false)
    const [verifyDelete, setVerifyDelete] = useState(false)
    const { width } = useWindowDimensions()
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
    // Opens list at the end of the array
    // Opens newly created list or last list when current list is deleted
    useEffect(() => {
        openList(lists.state[lists.state.length - 1].id)
    }, [lists.state])

    return (
        <>
        <Navbar>
            <Container justify='center' align='center'>
            {width > 500 ?
            <Dropdown variant='secondary'
            style={{position:'relative',top:'1.1em'}}>
                <Dropdown.Toggle size='sm'>
                    <StyledPaintBucket height='25' width='25' />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                {
                    themeArray.map((item, index) => 
                            <Dropdown.Item key={index} onClick={async () => {
                                theme.set(index)
                                await changeThemeIndex(user.state.uid, index)
                            }}>
                                <Preview theme={item} />
                            </Dropdown.Item>
                        )
                }
                </Dropdown.Menu>
            </Dropdown>
            : null}
            <StyledStack gap={2} direction='horizontal'>
            {width > 500 ?
            <Dropdown>
                <Dropdown.Toggle size='sm'>Select &nbsp;</Dropdown.Toggle>
                <Dropdown.Menu>
                    {lists.state.length > 0 && lists.state.map(item => 
                            <Dropdown.Item 
                            as='button'
                            onClick={() => openList(item.id)}
                            key={item.id}
                            >
                                {item.data.name}
                            </Dropdown.Item>
                        )}
                </Dropdown.Menu>
            </Dropdown>
            : null}
            <OverlayTrigger overlay={<Tooltip>Previous</Tooltip>}>
                <Button  size='sm' onClick={prev} disabled={disabled}>
                    <ChevronLeft />
                </Button>
            </OverlayTrigger>
            <Navbar.Text style={{fontWeight: '500'}}>
                {data.data.name}
            </Navbar.Text>
            <OverlayTrigger overlay={<Tooltip>Next</Tooltip>}>
                <Button size='sm' onClick={next} disabled={disabled}>
                    <ChevronRight />
                </Button>
            </OverlayTrigger>
            <OverlayTrigger
            overlay={
            <Tooltip>
                {verifyDelete ? 'Are you sure?' : 'Delete list'}
            </Tooltip>}
            >
                <Button 
                variant={verifyDelete ? 'danger' : 'secondary'}
                onBlur={() => setVerifyDelete(false)}
                onClick={async () => {
                    // await deleteList(data.id)
                    if (!verifyDelete) {
                        setVerifyDelete(true)
                    } else {
                        databaseLoad.set(true)
                        await deleteList(user.state.uid, data.id)
                            .then(() => {
                                databaseLoad.set(false)
                            })
                            .catch(() => databaseLoad.set('error'))
                        removeList(data.id)
                        setVerifyDelete(false)
                    }
                }}
                >
                    {verifyDelete ? 'Delete' : <Trash />}
                </Button>
            </OverlayTrigger>
            <OverlayTrigger overlay={<Tooltip>Create new list</Tooltip>}>
                <Button variant='outline-primary' onClick={openModal}>
                    <PlusLg />
                </Button>
            </OverlayTrigger>
            </StyledStack>
            
            {width > 500 ?
            <OverlayTrigger overlay={<Tooltip>Completed to-dos</Tooltip>}>
                <Badge size='lg' style={{position:'relative',top:'1.1em'}}>
                    <CheckLg /> {user.state.completedTasks}
                </Badge>
            </OverlayTrigger>
            : null}
            </Container>
        </Navbar>

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

        <Divider className='shadow' />
        </>
    )
} 

export default Nav