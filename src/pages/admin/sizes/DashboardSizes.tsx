import  { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, message, Popconfirm, Skeleton, Spin, Table } from "antd";
import { DeleteOutlined, EditFilled, FileAddOutlined } from "@ant-design/icons";
import instance from "../../../configs/Axios/AxiosConfig";
import ModalComponent from "./util/modelSizes";
import { Isize } from "../../../interFaces/size";

const DashboardSizes = () => {
  const queryClient = useQueryClient();
  const [messageApi, contextHolders] = message.useMessage();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedSize, setSelectedSize] = useState<Isize | null>(null);

  const { data, isError, isLoading, error } = useQuery({
    queryKey: ["sizes"],
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
        queryKey: ["sizes"],
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

  const handleEdit = (sizes: Isize) => {
    setSelectedSize(sizes);
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
        title: 'Trạng thái',
        dataIndex: 'status',
        key: 'status',
        render: (status: number) => (
            <span className={`p-2 text-white rounded-md ${status === 1 ? 'bg-green-500' : 'bg-red-500'}`}>
                {status === 1 ? 'Hoạt động' : 'Không hoạt động'}
            </span>
        )
    },

    {
      title: "Action",
      key: "action",
      render: (Size: Isize) => (
        <>
          <Button onClick={() => handleEdit(Size)}><EditFilled /></Button>
          <Popconfirm
            title="Bạn có chắc muốn xóa không?"
            onConfirm={() => deleteSize(Size.id)}
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
        <FileAddOutlined /> Thêm Mới Sizes
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

export default DashboardSizes;
