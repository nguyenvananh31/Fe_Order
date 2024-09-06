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
  Select,
} from "antd";
import {
  FileAddOutlined,
  Loading3QuartersOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Axios from "../../../configs/Axios";
import { Ivouchers } from "../../../interFaces/vouchers";

const DashboardVouchers = () => {
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
    queryKey: ["vouchers"],
    queryFn: async () => {
      try {
        return await Axios.get(`/vouchers`);
      } catch (error) {
        console.log(error);
        throw new Error("Error fetching vouchers");
      }
    },
  });




  const { mutate: DeleteVouchers, isPending } = useMutation({
    mutationFn: async (id: number) => {
      try {
        await Axios.delete(`/vouchers/${id}`);
      } catch (error) {
        console.log(error);

        throw new Error("Error deleting vouchers");
      }
    },
    onSuccess: () => {
      messageApi.open({
        content: "Xóa thành công",
        type: "success",
      });
      queryClient.invalidateQueries({
        queryKey: ["vouchers"],
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

  const { data: customer } = useQuery({
    queryKey: ["customer"],
    queryFn: () => Axios.get(`/customer`),
  });

  const { mutate:createVouchers } = useMutation({
    mutationFn: async (data: Ivouchers) => {
      try {
        await Axios.post(`/vouchers` ,data);
      } catch (error) {
        console.log(error);

        throw new Error("Error updating vouchers");
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
        queryKey: ["vouchers"],
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

  const onFinish = (values: Ivouchers) => {
    createVouchers(values);
    form.resetFields();
  };

  if (isError)
    return (
      <div>
        <p>Đã xảy ra lỗi: {error?.message}</p>
      </div>
    );

  // thay data json-server = data db
  const dataTable = dataPayments?.data.map((voucher: Ivouchers) => ({
    key: voucher.id,
    ...voucher,
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
      render: (voucher: Ivouchers) => (
        <>
          <Popconfirm
            title="Bạn muốn xóa phương thức này không"
            description="Bạn có chắc chán xóa không?"
            icon={<QuestionCircleOutlined style={{ color: "red" }} />}
            onConfirm={() => DeleteVouchers(voucher.id!)}
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

          <Button type="primary" onClick={() =>  navigator(`/admin/update-voucher/${voucher.id}`)}>
            Cập Nhật
          </Button>
        </>
      ),
    },
  ];

  return (
    <>
      {contextHolder}
      <div className="mt-5">
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
              label="Tên voucher"
              name="name"
              rules={[
                { required: true, message: "Vui Lòng Nhập Tên" },
                {
                  type: "string",
                  message: "Không được nhập ký tự đặc biệt",
                },
              ]}
            >
              <Input placeholder="Tên voucher" />
            </Form.Item>

            <Form.Item label="Trạng Thái" name="status">
              <Switch />
            </Form.Item>

            <Form.Item label="Customer" name="customer_id">
            <Select
              style={{ width: "100%" }}
              placeholder="Please select customer"
              options={customer?.data.map(
                (customer: { id: number | string; name: string }) => ({
                  value: customer.id,
                  label: customer.name,
                })
              )}
            />
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

export default DashboardVouchers;
