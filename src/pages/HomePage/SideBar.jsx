import React from 'react'
import HomeIcon from '@mui/icons-material/Home';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import CategoryIcon from '@mui/icons-material/Category';
import InventoryIcon from '@mui/icons-material/Inventory';
import SalesIcon from '@mui/icons-material/AccountBalanceWallet';
import LogoutIcon from '@mui/icons-material/LogoutOutlined';
import { app } from '@/firebase/config.js'
import { getAuth, signOut } from 'firebase/auth';

const auth = getAuth(app);

const SideBar = ({ sectionNo, setsectionNo }) => {
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
            icon: <SalesIcon />
        },
        {
            title: "Sales Report",
            icon: <SalesIcon />
        },

    ]

    const handleSignOut = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error('An error occurred while signing out:', error);
        }
    };

    const heading = "Inventory Management";
    return (
        <div className='h-screen w-[18%] hidden min-w-min bg-gray-900 font-serif md:block py-5 text-[2rem] px-4 fixed'>

            <div className='mb-12 cursor-pointer font-fira_sans text-white '>
                {heading}
            </div>

            {tiles.map((tile, index) =>

                <div key={index} className='text-[1.25rem] items-center py-3  flex gap-5 cursor-pointer hover:text-white'
                    style={{ color: index === sectionNo ? 'white' : null }}
                    onClick={() => setsectionNo(index)}>
                    {tile.icon}
                    {tile.title}
                </div>
            )}

            <div className='text-[1.25rem] items-center py-3  flex gap-5 cursor-pointer hover:text-white'
                onClick={handleSignOut}>
                {<LogoutIcon />}
                {"Logout"}
            </div>
        </div>
    )
}

export default SideBar;