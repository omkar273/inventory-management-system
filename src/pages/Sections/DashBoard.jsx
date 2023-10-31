import React, { useEffect, useState } from 'react'
import CategoryIcon from '@mui/icons-material/Category';
import InventoryIcon from '@mui/icons-material/Inventory';
import Card from '@mui/material/Card';
import MoneyIcon from '@mui/icons-material/CurrencyRupee';
import { getDashboardData } from '@/firebase/firebase_helper';
import AllCategoriesIcon from '@mui/icons-material/Apps';
import Paper from '@mui/material/Paper';

const DashBoard = ({ sectionNo, setsectionNo }) => {

    const [data, setdata] = useState({
        topSoldProducts: [],
        latestSales: [],
        recentProducts: [],
        totalProducts: 0,
        totalCategories: 0,
        totalSale: 0,
    })

    const getData = async () => {
        const data = await getDashboardData();
        setdata(data);
    }

    useEffect(() => {
        getData();
    }, [])

    const styling = 'border border-[#443c68] min-w-[5rem] md:p-2 p-2 leading-7';

    return (
        <div className='pt-8'>

            {/* cards */}
            <div className='w-full grid grid-cols-1 justify-center place-items-center gap-8 md:grid-cols-3 sm:grid-cols-2 md:justify-around'>

                <Card className='md:w-max mx-5 w-[80%] md:flex cursor-pointer'
                    onClick={() => setsectionNo(1)}>
                    <div className='p-6 bg-orange-600 flex justify-center items-center'>
                        <CategoryIcon fontSize='3.5rem'
                            sx={{ fontSize: '3.5rem', color: 'white' }} />
                    </div>
                    <div className='py-4 px-8 bg-white flex  flex-col justify-center items-center'>

                        <p className='font-ubuntu font-semibold whitespace-break-spaces'>
                            {data.totalCategories}
                        </p>

                        <p className='text-[1.25rem] font-ubuntu font-semibold whitespace-break-spaces'>
                            Total Categories
                        </p>
                    </div>
                </Card>

                <Card className='md:w-max w-[80%] md:flex cursor-pointer'
                    onClick={() => setsectionNo(2)}>
                    <div className='p-6 bg-purple-600 flex justify-center items-center'>
                        <InventoryIcon fontSize='3.5rem'
                            sx={{ fontSize: '3.5rem', color: 'white' }} />
                    </div>
                    <div className='py-4 px-8 bg-white flex  flex-col justify-center items-center'>

                        <p className='font-ubuntu font-semibold whitespace-break-spaces'>
                            {data.totalProducts}
                        </p>

                        <p className='text-[1.25rem] font-ubuntu font-semibold whitespace-break-spaces'>
                            Total Products
                        </p>
                    </div>
                </Card>
                <Card className='md:w-max w-[80%] md:flex cursor-pointer'
                    onClick={() => setsectionNo(4)}>
                    <div className='p-6 bg-green-600 flex justify-center items-center'>
                        <MoneyIcon fontSize='3.5rem'
                            sx={{ fontSize: '3.5rem', color: 'white' }} />
                    </div>
                    <div className='py-4 px-8 bg-white flex  flex-col justify-center items-center'>

                        <p className='font-ubuntu font-semibold whitespace-break-spaces'>
                            {data.totalSale}
                        </p>

                        <p className='text-[1.25rem] font-ubuntu font-semibold whitespace-break-spaces'>
                            Total Sales
                        </p>
                    </div>
                </Card>
            </div>

            {/* tables */}
            <div className='md:grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 px-4 mt-12 gap-5 justify-around'>
                <div className='mb-6 md:m-0'>
                    <Paper className='flex flex-col flex-shrink-0 h-auto max-h-max bg-gray-200 rounded-md shadow-md py-4'>
                        {/* title */}
                        <div className='p-2 font-ubuntu text-[1.25rem] text-[#252525] font-semibold flex gap-3 items-center  border-b-2 border-blue-500'>
                            <AllCategoriesIcon style={{ fontSize: '1.5rem' }} />
                            {"Highest Selling Products".toUpperCase()}
                        </div>

                        {/* tables */}
                        {/* all products table */}
                        <div className='overflow-x-auto p-3'>
                            <table className='w-full text-base font-fira_sans '>
                                <thead className='divide-x'>
                                    <tr>
                                        <th className="px-4 py-2">Name</th>
                                        <th className="px-4 py-2">Available Quantity</th>
                                        <th className="px-4 py-2">Total sold</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.topSoldProducts.map((sale, index) =>
                                        <tr key={index} className={styling}>
                                            <td className={styling}>{sale.name}</td>
                                            <td className={styling}>{sale.quantity}</td>
                                            <td className={styling}>{sale.itemsSold}</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                    </Paper>
                </div>

                <div className='mb-6 md:m-0'>
                    <Paper className='flex flex-col flex-shrink-0 h-auto max-h-max bg-gray-200 rounded-md shadow-md py-4'>
                        {/* title */}
                        <div className='p-2 font-ubuntu text-[1.25rem] text-[#252525] font-semibold flex gap-3 items-center  border-b-2 border-blue-500'>
                            <AllCategoriesIcon style={{ fontSize: '1.5rem' }} />
                            {"Latest Sales".toUpperCase()}
                        </div>
                        {/* all products table */}
                        <div className='overflow-x-auto p-3'>
                            <table className='w-full text-base font-fira_sans '>
                                <thead className='divide-x'>
                                    <tr>
                                        <th className="px-4 py-2">Name</th>
                                        <th className="px-4 py-2">Quantity</th>
                                        <th className="px-4 py-2">Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.latestSales.map((sale, index) =>
                                        <tr key={index} className={styling}>
                                            <td className={styling}>{sale.productName}</td>
                                            <td className={styling}>{sale.productQuantity}</td>
                                            <td className={styling}>{sale.cost}</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                    </Paper>
                </div>

                <div className='mb-6 md:m-0'>
                    <Paper className='flex flex-col flex-shrink-0 h-auto max-h-max bg-gray-200 rounded-md shadow-md py-4'>
                        {/* title */}
                        <div className='p-2 font-ubuntu text-[1.25rem] text-[#252525] font-semibold flex gap-3 items-center  border-b-2 border-blue-500'>
                            <AllCategoriesIcon style={{ fontSize: '1.5rem' }} />
                            {"Recently Added Products".toUpperCase()}
                        </div>

                        <div className='overflow-x-auto p-3'>
                            <table className='w-full text-base font-fira_sans '>
                                <thead className='divide-x'>
                                    <tr>
                                        <th className="px-4 py-2">Name</th>
                                        <th className="px-4 py-2">Category</th>
                                        <th className="px-4 py-2">Quantity</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.recentProducts.map((sale, index) =>
                                        <tr key={index} className={styling}>
                                            <td className={styling}>{sale.name}</td>
                                            <td className={styling}>{sale.category}</td>
                                            <td className={styling}>{sale.quantity}</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </Paper>
                </div>
            </div>

        </div>
    )
}

export default DashBoard