// // import { Button } from 'antd'
// // import React from 'react'

// // const ListVoucher = () => {
// //     return (
// //         <>
// //             <section className="py-10 bg-gray-100 sm:py-14 lg:py-12">
// //                 <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
// //                     <div className="grid items-center grid-cols-1 gap-y-8 lg:grid-cols-2 gap-x-16 xl:gap-x-24">
// //                         <div className="relative mb-12">
// //                             <img
// //                                 className="w-full rounded-md"
// //                                 src="https://cdn.rareblocks.xyz/collection/celebration/images/content/1/team-work.jpg"
// //                                 alt=""
// //                             />
// //                             <div className="absolute w-full max-w-xs px-4 -translate-x-1/2 sm:px-0 sm:max-w-sm left-1/2 -bottom-12">
// //                                 <div className="overflow-hidden bg-white rounded">
// //                                     <div className="px-10 py-6">
// //                                         <div className="flex items-center">
// //                                             <p className="flex-shrink-0 text-3xl font-bold text-blue-600 sm:text-4xl">
// //                                                 37%
// //                                             </p>
// //                                             <p className="pl-6 text-sm font-medium text-black sm:text-lg">
// //                                                 High Conversions <br />
// //                                                 on Landing Pages
// //                                             </p>
// //                                         </div>
// //                                     </div>
// //                                 </div>
// //                             </div>
// //                         </div>
// //                         <div>
// //                             <div className="flex items-center justify-center w-16 h-16 bg-white rounded-full">
// //                                 <svg
// //                                     className="w-8 h-8 text-orange-400"
// //                                     xmlns="http://www.w3.org/2000/svg"
// //                                     fill="none"
// //                                     viewBox="0 0 24 24"
// //                                     stroke="currentColor"
// //                                 >
// //                                     <path
// //                                         strokeLinecap="round"
// //                                         strokeLinejoin="round"
// //                                         strokeWidth="1.5"
// //                                         d="M13 10V3L4 14h7v7l9-11h-7z"
// //                                     />
// //                                 </svg>
// //                             </div>
// //                             <h2 className="mt-10 text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl lg:leading-tight">
// //                                 Build a perfect team within hours.
// //                             </h2>
// //                             <p className="mt-6 text-lg leading-relaxed text-gray-600">
// //                                 Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
// //                                 sint. Velit officia conse duis enim velit mollit. Exercitation veniam.
// //                             </p>
// //                             <Button
// //                                 href="#"
// //                                 title=""
// //                                 className="inline-flex items-center justify-center px-10 py-4 text-base font-semibold text-white transition-all duration-200 rounded-md mt-9 bg-gradient-to-r from-fuchsia-600 to-blue-600 hover:opacity-80 focus:opacity-80"
// //                                 role="button"
// //                             >
// //                                 Thêm Voucher mới
// //                             </Button>
// //                         </div>
// //                     </div>
// //                 </div>
// //             </section>
// //         </>
// //     )
// // }

// // export default ListVoucher
// // src/ListVoucher.tsx

// import React, { useState, useEffect } from 'react';
// import { Table, Button, Modal, Form, Input, Select, Popconfirm, notification, Image } from 'antd';
// import type { ColumnsType } from 'antd/es/table';
// import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
// import 'antd/dist/reset.css';
// import axios from 'axios';

// const { Option } = Select;

// interface Voucher {
//     key: string;
//     name: string;
//     imageUrl: string;
//     status: boolean;
// }

// const ListVoucher: React.FC = () => {
//     const [data, setData] = useState<Voucher[]>([]);
//     const [modalVisible, setModalVisible] = useState(false);
//     const [editingRecord, setEditingRecord] = useState<null | Voucher>(null);
//     const [form] = Form.useForm();

//     // Fetch data from API
//     useEffect(() => {
//         axios.get('/api/vouchers')
//             .then(response => {
//                 setData(response.data);
//             })
//             .catch(error => {
//                 notification.error({ message: 'Lỗi khi tải dữ liệu!' });
//                 console.error('Error fetching data:', error);
//             });
//     }, []);

//     const handleAdd = () => {
//         setEditingRecord(null);
//         form.resetFields();
//         setModalVisible(true);
//     };

//     const handleEdit = (record: Voucher) => {
//         setEditingRecord(record);
//         form.setFieldsValue(record);
//         setModalVisible(true);
//     };

//     const handleDelete = (key: string) => {
//         axios.delete(`/api/vouchers/${key}`)
//             .then(() => {
//                 setData(data.filter(item => item.key !== key));
//                 notification.success({ message: 'Xóa voucher thành công!' });
//             })
//             .catch(error => {
//                 notification.error({ message: 'Lỗi khi xóa voucher!' });
//                 console.error('Error deleting data:', error);
//             });
//     };

