import { ReactElement, useEffect, useMemo, useState } from "react";
import BaseModalSetting from "../../../../components/base/BaseModalSetting";
import { apiGetAllVoucher } from "../utils/checkout.service";

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
    refresh: boolean;
    voucherForCustomer: any[];
    voucherWithOutCustomer: any[];
}

const BaseModalVoucher = ({ onCancel }: IProps) => {
    const initIState: IState = useMemo(() => ({
        loading: true,
        showModal: false,
        refresh: false,
        voucherForCustomer: [],
        voucherWithOutCustomer: [],
    }), []);

    const [state, setState] = useState<IState>(initIState);
    // const toast = useToast();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await apiGetAllVoucher();
                setState(prev => ({...prev, loading: false}));
            } catch (error) {
                console.log(error);
                setState(prev => ({...prev, loading: false}));
            }
        }   
        fetchData();
    }, [state.refresh]);

    return <BaseModalSetting
        onCancel={onCancel}
        title={'Danh sách ưu đãi'}
        width={'max-content'}
    >
        <>
            aa
        </>
    </BaseModalSetting>
}

export default BaseModalVoucher;