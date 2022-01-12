import React, { useState } from 'react'
import { Stack, Form, Button } from 'react-bootstrap'

const Input = ({ onSubmit }) => {
    const [input, setInput] = useState('')
    return (
        <Stack 
        direction='horizontal'
        gap={2}
        >
            <Form.Control 
            type='text'
            placeholder='New To-Do'
            value={input}
            onChange={e => setInput(e.target.value)}
            className='shadow'
            />
            <Button 
            onClick={() => {
                onSubmit(input)
                setInput('')
                }}
            className='shadow'
            >
                Submit
            </Button>
        </Stack>             
    )
}

export default Input