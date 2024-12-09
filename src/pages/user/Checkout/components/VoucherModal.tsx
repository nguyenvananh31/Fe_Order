import { ReactElement, useEffect, useMemo, useState } from "react";
import BaseModalSetting from "../../../../components/base/BaseModalSetting";
import { apiGetAllVoucher } from "../utils/checkout.service";
import { Avatar, Button, List, Skeleton } from "antd";
import { fallBackImg, getImageUrl } from "../../../../constants/common";
import { convertPriceVND } from "../../../../utils/common";

interface IProps {
    onCancel: () => void;
    onConfirm: (voucher: any[]) => () => void;
    okText?: ReactElement | string;
    cancelText?: ReactElement | string;
    loading?: boolean;
    voucher: any[];
}

interface IState {
    loading: boolean;
    showModal: boolean;
    refresh: boolean;
    voucherForCustomer: any[];
    voucherWithOutCustomer: any[];
    voucher: any[]
}

const BaseModalVoucher = ({ onCancel, voucher, onConfirm }: IProps) => {
    const initIState: IState = useMemo(() => ({
        loading: true,
        showModal: false,
        refresh: false,
        voucher,
        voucherForCustomer: [],
        voucherWithOutCustomer: [],
    }), []);

    const [state, setState] = useState<IState>(initIState);
    // const toast = useToast();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await apiGetAllVoucher();

                const voucherForCustomer = res.data.vouchers_for_customer.map((i: any) => state.voucher?.some(x => x.id == i.id) ? { ...i, isChoose: true } : i) || [];
                const voucherWithOutCustomer = Object.values(res.data.vouchers_without_customer).map((i: any) => state.voucher?.some(x => x.id == i.id) ? { ...i, isChoose: true } : i) || [];

                setState(prev => ({
                    ...prev, loading: false,
                    voucherForCustomer,
                    voucherWithOutCustomer
                }));
            } catch (error) {
                console.log(error);
                setState(prev => ({ ...prev, loading: false, voucherWithOutCustomer: [], voucherForCustomer: [] }));
            }
        }
        fetchData();
    }, [state.refresh]);

    const handleChooseVoucher = (id: number) => () => {
        const voucherForCustomer = state.voucherForCustomer.map((i: any) => i.id).includes(id) ? state.voucherForCustomer.map((i: any) => id === i.id && !i?.isChoose ? { ...i, isChoose: true } : { ...i, isChoose: false }) || [] : [...state.voucherForCustomer];
        const voucherWithOutCustomer = state.voucherWithOutCustomer.map((i: any) => i.id).includes(id) ? state.voucherWithOutCustomer.map((i: any) => id === i.id && !i?.isChoose ? { ...i, isChoose: true } : { ...i, isChoose: false }) || [] : [...state.voucherWithOutCustomer];
        const voucher = voucherForCustomer.filter(i => i.isChoose);
        voucher.push(...voucherWithOutCustomer.filter(i => i.isChoose));
        setState(prev => ({ ...prev, voucher, voucherForCustomer, voucherWithOutCustomer }))
    }

    return <BaseModalSetting
        onCancel={onCancel}
        onConfirm={onConfirm(state.voucher)}
        title={'Danh sách ưu đãi'}
        width={700}
        destroyOnClose
    >
        <>
            <h4>Ưu đãi của Khách hàng</h4>
            <List
                className="demo-loadmore-list"
                loading={state.loading}
                itemLayout="horizontal"
                // loadMore={loadMore}
                dataSource={state.voucherForCustomer}
                renderItem={(item) => (
                    <List.Item
                        actions={[<Button onClick={handleChooseVoucher(item.id)} type="text" className={(item?.isChoose ? 'text-red-500 font-bold' : "text-purple font-bold")}>{item?.isChoose ? 'Bỏ chọn' : 'Chọn'}</Button>]}
                    >
                        <Skeleton avatar title={false} loading={state.loading} active>
                            <List.Item.Meta
                                avatar={<Avatar className="mt-1 w-[45px] h-[45px] object-cover object-center" src={item?.image ? getImageUrl(item?.image) : fallBackImg} />}
                                title={<p>{item?.name || ''}</p>}
                                description={+item.value > 0 ? convertPriceVND(+item.value || 0) : `${+item.discount_percentage}% (Tối đa ${convertPriceVND(+item.max_discount_value)})`}
                            />
                            <div>x{item?.quantity}</div>
                        </Skeleton>
                    </List.Item>
                )}
            />
            <h4 className="mt-4">Ưu đãi của nhà hàng</h4>
            <List
                className="demo-loadmore-list"
                loading={state.loading}
                itemLayout="horizontal"
                // loadMore={loadMore}
                dataSource={state.voucherWithOutCustomer}
                renderItem={(item) => (
                    <List.Item
                        actions={[<Button onClick={handleChooseVoucher(item.id)} type="text" className={(item?.isChoose ? 'text-red-500 font-bold' : "text-purple font-bold")}>{item?.isChoose ? 'Bỏ chọn' : 'Chọn'}</Button>]}
                    >
                        <Skeleton avatar title={false} loading={state.loading} active>
                            <List.Item.Meta
                                avatar={<Avatar className="mt-1 w-[45px] h-[45px] object-cover object-center" src={item?.image ? getImageUrl(item?.image) : fallBackImg} />}
                                title={<p>{item?.name || ''}</p>}
                                description={+item.value > 0 ? convertPriceVND(+item.value || 0) : `${+item.discount_percentage}% (Tối đa ${convertPriceVND(+item.max_discount_value)})`}
                            />
                            <div>x{item?.quantity}</div>
                        </Skeleton>
                    </List.Item>
                )}
            />
        </>
    </BaseModalSetting>
}

export default BaseModalVoucher;