import { Typography } from '@mui/material'
import React from 'react'

const AuthHeader = ({ setPageType }) => {
    return (
        <div className='w-full fixed flex justify-between font-bold px-[3%] py-6 items-center font-fira_sans'>
            <p className='font-fira_sans font-semibold text-3xl whitespace-break-spaces cursor-pointer'>
                Inventory Mangement
            </p>
            <div className='gap-8 justify-center items-center hidden md:flex'>
                <p className='hover:underline cursor-pointer text-2xl hover:scale-105'
                    onClick={() => setPageType('login')}>
                    Login
                </p>
                <p className='hover:underline cursor-pointer text-2xl hover:scale-105'
                    onClick={() => setPageType('register')}>
                    Register
                </p>
            </div>
        </div>
    )
}

export default AuthHeader