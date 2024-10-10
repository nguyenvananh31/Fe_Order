import { Tabs } from 'antd';

const { TabPane } = Tabs;

interface IDetail {
  size: { id: string | number; name: string };
}

interface ProductVariantsProps {
  productDetails: IDetail[];
  activeVariant: number;
  handleVariantChange: (key: string) => void;
}

const ProductVariants: React.FC<ProductVariantsProps> = ({ productDetails, activeVariant, handleVariantChange }) => {
  return (
    <div className="product-variant md:mt-[40px] text-textColor1">
      <div className="text-lg flex items-center">
        <span className='text-type-2'>Size:</span>
        <Tabs
          activeKey={String(activeVariant)}
          onChange={handleVariantChange}
          centered
          tabBarGutter={40}
          className="ml-1 tabs-variants font-font1 font-bold tracking-wider"
        >
          {productDetails.map((detail, idx) => (
            <TabPane tab={<span>{detail.size.name}</span>} key={String(idx)} />
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default ProductVariants;
