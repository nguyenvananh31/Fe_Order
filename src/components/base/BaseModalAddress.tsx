import { ReactElement, useState } from "react"
import BaseModalSetting from "./BaseModalSetting";
import { IAddress } from "../../interFaces/custommers";
import { Radio } from "antd";
import { RadioChangeEvent } from "antd/lib";

interface IProps {
    onCancel: () => void;
    onConfirm: () => void;
    okText?: ReactElement | string;
    cancelText?: ReactElement | string;
    loading?: boolean;
    addresses: IAddress[];
    defaultActive: number;
}

const BaseModalAddress = ({ onConfirm, onCancel, addresses, defaultActive }: IProps) => {

    const [value, setValue] = useState(1);

    const onChange = (e: RadioChangeEvent) => {
        setValue(e.target.value);
    };

    return <BaseModalSetting
        onCancel={onCancel}
        onConfirm={onConfirm}
        title={'Địa chỉ giao hàng'}
    >
        <Radio.Group onChange={onChange} value={value} className="flex flex-col">
            {
                addresses.map(i => (
                    <Radio defaultChecked={i.id == defaultActive} value={i.id}>{i.address}</Radio>
                ))
            }
        </Radio.Group>
    </BaseModalSetting>
}

export default BaseModalAddress;