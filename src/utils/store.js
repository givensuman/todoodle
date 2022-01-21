import React, { createContext, useState } from 'react'
import theme from '../styles/theme'

export const StoreContext = createContext(null)

const StoreProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const [lists, setLists] = useState(null)
    const [databaseLoad, setDatabaseLoad] = useState(false)
    const [themeIndex, setThemeIndex] = useState(0)

    return <StoreContext.Provider value={{
        user: {
            state: user,
            set: setUser
        },
        lists: {
            state: lists,
            set: setLists
        },
        databaseLoad: {
            state: databaseLoad,
            set: setDatabaseLoad
        },
        theme: {
            state: theme[themeIndex],
            set: setThemeIndex
        }
    }}>{children}</StoreContext.Provider>

}

export default StoreProvider