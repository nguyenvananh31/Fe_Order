import { Button, Checkbox, Col, Form, Input, Modal, Row } from "antd";
import { useEffect, useState } from "react";
import { IRole, IUser } from "../../../../interFaces/common.types";
import { apiGetOneUser, apiGetRoles, apiUpadateRoles } from "../utils/account.service";
import Avatar from "react-avatar";

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
    dataRoles: IRole[];
    account?: IUser;
}

const initState: IState = {
    loading: true,
    loadingBtn: false,
    isEdit: false,
    dataRoles: [],
}

export default function AccountModel({ onClose, onRefresh, showToast, itemId = undefined }: IProps) {

    const [state, setState] = useState<IState>(initState);
    const [form] = Form.useForm();

    //Lấy thông tin account nếu có
    useEffect(() => {
        if (!itemId) {
            setState(prev => ({ ...prev, isEdit: true, loading: false }));
        }
        const fetchApi = async () => {
            try {
                const res = await apiGetOneUser(itemId!);
                if (res.data) {
                    setState(prev => ({ ...prev, loading: false, account: res.data }));
                    form.setFieldsValue(res.data);
                }
            } catch (error) {
                console.log(error);
                showToast('error', 'Có lỗi xảy ra!');
            }
        }
        fetchApi();
    }, []);

    //Lấy tất cả role hiện có
    useEffect(() => {
        const fetchApi = async () => {
            try {
                setState(prev => ({ ...prev, loading: true }));
                const res = await apiGetRoles();
                if (res.data) {
                    setState(prev => ({ ...prev, loading: false, dataRoles: res.data }));
                }
            } catch (error) {
                console.log(error);
                showToast('error', 'Có lỗi xảy ra!');
            }
        }
        setState(prev => ({ ...prev, loading: false }));
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
        setState(prev => ({ ...prev }));
        try {
            setState(prev => ({ ...prev, loadingBtn: true }));
            if (itemId) {
                let newRoles;
                newRoles = values.roles;
                if (values.roles[0]?.id) {
                    newRoles = values.roles.map((role: IRole) => role.id)
                }
                await apiUpadateRoles(itemId, { roles: newRoles });
                showToast('success', 'Cập nhật vai trò thành công!');
                onClose();
                onRefresh();
            }
        } catch (error) {
            console.log(error);
            showToast('error', 'Cập nhật vai trò thất bại!');
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
                    <Button type="primary" loading={state.loadingBtn}>{itemId ? state.isEdit ? 'Lưu' : 'Cập nhật' : 'Tạo'}</Button>
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
                >
                    <div className='flex justify-center items-center gap-6 my-6'>
                        <Avatar className="cursor-pointer" name={state.account?.name || state.account?.email} size="60" round={true} />
                        <div className="flex flex-col gap-2">
                            <div className="flex gap-2 items-center">
                                <span className="text-base font-semibold">{state.account?.name ? 'Name' : 'Email'}:</span>
                                <Input readOnly className="text-purple text-base font-semibold" value={state.account?.name || state.account?.email} />
                            </div>
                            <div className="flex gap-2 items-center">
                                <span className="text-base font-semibold">{state.account?.name ? 'Email:' : ''}</span>
                                {
                                    state.account?.name && (
                                        <Input readOnly className="text-purple text-base font-semibold" value={state.account?.email} />
                                    )
                                }
                            </div>
                        </div>
                    </div>
                    <Form.Item
                        name='roles'
                        label="Vai trò"
                        valuePropName="roles"
                    >
                        <Checkbox.Group
                            style={{ width: '100%' }}
                            defaultValue={state.account?.roles.map(role => role.id)}
                        >
                            <Row>
                                {
                                    state.dataRoles.map(role => {
                                        return (
                                            <Col key={role.id} span={8}>
                                                <Checkbox value={role.id}>{role.name}</Checkbox>
                                            </Col>
                                        )
                                    })
                                }
                            </Row>
                        </Checkbox.Group>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}