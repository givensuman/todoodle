import React, { useContext } from 'react'
import styled from '@emotion/styled'
import { Container } from 'react-bootstrap'
import { StoreContext } from '../utils/store'

const ContainerComponent  = styled(Container)`
    ${props => props.theme}
    min-height: 100vh;
    overflow: hidden;
`

const Wrapper = ({ children }) => {
    const { theme } = useContext(StoreContext)

    return (
        <ContainerComponent fluid theme={theme.state}>
            {children}
        </ContainerComponent >
    )
}
export default Wrapper