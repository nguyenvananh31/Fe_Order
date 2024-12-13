import { Form, Input, Modal, Tree } from "antd";
import { useCallback, useEffect, useState } from "react";
import Avatar from "react-avatar";
import { ROLES } from "../../../../constants/enum";
import useToast from "../../../../hooks/useToast";
import { IRole, IUser } from "../../../../interFaces/common.types";
import { apiGetOneUser, apiGetRoles, apiUpadateRoles } from "../utils/account.service";

interface IProps {
    itemId?: number;
    onRefresh: () => void;
    onClose: () => void;
}

interface IState {
    loading: boolean;
    loadingBtn: boolean;
    isEdit: boolean;
    dataRoles: any[];
    account?: IUser;
    checkedRoles: number[];
}

const initState: IState = {
    loading: true,
    loadingBtn: false,
    isEdit: false,
    dataRoles: [],
    checkedRoles: [],
}

export default function AccountModel({ onClose, onRefresh, itemId = undefined }: IProps) {

    const [state, setState] = useState<IState>(initState);
    const [form] = Form.useForm();
    const toast = useToast();

    //Lấy thông tin account nếu có
    useEffect(() => {
        if (!itemId) {
            setState(prev => ({ ...prev, isEdit: true, loading: false }));
        }
        const fetchApi = async () => {
            try {
                const res = await apiGetOneUser(itemId!);

                setState(prev => ({ ...prev, loading: false, account: res.data, checkedRoles: res.data.roles.filter(i => i.id != 2).map(i => i.id) }));

                form.setFieldsValue({
                    ...res.data,
                });
            } catch (error) {
                console.log(error);
                setState(prev => ({ ...prev, loading: false }));
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
                    let dataRoles = [
                        {
                            title: ROLES.ADMIN,
                            key: 1,
                            children: [],
                        },
                        {
                            title: ROLES.QTV,
                            key: 2,
                            children:
                                res?.data
                                    .filter(item => item.name !== ROLES.ADMIN && item.name !== ROLES.QTV)
                                    .map(item => ({
                                        title: item.name,
                                        key: item.id,
                                    }))
                            ,
                        },
                    ];
                    setState(prev => ({ ...prev, loading: false, dataRoles }));
                }
            } catch (error) {
                console.log(error);
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
                toast.showSuccess('Cập nhật vai trò thành công!');
                onClose();
                onRefresh();
            }
        } catch (error: any) {
            console.log(error);
            toast.showError(error?.error || 'Cập nhật vai trò thất bại!');
        }
        setState(prev => ({ ...prev, loadingBtn: false }));
    }

    const handleCheck = useCallback((checkedKeysValue: any) => {
        setState(prev => ({ ...prev, checkedRoles: checkedKeysValue }));
    }, []);

    return (
        <>
            <Modal
                loading={state.loading}
                open={true}
                onCancel={onClose}
                onOk={handleSubmit}
                okText={
                    <div>{itemId ? state.isEdit ? 'Lưu' : 'Cập nhật' : 'Tạo'}</div>
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
                    // getValueProps={}
                    >
                        <Tree
                            checkable
                            checkedKeys={state.checkedRoles}
                            defaultExpandAll
                            onCheck={handleCheck}
                            treeData={state.dataRoles}
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}