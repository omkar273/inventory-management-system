import React from 'react';
import AddCategoryIcon from '@mui/icons-material/DashboardCustomizeOutlined';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import CircularProgress from '@mui/material/CircularProgress';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import { addCategory, deleteCategory, getAllCategories } from '@/firebase/firebase_helper.js';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useEffect } from 'react';
import AllCategoriesIcon from '@mui/icons-material/Apps';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';

export const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


export const WhiteCircularProgress = styled(CircularProgress)({
  color: '#ffffff', // Set the color to white
});

const Categories = () => {

  const [loading, setloading] = useState(false);
  const [snackBarOpen, setsnackBarOpen] = useState(false);
  const [categoryName, setcategoryName] = useState("")
  const [categoriesList, setcategoriesList] = useState([])

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setsnackBarOpen(false);
  };

   const getData = async () => {
    const data = await getAllCategories();
    setcategoriesList(data);
    console.log(data);
  }

  useEffect(() => {
    getData();
  }, [])


  return (
    <div className='w-full md:flex justify-around py-8  px-8 md:px-0'>

      <div className='flex flex-col flex-shrink-0 h-auto max-h-max md:w-[33%] '>
        <Paper className='flex flex-col flex-shrink-0 h-auto max-h-max bg-gray-200 rounded-md shadow-md py-4'>
          <div className='p-2 font-ubuntu text-[1.25rem] text-[#252525] font-semibold flex gap-3 items-center  border-b-2 border-blue-500'>
            <AddCategoryIcon style={{ fontSize: '1.5rem' }} />
            {"Add Category".toUpperCase()}
          </div>

          <div className='px-4 py-4'>

            <input type="text" placeholder="Add category" className="border border-gray-300 p-2 rounded-md w-full focus:outline-none  text-base text-[#252525] mb-3"
              onChange={(e) => {
                setcategoryName(e.target.value)
              }} />

            <Button variant='contained' className='flex gap-2 w-[8rem] items-center justify-around' sx={{ p: '0.5rem' }}
              onClick={async () => {
                if (categoryName == "") {
                  setsnackBarOpen(true);
                } else {
                  setloading(true);
                  const res = await addCategory({
                    name: categoryName, products: 0
                  })
                  setloading(false);
                  await getData()
                }
              }}>
              {loading && <WhiteCircularProgress size={24} />}
              {loading ? "Saving" : 'Add Category'}
            </Button>

            {/* error message snackbar */}
            <Snackbar open={snackBarOpen} autoHideDuration={6000} onClose={handleClose}>
              <Alert onClose={handleClose} severity="warning" sx={{ width: '100%' }}>
                Category Name cannot be empty
              </Alert>
            </Snackbar>

          </div>
        </Paper>
      </div>


      <Paper className='w-full flex flex-col flex-shrink-0 h-auto md:w-[50%] bg-yellow-400 rounded-md shadow-md mt-11 md:m-0'>
        <div className='p-2 font-ubuntu text-[1.25rem] text-[#252525] font-semibold flex gap-3 items-center  border-b-2 border-blue-500'>
          <AllCategoriesIcon style={{ fontSize: '1.5rem' }} />
          {"All categories".toUpperCase()}
        </div>

        <div className='px-4 py-4 '>
          {categoriesList.map((category, index) =>
            <div key={index} className='text-[1.5rem] flex items-center whitespace-break-spaces justify-between pr-2 '>
              <div className='flex gap-4'>
                <p>{index + 1 + "."}</p>
                <p>{category.name}</p>
              </div>
              <div>
                <IconButton edge="end" aria-label="delete" onClick={async () => {
                  await deleteCategory(category.id)
                  await getData()
                }}>
                  <DeleteIcon color='error' />
                </IconButton>
              </div>
            </div>
          )}
        </div>
      </Paper>
    </div>
  );
};

export default Categories;
