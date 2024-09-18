import { LoadingOutlined } from "@ant-design/icons";
import { Form, Input, Modal, Spin } from "antd";
import { useEffect, useState } from "react";
import { Icustomer } from "../../../../interFaces/custommers";
import { apiCreateCus, apiGetOneCustomer } from "../util/customers.service";


interface IProps {
    itemId?: number;
    onRefresh: () => void;
    onClose: () => void;
    showToast: (type: string, message: string) => void;
}

interface IState {
    loading: boolean;
    loadingBtn: boolean;
    isEdit: boolean;
    customer?: Icustomer;
}

const initState: IState = {
    loading: true,
    loadingBtn: false,
    isEdit: false,
}

export default function CustomerModel({ onClose, onRefresh, showToast, itemId = undefined }: IProps) {

    const [state, setState] = useState<IState>(initState);
    const [form] = Form.useForm();

    useEffect(() => {
        if (!itemId) {
            setState(prev => ({ ...prev, isEdit: true, loading: false }));
            return;
        }
        const fetchApi = async () => {
            try {
                const res = await apiGetOneCustomer(itemId);
                if (res.data) {
                    setState(prev => ({ ...prev, loading: false, customer: res.data }));
                    form.setFieldsValue(res.data);
                }
            } catch (error) {
                console.log(error);
                showToast('error', 'Có lỗi xảy ra!');
            }
        }
        fetchApi();
    }, []);

    //submit
    const onFinish = async (values: any) => {
        try {
            setState(prev => ({ ...prev, loading: true }));
            await apiCreateCus(values);
            showToast('success', 'Thêm thành công!');
            onRefresh();
        } catch (error) {
            console.log(error);
            showToast('error', 'Có lỗi xảy ra!');
        }
        setState(prev => ({ ...prev, loading: false }));
    }

    // handle submit form và cập nhật
    const handleSubmit = () => {
        if ((itemId && state.isEdit) || !itemId) {
            form.submit();
            return;
        }
        // setState(prev => ({ ...prev, isEdit: true }));
    }

    return (
        <>
            <Modal
                loading={state.loading}
                open={true}
                onCancel={onClose}
                onOk={handleSubmit}
                okText={
                    <div>
                        {
                            state.loadingBtn && (
                                <Spin indicator={<LoadingOutlined spin />} size="small" />
                            )
                        }
                        {itemId ? state.isEdit ? 'Lưu' : 'Cập nhật' : 'Tạo'}
                    </div>
                }
                cancelText='Huỷ'
                centered
                title={
                    <div className="text-primary">
                        {itemId ? state.isEdit ? 'Sửa' : 'Chi tiết' : 'Tạo'} tài khoản
                    </div>
                }
            >
                <Form
                    form={form}
                    onFinish={onFinish}
                    disabled={!state.isEdit}
                    layout="vertical"
                >
                    <Form.Item
                        label={(
                            <div className='font-bold'>
                                Họ và tên
                            </div>
                        )}
                        name="name"
                        rules={[{ required: true, message: 'Vui lòng không để trống tên!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label={(
                            <div className='font-bold'>
                                Email
                            </div>
                        )}
                        name="email"
                        rules={[
                            { required: true, message: 'Vui lòng không để trống email!' },
                            { type: 'email', message: 'Chưa đúng định dạng email' }
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label={(
                            <div className='font-bold'>
                                Số điện thoại
                            </div>
                        )}
                        name="phone_number"
                        rules={[
                            { required: true, message: 'Vui lòng không để trống Số điện thoại!' },
                            {
                                pattern: /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[1-9]|9[0-9])[0-9]{7}$/,
                                message: 'Số điện thoại không đúng định dạng!'
                            }
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}