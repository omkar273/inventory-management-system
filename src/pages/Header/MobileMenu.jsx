import React from 'react'

const MobileMenu = () => {
    const tiles = ['Dashboard', 'user management', 'categories', 'products']
    return (
        <div className='h-screen bg-gray-900 font-serif md:block py-5 text-[2rem] px-4 fixed top-0 left-0 z-50'>
            <div className='mb-6'>Store</div>
            {tiles.map((title) => <div className='text-[1.5rem]'>{title}</div>)}
        </div>
    )
}

export default MobileMenu