import  { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import instance from "../../../configs/axios";
import { Button, message, Popconfirm, Skeleton, Spin, Table } from "antd";
import { DeleteOutlined, EditFilled, FileAddOutlined } from "@ant-design/icons";
import ModalComponent from "./components/model";
import { Isize } from "../../../interFaces/size";

const DashboardSize = () => {
  const queryClient = useQueryClient();
  const [messageApi, contextHolders] = message.useMessage();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedSize, setSelectedSize] = useState<Isize | null>(null);

  const { data, isError, isLoading, error } = useQuery({
    queryKey: ["size"],
    queryFn: async () => {
      return await instance.get("/admin/sizes");
    },
    refetchInterval: 60000,
  });

  const dataTable = data?.data.data.map((item: Isize) => ({
    key: item.id,
    ...item,
  }));

  const { mutate: deleteSize, isPending: isDeleting } = useMutation({
    mutationFn: async (id: number) => {
      try {
        await instance.delete(`/admin/sizes/${id}`);
      } catch (error) {
        console.error(error);
      }
    },
    onSuccess: () => {
      messageApi.success("Xóa thành công.");
      queryClient.invalidateQueries({
        queryKey: ["size"],
      });
    },
    onError: () => {
      messageApi.error("Xóa không thành công.");
    },
  });

  const handleAddNew = () => {
    setSelectedSize(null);
    setIsModalVisible(true);
  };

  const handleEdit = (size: Isize) => {
    setSelectedSize(size);
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
        title: "status",
        dataIndex: "status",
        key: "status",
        render: (_: any, { status }: any) => (
            <Button danger={!status} cklassName={`${!!status && 'border-green-600 text-green-600'} min-w-[80px]`}>
                {status ? "Hiển thị" : 'Ẩn'}
            </Button>
        )
      },
    {
      title: "Action",
      key: "action",
      render: (size: Isize) => (
        <>
          <Button onClick={() => handleEdit(size)}><EditFilled /></Button>
          <Popconfirm
            title="Bạn có chắc muốn xóa không?"
            onConfirm={() => deleteSize(size.id!)}
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
        <FileAddOutlined /> Thêm Mới
      </Button>
      <Table
        columns={columns}
        dataSource={dataTable}
        showSorterTooltip={{ target: "sorter-icon" }}
      />
      <ModalComponent
        visible={isModalVisible}
        onClose={handleCloseModal}
        size={selectedSize}
      />
    </div>
  );
};

export default DashboardSize;
