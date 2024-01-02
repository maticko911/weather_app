import React, { useCallback, useEffect, useState } from 'react'
import { RocketLaunchIcon } from '@heroicons/react/24/solid'
import { Link, useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../firebase/firebase'
import { InformationCircleIcon } from '@heroicons/react/24/solid'

const Login = () => {
    const [email, setEamil] = useState('')
    const [pwd, setPwd] = useState('')
    const [error, setError] = useState(null)
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)

    const handleLogin = (e) => {
        e.preventDefault();
        setIsLoading(true)

        signInWithEmailAndPassword(auth, email, pwd)
            .then((userCredential) => {
                const user = userCredential.user;
                if (user.email === email) {
                    sessionStorage.setItem('Auth Token', userCredential._tokenResponse.refreshToken)
                    navigate('/')
                } else {
                    setError('Email or password is incorrect!');
                }
            }).catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;  
                console.log(errorCode, errorMessage)
                setError('Email or password is incorrect!');
            }).finally(() => {
                setIsLoading(false)
            })
    }

   const handelNavigate = useCallback(() => {
        navigate('/')
    }, [navigate])

    useEffect(() => {
        let authToken = sessionStorage.getItem('Auth Token') 

        if (authToken) {
            handelNavigate()
        }
    },[handelNavigate])

    return (
        <section className='flex justify-center h-screen py-20'>
            <div className='w-full max-w-md p-6 bg-gray-100 rounded-md shadow-md'>
                <h1 className='text-center text-3xl font-bold mb-6'>Login</h1>
                {error &&
                    <div className='mb-4' >
                        <p className='mb-4 text-center rounded bg-red-500/75 text-white'>
                            <InformationCircleIcon className='h-5 w-5 inline-block' />
                            {error}
                        </p>
                    </div>
                }
                <form>
                    <div className='mb-4'>
                        <label className='block mb-2 font-bold' htmlFor="email">Email:</label>
                        <div className='relative'>
                            <input
                                type="text"
                                id='email'
                                required
                                placeholder='Email address'
                                autoComplete='off'
                                onChange={(e) => setEamil(e.target.value)}
                                className='block w-full px-4 py-2 border rounded-md bg-gray-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500'
                            />
                        </div>
                    </div>
                    <div className='mb-4'>
                        <label className='block font-bold mb-2' htmlFor="password">Password:</label>
                        <div className='relative'>
                            <input
                                type="password"
                                id="password"
                                required
                                autoComplete='off'
                                placeholder='Password'
                                onChange={(e) => setPwd(e.target.value)}
                                className='block w-full px-4 py-2 border rounded-md bg-gray-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500'
                            />
                        </div>
                    </div>
                    <div className='flex items-center justify-between'>
                        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outlin' onClick={handleLogin}>
                            Login
                        </button>
                    </div>
                    <div className='mt-10'>
                        <p className='text-gray-400/75 text-center'>
                            <RocketLaunchIcon className='h-5 w-5 inline-block' />
                            New here, join!<sapn className='ml-2 font-bold text-black underline hover:scale-105 transition duration-150 ease-in-out hover:text-blue-500/75'><Link to='/registration'>REGISTRATION</Link></sapn>
                        </p>
                    </div>
                </form>
            </div>
        </section>
    )
}

export default Login
