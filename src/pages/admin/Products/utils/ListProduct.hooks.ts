/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { deleteProduct, getAllProduct } from "./ListProduct.services";
import { IProduct } from "../../../../interFaces/product";
import { ICate } from "../../../../interFaces/categories";
import { useNavigate } from "react-router-dom";
import useToast from "../../../../hooks/useToast";
import { apiGetCates } from "../../Categories/utils/categories.service";

const useProducts = () => {
  const [products, setProducts] = useState<IProduct | []>([]);
  const [cate, setCate] = useState<ICate[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { showToast } = useToast();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getAllProduct();
        if (response && response !== undefined) {
          setProducts(response.data); // Lưu dữ liệu vào state
          setLoading(false);
        }
      } catch (error: any) {
        console.log(error);
        setError("Failed to fetch products.");
        setLoading(false);
      }
    };
    const fetCates = async () => {
      try {
        const response = await apiGetCates();

        setCate(response.data); // Lưu dữ liệu vào state
        setLoading(false);
      } catch (error) {
        console.log(error);

        setError("Failed to fetch Cate.");
        setLoading(false);
      }
    };
    fetchProducts();
    fetCates();
  }, []);
  const onDelete = async (id: number) => {
    try {
        await deleteProduct(id);
        showToast('success', 'Xoá danh mục thành công!');
    } catch (error) {
        console.log(error);
        showToast('error', 'Có lỗi xảy ra!');
    }
    navigate('/admin/products')
  };
  return { products, loading, error, cate, onDelete };
};

export default useProducts;
