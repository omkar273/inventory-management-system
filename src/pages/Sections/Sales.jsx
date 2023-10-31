import React from 'react'
import { useState } from 'react';
import Paper from '@mui/material/Paper';
import AddCategoryIcon from '@mui/icons-material/DashboardCustomizeOutlined';
import { Alert, WhiteCircularProgress } from './Categories';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import { useEffect } from 'react';
import MenuItem from '@mui/material/MenuItem';
import { addSales, getAllProducts } from '@/firebase/firebase_helper';
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
  const [productId, setproductId] = useState('')
  const [quantity, setquantity] = useState(0)
  const [snackBarMsg, setsnackBarMsg] = useState("Please fill all fields")
  const [discount, setdiscount] = useState(0)
  const [finalCost, setfinalCost] = useState(0)
  const [discountPercentage, setdiscountPercentage] = useState(0)

  const getData = async () => {
    const data = await getAllProducts();
    setproductsList(data);
  }

  const calculateCost = () => {
    for (let index = 0; index < productsList.length; index++) {
      const element = productsList[index];
      if (element.name === productName) {

        const cost = productQuantity * productPrice
        var discountPrice = 0;
        if (productQuantity >= 100) {
          discountPrice = cost / 100 * element.discountPercentage
        }

        setdiscountPercentage(element.discountPercentage)
        setproductPrice(element.sellingPrice)
        setproductId(element.id)
        setcost(cost)
        setquantity(element.quantity)
        setdiscount(discountPrice)
        setfinalCost(cost - discountPrice)
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
            <input type="text" placeholder="Add Product Quantity" className="border border-gray-300 p-3 rounded-md focus:outline-none  text-base text-[#252525] mb-2 md:w-1/4 w-1/2 min-w-max"
              onChange={(e) => {
                setproductQuantity(e.target.value)
              }} />
            {productName != '' &&
              <p className='w-full font-fira_sans text-[1rem] mb-3 whitespace-break-spaces'>
                {`If you buy more than 100 products you can avail ${discountPercentage}% discount`}
              </p>
            }

          </div>
          <div className='font-fira_sans mb-10'>
            <p className='w-full font-fira_sans text-[1.25rem] text-green-600  mb-6'>
              {`Available quantity :  ${quantity}`}
            </p>

            <p className='w-full text-[1.15rem] mt-2 text-[#252525]'>
              {`Total cost :  ${cost} rs`}
            </p>
            <p className='w-full text-[1.15rem] mt-2  text-[#252525]'>
              {`discount :  -${discount} rs`}
            </p>
            <p className='w-full text-[1.15rem] mt-2 text-green-600'>
              {`Total cost :  ${finalCost} rs`}
            </p>
          </div>

          <Button variant='contained' className='flex gap-2 w-[8rem] items-center justify-around' sx={{ p: '0.5rem' }}
            onClick={async () => {
              if (productName == "" || productQuantity < 1 || cost < 1) {
                setsnackBarMsg("Please fill all fields")
                setsnackBarOpen(true);
              } else if (quantity < productQuantity) {
                setsnackBarMsg("Available quantity is less")
                setsnackBarOpen(true);
              }
              else {
                setloading(true);
                const res = await addSales({
                  productName: productName,
                  productQuantity: productQuantity,
                  cost: cost,
                  productId: productId,
                  date: new Date().toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  }),
                })
                setloading(false);
                setsnackBarMsg("Sale added successfully")
                setsnackBarOpen(true);
              }
            }}>
            {loading && <WhiteCircularProgress size={24} />}
            {loading ? "Saving" : 'Add Sale'}
          </Button>

          {/* error message snackbar */}
          <Snackbar open={snackBarOpen} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
              {snackBarMsg}
            </Alert>
          </Snackbar>

        </Paper>
      </div >
    </div >
  )
}

export default Sales