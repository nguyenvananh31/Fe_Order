import { Form, Input } from "antd";
import BaseModalSetting from "../../../../components/base/BaseModalSetting";

interface IProps {
    onCancel: () => void;
    onSubmit: () => void;
    form: any
}

const ModalConfirmPayment = (props: IProps) => {

    return <BaseModalSetting
        onConfirm={props.onSubmit}
        onCancel={props.onCancel}
        title={
            <div className="text-lg font-bold text-[#00813D]">
                YaGi Thanh toán
            </div>
        }
        width={'max-content'}
        okText={'Thanh toán'}
    >
        <Form layout="vertical"  form={props.form}>
            <Form.Item
                label='Số điện thoại'
            >
                <Input />
            </Form.Item>    

        </Form>
    </BaseModalSetting>
}

export default ModalConfirmPayment;