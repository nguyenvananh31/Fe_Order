import { Checkbox, Col, Form, Input, Row } from "antd";
import { ReactElement, useCallback, useEffect } from "react";
import { IAddress } from "../../interFaces/custommers";
import BaseModalSetting from "./BaseModalSetting";
import ApiUtils from "../../utils/api/api.utils";
import useToast from "../../hooks/useToast";

interface IProps {
    onCancel: () => void;
    onConfirm: (item: IAddress) => void;
    okText?: ReactElement | string;
    cancelText?: ReactElement | string;
    loading?: boolean;
    address?: IAddress;
    defaultActive?: IAddress;
}

const BaseModalAddOrEditAddress = ({ onConfirm, onCancel, address }: IProps) => {

    const [form] = Form.useForm();
    const toast = useToast();

    useEffect(() => {
        if (!address) {
            return;
        }
        console.log(address);

        form.setFieldsValue({
            fullname: address?.fullname,
            phone: address?.phone,
            province: address?.country,
            district: address?.city,
            commune: address?.commune,
            address_detail: address?.address,
            is_default: address?.is_default
        });
    }, []);

    const handleSubmit = () => {
        form.submit();
    }

    const handleConfirm = async (values: any) => {
        const data: IAddress = {
            id: address?.id || 1234,
            fullname: values.fullname,
            phone: values.phone,
            country: values.province,
            city: values.district,
            commune: values.commune,
            address: values.address_detail,
            is_default: values.is_default,
            postal_code: '100000'
        }
        try {
            if (!address) {
                const res: any = await apiAddNewAddress(data);
                data.id = res?.data?.id || 1234;
            } else {
                await apiEditAddress(address.id, data);
            }
            toast.showSuccess((!address ? 'Thêm' : 'Cập nhật' )+ ' địa chỉ thành công!');
            onConfirm(data);
        } catch (error: any) {
            console.log(error);
            toast.showError(error);
        }
    }

    const apiAddNewAddress = useCallback((body: any) => {
        return ApiUtils.post('/api/client/profile/store_address', body);
    }, []);

    const apiEditAddress = useCallback((id: number, body: any) => {
        return ApiUtils.put('/api/client/profile/update_address' + '/' + id, body);
    }, []);

    return <BaseModalSetting
        onCancel={onCancel}
        onConfirm={handleSubmit}
        title={!address ? 'Thêm' : 'Cập nhật' + ' địa chỉ giao hàng'}
        okText={!address ? 'Thêm' : 'Cập nhật'}
        width={700}
    >
        <Form
            form={form}
            layout="vertical"
            onFinish={handleConfirm}
        >
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                        label="Họ và tên"
                        name={'fullname'}
                        rules={[{ required: true, message: 'Họ tên là bắt buộc!' }]}
                    >
                        <Input placeholder="Nhập họ và tên" />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        label={
                            'Số điện thoại'
                        }
                        name="phone"
                        rules={[
                            { required: true, message: 'Số điện thoại là bắt buộc!' },
                            {
                                pattern: /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[1-9]|9[0-9])[0-9]{7}$/,
                                message: 'Số điện thoại không đúng định dạng!'
                            }
                        ]}
                    >
                        <Input placeholder="Nhập số điện thoại" type="phone" />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        label="Tỉnh thành"
                        name={'province'}
                        rules={[{ required: true, message: 'Tỉnh thành là bắt buộc!' }]}
                    >
                        <Input placeholder="Nhập tỉnh thành" />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        label="Thị xã - Quận huyện"
                        name={'district'}
                        rules={[{ required: true, message: 'Thị xã - Quận huyện là bắt buộc!' }]}
                    >
                        <Input placeholder="Nhập Thị xã - Quận huyện" />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        label="Xã phường"
                        name={'commune'}
                        rules={[{ required: true, message: 'Xã phường là bắt buộc!' }]}
                    >
                        <Input placeholder="Nhập Xã phường" />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        label="Chi tiết địa chỉ"
                        name={'address_detail'}
                        rules={[{ required: true, message: 'Chi tiết địa chỉ là bắt buộc!' }]}
                    >
                        <Input placeholder="Nhập Chi tiết địa chỉ" />
                    </Form.Item>
                </Col>
                <Col>
                    <Form.Item name={'is_default'} valuePropName="checked">
                        <Checkbox>
                            Đặt làm địa chỉ mặc định
                        </Checkbox>
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    </BaseModalSetting>
}

export default BaseModalAddOrEditAddress;