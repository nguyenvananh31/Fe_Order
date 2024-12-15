import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchProductById } from './service/productService';
import ProductImageGallery from './component/ProductImageGallery';
import ProductInfo from './component/ProductInfo';
import ProductVariants from './component/ProductVariants';
import useCartStore from '../../../hooks/redux/cart/useCartStore';
import ApiUtils from '../../../utils/api/api.utils';
import useToast from '../../../hooks/useToast';
import { RouteConfig } from '../../../constants/path';

interface IState {
  loading: boolean;
  product: any;
  quantity: number;
}

const initState: IState = {
  loading: true,
  product: {},
  quantity: 1
}

const ProductDetail = () => {

  const [state, setState] = useState<IState>(initState);

  const { id } = useParams();
  const [activeVariant, setActiveVariant] = useState<number>(0);
  const { showError, showSuccess } = useToast();
  const { cartStore, setProtoCart, setProBuyNow } = useCartStore();
  const navigate = useNavigate();

  // Kiểm tra và lấy chi tiết sản phẩm
  const firstDetail = useMemo(() => state.product.product_details && state.product.product_details.length > 0
    ? state.product.product_details[activeVariant]
    : null, [activeVariant, state.product]);

  useEffect(() => {
    const getProductData = async () => {
      if (!id) {
        return;
      }
      try {
        const res = await fetchProductById(+id);

        // const relatedProducts = await fetchRelatedProducts(fetchedProduct.category.id);
        // setRelatedProducts(relatedProducts);
        setState(prev => ({ ...prev, loading: false, product: res.data }));
      } catch (error) {
        console.error('Error fetching product data:', error);
        setState(prev => ({ ...prev, loading: false }));
      }
    };

    getProductData();
  }, [id]);

  const increment = () => setState((prev) => ({ ...prev, quantity: prev.quantity + 1 }));
  const decrement = () => setState((prev) => ({ ...prev, quantity: prev.quantity - 1 < 1 ? prev.quantity - 1 : 1 }));

  const handleVariantChange = (key: string) => setActiveVariant(Number(key));

  // Xử lý sự kiện khi nhấn nút Add to Cart
  const handleAddToCart = useCallback(async (isBuyNow: boolean = false) => {
    try {
      let data: any = {
        product_detail_id: firstDetail.id,
        product_id: state.product.id,
        quantity: state.quantity,
        price: firstDetail.price,
        size_id: firstDetail.size.id,
      }
      const res = await apiAddtoCart(data);
      let newCart = [...cartStore.proCarts];
      const exitedItem = newCart.filter(i => i.product_detail_id == data.product_detail_id);
      if (exitedItem.length > 0) {
        newCart = newCart.map(i => i.product_detail_id == data.product_detail_id ? { ...i, quantity: i.quantity + state.quantity } : i);
      } else {
        data = {
          ...data,
          product_price: data.price,
          price: res.data.price,
          product_thumbnail: state.product.thumbnail
        }
        newCart.push(data);
      }
      setProtoCart(newCart);
      if (isBuyNow) {
        setProBuyNow(res.data.id);
        navigate(RouteConfig.CHECKOUT);
        return;
      }
      showSuccess('Thêm vào giỏ hàng thành công!');
    } catch (error) {
      console.log(error);
      showError('Thêm vào giỏ hàng thất bại!');
    }
  }, [cartStore.proCarts, state.product, state.quantity, firstDetail]);

  //Api add to cart
  const apiAddtoCart = useCallback(async (body: any) => {
    return await ApiUtils.post<any, any>('/api/client/online_cart', body);
  }, [state.product]);

  const activeProductDetail = useMemo(() => state?.product?.product_details?.length > 0 ? state?.product?.product_details[activeVariant] : undefined, [activeVariant, state.product]);

  if (state.loading) return <div>Đang tải...</div>;
  if (!state.product) return <div>Sản phẩm không tồn tại</div>;

  return (
    <div className="container max-w-[1140px] px-[16px] lg:px-[20px] mx-auto md:mt-12 mt-4 md:gap-[24px]">
      <div className="container md:grid grid-cols-gridProductDetail block max-w-[1140px] mx-auto md:mt-12 mt-0 gap-[24px]">
        <div className="container-left md:px-8 px-0">
          <ProductImageGallery
            thumbnail={state.product.thumbnail}
            images={activeProductDetail?.images}
            productName={state.product.name}
          />
        </div>
        <div className="container-right">
          <ProductInfo
            productName={state.product.name}
            description={state.product.description}
            price={activeProductDetail?.price}
            sale={activeProductDetail?.sale || 0}
            currentQuantity={state.quantity}
            increment={increment}
            decrement={decrement}
            handleAddToCart={handleAddToCart}
          />
          <ProductVariants
            productDetails={state.product.product_details}
            activeVariant={activeVariant}
            handleVariantChange={handleVariantChange}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;