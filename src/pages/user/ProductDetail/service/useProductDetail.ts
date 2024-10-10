/* eslint-disable @typescript-eslint/no-explicit-any */
// src/hooks/useProductDetail.ts
import { useEffect, useState } from 'react';
import { fetchProductById, fetchRelatedProducts } from './productService';

export const useProductDetail = (productId: string | number) => {
  const [product, setProduct] = useState<any>(null);
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProductData = async () => {
      try {
        const fetchedProduct = await fetchProductById(productId);
        setProduct(fetchedProduct);

        const relatedProducts = await fetchRelatedProducts(fetchedProduct.category.id);
        setRelatedProducts(relatedProducts);

      } catch (error) {
        console.error('Error fetching product data:', error);
      } finally {
        setLoading(false);
      }
    };

    getProductData();
  }, [productId]);

  return { product, relatedProducts, loading };
};
