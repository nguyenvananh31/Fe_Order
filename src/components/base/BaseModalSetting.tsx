import { Modal } from "antd";
import { ReactElement } from "react";

interface IProps {
    children: ReactElement | string;
    onCancel?: () => void; 
    onConfirm?: () => void;
    okText?: ReactElement | string;
    cancelText?: ReactElement | string;
    loading?: boolean;
    title?: ReactElement | string;
    footer?: ReactElement | string | boolean;
    width?: number | null | string;
}

const BaseModalSetting = ({ children, okText, cancelText, onConfirm, onCancel, loading, title, footer, width }: IProps) => {

    return <Modal
        open
        centered
        okText={okText || 'Lưu'}
        cancelText={cancelText || 'Huỷ'}
        onOk={onConfirm}
        onCancel={onCancel}
        loading={loading || false}
        title={title}
        footer={footer}
        width={width || undefined}
    >
        {children}
    </Modal>
}

export default BaseModalSetting;

