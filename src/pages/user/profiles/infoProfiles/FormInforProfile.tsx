import { CloseOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Checkbox,
  Collapse,
  Descriptions,
  Form,
  Input,
  message,
  Popconfirm,
} from "antd";

const { Panel } = Collapse;

const FormInforProfile = ({ profile, isEditingAddresses }: any) => {
  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    try {
      const updatedProfile = { ...profile, addresses: values.addresses };
      console.log(updatedProfile);

      message.success("Profile and addresses updated successfully");
    } catch (error) {
      console.error("Error submitting addresses:", error);
      message.error("Error submitting addresses");
    }
  };

  const handleRemoveAddress = (index: number) => {
    const currentAddresses = form.getFieldValue("addresses");
    currentAddresses.splice(index, 1);
    form.setFieldsValue({ addresses: currentAddresses }); 
  };
  
  const handleDefaultChange = (name: number, checked: boolean) => {
    const currentAddresses = form.getFieldValue("addresses");
    if (checked) {
      currentAddresses.forEach((address: any, index: number) => {
        address.is_default = index === name ? 1 : 0;
      });
    } else {
      currentAddresses[name].is_default = 0;
    }
    form.setFieldsValue({ addresses: currentAddresses });
  };

  return (
    <div className="col-span-12 lg:col-span-8 2xl:col-span-9">
      <div>
        <Card size="small" title="Thông Tin Khách Hàng" className="mb-4">
          <Descriptions column={1} bordered>
            <Descriptions.Item label="Tên">
              {profile?.customer?.name || "Chưa có tên"}
            </Descriptions.Item>
            <Descriptions.Item label="Email">
              {profile?.customer?.email || "Chưa có email"}
            </Descriptions.Item>
            <Descriptions.Item label="Số Điện Thoại">
              {profile?.customer?.phone_number || "Chưa có số điện thoại"}
            </Descriptions.Item>
            <Descriptions.Item label="Điểm Thưởng">
              {profile?.customer?.diemthuong || 0}
            </Descriptions.Item>
          </Descriptions>
        </Card>
      </div>

      <div className="border-t rounded-[6px] text-gray-800 text-sm leading-[21px] p-5 bg-white">
        {!isEditingAddresses ? (
          <Collapse accordion>
            {profile?.addresses?.map((address: any, index: number) => (
              <Panel
                header={`Địa chỉ ${index + 1}`}
                key={address.id}
                extra={
                  <Popconfirm
                    title="Bạn có chắc muốn xóa địa chỉ này không?"
                    onConfirm={() => handleRemoveAddress(index)}
                  >
                    <CloseOutlined onClick={(e) => e.stopPropagation()} />
                  </Popconfirm>
                }
              >
                <p>
                  <strong>Địa Chỉ:</strong> {address.address}
                </p>
                <p>
                  <strong>Thành Phố:</strong> {address.city}
                </p>
                <p>
                  <strong>Khu Vực:</strong> {address.state}
                </p>
                <p>
                  <strong>Mã Bưu Chính:</strong> {address.postal_code}
                </p>
                <p>
                  <strong>Quốc Gia:</strong> {address.country}
                </p>
                <p>
                  <strong>Mặc Định:</strong>{" "}
                  {address.is_default ? "Có" : "Không"}
                </p>
              </Panel>
            ))}
          </Collapse>
        ) : (
          <Form form={form} onFinish={onFinish}>
            <Form.List name="addresses">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, fieldKey, ...restField }) => (
                    <Collapse key={key} accordion>
                      <Panel header={`Địa chỉ ${name + 1}`} key={key}>
                        {/* Trường địa chỉ */}
                        <Form.Item
                          {...restField}
                          name={[name, "address"]}
                          fieldKey={[fieldKey, "address"]}
                          label="Địa Chỉ"
                          rules={[
                            {
                              required: true,
                              message: "Vui lòng nhập địa chỉ",
                            },
                          ]}
                        >
                          <Input placeholder="Nhập địa chỉ" />
                        </Form.Item>

                        {/* Trường thành phố */}
                        <Form.Item
                          {...restField}
                          name={[name, "city"]}
                          fieldKey={[fieldKey, "city"]}
                          label="Thành Phố"
                          rules={[
                            {
                              required: true,
                              message: "Vui lòng nhập thành phố",
                            },
                          ]}
                        >
                          <Input placeholder="Nhập thành phố" />
                        </Form.Item>

                        {/* Trường khu vực */}
                        <Form.Item
                          {...restField}
                          name={[name, "state"]}
                          fieldKey={[fieldKey, "state"]}
                          label="Khu Vực"
                          rules={[
                            {
                              required: true,
                              message: "Vui lòng nhập khu vực",
                            },
                          ]}
                        >
                          <Input placeholder="Nhập khu vực" />
                        </Form.Item>

                        {/* Trường mã bưu chính */}
                        <Form.Item
                          {...restField}
                          name={[name, "postal_code"]}
                          fieldKey={[fieldKey, "postal_code"]}
                          label="Mã Bưu Chính"
                          rules={[
                            {
                              required: true,
                              message: "Vui lòng nhập mã bưu chính",
                            },
                          ]}
                        >
                          <Input placeholder="Nhập mã bưu chính" />
                        </Form.Item>

                        {/* Trường quốc gia */}
                        <Form.Item
                          {...restField}
                          name={[name, "country"]}
                          fieldKey={[fieldKey, "country"]}
                          label="Quốc Gia"
                          rules={[
                            {
                              required: true,
                              message: "Vui lòng nhập quốc gia",
                            },
                          ]}
                        >
                          <Input placeholder="Nhập quốc gia" />
                        </Form.Item>

                        {/* Trường địa chỉ mặc định */}
                        <Form.Item
                          {...restField}
                          name={[name, "is_default"]}
                          fieldKey={[fieldKey, "is_default"]}
                          valuePropName="checked"
                          label="Địa Chỉ Mặc Định"
                        >
                          <Checkbox
                            onChange={(e) =>
                              handleDefaultChange(name, e.target.checked)
                            }
                          ></Checkbox>
                        </Form.Item>

                        {/* Nút xóa địa chỉ */}
                        <Button type="dashed" onClick={() => remove(name)} danger>
                          Xóa Địa Chỉ
                        </Button>
                      </Panel>
                    </Collapse>
                  ))}

                  {/* Nút thêm địa chỉ mới */}
                  <Button type="dashed" onClick={() => add()} block>
                    + Thêm Địa Chỉ
                  </Button>
                </>
              )}
            </Form.List>
            <Form.Item className="mt-3">
              <Button type="primary" htmlType="submit">
                Lưu Địa Chỉ
              </Button>
            </Form.Item>
          </Form>
        )}
      </div>
    </div>
  );
};

export default FormInforProfile;