import React, { useState } from 'react';
import { Table, Modal, Button, Input, Space, Select, Form } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const { Option } = Select;

interface Product {
  id: number;
  name: string;
  image: string;
  description: string;
  quantity: number;
  category: string;
  price: number;
  status: string;
}

const ListProduct: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<[number, number] | null>(null);
  const [isImagePreviewVisible, setIsImagePreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  // Sample product data
  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      name: 'Cafe',
      image: 'https://photo.znews.vn/w660/Uploaded/mdf_eioxrd/2021_07_06/2.jpg',
      description: 'A high-end smartphone with a 6.5-inch display, 128GB storage, and a 48MP camera.',
      quantity: 30,
      category: 'Đồ uống',
      price: 799,
      status: 'active',
    },
    {
      id: 2,
      name: 'Rượu',
      image: 'https://example.com/shoes-abc.jpg',
      description: 'Comfortable running shoes with breathable mesh and durable soles.',
      quantity: 120,
      category: 'Đồ uống',
      price: 120,
      status: 'active',
    },
    {
      id: 3,
      name: 'Lẩu',
      image: 'https://example.com/gaming-laptop.jpg',
      description: 'A powerful gaming laptop with a 15.6-inch display, 16GB RAM, and an NVIDIA GTX 1660 Ti.',
      quantity: 15,
      category: 'Đồ ăn',
      price: 1499,
      status: 'active',
    },
  ]);

  // Filtered products based on search term, category, and price range
  const filteredProducts = products
    .filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((product) => (selectedCategory ? product.category === selectedCategory : true))
    .filter(
      (product) =>
        priceRange === null || (product.price >= priceRange[0] && product.price <= priceRange[1])
    );

  // Columns for the AntD Table
  const columns = [
    {
      title: 'STT',
      dataIndex: 'id',
      key: 'sno',
      render: (text: any, record: Product, index: number) => <span>{index + 1}</span>,
    },
    {
      title: 'Tên',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: Product) => (
        <Button type="link" className='text-md font-semibold text-[#000] hover:text-blue-800 ' onClick={() => showProductDetails(record)}>
          {text}
        </Button>
      ),
    },
    {
      title: 'Ảnh',
      dataIndex: 'image',
      key: 'image',
      render: (image: string) => (
        <img
          src={image}
          alt="Product"
          className='w-[75px] h-[75px] object-cover rounded-md shadow-sm hover:scale-115 transition-transform cursor-pointer'
          onClick={() => showImagePreview(image)}
        />
      ),
    },
    { title: 'Mô tả', dataIndex: 'description', key: 'description' },
    { title: 'Số lượng', dataIndex: 'quantity', key: 'quantity'},
    { title: 'Danh mục', dataIndex: 'category', key: 'category' },
    { title: 'Giá', dataIndex: 'price', key: 'price', render: (price: number) => `${price} $` },
    {
      title: 'Hành động',
      key: 'actions',
      render: (text: any, record: Product) => (
        <Space>
          <Button onClick={() => showEditModal(record)}>Sửa</Button>
          <Button danger>Xóa</Button>
        </Space>
      ),
    },
  ];

  // Show modal with product details
  const showProductDetails = (product: Product) => {
    setSelectedProduct(product);
    setIsModalVisible(true);
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    setSelectedProduct(null);
  };

  // Show Add Product Modal
  const showAddModal = () => {
    setIsAddModalVisible(true);
  };

  const handleAddModalCancel = () => {
    setIsAddModalVisible(false);
  };

  // Show Edit Product Modal
  const showEditModal = (product: Product) => {
    setSelectedProduct(product);
    setIsEditModalVisible(true);
  };

  const handleEditModalCancel = () => {
    setIsEditModalVisible(false);
    setSelectedProduct(null);
  };

  // Show Image Preview Modal
  const showImagePreview = (image: string) => {
    setPreviewImage(image);
    setIsImagePreviewVisible(true);
  };

  const handleImagePreviewCancel = () => {
    setIsImagePreviewVisible(false);
    setPreviewImage(null);
  };

  // Handle form submission for adding product (you can modify this to actually add the product)
  const onAddProduct = (values: any) => {
    console.log('Adding product:', values);
    setIsAddModalVisible(false);
  };

  // Handle form submission for editing product (you can modify this to actually edit the product)
  const onEditProduct = (values: any) => {
    console.log('Editing product:', values);
    setIsEditModalVisible(false);
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
            <Option value="Đồ ăn">Đồ ăn</Option>
            <Option value="Đồ uống">Đồ uống</Option>
            <Option value="Đồ ăn nhanh">Đồ ăn nhanh</Option>
          </Select>
          <Select
            placeholder="Tìm theo giá"
            style={{ width: 180 }}
            allowClear
            onChange={(value) => {
              if (value === 'low') setPriceRange([0, 500]);
              else if (value === 'medium') setPriceRange([500, 1000]);
              else if (value === 'high') setPriceRange([1000, 2000]);
              else setPriceRange(null);
            }}
          >
            <Option value="low">Dưới 500$</Option>
            <Option value="medium">500$ - 1000$</Option>
            <Option value="high">1000$ - 2000$</Option>
          </Select>
        </div>
        {/* Round Add Product Button */}
        <Button
          type="primary"
          shape="circle"
          icon={<PlusOutlined />}
          onClick={showAddModal}
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
            {/* Left side: Product Image */}
            <div className="w-1/3">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="rounded-md object-cover"
                style={{ width: '100%', height: 'auto' }}
              />
            </div>
            
            {/* Right side: Product Info */}
            <div className="w-2/3 pl-6">
              <h2 className="text-xl font-bold">{selectedProduct.name}</h2>
              <p className="text-lg font-semibold text-gray-700 mb-2">{selectedProduct.price} $</p>
              <p className="text-sm text-gray-600 mb-1">Category: {selectedProduct.category}</p>
              <p className="text-sm text-gray-600 mb-3">Quantity: {selectedProduct.quantity}</p>
              <hr className="my-4" />
              {/* Description */}
              <p className="text-gray-700">{selectedProduct.description}</p>
            </div>
          </div>
        )}
      </Modal>

      {/* Add Product Modal */}
      <Modal
        title="Add New Product"
        visible={isAddModalVisible}
        onCancel={handleAddModalCancel}
        footer={null}
      >
        <Form onFinish={onAddProduct}>
          <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please input the product name!' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Price" name="price" rules={[{ required: true, message: 'Please input the price!' }]}>
            <Input type="number" />
          </Form.Item>
          <Form.Item label="Category" name="category" rules={[{ required: true, message: 'Please select a category!' }]}>
            <Select>
              <Option value="Electronics">Electronics</Option>
              <Option value="Footwear">Footwear</Option>
              <Option value="Computers">Computers</Option>
            </Select>
          </Form.Item>
          <Form.Item label="Quantity" name="quantity">
            <Input type="number" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Add Product
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* Edit Product Modal */}
      <Modal
        title="Edit Product"
        visible={isEditModalVisible}
        onCancel={handleEditModalCancel}
        footer={null}
      >
        <Form onFinish={onEditProduct} initialValues={selectedProduct || {}}>
          <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please input the product name!' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Price" name="price" rules={[{ required: true, message: 'Please input the price!' }]}>
            <Input type="number" />
          </Form.Item>
          <Form.Item label="Category" name="category" rules={[{ required: true, message: 'Please select a category!' }]}>
            <Select>
              <Option value="Electronics">Electronics</Option>
              <Option value="Footwear">Footwear</Option>
              <Option value="Computers">Computers</Option>
            </Select>
          </Form.Item>
          <Form.Item label="Quantity" name="quantity">
            <Input type="number" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Edit Product
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* Image Preview Modal */}
      <Modal
        visible={isImagePreviewVisible}
        onCancel={handleImagePreviewCancel}
        footer={null}
        bodyStyle={{ textAlign: 'center' }}
      >
        {previewImage && (
          <img
            src={previewImage}
            alt="Preview"
            className='p-6 rounded-sm'
            style={{ maxWidth: '100%', maxHeight: '600px' }}
          />
        )}
      </Modal>
    </div>
  );
};

export default ListProduct;
