import React, { useState } from 'react'
import { Container, Stack, Form, Button } from 'react-bootstrap'
import { useWindowDimensions } from '../utils/dimensions'

const Input = ({ onSubmit }) => {
    
    const [input, setInput] = useState('')
    const { width } = useWindowDimensions()
    const handleSubmit = async () => {
        onSubmit(input)
        setInput('')
    }

    return (
        <Container
        align='center'
        justify='center'
        >
        <Stack 
        direction='horizontal'
        gap={2}
        className='justify-content-center'
        >
            <Form.Control 
            type='text'
            placeholder='New To-Do'
            size={width > 300 ? 'lg' : 'md'}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyPress={e => e.code === 'Enter' ? handleSubmit() : null}
            className='shadow'
            style={{maxWidth: '500px'}}
            />
            <Button 
            onClick={handleSubmit}
            className='shadow'
            size={width > 300 ? 'lg' : 'md'}
            >
                Submit
            </Button>
        </Stack>
        </Container>           
    )
}

export default Input