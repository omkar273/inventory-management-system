import React from 'react'
import { useState } from 'react';
import Paper from '@mui/material/Paper';
import AddCategoryIcon from '@mui/icons-material/DashboardCustomizeOutlined';
import { useEffect } from 'react';
import { deleteSale, getAllSales } from '@/firebase/firebase_helper';
// import DeleteIcon from '@mui/icons-material/Delete';
// import IconButton from '@mui/material/IconButton';

const SalesReport = () => {

  const [salesList, setsalesList] = useState([])
  const getData = async () => {
    const data = await getAllSales();
    setsalesList(data);
  }

  useEffect(() => {
    getData();
  }, [])

  const styling = 'border border-[#443c68] md:min-w-[10rem] min-w-[8rem] md:p-4 p-2 leading-7';
  return (
    <div>
      <div className='md:px-16 px-4 pt-14'>
        <Paper className='flex flex-col flex-shrink-0 h-auto max-h-max bg-gray-200 rounded-md shadow-md py-4'>
          {/* title */}
          <div className='p-2 font-ubuntu text-[1.25rem] text-[#252525] font-semibold flex gap-3 items-center  border-b-2 border-blue-500'>
            <AddCategoryIcon style={{ fontSize: '1.5rem' }} />
            {"Sales ".toUpperCase()}
          </div>

          {/* transactions */}
          <div className='overflow-x-auto p-3'>
            <table className='w-full text-base font-fira_sans '>
              <thead className='divide-x'>
                <tr>
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Quantity</th>
                  <th className="px-4 py-2">Date</th>
                  <th className="px-4 py-2">Total Amount</th>
                  {/* <th className="px-4 py-2">Actions</th> */}
                </tr>
              </thead>

              <tbody>
                {salesList.map((sale, index) =>
                  <tr key={index} className={styling}>
                    <td className={styling}>{sale.productName}</td>
                    <td className={styling}>{sale.productQuantity}</td>
                    <td className={styling}>{sale.date}</td>
                    <td className={styling}>{sale.cost}</td>

                    {/* <td className={'border border-[#443c68] min-w-[6rem] p-4 leading-7 flex justify-center items-center'}>
                      <IconButton edge="end" aria-label="delete" onClick={async () => {
                        await deleteSale(sale.id);
                        await getData();
                      }}>
                        <DeleteIcon color='error' />
                      </IconButton>
                    </td> */}

                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Paper>
      </div>
    </div>
  )
}

export default SalesReport