import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  increment,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "./config";

const categoryCollectionRef = new collection(db, "categories");
const productsCollectionRef = new collection(db, "products");
const salesCollectionRef = new collection(db, "sales");

export const addCategory = async (data) => {
  return await addDoc(categoryCollectionRef, {
    ...data,
    createdAt: serverTimestamp(),
  });
};

export const getAllCategories = async () => {
  const q = query(categoryCollectionRef, orderBy("createdAt", "asc"));
  const querySnapshot = await getDocs(q);
  const categories = [];
  querySnapshot.forEach((doc) => {
    categories.push({ id: doc.id, ...doc.data() });
  });
  return categories;
};

export const deleteCategory = async (categoryId) => {
  const categoryDocRef = doc(db, "categories", categoryId);
  await deleteDoc(categoryDocRef);
};

export const addProduct = async (data) => {
  return await addDoc(productsCollectionRef, {
    ...data,
    createdAt: serverTimestamp(),
  });
};

export const getAllProducts = async () => {
  const q = query(productsCollectionRef, orderBy("createdAt", "desc"));

  const querySnapshot = await getDocs(q);
  const products = [];
  querySnapshot.forEach((doc) => {
    products.push({ id: doc.id, ...doc.data() });
  });

  return products;
};

export const deleteProduct = async (productId) => {
  const productDocRef = doc(db, "products", productId);
  await deleteDoc(productDocRef);
};

export const incrementProductSold = async (productId, incrementValue) => {
  const productRef = doc(db, "products", productId);
  try {
    const dataSnapshot = await getDoc(productRef);
    const currentData = dataSnapshot.data();
    const updatedQuantity = parseInt(
      (currentData.quantity || 0) - incrementValue,
      10
    );

    const updatedItems =
      Number(currentData.itemsSold || 0) + Number(incrementValue);
    await updateDoc(productRef, {
      quantity: updatedQuantity,
      itemsSold: updatedItems,
    });
  } catch (error) {
    console.error("Error updating document: ", error);
  }
};

export const addSales = async (data) => {
  await incrementProductSold(data.productId, data.productQuantity);
  return await addDoc(salesCollectionRef, {
    ...data,
    createdAt: serverTimestamp(),
  });
};

export const getAllSales = async () => {
  const q = query(salesCollectionRef, orderBy("createdAt", "desc"));

  const querySnapshot = await getDocs(q);
  const salesTransactions = [];
  querySnapshot.forEach((doc) => {
    salesTransactions.push({ id: doc.id, ...doc.data() });
  });

  return salesTransactions;
};
export const getTopSales = async () => {
  const q = query(salesCollectionRef, orderBy("cost", "desc"));

  const querySnapshot = await getDocs(q);
  const salesTransactions = [];
  querySnapshot.forEach((doc) => {
    salesTransactions.push({ id: doc.id, ...doc.data() });
  });

  return salesTransactions;
};

export const deleteSale = async (transactionId) => {
  const salesRef = doc(db, "sales", transactionId);
  await deleteDoc(salesRef);
};
