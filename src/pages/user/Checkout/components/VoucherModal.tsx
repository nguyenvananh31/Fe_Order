import { ReactElement, useMemo, useState } from "react";
import BaseModalSetting from "../../../../components/base/BaseModalSetting";

interface IProps {
    onCancel: () => void;
    // onConfirm: (item?: IAddress) => () => void;
    okText?: ReactElement | string;
    cancelText?: ReactElement | string;
    loading?: boolean;
}

interface IState {
    loading: boolean;
    showModal: boolean;
}


const BaseModalVoucher = ({ onCancel }: IProps) => {
    const initIState: IState = useMemo(() => ({
        loading: false,
        showModal: false,
    }), []);

    const [state, setState] = useState<IState>(initIState);
    // const toast = useToast();

    return <BaseModalSetting
        onCancel={onCancel}
        title={'Danh sách ưu đãi'}
        width={'max-content'}
    >
        <>
            aaaa
        </>
    </BaseModalSetting>
}

export default BaseModalVoucher;