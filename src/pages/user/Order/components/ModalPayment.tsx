import { Flex, Row } from "antd";
import BaseModalSetting from "../../../../components/base/BaseModalSetting";

interface IProps {
    onCancel: () => void;
    onSubmit: () => void;
}

const ModalPayment = (props: IProps) => {

    return <BaseModalSetting
        onConfirm={props.onSubmit}
        onCancel={props.onCancel}
        title={
            <div className="text-lg font-bold text-[#00813D]">
                YaGi Thanh toán
            </div>
        }
        footer={false}
    >
        <Flex>
            <div>
                <div>Đơn hàng</div>
                <Row>
                    
                </Row>
            </div>
        </Flex>
    </BaseModalSetting>
}

export default ModalPayment;