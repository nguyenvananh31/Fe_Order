import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Axios from "../../configs/Axios";
import { IPayments } from "../../interFaces/payments";
import { Button, message, Popconfirm, Skeleton, Table } from "antd";
import {
  FileAddOutlined,
  Loading3QuartersOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const DashboardPayments = () => {
  const queryClient = useQueryClient();
  const [messageApi, contextHolder] = message.useMessage();
  const navigator = useNavigate();

  const { data, isLoading } = useQuery({
    queryKey: ["payments"],
    queryFn: async () => {
      try {
        return await Axios.get(`payments`);
      } catch (error) {
        throw new Error("Kết nối thất bại");
      }
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (id: number) => {
      try {
        return await Axios.delete(`payments/${id}`);
      } catch (error) {
        throw new Error("Error deleting");
      }
    },
    onSuccess: () => {
      messageApi.open({
        content: "Xóa thành công",
        type: "success",
      });
      queryClient.invalidateQueries({
        queryKey: ["payments"],
      });
    },
  });

  const dataTable = data?.data.map((payment: IPayments) => ({
    key: payment.id,
    ...payment,
  }));

  const colums = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Tên Phương Thức",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Trạng Thái",
      dataIndex: "status",
      key: "status",
      render: (status: boolean) => (
        <span style={{ color: status? "green" : "red" }}>{status? "Hoạt Động" : "Không Hoạt Động"}</span>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, payment: IPayments) => (
        <>
          <Popconfirm
            title="Bạn muốn xóa phương thức này không"
            description="Bạn có chắc chán xóa không?"
            icon={<QuestionCircleOutlined style={{ color: "red" }} />}
            onConfirm={() => mutate(payment.id!)}
          >
            <Button type="primary" htmlType="submit" disabled={isPending}>
              {isPending ? (
                <>
                  <Loading3QuartersOutlined className="animate-spin" /> Delete
                </>
              ) : (
                "Delete"
              )}
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <>
      {contextHolder}
      <Button
        type="primary"
        htmlType="button"
        className="m-2"
        onClick={() => navigator(`/admin/create-payments`)}
      >
        <FileAddOutlined /> Thêm mới
      </Button>
      <Skeleton loading={isLoading} active>
        <Table columns={colums} dataSource={dataTable} />
      </Skeleton>
    </>
  );
};

export default DashboardPayments;
