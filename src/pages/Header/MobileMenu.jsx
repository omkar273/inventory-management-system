import React from 'react'
import CloseButton from '@mui/icons-material/ClearOutlined';
import { IconButton } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import CategoryIcon from '@mui/icons-material/Category';
import InventoryIcon from '@mui/icons-material/Inventory';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

const MobileMenu = (
    {
        setisMobileMenuToggled,
        isMobileMenuToggled,
        sectionNo,
        setsectionNo }) => {
    const tiles = [
        {
            title: "Dashboard",
            icon: <HomeIcon />
        },
        // {
        //     title: "User Management",
        //     icon: <ManageAccountsIcon />
        // },
        {
            title: "Categories",
            icon: <CategoryIcon />
        },
        {
            title: "Products",
            icon: <InventoryIcon />
        },
        {
            title: "Sales",
            icon: <AccountBalanceWalletIcon />
        },
        {
            title: "Sales Report",
            icon: <AccountBalanceWalletIcon />
        },
    ]
    const heading1 = "Inventory";
    const heading2 = "Management";
    return (
        <div className='h-screen bg-gray-900 font-serif block py-5 text-[2rem] px-4 fixed top-0 left-0 z-50 md:hidden'>
            <div className='flex justify-end'>
                <IconButton color='inherit' size='1.5rem'
                    style={{ fontSize: '1.75rem' }}
                    onClick={() => setisMobileMenuToggled(!isMobileMenuToggled)}>
                    <CloseButton fontSize='1rem' />
                </IconButton>
            </div>
            <div>{heading1}</div>
            <div className='mb-12'>{heading2}</div>
            {tiles.map((tile, index) =>
                <div key={index} className='text-[1.25rem] items-center py-3  flex gap-5 cursor-pointer hover:text-white'
                    style={{ color: index === sectionNo ? 'white' : null }}
                    onClick={() => {
                        setsectionNo(index)
                        setisMobileMenuToggled(!isMobileMenuToggled);
                    }}>
                    {tile.icon}
                    {tile.title}
                </div>
            )}
        </div>
    )
}

export default MobileMenu