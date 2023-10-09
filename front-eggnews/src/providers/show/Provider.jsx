import { useState } from 'react'
import NoticeContext from '.'

export default function NoticeProvider({children}){

    const [show, setShow] = useState({
        alta : true,
        baja : true
    })

    const [tokenValid, setTokenValid] = useState(true)

    return (
        <NoticeContext.Provider value={{show,setShow,tokenValid,setTokenValid}}>
            {children}
        </NoticeContext.Provider>
    )
}