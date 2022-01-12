import React from 'react'
import styled from '@emotion/styled'
import { Container } from 'react-bootstrap'

const ContainerComponent  = styled(Container)`
    background-image: linear-gradient(
        145deg,
        hsl(174deg 61% 63%) 0%,
        hsl(184deg 70% 62%) 12%,
        hsl(195deg 80% 61%) 31%,
        hsl(208deg 70% 62%) 65%,
        hsl(221deg 61% 63%) 88%,
        hsl(218deg 73% 58%) 96%,
        hsl(214deg 84% 53%) 100%
    );
    min-height: 100vh;
`

const Wrapper = ({ children }) => 
    <ContainerComponent fluid>
        {children}
    </ContainerComponent >

export default Wrapper