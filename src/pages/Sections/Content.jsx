import React from 'react'
import Header from '../Header/Header'
import DashBoard from './DashBoard'
import UserManagement from './UserManagement'
import Categories from './Categories'
import Products from './Products'
import Sales from './Sales'
import SalesReport from './SalesReport'

const Content = ({ sectionNo, setsectionNo }) => {
    const sections = [
        <DashBoard />,
        <UserManagement />,
        <Categories />,
        <Products />,
        <Sales />,
        <SalesReport />,
    ]
    return (
        <div className='min-h-screen w-full h-full md:pl-[18%] bg-[#f5f5f5] font-serif block text-[2rem]'>
            <Header sectionNo={sectionNo} setsectionNo={setsectionNo} />
            <div className=' z-0  relative'>
                {sections[sectionNo]}
            </div>
        </div>
    )
}

export default Content