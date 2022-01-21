import React, { useContext } from 'react'
import { Button, Container, Stack, Col } from 'react-bootstrap'
import styled from '@emotion/styled'
import Wrapper from '../components/Wrapper'

import signIn from '../firebase/signIn'
import { setUser, getUser } from '../firebase/handleUser'
import { StoreContext } from '../utils/store'
import theme from '../styles/theme'

const Header = styled.h1`
    font-size: 3.5em;
    cursor: default;
    position: relative;
`

const LogoWrapper = styled(Stack)`
    margin: 0 auto;
    padding-top: clamp(5em, 10vw, 10em);
`

const Icon = styled.img`
    max-height: 2em;
    margin-right: 1em;
    margin-left: 1em;
`

const Logo = styled.img`
    max-height: 3em;
`

const StyledButton = styled(Button)`
    width: fit-content;
    display: flex;
    flex-direction: row;
    align-items: center;
    font-weight: 500;
    padding: 0.5em 4em 0.5em 3em;
`

const Login = () => {
    const { user, theme } = useContext(StoreContext)

    return (
        <>
        <Wrapper className='col center'>
        <Container width='200' justify='center' align='center'>
        <Col sm={6}>
        <Stack gap={3} width='200'>
            <LogoWrapper gap={2} direction='horizontal'>
                <Header>todoodle</Header>
                <Logo src={require('../assets/pencil.png')} alt='pencil' />
            </LogoWrapper>
            
            <hr />

            <Container justify='center'>
            <Stack gap={3}>
                
            <h5>Sign in with</h5>
            <StyledButton
            className='mx-auto'
            variant='light' 
            onClick={async () => await signIn('Google').then(async res => {
                let data = await getUser(res.user)
                user.set(data)
                theme.set(data.themeIndex)
            })}
            >
                <Icon 
                src={require('../assets/google.png')} 
                alt='Google' 
                />
                Google
            </StyledButton>
            <StyledButton
            className='mx-auto'
            variant='dark'
            onClick={async () => await signIn('Github').then(async res => {
                let data = await getUser(res.user)
                user.set(data)
                theme.set(data.themeIndex)
            })}
            >
                <Icon 
                src={require('../assets/github.png')} 
                alt='Github' 
                />
                Github
            </StyledButton>
            {/* <StyledButton
            className='mx-auto'
            variant='primary'
            onClick={() => {
                user.set('local')
            }}
            >
                <Icon
                src={require('../assets/computer.png')}
                alt='Local'
                />
                Use Local Data
            </StyledButton>   */}
        </Stack>
        </Container>
        </Stack>
        </Col>
        </Container>
        </Wrapper>
        </>
    )
}

export default Login