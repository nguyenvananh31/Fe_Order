import  { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Icustomer } from "../../../interFaces/custommers";
import { Button, message, Popconfirm, Skeleton, Spin, Table } from "antd";
import { DeleteOutlined, EditFilled, FileAddOutlined } from "@ant-design/icons";
import ModalComponent from "./components/model";
import instanceAxios from "../../../configs/Axios/AxiosConfig";

const DashboardCustomers = () => {
  const queryClient = useQueryClient();
  const [messageApi, contextHolders] = message.useMessage();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Icustomer | null>(null);

  const { data, isError, isLoading, error } = useQuery({
    queryKey: ["customers"],
    queryFn: async () => {
      return await instanceAxios.get("/admin/customers");
    },
    refetchInterval: 60000,
  });

  const dataTable = data?.data.data.map((item: Icustomer) => ({
    key: item.id,
    ...item,
  }));

  const { mutate: deleteCustomers, isPending: isDeleting } = useMutation({
    mutationFn: async (id: number) => {
      try {
        await instanceAxios.delete(`/admin/customers/${id}`);
      } catch (error) {
        console.error(error);
      }
    },
    onSuccess: () => {
      messageApi.success("Xóa khách hàng thành công.");
      queryClient.invalidateQueries({
        queryKey: ["customers"],
      });
    },
    onError: () => {
      messageApi.error("Xóa khách hàng không thành công.");
    },
  });

  const handleAddNew = () => {
    setSelectedCustomer(null);
    setIsModalVisible(true);
  };

  const handleEdit = (customer: Icustomer) => {
    setSelectedCustomer(customer);
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const columns = [
    {
      title: "#",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Số Điện Thoại",
      dataIndex: "phone_number",
      key: "phone_number",
    },
    {
      title: "Điểm Thưởng",
      dataIndex: "diemthuong",
      key: "diemthuong",
    },
    {
      title: "Tài khoản nhận",
      dataIndex: "user_id",
      key: "user_id",
    },
    {
      title: "Action",
      key: "action",
      render: (customer: Icustomer) => (
        <>
          <Button onClick={() => handleEdit(customer)}><EditFilled /></Button>
          <Popconfirm
            title="Bạn có chắc muốn xóa không?"
            onConfirm={() => deleteCustomers(customer.id)}
            disabled={isDeleting}
          >
            <Button disabled={isDeleting}>
              <DeleteOutlined />
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  if (isLoading) {
    return (
      <Spin tip="Đang tải dữ liệu...">
        <div className="content">
          <Skeleton active />
        </div>
      </Spin>
    );
  }

  if (isError) {
    return <p>Lỗi: {error?.message}</p>;
  }

  return (
    <div className="mt-10">
      {contextHolders}
      <Button type="primary" className="m-2" onClick={handleAddNew}>
        <FileAddOutlined /> Thêm Mới Customers
      </Button>
      <Table
        columns={columns}
        dataSource={dataTable}
        showSorterTooltip={{ target: "sorter-icon" }}
      />
      <ModalComponent
        visible={isModalVisible}
        onClose={handleCloseModal}
        customer={selectedCustomer}
      />
    </div>
  );
};

export default DashboardCustomers;
