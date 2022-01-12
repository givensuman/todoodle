import React from 'react'
import { Button } from 'react-bootstrap'
import styled from '@emotion/styled'

const Item = styled.div`
    background-color: white;
    padding: 0.5em;
    margin: 0.3em;
    border-radius: 0.3em;
    font-weight: 500;
`

const ListItem = ({ children, id, onDelete }) => 
    <Item className='shadow'>
        {children}
        <Button onClick={() => onDelete(id)}>X</Button>
    </Item>


const List = ({ data, onDelete }) => {
    return (
        <>
        {data && data.length > 0 ?
        data.map(item => 
        <ListItem 
        key={item.id}
        id={item.id}
        onDelete={onDelete}
        >
            {item.content}
        </ListItem>) 
        : null}
        </>
    )
}

export default List