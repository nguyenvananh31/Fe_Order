// import React from 'react'

// const RelatedProduct = () => {
//     useEffect(() => {
//         (async () => {
//             const url = `http://127.0.0.1:8000/api/client/product/${param.id}`;
//             try {
//                 const res = await axios.get(url, {
//                     headers: {
//                         'Api_key': import.meta.env.VITE_API_KEY,
//                     },
//                 });

//                 const fetchedProduct = res.data.data;
//                 setProduct(fetchedProduct);
//                 console.log(fetchedProduct.product_details);
//                 setProductDetails(fetchedProduct.product_details); // Lấy product_details

//             } catch (error) {
//                 console.error('Error fetching product:', error);
//             }
//         })()
//     }, [param.id]);
//   return (
//     <div className='box-related-product'></div>
//   )
// }

// export default RelatedProduct