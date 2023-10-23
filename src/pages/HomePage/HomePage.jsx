import React from 'react'
import SideBar from './SideBar'
import Content from '../Sections/Content'

const HomePage = () => {
    return (
        <div className='min-h-screen w-full bg-[#1d2634] text-[#9e9ea4] flex'>
            <SideBar />
            <Content />
        </div>
    )
}

export default HomePage