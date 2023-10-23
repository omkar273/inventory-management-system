import React from 'react'

const SideBar = () => {
    const tiles = ['Dashboard', 'user management', 'categories', 'products']
    return (
        <div className='h-screen w-[18%] hidden bg-gray-900 font-serif md:block py-5 text-[2rem] px-4 fixed'>
            <div className='mb-6'>Store</div>
            {tiles.map((title) => <div className='text-[1.5rem]'>{title}</div>)}
        </div>
    )
}

export default SideBar;