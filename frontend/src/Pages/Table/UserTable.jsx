import React, { useState } from 'react'
import Table from '../Admin/Dashboard'
import AddUser from '../Admin/AddUser'
import UpdatedUser from '../Admin/UpdateUser'
import DeletUser from '../Admin/DeleteUser'
import axios from 'axios'
import toast from 'react-hot-toast'

export default function UserTable() {
    const [userId, setUserId] = useState()
    const [updatedUserId, setUpdatedUserId] = useState()
    console.log(updatedUserId)
    const [value, setValue] = useState({
        name: "",
        fathername: "",
        email: "",
        phone: ""
    })
    const deletuser = (userid) => {
        setUserId(userid)
    }
    const handleUserDelet = async () => {
        try {
            const DeletUser = await axios.delete(`https://nemm-1.onrender.com/nem${userId}`)
            const response = DeletUser.data
            if (response.success) {
                toast.success(response.message)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handlechange = (e) => {
        setValue({
            ...value,
            [e.target.name]: e.target.value
        })

    }


    const UpadteUserData = (Updatedid) => {

        setUpdatedUserId(Updatedid)

    }
    const handleOnSubmit = async (e) => {
        e.preventDefault();

        try {
            const UpdatedUser = await axios.put(`https://nemm-1.onrender.com/nem${updatedUserId}`, value)
            const response = UpdatedUser.data

            if (response.success) {
                toast.success(response.message)
            }
            // console.log(response)
        } catch (error) {
            console.log(error)
        }
        // console.log(value)
    }
    return (
        <>
            <Table Deletuser={deletuser} UpdatedUser={UpadteUserData}></Table>

            <AddUser></AddUser>
            <UpdatedUser handleOnSubmit={handleOnSubmit} value={value} handlechange={handlechange}></UpdatedUser>
            <DeletUser handleUserDelet={handleUserDelet} ></DeletUser>




        </>
    )
}