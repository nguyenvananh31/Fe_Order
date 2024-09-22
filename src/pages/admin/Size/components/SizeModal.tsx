import { LoadingOutlined } from "@ant-design/icons";
import { Form, Input, Modal, Spin } from "antd";
import { DefaultOptionType } from "antd/es/select";
import { useEffect, useState } from "react";
import { Isize } from "../../../../interFaces/size";
import { apiCreateSize, apiGetOneSize, apiUpdateSize } from "../utils/size.service";


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
    data: Omit<DefaultOptionType, 'label'>[];
    size?: Isize;
}

const initState: IState = {
    loading: true,
    loadingBtn: false,
    isEdit: false,
    data: [],
}

export default function SizeModel({ onClose, onRefresh, showToast, itemId = undefined }: IProps) {

    const [state, setState] = useState<IState>(initState);
    const [form] = Form.useForm();

    useEffect(() => {
        if (!itemId) {
            setState(prev => ({ ...prev, isEdit: true, loading: false }));
            return;
        }
        const fetchApi = async () => {
            try {
                const res = await apiGetOneSize(itemId!);
                if (res) {
                    setState(prev => ({ ...prev, loading: false, size: res.data }));
                    form.setFieldsValue(res);
                }
            } catch (error) {
                console.log(error);
                showToast('error', 'Có lỗi xảy ra!');
            }
        }
        fetchApi();
    }, []);

    // handle submit form và cập nhật
    const handleSubmit = () => {
        if ((itemId && state.isEdit) || !itemId) {
            form.submit();
            return;
        }
        setState(prev => ({ ...prev, isEdit: true }));
    }

    const onFinish = async (values: any) => {

        try {
            setState(prev => ({ ...prev, loadingBtn: true }));
            if (itemId) {
                await apiUpdateSize(itemId, {name: values.name});
            }else {
                await apiCreateSize({name: values.name});
            }
            showToast('success', `${itemId ? 'Cập nhật' : 'Thêm'} kích thước thành công!`);
            onClose();
            onRefresh();
        } catch (error) {
            console.log(error);
            showToast('error', `${itemId ? 'Cập nhật' : 'Thêm'} kích thước thất bại!`);
        }
        setState(prev => ({ ...prev, loadingBtn: false }));
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
                        {itemId ? state.isEdit ? 'Sửa' : 'Chi tiết' : 'Tạo'} kích thước
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
                                Tên kích thước
                            </div>
                        )}
                        name="name"
                        rules={[{ required: true, message: 'Vui lòng không để trống tên!' }]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}