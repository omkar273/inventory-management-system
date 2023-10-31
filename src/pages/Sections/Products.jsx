import React from 'react'
import { useState } from 'react';
import Paper from '@mui/material/Paper';
import AddCategoryIcon from '@mui/icons-material/DashboardCustomizeOutlined';
import { Alert, WhiteCircularProgress } from './Categories';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import { useEffect } from 'react';
import MenuItem from '@mui/material/MenuItem';
import { addProduct, deleteProduct, getAllCategories, getAllProducts } from '@/firebase/firebase_helper';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MoneyIcon from '@mui/icons-material/CurrencyRupee';
import Snackbar from '@mui/material/Snackbar';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { Slider } from "@material-tailwind/react";

const Products = () => {
  const [loading, setloading] = useState(false);
  const [snackBarOpen, setsnackBarOpen] = useState(false);
  const [categoriesList, setcategoriesList] = useState([])
  const [productsList, setproductsList] = useState([])

  const [productData, setproductData] = useState({
    name: "",
    category: "",
    quantity: 0,
    purchasePrice: 0,
    sellingPrice: 0,
    itemsSold: 0,
    discountPercentage: 0,
    date: new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  })

  const getCategoriesData = async () => {
    const data = await getAllCategories();
    setcategoriesList(data);
  }

  const getData = async () => {
    const data = await getAllProducts();
    setproductsList(data);
  }

  useEffect(() => {
    getCategoriesData();
    getData();
  }, [])



  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setsnackBarOpen(false);
  };

  const styling = 'border border-[#443c68] md:min-w-[10rem] min-w-[8rem] md:p-4 p-2 leading-7';

  return (
    <div className='pb-16'>
      {/* add products section */}
      <div className='md:px-16 px-4 pt-14'>
        <Paper className='flex flex-col flex-shrink-0 h-auto max-h-max bg-gray-200 rounded-md shadow-md py-4'>
          {/* title */}
          <div className='p-2 font-ubuntu text-[1.25rem] text-[#252525] font-semibold flex gap-3 items-center  border-b-2 border-blue-500'>
            <AddCategoryIcon style={{ fontSize: '1.5rem' }} />
            {"Add Product".toUpperCase()}
          </div>

          {/* sections */}
          <div className='px-4'>
            <input type="text" placeholder="Add Product Name" className="border border-gray-300 p-3 rounded-md w-full focus:outline-none  text-base text-[#252525] mb-6 mt-4"
              onChange={(e) => {
                setproductData((prev) => ({ ...prev, name: e.target.value }))
              }} />

            <div className='md:flex gap-6'>
              <div className='min-w-[200px]'>
                <FormControl fullWidth>
                  <InputLabel id="Product category">Product Category</InputLabel>
                  <Select label="Product category"
                    labelId='Product category'
                    value={productData.category}
                    onChange={(e) => setproductData((prev) => ({ ...prev, category: e.target.value }))}>

                    {categoriesList.map((category, index) =>
                      <MenuItem key={index} value={category.name} >
                        {category.name}
                      </MenuItem>
                    )}

                  </Select>
                </FormControl>
              </div>

              {/* quantity */}
              <div className='border border-gray-300 p-2 rounded-md  focus:outline-none  text-base text-[#252525] max-w-4xl mt-6 md:mt-0 flex items-center gap-2'>
                <ShoppingCartIcon />
                <input type="text" placeholder="Product Quantity"
                  className="p-2 rounded-md w-full focus:outline-none border-none text-base text-[#252525]"
                  onChange={(e) => setproductData((prev) => ({ ...prev, quantity: parseInt(e.target.value, 10) }))}

                  onInput={(e) => {
                    // Allow only numbers and certain special keys
                    const charCode = e.which ? e.which : e.keyCode;
                    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
                      e.preventDefault();
                    }
                  }}
                />
              </div>
            </div>

            {/* Selling price & Buying price */}
            <div className='md:flex gap-6 mt-5 mb-5'>
              <div className='border border-gray-300 p-2 rounded-md  focus:outline-none  text-base text-[#252525] max-w-4xl mt-6 md:mt-0 flex items-center gap-2'>
                <MoneyIcon />
                <input type="text" placeholder="Purchase price"
                  className="p-2 rounded-md w-full focus:outline-none border-none text-base text-[#252525]"
                  onChange={(e) => setproductData((prev) => ({ ...prev, purchasePrice: parseInt(e.target.value, 10) }))} />
              </div>

              <div className='border border-gray-300 p-2 rounded-md  focus:outline-none  text-base text-[#252525] max-w-4xl mt-6 md:mt-0 flex items-center gap-2'>
                <MoneyIcon />
                <input type="text" placeholder="Selling price" className="p-2 rounded-md w-full focus:outline-none border-none text-base text-[#252525]"
                  onChange={(e) => setproductData((prev) => ({ ...prev, sellingPrice: parseInt(e.target.value, 10) }))} />
              </div>

            </div>

            <p className='text-[1.25rem] font-fira_sans mt-10 whitespace-break-spaces'>Discount Percentage (min sale 100 no.)</p>
            <div className='md:px-8 px-4 mb-6'>
              <div className=" flex gap-4 justify-center items-center">
                <p className='text-[1.5rem] w-16'>{productData.discountPercentage + "%"}</p>
                <Slider defaultValue={productData.discountPercentage}
                  onChange={(e) => setproductData((prev) => ({ ...prev, discountPercentage: parseInt(e.target.value) }))} />
                <p className='text-[1.5rem]'>{'100%'}</p>
              </div>
            </div>

            {/* details */}
            <p className='text-[1.25rem] font-fira_sans text-[#252525]'>
              {`Profit (per item) : ${productData.sellingPrice - productData.purchasePrice} ₹`}
            </p>


            <Button variant='contained' className='flex gap-2 w-[8rem] items-center justify-around' sx={{ p: '0.5rem' }}
              onClick={async () => {
                if (productData.name == "" || productData.category == "" || productData.quantity == 0 || productData.purchasePrice == 0 || productData.sellingPrice == 0) {
                  setsnackBarOpen(true);
                } else {
                  setloading(true);
                  const res = await addProduct(productData);
                  setloading(false);
                  getData();
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

          </div>
        </Paper>
      </div >

      {/* all products section */}
      <div className='md:px-16 px-4 pt-14'>
        <Paper className='flex flex-col flex-shrink-0 h-auto max-h-max bg-gray-200 rounded-md shadow-md py-4'>
          {/* title */}
          <div className='p-2 font-ubuntu text-[1.25rem] text-[#252525] font-semibold flex gap-3 items-center  border-b-2 border-blue-500'>
            <AddCategoryIcon style={{ fontSize: '1.5rem' }} />
            {"All Products".toUpperCase()}
          </div>

          {/* all products table */}
          <div className='overflow-x-auto p-3'>
            <table className='w-full text-base font-fira_sans '>
              <thead className='divide-x'>
                <tr>
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Category</th>
                  <th className="px-4 py-2">Available Quantity</th>
                  <th className="px-4 py-2">Sold</th>
                  <th className="px-4 py-2">Purchase price</th>
                  <th className="px-4 py-2">Selling price</th>
                  <th className="px-4 py-2">Discount</th>
                  <th className="px-4 py-2">Profit</th>
                  <th className="px-4 py-2">Date Added</th>
                  {/* <th className="px-4 py-2">Actions</th> */}
                </tr>
              </thead>
              <tbody>
                {productsList.map((product, index) =>
                  <tr key={index} className={styling}>
                    <td className={styling}>{product.name}</td>
                    <td className={styling}>{product.category}</td>
                    <td className={styling}>{product.quantity}</td>
                    <td className={styling}>{product.itemsSold}</td>
                    <td className={styling}>{product.purchasePrice}</td>
                    <td className={styling}>{product.sellingPrice}</td>
                    <td className={styling}>{product.discountPercentage + '%'}</td>
                    <td className={styling}>
                      {product.sellingPrice - product.purchasePrice + ' rs'}
                    </td>
                    <td className={styling}>{product.date}</td>

                    {/* <td className={'border border-[#443c68] min-w-[6rem] p-4 leading-7 flex justify-center items-center'}>
                      <IconButton edge="end" aria-label="delete" onClick={async () => {
                        await deleteProduct(product.id);
                        await getData()
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
      </div >
    </div >
  )
}

export default Products