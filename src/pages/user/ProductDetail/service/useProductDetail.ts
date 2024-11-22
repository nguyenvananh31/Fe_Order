// import { useEffect, useState } from 'react';
// import { fetchProductById } from './productService';



// export const useProductDetail = (productId: string) => {

//   const [state, setState] = useState<IState>(initState);
//   const [relatedProducts, setRelatedProducts] = useState<any[]>([]);

//   useEffect(() => {
//     const getProductData = async () => {
//       try {
//         const fetchedProduct = await fetchProductById(+productId);
//         // setProduct(fetchedProduct);

//         // const relatedProducts = await fetchRelatedProducts(fetchedProduct.category.id);
//         // setRelatedProducts(relatedProducts);
//         setState(prev => ({...prev, loading: false}));
//       } catch (error) {
//         console.error('Error fetching product data:', error);
//         setState(prev => ({...prev, loading: false}));
//       }
//     };

//     getProductData();
//   }, [productId]);

//   // return { ...state, relatedProducts };
// };
