import { CloseCircleFilled, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { Drawer, Input, Select, Pagination, Modal, DatePicker, TimePicker, message } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

const { Option } = Select;

const Table = () => {
  const [visible, setVisible] = useState(false);
  const [tables, setTables] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState(''); // Lọc theo trạng thái
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(8); // Số item mỗi trang

  const [bookingModalVisible, setBookingModalVisible] = useState(false); // Modal visibility
  const [selectedTable, setSelectedTable] = useState(null); // Selected table ID
  const [phoneNumber, setPhoneNumber] = useState(''); // Phone number input
  const [bookingDate, setBookingDate] = useState(null); // Booking date
  const [bookingTime, setBookingTime] = useState(null); // Booking time

  useEffect(() => {
    (async () => {
      const url = 'http://127.0.0.1:8000/api/client/order_table/';
      try {
        const res = await axios.get(url, {
          headers: {
            'Api_key': import.meta.env.VITE_API_KEY,
          },
        });
        setTables(res.data.data.data || []); // Gán dữ liệu
      } catch (error) {
        console.error('Error fetching tables:', error);
        setTables([]); // Gán mảng rỗng khi có lỗi
      }
    })();
  }, []);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  // Handle booking button click
  const handleBookingClick = (table) => {
    setSelectedTable(table);
    setBookingModalVisible(true); // Show modal
  };

  // Handle booking confirmation
  const handleBookingConfirm = async () => {
    if (!phoneNumber || !bookingDate || !bookingTime) {
      message.error('Please fill in all the booking details.');
      return;
    }

    const bookingData = {
      table_id: selectedTable.id,
      phone_number: phoneNumber,
      date_order: bookingDate.format('DD-MM-YYYY'),
      time_order: bookingTime.format('HH:mm'),
      table_status: 1,
    };

    console.log('Booking Data:', bookingData);
    const res = await axios.post(
      'http://127.0.0.1:8000/api/client/order_table/',
      bookingData, // This should be the second argument for POST request
      {
        headers: {
          'Api_key': 'X5eAbbdgwaEWF2fC2u6ZYSN8rLUCbtBzROW92ngJauftSO5gJ27HGsCzL9sw',
        }
      }
    );
    console.log(res);
    // Close modal and reset fields
    setBookingModalVisible(false);
    setPhoneNumber('');
    setBookingDate(null);
    setBookingTime(null);
    message.success('Booking confirmed!');
  };

  // Lọc dữ liệu dựa trên tìm kiếm và trạng thái
  const filteredTables = tables
    .filter(table => table.table.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter(table => (statusFilter ? table.status.toString() === statusFilter : true));

  // Phân trang dữ liệu
  const paginatedTables = filteredTables.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <>
      <div className="container max-w-[1140px] px-[16px] lg:px-[20px] mx-auto mt-12 gap-[24px]">
        <section className=" bg-transparent mb-6">
          <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="mt-10 text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">
                Download Celebration
              </h2>
              <p className="max-w-xl mx-auto mt-4 text-base leading-relaxed text-gray-600">
                Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
                sint. Velit officia consequat duis.
              </p>
            </div>
          </div>
        </section>

        {/* Bộ lọc và tìm kiếm */}
        <div className="box-filter flex justify-start sm:grid grid-cols-3 lg:grid-cols-4 gap-4 items-center mb-4">
          <Input
            placeholder="Search table..."
            prefix={<SearchOutlined />}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-borderColor1 rounded-md flex items-center justify-between hover:border-mainColor2 w-full"
          />
          <Select
            placeholder="Filter by status"
            value={statusFilter}
            onChange={(value) => setStatusFilter(value)}
            className="w-[50%] lg:w-full md:w-full active:border-mainColor2"
          >
            <Option value="">All</Option>
            <Option value="1">Available</Option>
            <Option value="0">Unavailable</Option>
          </Select>
        </div>

        {/* Danh sách bảng */}
        <div className="box-list-table p-0 grid grid-cols-2 lg:grid-cols-4 md:grid-cols-3 gap-[16px]">
          {paginatedTables.map((table, index) => (
            <div
              key={index}
              className={`group box-tables-item w-full bg-bodyColor border-[2px] shadow-sm rounded-md md:p-4 p-2 relative overflow-hidden ${table.status == 1 ? `hover:bg-mainColor2 border-mainColor2` : `hover:bg-mainColor1 border-mainColor1`} duration-200`}
            >
              <span className={`text-sm text-white px-[8px] py-[2px] w-full text-center ${table.status == 1 ? `bg-mainColor2 border-mainColor2` : `bg-mainColor1`} group-hover:bg-transparent duration-400 absolute top-0 right-0`}>
                #{index + 1} - {table.status == 1 ? `Available` : `Unavailable`}
              </span>
              <div className="table-content relative w-full group-hover:scale-[1.2] duration-300 mt-[30px]">
                <div className={`table-img mx-auto text-center w-[60px] h-[60px] sm:w-[100px] sm:h-[100px] flex items-center justify-center border-[2px] ${table.status == 1 ? ` border-mainColor2` : ` border-mainColor1`} rounded-lg group-hover:border-bodyColor`}>
                  <span className="text-black text-2xl border-b-[2px] group-hover:text-white">{table.table}</span>
                </div>
                <p className="text-sm text-center mt-2 group-hover:opacity-0">{table.description}</p>
              </div>
              {table.status !== 1 ? (
                <p className="absolute bottom-5 left-[50%] translate-x-[-50%] hidden group-hover:block text-[15px] text-center text-white">
                  Choose Other
                </p>
              ) : (
                <p className="absolute bottom-3 left-[50%] translate-x-[-50%] hidden group-hover:block text-[15px] text-center text-white"></p>
              )}
              <div
                className={`table-acion flex items-center justify-center text-center opacity-0 translate-y-10 pt-6 duration-300 ${table.status == 1 ? `group-hover:block` : `group-hover:hidden`} group-hover:opacity-[1] group-hover:translate-y-0`}
              >
                <button className="bg-mainColor3 text-black text-sm px-3 py-1 rounded-[40px] mr-1" onClick={() => handleBookingClick(table)}>
                  Booking
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Phân trang */}
        <div className="flex justify-center mt-8">
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={filteredTables.length}
            onChange={(page) => setCurrentPage(page)}
          />
        </div>

        
      </div>

     

      {/* Booking Modal */}
      <Modal
        title="Book a Table"
        visible={bookingModalVisible}
        onCancel={() => setBookingModalVisible(false)}
        onOk={handleBookingConfirm}
        okText="Confirm"
        cancelText="Cancel"
        className=''
      >
        <Input
          placeholder="Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          style={{ marginBottom: '10px ' }}
          className='p-2 border-mainColor2'
        />
        <DatePicker
          value={bookingDate}
          onChange={(date) => setBookingDate(date)}
          style={{ marginBottom: '10px', width: '100%' }}
          className='p-2 border-mainColor2'
        />
        <TimePicker
          value={bookingTime}
          onChange={(time) => setBookingTime(time)}
          style={{ width: '100%' }}
          format="HH:mm"
          className='p-2 border-mainColor2'
        />
      </Modal>
      <section className="py-10 bg-white sm:py-16 lg:py-24">
        <div className="max-w-5xl px-4 mx-auto sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-xl font-medium text-gray-900">
              Trusted by world class creators
            </h2>
          </div>
          <div className="grid items-center grid-cols-2 gap-10 mt-12 md:grid-cols-4 sm:gap-y-16">
            <div>
              <img
                className="object-contain w-auto mx-auto h-14"
                src="https://cdn.rareblocks.xyz/collection/celebration/images/logos/2/logo-1.png"
                alt=""
              />
            </div>
            <div>
              <img
                className="object-contain w-auto mx-auto h-14"
                src="https://cdn.rareblocks.xyz/collection/celebration/images/logos/2/logo-2.png"
                alt=""
              />
            </div>
            <div>
              <img
                className="object-contain w-auto h-10 mx-auto"
                src="https://cdn.rareblocks.xyz/collection/celebration/images/logos/2/logo-3.png"
                alt=""
              />
            </div>
            <div>
              <img
                className="object-contain w-auto mx-auto h-14"
                src="https://cdn.rareblocks.xyz/collection/celebration/images/logos/2/logo-4.png"
                alt=""
              />
            </div>
          </div>
        </div>
      </section>

    </>
  );
};

export default Table;
