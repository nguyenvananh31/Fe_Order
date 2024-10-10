/* eslint-disable @typescript-eslint/no-unused-vars */
import { Image } from 'antd';
import { getImageUrl } from '../../../../constants/common';
import '../asset/ProductDetail.scss'
interface ProductImageGalleryProps {
  thumbnail: string;
  images: { name: string }[];
  productName: string;
}

const ProductImageGallery: React.FC<ProductImageGalleryProps> = ({ thumbnail, images, productName }) => {
  return (
    <div className="box-image-wrapper">
      <div className="box-image-thumbnail w-full h-1/3 flex items-center justify-center border">
        <Image
          className="box-image-thumbnail__img w-full h-full object-cover"
          // src={`getImageUrl(thumbnail)`}
          src={`https://modinatheme.com/html/foodking-html/assets/img/food/french-fry.png`}
          alt={productName}
          preview={{ src: getImageUrl(thumbnail), className: 'rounded-md' }}
        />
      </div>
      <div className="box-image-list grid grid-cols-3 gap-[16px] md:mt-[24px] mt-3">
        {/* {images.map((image, idx) => (
          <Image
            key={idx}
            className="box-image-list__img w-40 h-40 object-cover"
            src={getImageUrl(image.name)}
            alt={productName}
            preview={{ src: getImageUrl(image.name), className: 'rounded-md' }}
          />
        ))} */}
        <div className="border w-full md:h-28 sm:h-44 h-24 ">
          <Image
          className="box-image-list__img object-cover"
          src={`https://modinatheme.com/html/foodking-html/assets/img/food/french-fry.png`}
          alt={productName}
          preview={{ src: `https://modinatheme.com/html/foodking-html/assets/img/food/french-fry.png` }}
        />
        </div>
        <div className="border w-full md:h-28 sm:h-44 h-24 ">
          <Image
          className="box-image-list__img object-cover"
          src={`https://modinatheme.com/html/foodking-html/assets/img/food/french-fry.png`}
          alt={productName}
          preview={{ src: `https://modinatheme.com/html/foodking-html/assets/img/food/french-fry.png` }}
        />
        </div>
        <div className="border w-full md:h-28 sm:h-44 h-24 ">
          <Image
          className="box-image-list__img object-cover"
          src={`https://modinatheme.com/html/foodking-html/assets/img/food/french-fry.png`}
          alt={productName}
          preview={{ src: `https://modinatheme.com/html/foodking-html/assets/img/food/french-fry.png` }}
        />
        </div>
      </div>
    </div>
  );
};

export default ProductImageGallery;
