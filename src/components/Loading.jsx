import React from 'react'
import { Spinner } from 'react-bootstrap'
import styled from '@emotion/styled'

const Wrapper = styled.div`
    width: 100vw;
`

const Loading = () => 
    <Wrapper className='col center'>
        <Spinner 
        animation='border'
        size='lg'
        variant='primary'
        className='mx-auto'
        style={{
            position: 'absolute',
            top: '15%'
        }}
        >
            <span className='visually-hidden'>Loading...</span>
        </Spinner>
    </Wrapper>

export default Loading