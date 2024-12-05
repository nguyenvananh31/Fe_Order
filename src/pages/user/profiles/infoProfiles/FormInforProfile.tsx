import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Button,
  Card,
  Descriptions,
  Form,
  List,
  Popconfirm,
  Skeleton,
  Spin,
  Tag,
  message
} from "antd";
import React, { useEffect, useState } from "react";
import BaseModalAddOrEditAddress from "../../../../components/base/BaseModalAddOrEditAddress";
import ApiUtils from "../../../../utils/api/api.utils";

interface IState {
  loading: boolean;
  showModal: boolean;
  itemAddress?: any;
  refresh: boolean;
  data: any;
}

const initState: IState = {
  loading: true,
  showModal: false,
  refresh: false,
  data: {},
}

const FormInforProfile: React.FC = () => {

  const [state, setState] = useState<IState>(initState);
  const [form] = Form.useForm();
  const queryClient = useQueryClient();

  // // Lấy thông tin profile (bao gồm địa chỉ)
  // const { data, isLoading }: any = useQuery({
  //   queryKey: ["profile"],
  //   queryFn: async () => {
  //     return await ApiUtils.fetch("/api/client/profile");
  //   },
  // });

  useEffect(() => {
    (async () => {
      try {
        const res: any = await ApiUtils.fetch("/api/client/profile");
        setState(prev => ({ ...prev, loading: false, data: res?.data || [] }))
      } catch (error) {
        console.log(error);
        setState(prev => ({ ...prev, loading: false }));
      }
    })();
  }, [state.refresh])


  const { mutate: deleteAddress, isPending } = useMutation({
    mutationFn: async (id) => {
      try {
        return await ApiUtils.remove(`/api/client/profile/destroy_address/${id}`);
      } catch (error) {
        console.log(error);
      } finally {
        setState(prev => ({ ...prev, refresh: !prev.refresh }));
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      message.success("Xóa địa chỉ thành công!");
    },
    onError: () => {
      message.error("Xoá địa chỉ thất bại, vui lòng thử lại.");
    },
  });

  // Hiển thị modal thêm hoặc chỉnh sửa địa chỉ
  const showModal = (address?: any) => {
    setState(prev => ({ ...prev, showModal: true, itemAddress: address }));
  };

  // Đóng modal
  const handleCancel = () => {
    setState(prev => ({ ...prev, showModal: false, itemAddress: undefined }));
    form.resetFields();
  };

  const handleConfirm = () => {
    setState(prev => ({ ...prev, showModal: false, itemAddress: undefined, refresh: !prev.refresh }));
  }

  // // Xử lý submit form
  // const handleOk = () => {
  //   form
  //     .validateFields()
  //     .then((values) => {
  //       if (isEditMode) {
  //         updateAddress({ ...values, is_default: values.is_default ? 1 : 0 });
  //       } else {
  //         createAddress({ ...values, is_default: values.is_default ? 1 : 0 });
  //       }
  //     })
  //     .catch((info) => {
  //       console.error("Validate Failed:", info);
  //     });
  // };

  if (isPending)
    return (
      <Spin tip="Đang tải dữ liệu...">
        <div className="content">
          <Skeleton active />
        </div>
      </Spin>
    );

  return (
    <Spin spinning={state.loading}>
      <div>
        <Card size="small" title="Thông Tin Khách Hàng" className="mb-4">
          <Descriptions column={1} bordered>
            <Descriptions.Item label="Tên">
              {state.data?.customer?.name || "Chưa có tên"}
            </Descriptions.Item>
            <Descriptions.Item label="Email">
              {state.data?.customer?.email || "Chưa có email"}
            </Descriptions.Item>
            <Descriptions.Item label="Số Điện Thoại">
              {state.data?.customer?.phone_number || "Chưa có số điện thoại"}
            </Descriptions.Item>
            <Descriptions.Item label="Điểm Thưởng">
              {state.data?.customer?.diemthuong || 0}
            </Descriptions.Item>
          </Descriptions>
        </Card>

        <Card
          title="Địa chỉ của tôi"
          extra={<Button onClick={() => showModal()}>Thêm địa chỉ</Button>}
        >
          <List
            loading={state.loading}
            itemLayout="horizontal"
            dataSource={state.data?.addresses || []}
            renderItem={(address: any) => (
              <List.Item
                actions={[
                  <a key="edit" onClick={() => showModal(address)}>
                    Chỉnh sửa
                  </a>,
                  address.is_default ? (
                    <a
                      key="delete"
                      className="text-red-500"
                      onClick={() => message.warning("Không thể xóa địa chỉ mặc định.")}
                    >
                      Xóa Địa Chỉ
                    </a>
                  ) : (
                    <Popconfirm
                      title="Bạn có chắc chắn muốn xóa địa chỉ này?"
                      okText="Yes"
                      cancelText="No"
                      onConfirm={() => {
                        deleteAddress(address.id); // Gọi mutation để xoá địa chỉ
                      }}
                    >
                      <a key="delete" className="text-red-500">
                        Xóa Địa Chỉ
                      </a>
                    </Popconfirm>
                  ),
                ]}
              >
                <List.Item.Meta
                  title={<>
                    {`${address.fullname} - ${address.phone}`}
                    {address.is_default == 1 && <Tag color="red" className="ml-4 h-max" title="Mặc định">Mặc định</Tag>}
                  </>}
                  description={`${address.commune}, ${address.district}, ${address.province} - ${address.address}`}
                />
              </List.Item>
            )}
          />
        </Card>

        {state.showModal && <BaseModalAddOrEditAddress address={state.itemAddress} onCancel={handleCancel} onConfirm={handleConfirm} />}
        {/* <Modal
          title={isEditMode ? "Chỉnh sửa địa chỉ" : "Thêm địa chỉ mới"}
          open={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          width="90%" // Điều chỉnh kích thước modal
          styles={{body: { padding: '16px' }}} // Thêm padding cho modal
        >
          <Form form={form} layout="vertical">
            <Form.Item
              name="fullname"
              label="Họ và Tên"
              rules={[{ required: true, message: "Họ và tên không được để trống" }]}
            >
              <Input placeholder="Nhập họ và tên" />
            </Form.Item>
            <Form.Item
              name="phone"
              label="Số điện thoại"
              rules={[{ required: true, message: "Số điện thoại không được để trống" }]}
            >
              <Input placeholder="Nhập số điện thoại" />
            </Form.Item>
            <Form.Item
              name="address"
              label="Địa chỉ"
              rules={[{ required: true, message: "Địa chỉ không được để trống" }]}
            >
              <Input placeholder="Nhập địa chỉ" />
            </Form.Item>
            <Form.Item name="city" label="Thành phố" rules={[{ required: true }]}>
              <Input placeholder="Nhập thành phố" />
            </Form.Item>

            <Form.Item
              name="state"
              label="Tỉnh/Thành phố"
              rules={[{ required: true, message: "Tỉnh/Thành phố không được để trống" }]}
            >
              <Input placeholder="Nhập tỉnh/thành phố" />
            </Form.Item>

            <Form.Item
              name="commune"
              label="Phường/Xã"
              rules={[{ required: true, message: "Phường/Xã không được để trống" }]}
            >
              <Input placeholder="Nhập phường/xã" />
            </Form.Item>
            <Form.Item
              name="postal_code"
              label="Mã bưu chính"
              rules={[{ required: true, message: "Mã bưu chính không được để trống" }]}
            >
              <Input placeholder="Nhập mã bưu chính" />
            </Form.Item>
            <Form.Item name="country" label="Quốc gia" rules={[{ required: true }]}>
              <Input placeholder="Nhập quốc gia" />
            </Form.Item>

            <Form.Item name="is_default" valuePropName="checked">
              <Checkbox>Đặt là địa chỉ mặc định</Checkbox>
            </Form.Item>
          </Form>
        </Modal> */}
      </div>
    </Spin>
  );
};

export default FormInforProfile;
