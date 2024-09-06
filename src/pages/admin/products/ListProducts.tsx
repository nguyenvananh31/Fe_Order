import {
  Button,
  Drawer,
  Popconfirm,
  Skeleton,
  Form,
  Table,
  Input,
  Switch,
} from "antd";
import {
  FileAddOutlined,
  Loading3QuartersOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { IPayments } from "../../../interFaces/payments";
import { useState } from "react";
import { useFetchProducts } from "./utils/query/useGetProducts";
import { useFetchProductDetails } from "./utils/query/useGetProductsDetails";
import { useUpdateProducts } from "./utils/mution/useUploadProducts";
import { Iproducts } from "../../../interFaces/products";
import { useDeleteProducts } from "./utils/mution/useDeleteProducts";

const DashboardPayments = () => {
  const [open, setOpen] = useState(false);

  const navigator = useNavigate();
  const [form] = Form.useForm();
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const showDrawer = (id: number) => {
    setOpen(true);
    setSelectedId(id);
  };

  const onClose = () => {
    setOpen(false);
  };

  const { dataProducts, isLoading, isError, error } = useFetchProducts()

  const { dataPaymentDetails } = useFetchProductDetails(selectedId || "")


  const { updateProducts  } = useUpdateProducts()

  const onFinish = (values: Iproducts) => {
    if(!selectedId) return
    updateProducts({id:selectedId, productsData:values});
    form.resetFields();
  };

  const { deleteProducts , contextHolder , isPending } = useDeleteProducts()

  if (isError)
    return (
      <div>
        <p>Đã xảy ra lỗi: {error?.message}</p>
      </div>
    );


    //thay data json-server = data db
  const dataTable = dataProducts?.data.map((payment: IPayments) => ({
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
            onConfirm={() => deleteProducts(payment.id!)}
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

          <Button type="primary" onClick={() => showDrawer(payment.id!)}>
            Cập Nhật
          </Button>

          <Drawer title="Basic Drawer" onClose={onClose} open={open}>
            <Skeleton loading={isLoading} active>
              <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                initialValues={dataPaymentDetails?.data}
                disabled={isPending}
              >
                <Form.Item
                  label="Tên Sản Phẩm"
                  name="name"
                  rules={[
                    { required: true, message: "Vui Lòng Nhập Tên" },
                    {
                      type: "string",
                      message: "Không được nhập ký tự đặc biệt",
                    },
                  ]}
                >
                  <Input placeholder="Tên Sản Phẩm" />
                </Form.Item>

                

                <Form.Item label="Trạng Thái" name="status">
                  <Switch />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                  <Button type="primary" htmlType="submit">
                    {isPending ? (
                      <>
                        <Loading3QuartersOutlined className="animate-spin" />{" "}
                        Submit
                      </>
                    ) : (
                      "Submit"
                    )}
                  </Button>
                </Form.Item>
              </Form>
            </Skeleton>
          </Drawer>
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
