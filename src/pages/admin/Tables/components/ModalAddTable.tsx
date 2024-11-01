import { LoadingOutlined } from "@ant-design/icons";
import { Form, Input, Modal, Spin } from "antd";
import { DefaultOptionType } from "antd/es/select";
import { useState } from "react";
import { ICate } from "../../../../interFaces/categories";
import { apiAddTable } from "../utils/rable.service";
import useToast from "../../../../hooks/useToast";

interface IProps {
    onRefresh: () => void;
    onClose: () => void;
}

interface IState {
    loadingBtn: boolean;
    isEdit: boolean;
    data: Omit<DefaultOptionType, 'label'>[];
    cate?: ICate;
}

const initState: IState = {
    loadingBtn: false,
    isEdit: false,
    data: [],
}

export default function TableAddModal({ onClose, onRefresh }: IProps) {

    const [state, setState] = useState<IState>(initState);
    const [form] = Form.useForm();
    const {showError, showSuccess} = useToast();

    // handle submit form và cập nhật
    const handleSubmit = () => {
        form.submit();
    }

    const onFinish = async (values: any) => {
        try {
            setState(prev => ({ ...prev, loadingBtn: true }));
            await apiAddTable({'table': values.name});
            showSuccess('Thêm danh mục thành công!');
            onRefresh();
        } catch (error) {
            console.log(error);
            showError('danh mục thất bại!');
        }
        setState(prev => ({ ...prev, loadingBtn: false }));
    }


    return (
        <>
            <Modal
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
                        Tạo
                    </div>
                }
                cancelText='Huỷ'
                centered
                title={
                    <div className="text-primary">
                        Tạo bàn
                    </div>
                }
            >
                <Form
                    form={form}
                    onFinish={onFinish}
                    layout="vertical"
                >
                    <Form.Item
                        label={(
                            <div className='font-bold'>
                                Tên bàn
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