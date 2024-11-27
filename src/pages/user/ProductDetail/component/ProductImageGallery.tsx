import { Image } from 'antd';
import { getImageUrl } from '../../../../constants/common';

interface ProductImageGalleryProps {
  thumbnail: string;
  images: { name: string }[];
  productName: string;
}

const ProductImageGallery: React.FC<ProductImageGalleryProps> = ({ thumbnail, images, productName }) => {
  return (
    <div className="box-image-wrapper">
      <div className="box-image-thumbnail w-full h-1/3">
        <Image
          className="box-image-thumbnail__img w-full h-full object-cover"
          src={getImageUrl(thumbnail)}
          alt={productName}
          preview={{ src: getImageUrl(thumbnail), className: 'rounded-md' }}
        />
      </div>
      <div className="box-image-list grid grid-cols-3 gap-[24px] md:mt-[24px] mt-3 md:px-4 p-0">
        {images?.map((image, idx) => (
          <Image
            key={idx}
            className="box-image-list__img w-40 h-40 object-cover"
            src={getImageUrl(image.name)}
            alt={productName}
            preview={{ src: getImageUrl(image.name), className: 'rounded-md' }}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductImageGallery;
