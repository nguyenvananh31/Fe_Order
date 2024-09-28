import { CalendarFilled, CloseCircleFilled, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { Drawer, Input, Select, Pagination, Modal, DatePicker, TimePicker, message, notification } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

const { Option } = Select;

const Table = () => {
  const [visible, setVisible] = useState(false);
  const [tables, setTables] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [eatTime, setEatTime] = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);

  const [bookingModalVisible, setBookingModalVisible] = useState(false);
  const [selectedTable, setSelectedTable] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [bookingDate, setBookingDate] = useState(null);
  const [bookingTime, setBookingTime] = useState(null);
  const [tableDetail, setTableDetail] = useState<any[]>([]);


  // State for new "hello" modal
  const [helloModalVisible, setHelloModalVisible] = useState(false);

  useEffect(() => {
    (async () => {
      const url = 'http://127.0.0.1:8000/api/client/order_table/';
      try {
        const res = await axios.get(url, {
          headers: {
            'Api_key': import.meta.env.VITE_API_KEY,
          },
        });
        setTables(res.data.data.data || []);
      } catch (error) {
        console.error('Error fetching tables:', error);
        setTables([]);
      }
    })();

  }, []);

  const getDetailOrder = async (tableId: any) => {
    const url = `http://127.0.0.1:8000/api/client/order_table/${tableId}`;
    try {
      const res = await axios.get(url, {
        headers: {
          'Api_key': import.meta.env.VITE_API_KEY,
        },
      });
      console.log(res.data.data.data);
      setTableDetail(res.data.data.data)
      setHelloModalVisible(true); // Show the hello modal when calendar button is clicked
    } catch (error) {
      console.error('Error fetching tables:', error);
      //  notification.warning()
      alert(error.response.data.message)
    }
  };

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  // Handle booking button click
  const handleBookingClick = (table) => {
    setSelectedTable(table);
    setBookingModalVisible(true);
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
      bookingData,
      {
        headers: {
          'Api_key': 'X5eAbbdgwaEWF2fC2u6ZYSN8rLUCbtBzROW92ngJauftSO5gJ27HGsCzL9sw',
        }
      }
    );
    console.log(res);
    setBookingModalVisible(false);
    setPhoneNumber('');
    setBookingDate(null);
    setBookingTime(null);
    message.success('Booking confirmed!');
  };

  const filteredTables = tables
    .filter(table => table.table.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter(table => (statusFilter ? table.status.toString() === statusFilter : true));
  const paginatedTables = filteredTables.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <>
      <div className="container max-w-[1140px] px-[16px] lg:px-[20px] mx-auto mt-12 gap-[24px]">
        <section className=" bg-transparent mb-6">
          <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="mt-10 text-3xl font-bold uppercase leading-tight text-black sm:text-4xl lg:text-5xl">
                Danh Sách bàn
              </h2>
              <p className="max-w-xl mx-auto mt-4 text-base leading-relaxed text-gray-600">
                Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
                sint. Velit officia consequat duis.
              </p>
            </div>
          </div>
        </section>

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

        <div className="box-list-table p-0 grid grid-cols-2 lg:grid-cols-4 md:grid-cols-3 gap-[16px]">
          {paginatedTables.map((table, index) => (
            <div
              key={index}
              className={`group box-tables-item w-full bg-bodyColor border-[2px] shadow-sm rounded-md md:p-4 p-2 relative overflow-hidden ${table.status == 1 ? `hover:bg-mainColor2 border-mainColor2` : `hover:bg-mainColor1 border-mainColor1`} duration-200`}
            >
              <span className={`text-sm text-white px-[8px] py-[2px] w-full text-center ${table.status == 1 ? `bg-mainColor2 border-mainColor2` : `bg-mainColor1`} group-hover:bg-transparent duration-400 absolute top-0 right-0`}>
                #{index + 1} - {table.status == 1 ? `Available` : `Unavailable`}
              </span>
              <button className="btn-calender absolute bottom-3 right-2 z-50 bg-blue-400 text-black text-sm p-3 rounded-full w-12 h-12 mr-1 hover:bg-blue-600"
                onClick={() => getDetailOrder(table.id)}
              >
                <CalendarFilled className='text-white' />
              </button>
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
        <Select
          placeholder="Filter by status"
          value={statusFilter}
          onChange={(value) => setStatusFilter(value)}
          className="w-[50%] lg:w-full md:w-full active:border-mainColor2"
        >
          <Option value="7">Sáng</Option>
          <Option value="12">Trưa</Option>
          <Option value="19">Tối</Option>
          <Option value="">Khác</Option>
        </Select>
      </Modal>

      {/* "Hello" Modal */}
      <Modal
        title="Danh sách đặt lịch"
        visible={helloModalVisible}
        onCancel={() => setHelloModalVisible(false)}
        onOk={() => setHelloModalVisible(false)}
        okText="OK"
        cancelText="Cancel"
      >
        <table className="w-full mt-4 border-collapse">
          <thead>
            <tr>
              <th className='px-2 border'>STT</th>
              <th className='px-2 border'>Người Đặt</th>
              <th className='px-2 border'>STĐ</th>
              <th className='px-2 border'>Ngày Đặt</th>
              <th className='px-2 border'>Giờ Đặt</th>
              <th className='px-2 border'>Mô Tả</th>
              <th className='px-2 border'>Trạng Thái</th>
            </tr>
          </thead>
          <tbody>
            {tableDetail.map((item, index) => (
              <tr key={index}>
                <td className='px-2 border'>{index + 1}</td>
                <td className='px-2 border'>{item.user_name}</td>
                <td className='px-2 border'>0{item.phone_number}</td>
                <td className='px-2 border'>{item.date_oder}</td>
                <td className='px-2 border'>{item.time_oder}</td>
                <td className='px-2 border'>{item.description}</td>
                <td className='px-2 border'>{item.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Modal>
      <section className="pt-10 mt-6 pb-8 overflow-hidden bg-gray-100 sm:pt-16 lg:pt-24">
        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">
              Connect with all apps
            </h2>
            <p className="max-w-xl mx-auto mt-4 text-base leading-relaxed text-gray-600">
              Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
              sint. Velit officia consequat duis.
            </p>
            <a
              href="#"
              title=""
              className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-gray-900 transition-all duration-200 border-2 border-gray-200 rounded-md mt-9 hover:bg-gray-900 hover:text-white hover:border-gray-900 focus:bg-gray-900 focus:text-white focus:border-gray-900"
              role="button"
            >
              Check all apps
            </a>
          </div>
        </div>
        <img
          className="w-full min-w-full mx-auto mt-12 scale-150 max-w-7xl lg:min-w-0 lg:mt-0 lg:scale-100"
          src="https://cdn.rareblocks.xyz/collection/celebration/images/integration/1/services-icons.png"
          alt=""
        />
      </section>

    </>
  );
};

export default Table;
