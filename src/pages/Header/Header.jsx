import React, { useState } from 'react'
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MessageIcon from '@mui/icons-material/Message';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import IconButton from '@mui/material/IconButton';
import AddBusinessOutlinedIcon from '@mui/icons-material/AddBusinessOutlined';
import MobileMenu from './MobileMenu';

const Header = ({ sectionNo, setsectionNo }) => {
    const [isMobileMenuToggled, setisMobileMenuToggled] = useState(false)
    return (
        <div className='md:p-3 p-2  md:px-[2rem] w-full md:w-full bg-white py-2 md:py-4 flex justify-between md:justify-end shadow-md z-50'>

            {/* mobile menubar */}
            {isMobileMenuToggled &&

                <MobileMenu
                    sectionNo={sectionNo}
                    setsectionNo={setsectionNo}
                    isMobileMenuToggled={isMobileMenuToggled}
                    setisMobileMenuToggled={setisMobileMenuToggled} />}

            <div className='md:hidden block'>
                <IconButton color='inherit' size='1.5rem'
                    style={{ fontSize: '2.5rem' }}
                    onClick={() => setisMobileMenuToggled(!isMobileMenuToggled)}>
                    <MenuOutlinedIcon fontSize='1rem' />
                </IconButton>
            </div>
            <div className='flex items-center md:gap-1'>

                <IconButton color='inherit' size='1.5rem'
                    style={{ fontSize: '1.75rem', color: '#252525' }}>
                    <AddBusinessOutlinedIcon fontSize='1rem' />
                </IconButton>

                <IconButton color='inherit' size='1.5rem'
                    style={{ fontSize: '1.75rem', color: '#252525' }}>
                    <AddShoppingCartIcon fontSize='1rem' />
                </IconButton>

                <IconButton color='inherit' size='1.5rem'
                    style={{ fontSize: '1.75rem', color: '#252525' }}>
                    <MessageIcon fontSize='1rem' />
                </IconButton>

                <IconButton color='inherit' style={{ fontSize: '2.5rem', margin: '0 0 0 1.25rem', color: '#252525' }}>
                    <AccountCircleIcon fontSize='2.5rem' />
                </IconButton>

            </div>
        </div>
    )
}

export default Header