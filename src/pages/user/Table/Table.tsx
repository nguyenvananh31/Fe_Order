/* eslint-disable @typescript-eslint/no-explicit-any */
import { CalendarFilled, SearchOutlined } from '@ant-design/icons';
import { Input, Select, Pagination, Modal, DatePicker, message, Radio } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';

const { Option } = Select;

const Table = () => {
  const [tables, setTables] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);

  // Consolidated modal state
  const [modalState, setModalState] = useState({
    visible: false,
    type: '', // 'booking', 'order', or 'payment'
    table: null,
    phoneNumber: '',
    bookingDate: null,
    bookingTime: null,
    payment: '',
    tableDetail: [],
  });

  const [payments, setPayments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tableRes = await axios.get('http://127.0.0.1:8000/api/client/order_table/', {
          headers: { 'Api_key': import.meta.env.VITE_API_KEY },
        });
        setTables(tableRes.data.data.data || []);
      } catch (error) {
        console.error('Error fetching tables:', error);
      }

      try {
        const paymentRes = await axios.get('http://127.0.0.1:8000/api/client/list_payments', {
          headers: { 'Api_key': import.meta.env.VITE_API_KEY },
        });
        setPayments(paymentRes.data.data);
      } catch (error) {
        console.error('Error fetching payments:', error);
      }
    };

    fetchData();
  }, []);

  const getDetailOrder = async (tableId: any) => {
    try {
      const res = await axios.get(`http://127.0.0.1:8000/api/client/order_table/${tableId}`, {
        headers: { 'Api_key': import.meta.env.VITE_API_KEY },
      });
      setModalState(prev => ({
        ...prev,
        tableDetail: res.data.data.data,
        type: 'payment',
        visible: true,
      }));
    } catch (error) {
      console.error('Error fetching table details:', error);
      alert(error.response.data.message);
    }
  };

  const handleBookingConfirm = async () => {
    const { phoneNumber, bookingDate, bookingTime, table } = modalState;
    if (!phoneNumber || !bookingDate || !bookingTime) {
      message.error('Please fill in all the booking details.');
      return;
    }

    const bookingData = {
      table_id: table.id,
      phone_number: phoneNumber,
      date_order: bookingDate.format('DD-MM-YYYY'),
      time_order: bookingTime.format('HH:mm'),
      table_status: 1,
    };

    try {
      await axios.post('http://127.0.0.1:8000/api/client/order_table/', bookingData, {
        headers: { 'Api_key': import.meta.env.VITE_API_KEY },
      });
      message.success('Booking confirmed!');
    } catch (error) {
      console.error('Error confirming booking:', error);
    } finally {
      setModalState(prev => ({
        ...prev,
        visible: false,
        phoneNumber: '',
        bookingDate: null,
        bookingTime: null,
      }));
    }
  };

  const handleOrderConfirm = async () => {
    console.log('Selected Payment:', modalState.payment);
    setModalState(prev => ({ ...prev, visible: false }));
  };

  const filteredTables = tables
    .filter(table => table.table.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter(table => (statusFilter ? table.status.toString() === statusFilter : true));
  const paginatedTables = filteredTables.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <>
      <div className="container max-w-[1140px] px-[16px] lg:px-[20px] mx-auto mt-12 gap-[24px]">
        <section className="bg-transparent mb-6">
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

        <div className="box-filter flex justify-start sm:grid grid-cols-3 lg:grid-cols-4 gap-4 items-center pb-4 border-b-[1px] mb-4">
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
              <button className="btn-calender absolute bottom-3 right-2 z-50 bg-blue-400 text-black text-sm rounded-full w-8 h-8 mr-1 hover:bg-blue-600"
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
              <div
                className={`table-acion flex items-center justify-center text-center opacity-0 translate-y-10 pt-6 duration-300 ${table.status == 1 ? `group-hover:block` : `group-hover:hidden`} group-hover:opacity-[1] group-hover:translate-y-0`}
              >
                <button className="bg-mainColor3 text-black text-sm px-3 py-1 rounded-[40px] mr-1 m-1" onClick={() => setModalState({ ...modalState, table, type: 'booking', visible: true })}>
                  Đặt Trước
                </button>
                <button className="bg-mainColor3 text-black text-sm px-3 py-1 rounded-[40px] mr-1 mt-1" onClick={() => setModalState({ ...modalState, table, type: 'order', visible: true })}>
                  Order
                </button>
              </div>
            </div>
          ))}
        </div>

        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={filteredTables.length}
          onChange={(page, pageSize) => {
            setCurrentPage(page);
            setPageSize(pageSize);
          }}
          className='py-6 justify-center'
        />
      </div>

      {/* Booking Modal */}
      <Modal
        title="Booking a Table"
        visible={modalState.visible && modalState.type === 'booking'}
        onCancel={() => setModalState({ ...modalState, visible: false })}
        footer={null}
      >
        <Input
          placeholder="Phone Number"
          value={modalState.phoneNumber}
          onChange={(e) => setModalState({ ...modalState, phoneNumber: e.target.value })}
        />
        <DatePicker
          className="w-full mt-4"
          value={modalState.bookingDate}
          onChange={(date) => setModalState({ ...modalState, bookingDate: date })}
        />
        <DatePicker
          className="w-full mt-4"
          picker="time"
          value={modalState.bookingTime}
          onChange={(time) => setModalState({ ...modalState, bookingTime: time })}
        />
        <button onClick={handleBookingConfirm} className="mt-4 bg-green-500 text-white px-4 py-2 rounded">
          Confirm Booking
        </button>
      </Modal>

      {/* Order Modal */}
      <Modal
        title="Order"
        visible={modalState.visible && modalState.type === 'order'}
        onCancel={() => setModalState({ ...modalState, visible: false })}
        footer={null}
      >
        <div className="w-full">
          <Radio.Group
            onChange={(e) => setModalState({ ...modalState, payment: e.target.value })}
            value={modalState.payment}
            className="w-full"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {payments.map((payment, idx) => (
                <Radio.Button
                  key={idx}
                  value={payment.id}
                  className="flex flex-col items-center justify-center h-16 border-2 border-gray-300 bg-gray-50 p-1 transition-transform duration-150 hover:border-mainColor2 active:scale-95"
                >
                  <span className="text-center">{payment.name}</span>
                </Radio.Button>
              ))}
            </div>
          </Radio.Group>
        </div>

        <div className="mt-4 text-center">
          <button
            onClick={handleOrderConfirm}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Confirm Order
          </button>
        </div>
      </Modal>


      {/* payment Modal */}
      <Modal
        title="Table Details"
        visible={modalState.visible && modalState.type === 'payment'}
        onCancel={() => setModalState({ ...modalState, visible: false })}
        footer={null}
      >
        {/* Render table details here */}
      </Modal>
    </>
  );
};

export default Table;