//     const handleSubmit = (values: { name: string; imageUrl: string; status: boolean }) => {
//         if (editingRecord) {
//             axios.put(`/api/vouchers/${editingRecord.key}`, values)
//                 .then(() => {
//                     setData(data.map(item => item.key === editingRecord.key ? { ...item, ...values } : item));
//                     notification.success({ message: 'Sửa voucher thành công!' });
//                     setModalVisible(false);
//                 })
//                 .catch(error => {
//                     notification.error({ message: 'Lỗi khi cập nhật voucher!' });
//                     console.error('Error updating data:', error);
//                 });
//         } else {
//             axios.post('/api/vouchers', values)
//                 .then(response => {
//                     setData([...data, { key: response.data.key, ...values }]);
//                     notification.success({ message: 'Thêm voucher thành công!' });
//                     setModalVisible(false);
//                 })
//                 .catch(error => {
//                     notification.error({ message: 'Lỗi khi thêm voucher!' });
//                     console.error('Error adding data:', error);
//                 });
//         }
//     };

//     const columns: ColumnsType<Voucher> = [
//         {
//             title: 'STT',
//             dataIndex: 'key',
//             key: 'key',
//         },
//         {
//             title: 'Tên voucher',
//             dataIndex: 'name',
//             key: 'name',
//         },
//         {
//             title: 'Ảnh',
//             dataIndex: 'imageUrl',
//             key: 'imageUrl',
//             render: (imageUrl: string) => (
//                 <Image
//                     width={100}
//                     src={imageUrl}
//                     preview={{ src: imageUrl }}
//                 />
//             ),
//         },
//         {
//             title: 'Trạng thái',
//             dataIndex: 'status',
//             key: 'status',
//             render: (status: boolean) => (
//                 <span className={`p-2 text-white rounded-md ${status ? 'bg-green-500' : 'bg-red-500'}`}>
//                     {status ? 'Hoạt động' : 'Ngừng hoạt động'}
//                 </span>
//             ),
//         },
//         {
//             title: 'Hành động',
//             key: 'action',
//             render: (_, record: Voucher) => (
//                 <span>
//                     <Button
//                         icon={<EditOutlined />}
//                         onClick={() => handleEdit(record)}
//                         style={{ marginRight: 8 }}
//                         type="default"
//                     />
//                     <Popconfirm
//                         title="Bạn có chắc chắn muốn xóa voucher này?"
//                         onConfirm={() => handleDelete(record.key)}
//                         okText="Có"
//                         cancelText="Không"
//                     >
//                         <Button
//                             icon={<DeleteOutlined />}
//                             danger
//                         />
//                     </Popconfirm>
//                 </span>
//             ),
//         },
//     ];

//     return (
//         <>
//             <section className="py-4 bg-white sm:py-16 lg:py-10 mt-8 rounded-lg shadow-md">
//                 <div className="px-4 mx-auto sm:px-3 lg:px-4 max-w-7xl">
//                     <div className="max-w-2xl mx-auto text-center">
//                         <h2 className="mt-8 text-2xl font-bold leading-tight text-black lg:mt-12 sm:text-3xl lg:text-4xl">
//                             Danh sách voucher
//                         </h2>
//                         <Button type="primary" onClick={handleAdd} className='inline-flex items-center justify-center px-4 py-4 mt-4 font-semibold text-white transition-all duration-200 bg-blue-600 border border-transparent rounded-md lg:mt-6 hover:bg-blue-700 focus:bg-blue-700'>
//                             Thêm voucher
//                         </Button>
//                     </div>
//                 </div>
//                 <div className="px-4 mx-auto sm:px-3 lg:px-4 max-w-7xl border-t-2 mt-6">
//                     <Table columns={columns} dataSource={data} rowKey="key" />
//                     <Modal
//                         visible={modalVisible}
//                         title={editingRecord ? 'Sửa voucher' : 'Thêm voucher'}
//                         onCancel={() => setModalVisible(false)}
//                         footer={null}
//                         destroyOnClose
//                     >
//                         <Form
//                             form={form}
//                             onFinish={handleSubmit}
//                             layout="vertical"
//                         >
//                             <Form.Item
//                                 name="name"
//                                 className='text-base font-medium text-gray-900'
//                                 label="Tên voucher"
//                                 rules={[{ required: true, message: 'Vui lòng nhập tên voucher!' }]}
//                             >
//                                 <Input className='block w-full text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600' />
//                             </Form.Item>
//                             <Form.Item
//                                 name="imageUrl"
//                                 className='text-base font-medium text-gray-900'
//                                 label="Ảnh"
//                                 rules={[{ required: true, message: 'Vui lòng nhập URL của ảnh!' }]}
//                             >
//                                 <Input className='block w-full text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600' />
//                             </Form.Item>
//                             <Form.Item
//                                 name="status"
//                                 className='text-base font-medium text-gray-900'
//                                 label="Trạng thái"
//                                 rules={[{ required: true, message: 'Vui lòng chọn trạng thái!' }]}
//                             >
//                                 <Select placeholder="Chọn trạng thái">
//                                     <Option value={true}>Hoạt động</Option>
//                                     <Option value={false}>Ngừng hoạt động</Option>
//                                 </Select>
//                             </Form.Item>
//                             <Form.Item>
//                                 <Button type="primary" htmlType="submit" className='w-full mt-1'>
//                                     Lưu
//                                 </Button>
//                             </Form.Item>
//                         </Form>
//                     </Modal>
//                 </div>
//             </section>
//         </>
//     );
// };

// export default ListVoucher;
import React from 'react'

const ListVoucher = () => {
  return (
    <div>ListVoucher</div>
  )
}

export default ListVoucher