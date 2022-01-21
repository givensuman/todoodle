import React, { useContext, useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap'
import { CheckLg, XLg } from 'react-bootstrap-icons'
import styled from '@emotion/styled'
import { StoreContext } from '../utils/store'

const Card = styled.div`
    position: absolute;
    bottom: 5em;
    left: 5em;
    background: white;
    height: fit-content;
    width: fit-content;
    padding: 0.3em;
    border-radius: 0.2em;
    font-weight: 500;
`

const Saving = () => {

    const { databaseLoad } = useContext(StoreContext)
    const [show, setShow] = useState(false)

    useEffect(() => {
        if (databaseLoad.state === false) {
            setTimeout(() => setShow(false), 300)
        } else {
            setShow(databaseLoad.state)
        }
    }, [databaseLoad.state])

    return (
        <>{show ?
            <Card className='shadow'>
                <span style={{marginRight: '0.5em'}}>Saving...</span>
                {databaseLoad.state === true ?
                <Spinner 
                as='span'
                animation='border'
                size='sm'
                />
                :
                databaseLoad.state === false ?
                <CheckLg />
                :
                databaseLoad.state === 'error' ?
                <XLg />
                : null}
            </Card>
            : null}
        </>
    )
}

export default Saving