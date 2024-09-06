import {
  Button,
  Drawer,
  Popconfirm,
  Skeleton,
  Form,
  Table,
  Input,
  Switch,
  message,
} from "antd";
import {
  FileAddOutlined,
  Loading3QuartersOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { IPayments } from "../../../interFaces/payments";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Axios from "../../../configs/Axios";

const DashboardPayments = () => {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  const navigator = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const {
    data: dataPayments,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["payments"],
    queryFn: async () => {
      try {
        return await Axios.get(`/payments`);
      } catch (error) {
        console.log(error);
        throw new Error("Error fetching payments");
      }
    },
  });

  const { mutate: DeletePayments, isPending } = useMutation({
    mutationFn: async (id: number) => {
      try {
        await Axios.delete(`/payments/${id}`);
      } catch (error) {
        console.log(error);

        throw new Error("Error deleting payment");
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
    onError: (error) => {
      console.log(error);
      messageApi.open({
        content: "Xóa thất bại",
        type: "error",
      });
    },
  });

  const { mutate: createPayments } = useMutation({
    mutationFn: async (data: IPayments) => {
      try {
        await Axios.post(`/payments`, data);
      } catch (error) {
        console.log(error);

        throw new Error("Error updating payment");
      }
    },
    onSuccess: () => {
      setOpen(false);
      form.resetFields();
      messageApi.open({
        content: "Thêm thành công",
        type: "success",
      });

      queryClient.invalidateQueries({
        queryKey: ["payments"],
      });
    },
    onError: (error) => {
      console.error(error);
      messageApi.open({
        content: "Thêm không thành công",
        type: "error",
      });
    },
  });

  const onFinish = (values: IPayments) => {
    createPayments(values);
    form.resetFields();
  };

  if (isError)
    return (
      <div>
        <p>Đã xảy ra lỗi: {error?.message}</p>
      </div>
    );

  // thay data json-server = data db
  const dataTable = dataPayments?.data.map((payment: IPayments) => ({
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
        <span style={{ color: status ? "green" : "red" }}>
          {status ? "Hoạt Động" : "Không Hoạt Động"}
        </span>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (payment: IPayments) => (
        <>
          <Popconfirm
            title="Bạn muốn xóa phương thức này không"
            description="Bạn có chắc chán xóa không?"
            icon={<QuestionCircleOutlined style={{ color: "red" }} />}
            onConfirm={() => DeletePayments(payment.id!)}
          >
            <Button
              danger
              htmlType="submit"
              className="mx-2"
              disabled={isPending}
            >
              {isPending ? (
                <>
                  <Loading3QuartersOutlined className="animate-spin" /> Delete
                </>
              ) : (
                "Delete"
              )}
            </Button>
          </Popconfirm>

          <Button
            type="primary"
            onClick={() => navigator(`/admin/update-payments/${payment.id}`)}
          >
            Cập Nhật
          </Button>
        </>
      ),
    },
  ];

  return (
    <>
      <div className="mt-5">
        {contextHolder}
        <Button
          type="primary"
          htmlType="button"
          className="m-2"
          onClick={() => showDrawer()}
        >
          <FileAddOutlined /> Thêm mới
        </Button>
        <Skeleton loading={isLoading} active>
          <Table columns={colums} dataSource={dataTable} />
        </Skeleton>

        <Drawer title="Basic Drawer" onClose={onClose} open={open}>
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            disabled={isPending}
          >
            <Form.Item
              label="Tên payments"
              name="name"
              rules={[
                { required: true, message: "Vui Lòng Nhập Tên" },
                {
                  type: "string",
                  message: "Không được nhập ký tự đặc biệt",
                },
              ]}
            >
              <Input placeholder="Tên payments" />
            </Form.Item>

            <Form.Item label="Trạng Thái" name="status">
              <Switch />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit">
                {isPending ? (
                  <>
                    <Loading3QuartersOutlined className="animate-spin" /> Submit
                  </>
                ) : (
                  "Submit"
                )}
              </Button>
            </Form.Item>
          </Form>
        </Drawer>
      </div>
    </>
  );
};

export default DashboardPayments;
