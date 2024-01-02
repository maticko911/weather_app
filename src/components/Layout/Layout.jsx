import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../Footer/Footer'
import Header from '../Head/Header'
import { useNavigate } from 'react-router-dom'

const Layout = ({search, setSearch}) => {
  const navigate = useNavigate()

  useEffect(() => {
    let authToken = sessionStorage.getItem('Auth Token')

    if (authToken) {
      navigate('/')
    } else {
      navigate('/login')
    }
  }, []) 

  return (
    <div>
      <Header title='Weather app' search={search} setSearch={setSearch} />
      <Outlet />
      <Footer />
    </div>
  )
}

export default Layout
