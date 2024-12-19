import { Form, Input, Radio } from "antd";
import { useEffect, useState } from "react";
import BaseModalSetting from "../../../../components/base/BaseModalSetting";
import { apiGetPayment } from "../../Checkout/utils/checkout.service";

interface IProps {
    onCancel: () => void;
    onSubmit: () => void;
    onSaveBill: (values: any) => void;
    form: any
    isMobile: boolean;
}

interface IState {
    loading: boolean;
    payment: any[];
}

const initState: IState = {
    loading: true,
    payment: [],
}

const ModalConfirmPayment = (props: IProps) => {

    const [state, setState] = useState<IState>(initState);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await apiGetPayment();
                setState(prev => ({
                    ...prev, payment: res.data, loading: false
                })
                )
            } catch (error) {
                console.log(error);
                setState(prev => ({ ...prev, loading: false }));
            }
        }
        fetchData();
    }, []);

    return <BaseModalSetting
        onConfirm={props.onSubmit}
        onCancel={props.onCancel}
        title={
            <div className="text-lg font-bold text-[#00813D]">
                YaGi Thanh toán
            </div>
        }
        width={props.isMobile ? '100%' : 500}
        okText={'Thanh toán'}
        loading={state.loading}
    >
        <Form layout="vertical" form={props.form} onFinish={props.onSaveBill}>
            <Form.Item
                label='Họ và tên'
                name='name'
                rules={[]}
            >
                <Input type="text" placeholder="Nhập họ và tên" />
            </Form.Item>

            <Form.Item
                label='Email'
                name='email'
                rules={[
                    {
                        type: 'email',
                        required: false,
                        message: 'Email không đúng định dạng!',
                    },
                ]}
            >
                <Input type="email" placeholder="Nhập email" />
            </Form.Item>
            <Form.Item
                label='Số điện thoại'
                name='phone'
                rules={[
                    {
                        pattern: /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/,
                        message: 'Số điện thoại không đúng định dạng!',
                    },
                ]}
            >
                <Input type="tel" placeholder="Nhập số điện thoại" />
            </Form.Item>
            <Form.Item name='payment'
                label='Phương thức thanh toán'
                rules={[{ required: true, message: 'Phương thức thanh toán là bắt buộc!' }]}
            >
                <Radio.Group>
                    {
                        state.payment.map(i => (
                            <Radio key={i.id} value={i.id}>{i.name}</Radio>
                        ))
                    }
                </Radio.Group>
            </Form.Item>
            <Form.Item
                label='Khuyến mại'
                name='voucher'
            >
                <Input placeholder="Nhập mã khuyến mại" />
            </Form.Item>
            <Form.Item
                label='Ghi chú'
                name='note'
            >
                <Input.TextArea placeholder="Nhận xét và đánh giá" autoSize={{ minRows: 2, maxRows: 4 }} />
            </Form.Item>
        </Form>
    </BaseModalSetting>
}

export default ModalConfirmPayment;