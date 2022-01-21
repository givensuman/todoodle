import React, { useContext, useEffect } from 'react'

import LoadingComponent from '../components/Loading'
import Wrapper from '../components/Wrapper'

import { StoreContext } from '../utils/store'
import { getLists } from '../firebase/handleData'

export const Loading = () => {

    const { lists, user } = useContext(StoreContext)

    useEffect(() => {
        const getData = async () => {
            await getLists(user.state.uid)
                .then(res => {
                    if (res.length > 0) {
                        lists.set(res)
                    }
                })
                .catch(err => console.error(err))
        }
        getData()
    }, [])

    return (
        <Wrapper>
            <LoadingComponent />
        </Wrapper>
    )
}
export default Loading