import React, { useContext } from 'react'
import { UserContext } from '../../context/userContext'
import Navbar from './Navbar'

const DashboardLayout = ({ children }) => {
  const { user } = useContext(UserContext)
  return (
    <div className="min-h-screen mesh-bg">
      <Navbar />
      {user && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {children}
        </div>
      )}
    </div>
  )
}

export default DashboardLayout