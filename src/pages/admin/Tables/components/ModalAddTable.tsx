import { LoadingOutlined } from "@ant-design/icons";
import { Col, Form, Input, Modal, Row, Spin } from "antd";
import { DefaultOptionType } from "antd/es/select";
import { useState } from "react";
import useToast from "../../../../hooks/useToast";
import { ICate } from "../../../../interFaces/categories";
import { apiAddTable } from "../utils/rable.service";

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
    const { showError, showSuccess } = useToast();

    // handle submit form và cập nhật
    const handleSubmit = () => {
        form.submit();
    }

    const onFinish = async (values: any) => {
        console.log('values: ', values);
        try {
            const data = {
                table: values.name,
                min_guest: values.min_guest,
                max_guest: values.max_guest,
                deposit: values.deposit
            }
            setState(prev => ({ ...prev, loadingBtn: true }));
            await apiAddTable(data);
            showSuccess('Thêm bàn thành công!');
            onRefresh();
        } catch (error) {
            console.log(error);
            showError('Thêm bàn thất bại!');
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
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                label={'Tên bàn'}
                                name="name"
                                rules={[{ required: true, message: 'Vui lòng không để trống tên!' }]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label={'Số người tối thiểu'}
                                name="min_guest"
                                // rules={[{ required: true, message: 'Vui lòng không để trống tên!' }]}
                            >
                                <Input defaultValue={1} type="number" placeholder="Nhập số người tối thiểu"/>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label={'Số người tối đa'}
                                name="max_guest"
                                // rules={[{ required: true, message: 'Vui lòng không để trống tên!' }]}
                            >
                                <Input placeholder="Nhập số người tối đa" type="number"/>
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item
                                label={'Giá mở bàn'}
                                name="deposit"
                                // rules={[{ required: true, message: 'Vui lòng không để trống tên!' }]}
                            >
                                <Input placeholder="Nhập giá mở bàn" type="number"/>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </>
    )
}