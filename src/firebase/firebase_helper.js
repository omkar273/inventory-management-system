import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
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

export const addSales = async (data) => {
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
