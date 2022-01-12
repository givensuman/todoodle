import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import styled from '@emotion/styled'

const Div = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-bottom: 3em;
`

const Temp = ({ path }) => {
    const navigate = useNavigate()
    return (
        <Div>
            <h1>You're at the {path === '/' ? 'home' : 'login'} page!</h1>
            <Button style={{marginLeft: '1em'}} onClick={() => navigate(path)}>Switch</Button>
        </Div>
    )
}

export default Temp