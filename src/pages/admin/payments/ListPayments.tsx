import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import {
  Breadcrumb,
  Button,
  Drawer,
  Input,
  Popconfirm,
  Table,
  Form,
  Select,
} from "antd";
import useListPayments from "./utils/list-payments.hook";
import { IPayments } from "../../../interFaces/payments";

export default function DashboardPayments() {
  const { ...hooks } = useListPayments();

  const onFinish = (values: IPayments) => {
    console.log("Success:", values);
  };

  const columns = [
    {
      title: "Tên Phương Thức",
      dataIndex: "name",
      key: "name",
    },

    {
      title: "Trạng thái",
      dataIndex: "status",
      align: "center",
      width: "15%",
      render: (_: any, { status }: any) => (
        <Button
          danger={!status}
          className={`${
            !!status && "border-green-600 text-green-600"
          } min-w-[80px]`}
        >
          {status ? "Hoạt Động" : "Không Hoạt Động"}
        </Button>
      ),
    },
    {
      title: "Hành động",
      dataIndex: "action",
      align: "center",
      width: "15%",
      fixed: "right",
      render: (_: any, { id }: any) => (
        <div className="min-w-[100px]">
          <Button
            onClick={() => {
              hooks.handleEditPayments(id);
            }}
            type="default"
            className="border-yellow-400 text-yellow-400"
            icon={<EditOutlined />}
          ></Button>
          <Popconfirm
            placement="topRight"
            title="Xoá danh mục"
            description="Bạn có muốn xoá danh mục này?"
            icon={<QuestionCircleOutlined style={{ color: "red" }} />}
            okText="Có"
            cancelText="Không"
            onConfirm={() => hooks.handleDeletePayments(id)}
          >
            <Button className="ml-2" danger icon={<DeleteOutlined />}></Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <>
      {hooks.contextHolder}
      <Breadcrumb
        style={{
          fontSize: "24px",
          margin: "28px 0",
        }}
        items={[
          {
            title: "Dashboard",
          },
          {
            title: <h1 className="font-bold">Payments</h1>,
          },
        ]}
      />
      <div className="bg-primary drop-shadow-primary rounded-primary">
        <div className="flex items-center justify-between">
          <h1 className="p-6 text-xl font-semibold">Payments</h1>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            className="mx-6"
            onClick={hooks.showDraw}
          >
            Thêm mới
          </Button>
        </div>
        <div></div>
        <Table
          loading={hooks.state.loading}
          dataSource={hooks.dataSource || []}
          columns={columns}
          rowKey="id"
          pagination={{
            pageSize: hooks.state.pageSize,
            showSizeChanger: true,
            pageSizeOptions: ["5", "10", "20", "50"], // Các tùy chọn số lượng bản ghi
            total: hooks.state.totalCate,
            current: hooks.state.pageIndex,
            style: {
              paddingRight: "24px",
            },
            onChange(page, pageSize) {
              hooks.handlePageChange(page, pageSize);
            },
          }}
        />
      </div>
      <Drawer
        closable
        destroyOnClose
        title={<div className="text-primary font-bold">Phương Thức</div>}
        placement="right"
        open={hooks.state.showDrawAdd}
        loading={hooks.state.loading}
        onClose={hooks.showDraw}
      >
        <Form
          onFinish={hooks.onCreatePayments}
          // onFinish={onFinish}
          form={hooks.form}
          name="paymentsForm"
          layout="vertical"
        >
          <Form.Item
            label={<div className="font-bold">Tên Payments</div>}
            name="name"
            rules={[
              { required: true, message: "Vui lòng không để trống name!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item name="status" label="Trạng thái" initialValue={0}>
            <Select>
              <Select.Option value={0}>Không Hoạt Động</Select.Option>
              <Select.Option value={1}>Hoạt Động</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item style={{ paddingBottom: "24px" }}>
            <Button type="primary" htmlType="submit">
              Thêm
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </>
  );
}
