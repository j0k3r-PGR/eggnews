import { useState } from "react";

export const UseUserForm = (initialState = {}) => {
    const [form, setform] = useState(initialState);

    const handleChanges = ({ target }) => {
    const { name, value } = target; 
    
    setform({
        ...form,
        [name]: value,
    });
    };
    return {
    form,
    setform,
    handleChanges,
    }
}