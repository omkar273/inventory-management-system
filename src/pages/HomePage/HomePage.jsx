import React, { useState } from 'react'
import SideBar from './SideBar'
import Content from '../Sections/Content'

const HomePage = () => {
    const [sectionNo, setsectionNo] = useState(0);

    return (
        <div className='min-h-screen w-full bg-[#1d2634] text-[#9e9ea4] flex font-fira_sans'>
            <SideBar sectionNo={sectionNo} setsectionNo={setsectionNo} />
            <Content sectionNo={sectionNo} setsectionNo={setsectionNo} />
        </div>
    )
}

export default HomePage;