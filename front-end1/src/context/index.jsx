import { createContext, useState } from "react";

export const GlobalContext = createContext(null)

export default function GlobalState({children}){
    const [formData, setFormData] = useState({
        title : '',
        description: '',
})
    const [blogList, setBlogList] = useState([])
    const [pending, setPending] = useState(false)
    const [Edit, setEdit] = useState(false)
    return <GlobalContext.Provider value={{Edit, setEdit,blogList, setBlogList, pending, setPending, formData, setFormData}}>{children}</GlobalContext.Provider>
}