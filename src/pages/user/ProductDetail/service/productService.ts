import axios from 'axios';

export const fetchProductById = async (id: string | number) => {
  const url = `http://127.0.0.1:8000/api/client/product/${id}`;
  const res = await axios.get(url, {
    headers: {
      'Api_key': import.meta.env.VITE_API_KEY,
    },
  });
  return res.data.data;
};

export const fetchRelatedProducts = async (categoryId: string | number) => {
  const url = `http://127.0.0.1:8000/api/client/product_cate/${categoryId}`;
  const res = await axios.get(url, {
    headers: {
      'Api_key': import.meta.env.VITE_API_KEY,
    },
  });
  return res.data.data;
};
