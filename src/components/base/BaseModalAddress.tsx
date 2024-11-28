import { ReactElement, useState } from "react"
import BaseModalSetting from "./BaseModalSetting";
import { IAddress } from "../../interFaces/custommers";
import { Button, Flex, List, Radio, Tag } from "antd";
import { RadioChangeEvent } from "antd/lib";

interface IProps {
    onCancel: () => void;
    onConfirm: (item?: IAddress) => () => void;
    okText?: ReactElement | string;
    cancelText?: ReactElement | string;
    loading?: boolean;
    addresses: IAddress[];
    defaultActive?: IAddress;
}

const BaseModalAddress = ({ onConfirm, onCancel, addresses, defaultActive }: IProps) => {

    const [value, setValue] = useState<IAddress|undefined>(defaultActive);

    const onChange = (item: IAddress) => (_: RadioChangeEvent) => {
        setValue(item);
    };

    return <BaseModalSetting
        onCancel={onCancel}
        title={'Địa chỉ giao hàng'}
        footer={
            <>
                <Button onClick={onCancel} type='default'>Đóng</Button>
                <Button onClick={onCancel} type='primary' danger>Thêm địa chỉ</Button>
                <Button onClick={onConfirm(value)} type='primary'>Lưu</Button>
            </>
        }
    >
        <List
            itemLayout="horizontal"
            dataSource={addresses}
            renderItem={(item) => (
                <List.Item>
                    <Flex align="center">
                        <Radio value={item.id} checked={!!defaultActive?.id && defaultActive?.id == item.id} onChange={onChange(item)}/>
                        <div className="font-semibold">
                            <p>0374339124</p>
                            <p>{item.address}</p>
                        </div>
                        {item.is_default && <Tag color="red" className="ml-4 h-max" title="Mặc định">Mặc định</Tag>}
                    </Flex>
                    <Button type="text" className="text-sky-500">Chỉnh sửa</Button>
                </List.Item>
            )}
        />
    </BaseModalSetting>
}

export default BaseModalAddress;