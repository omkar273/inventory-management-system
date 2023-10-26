import React from 'react'
import { useState } from 'react';
import { Alert, WhiteCircularProgress } from './Categories';
import { addSales } from '@/firebase/firebase_helper';
import { useEffect } from 'react';
import Paper from '@mui/material/Paper';
import AddCategoryIcon from '@mui/icons-material/DashboardCustomizeOutlined';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Snackbar from '@mui/material/Snackbar';

const Sales = () => {

  const [productsList, setproductsList] = useState([])
  const [loading, setloading] = useState(false);
  const [snackBarOpen, setsnackBarOpen] = useState(false);
  const [productName, setproductName] = useState('')
  const [productPrice, setproductPrice] = useState(0)
  const [productQuantity, setproductQuantity] = useState(1)
  const [cost, setcost] = useState(0)

  const getData = async () => {
    const data = await getAllProducts();
    setproductsList(data);
    console.log(data);
  }

  const calculateCost = () => {
    for (let index = 0; index < productsList.length; index++) {
      const element = productsList[index];
      if (element.name === productName) {
        setproductPrice(element.sellingPrice)
        setcost(productQuantity * productPrice)
      }
    }
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setsnackBarOpen(false);
  };

  useEffect(() => {
    getData();
  }, [])

  useEffect(() => {
    calculateCost()
  }, [productName, productQuantity])

  return (
    <div>
      <div className='md:px-16 px-4 pt-14'>
        <Paper className='flex flex-col flex-shrink-0 h-auto max-h-max bg-gray-200 rounded-md shadow-md py-4 px-4'>
          {/* title */}
          <div className='p-2 font-ubuntu text-[1.25rem] text-[#252525] font-semibold flex gap-3 items-center  border-b-2 border-blue-500'>
            <AddCategoryIcon style={{ fontSize: '1.5rem' }} />
            {"Add Sales".toUpperCase()}
          </div>



          <div className='md:flex gap-6 py-4'>
            <FormControl fullWidth>
              <InputLabel id="Product category">Product Name</InputLabel>
              <Select label="Product category"
                labelId='Product category'
                value={productName}
                onChange={
                  (e) => { setproductName(e.target.value); }}>

                {productsList.map((product, index) =>
                  <MenuItem key={index} value={product.name} >
                    {product.name}
                  </MenuItem>
                )}

              </Select>
            </FormControl>
          </div>

          {/* add sales  */}
          <div className=''>
            <input type="text" placeholder="Add Product Quantity" className="border border-gray-300 p-3 rounded-md focus:outline-none  text-base text-[#252525] mb-6 md:w-1/4 w-1/2 min-w-max"
              onChange={(e) => {
                setproductQuantity(e.target.value)
              }} />
          </div>
          <p className='w-full font-serif text-[1.35rem] text-red-600'>
            {`Total cost :  ${cost}`}
          </p>

          <Button variant='contained' className='flex gap-2 w-[8rem] items-center justify-around' sx={{ p: '0.5rem' }}
            onClick={async () => {
              if (productName == "" || productQuantity < 1 || cost < 1) {
                setsnackBarOpen(true);
              } else {
                setloading(true);
                const res = await addSales({
                  productName: productName,
                  productQuantity: productQuantity,
                  cost: cost,
                  date: new Date().toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })
                })
                setloading(false);
                console.log(res);
              }
            }}>
            {loading && <WhiteCircularProgress size={24} />}
            {loading ? "Saving" : 'Add Product'}
          </Button>

          {/* error message snackbar */}
          <Snackbar open={snackBarOpen} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="warning" sx={{ width: '100%' }}>
              {"Please fill all fields"}
            </Alert>
          </Snackbar>

        </Paper>
      </div >
    </div >
  )
}

export default Sales