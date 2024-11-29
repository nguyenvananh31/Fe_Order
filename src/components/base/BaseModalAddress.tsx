import { ReactElement, useCallback, useMemo, useState } from "react"
import BaseModalSetting from "./BaseModalSetting";
import { IAddress } from "../../interFaces/custommers";
import { Button, Flex, List, Popconfirm, Radio, Tag, Tooltip } from "antd";
import { RadioChangeEvent } from "antd/lib";
import { DeleteOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import BaseModalAddOrEditAddress from "./BaseModalAddOrEditAddress";
import ApiUtils from "../../utils/api/api.utils";
import useToast from "../../hooks/useToast";

interface IProps {
    onCancel: () => void;
    onConfirm: (item?: IAddress) => () => void;
    okText?: ReactElement | string;
    cancelText?: ReactElement | string;
    loading?: boolean;
    addresses: IAddress[];
    defaultActive?: IAddress;
}

interface IState {
    loading: boolean;
    showModal: boolean;
    address?: IAddress;
    itemEdit?: IAddress;
    addresses: IAddress[];
}


const BaseModalAddress = ({ onConfirm, onCancel, addresses, defaultActive }: IProps) => {
    const initIState: IState = useMemo(() => ({
        loading: false,
        showModal: false,
        address: defaultActive,
        addresses: addresses || [],
    }), []);

    const [state, setState] = useState<IState>(initIState);
    const toast = useToast();

    const onChange = (item: IAddress) => (_: RadioChangeEvent) => {
        setState(prev => ({ ...prev, address: item }));
    };

    const handleDissmis = () => {
        setState(prev => ({ ...prev, showModal: false }));
    }

    const handleShowModal = (itemEdit?: IAddress) => () => {
        setState(prev => ({ ...prev, showModal: true, itemEdit: itemEdit }));
    }

    const handleSubmitAddress = (item: IAddress) => {
        setState(prev => {
            let newAddresses = [...prev.addresses];
            let isExist = false;
            newAddresses = newAddresses.map(i => {
                if (i.id === item.id) {
                    isExist = true;
                    return { ...i, ...item };
                }
                return i;
            })
            return { ...prev, addresses: newAddresses }
        });
        handleDissmis();
    }

    const apiRemoveAddress = useCallback((id: number) => {
        return ApiUtils.remove('/api/client/profile/destroy_address/' + id);
    }, []);

    const handleRemoveAdd = (id: number) => async () => {
        try {
            await apiRemoveAddress(id);
            toast.showSuccess('Xoá địa chỉ thành công!');
            setState(prev => {
                let newAddresses = [...prev.addresses];
                newAddresses = newAddresses.filter(i => i.id !== id);
                return { ...prev, addresses: newAddresses }
            });
        } catch (error: any) {
            console.log(error);
            toast.showError(error);
        }
    }

    return <BaseModalSetting
        onCancel={onCancel}
        title={'Địa chỉ giao hàng'}
        footer={
            <>
                <Button onClick={onCancel} type='default'>Đóng</Button>
                <Button onClick={handleShowModal()} type='primary' danger>Thêm địa chỉ</Button>
                <Button onClick={onConfirm(state.address)} type='primary'>Lưu</Button>
            </>
        }
        width={700}
    >
        <>
            <List
                itemLayout="horizontal"
                dataSource={state.addresses}
                renderItem={(item) => (
                    <List.Item>
                        <Flex align="center">
                            <Radio value={item.id} checked={!!state.address?.id && state.address?.id == item.id} onChange={onChange(item)} />
                            <div className="font-semibold max-w-[330px]">
                                <p>{item.fullname} - {item.phone || '0374339124'}</p>
                                <p className="line-clamp-2">{item.country} - {item.city} - {item.commune} - {item.address}</p>
                            </div>
                            {item.is_default == 1 && <Tag color="red" className="ml-4 h-max" title="Mặc định">Mặc định</Tag>}
                        </Flex>
                        <Flex>
                            <Button onClick={handleShowModal(item)} type="text" className="text-sky-500">Chỉnh sửa</Button>
                            <Tooltip title="Xoá địa chỉ">
                                <Popconfirm
                                    placement='topRight'
                                    title="Xoá địa chỉ"
                                    description="Bạn có muốn xoá địa chỉ này?"
                                    icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                                    okText="Có"
                                    cancelText="Không"
                                    onConfirm={handleRemoveAdd(item.id)}
                                >
                                    <Button type="text" danger icon={<DeleteOutlined />}></Button>
                                </Popconfirm>
                            </Tooltip>
                        </Flex>
                    </List.Item>
                )}
            />
            {
                state.showModal && <BaseModalAddOrEditAddress
                    address={state.itemEdit}
                    onCancel={handleDissmis}
                    onConfirm={handleSubmitAddress}
                />
            }
        </>
    </BaseModalSetting>
}

export default BaseModalAddress;