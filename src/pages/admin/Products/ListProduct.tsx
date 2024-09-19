/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { Table, Modal, Button, Input, Select, Image, Space, Popconfirm } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import useProducts from './utils/ListProduct.hooks';
import { IProduct } from '../../../interFaces/product';
import { getImageUrl } from '../../../constants/common';

const { Option } = Select;

const ListProduct: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<[number, number] | null>(null);

  // Fetch product data
  const { products, cate, onDelete } = useProducts();
  console.log(products);

  // Filtered products based on search term, category, and price range
  const filteredProducts = products
    .filter((product: { name: string }) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((product: { sub_categories_id: string }) =>
      selectedCategory ? product.sub_categories_id === selectedCategory : true
    )
    .filter((product: { price: number }) =>
      priceRange === null || (product.price >= priceRange[0] && product.price <= priceRange[1])
    );

  // Columns for the AntD Table
  const columns = [
    {
      title: 'STT',
      dataIndex: 'id',
      key: 'sno',
      render: (index: number) => <span>{index + 1}</span>,
    },
    {
      title: 'Tên',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: IProduct) => (
        <Button
          type="link"
          className="text-md font-semibold text-[#000] hover:text-blue-800"
          onClick={() => showProductDetails(record)}
        >
          {text}
        </Button>
      ),
    },
    {
      title: 'Ảnh',
      dataIndex: 'thumbnail',
      key: 'thumbnail',
      render: (thumbnail: string, record: IProduct) => (
        <div className="w-[130px] h-[100px]">
          <Image
            className="object-cover rounded-md shadow-sm hover:scale-110 transition-transform cursor-pointer"
            src={getImageUrl(thumbnail)}
            alt={record.name}
            preview={{ src: getImageUrl(thumbnail), className: 'rounded-md' }}
          />
        </div>
      ),
    },
    {
      title: 'Danh mục',
      dataIndex: 'sub_categories_id',
      key: 'category',
      render: (sub_categories_id: any, index: number) => (
        <p>
          {cate.map((item) => (
            <span key={index}>
              {item.id == sub_categories_id || item.subcategory.id == sub_categories_id
                ? item.name
                : ''}
            </span>
          ))}
        </p>
      ),
    },
    {
      title: 'Hành động',
      dataIndex: 'id',
      key: 'actions',
      render: (id: number, record: IProduct) => (
        <Space>
          <Button href={`/admin/product-edit/${id}`}>Sửa</Button>
          <Popconfirm
            title="Bạn có chắc chắn muốn xóa sản phẩm này không?"
            onConfirm={() => onDelete(id)}
            okText="Có"
            cancelText="Không"
          >
            <Button danger>Xóa</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  // Show modal with product details
  const showProductDetails = (product: IProduct) => {
    setSelectedProduct(product);
    setIsModalVisible(true);
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    setSelectedProduct(null);
  };

  return (
    <div className="p-6">
      {/* Search, Filter, and Add Button */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-4">
          <Input
            placeholder="Tìm theo tên sản phẩm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: 200 }}
          />
          <Select
            placeholder="Tìm theo danh mục"
            style={{ width: 180 }}
            allowClear
            onChange={(value) => setSelectedCategory(value)}
          >
            <Option value="">Tất cả</Option>
            {cate.map((item) => (
              <Option key={item.id} value={item.id}>
                {item.name}
              </Option>
            ))}
          </Select>
          <Select
            placeholder="Tìm theo giá"
            style={{ width: 180 }}
            allowClear
            onChange={(value) => {
              if (value === 'low') setPriceRange([0, 50000]);
              else if (value === 'medium') setPriceRange([50000, 100000]);
              else if (value === 'high') setPriceRange([100000, 2000000000000]);
              else setPriceRange(null);
            }}
          >
            <Option value="">Tất cả</Option>
            <Option value="low">Dưới 50K</Option>
            <Option value="medium">50K - 100K</Option>
            <Option value="high">Trên 100K</Option>
          </Select>
        </div>
        <Button
          type="primary"
          shape="circle"
          icon={<PlusOutlined />}
          href={`product-add`}
          size="large"
        />
      </div>

      {/* Product Table */}
      <Table columns={columns} dataSource={filteredProducts} rowKey="id" />

      {/* Product Details Modal */}
      <Modal
        title={selectedProduct?.name}
        visible={isModalVisible}
        onCancel={handleModalCancel}
        footer={null}
        width={600}
      >
        {selectedProduct && (
          <div className="flex">
            <div className="w-1/3">
              <img
                src={selectedProduct.thumbnail}
                alt={selectedProduct.name}
                className="rounded-md object-cover"
                style={{ width: '100%', height: 'auto' }}
              />
            </div>
            <div className="w-2/3 pl-6">
              <h2 className="text-xl font-bold">{selectedProduct.name}</h2>
              {/* Additional product details can go here */}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ListProduct;
