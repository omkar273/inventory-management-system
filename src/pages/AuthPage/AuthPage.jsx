import React, { useState } from 'react'
import AuthHeader from './AuthHeader'
import { Button, TextField } from '@mui/material'
import { useSearchParams } from 'react-router-dom'

const AuthPage = () => {
    const [params, setParams] = useSearchParams({ pageType: 'login' })
    const isLogin = params.get('pageType') == 'login'
    const setPageType = (pageType) => {
        setParams(prev => {
            prev.set("pageType", pageType)
            return prev;
        })
    }

    return (
        <div className='w-full min-h-screen h-full '>
            <AuthHeader setPageType={setPageType} />

            <div className='px-4 md:p-0 w-full min-h-screen h-full bg-[#00A9FF] flex justify-center items-center'>
                <div className='w-full py-6 px-4 md:w-[45%] bg-gray-50 rounded-2xl border shadow-md flex flex-col items-center '>
                    <h1 className='text-3xl font-semibold mb-6 font-fira_sans '>
                        {isLogin ? 'Login' : 'Create Account'}
                    </h1>
                    <TextField label={'Email'} sx={{ width: '100%', fontWeight: 600, mb: '1rem' }} />

                    <TextField label={'Password'} sx={{ width: '100%', fontWeight: 600, mb: '2.5rem' }} />

                    <Button variant='contained' className='w-full h-12 font-fira_sans text-3xl font-bold mb-8'>
                        {isLogin ? 'Login' : 'Register'}
                    </Button>

                    {isLogin ?
                        <p className='w-full flex flex-initial font-fira_sans cursor-pointer mt-4'
                            onClick={() => setPageType('register')}>
                            Dont have an account? Sign up
                        </p> :

                        <p className='w-full flex flex-initial font-fira_sans cursor-pointer mt-4'
                            onClick={() => setPageType('login')}>
                            Already have an account? Login
                        </p>
                    }
                </div>
            </div>
        </div>
    )
}

export default AuthPage