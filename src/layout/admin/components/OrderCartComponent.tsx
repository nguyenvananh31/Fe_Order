import { CheckOutlined, PauseOutlined, SmileOutlined } from "@ant-design/icons";
import { Button, Card, Checkbox, Empty, Flex, Image, Segmented, Space, Spin } from "antd";
import { useCallback, useEffect, useState } from "react";
import { fallBackImg, getImageUrl } from "../../../constants/common";
import { apiActiveItem, apiGetTableDetail } from "../../../pages/admin/Tables/utils/rable.service";
import { convertPriceVND } from "../../../utils/common";
import useToast from "../../../hooks/useToast";

type Props = {
    id?: number;
    showToastMes: any;
}

interface IState {
    loading: boolean;
    loadingBtn: boolean;
    data: any[];
    checkedOrder: any[];
}

const initState: IState = {
    loading: false,
    loadingBtn: false,
    data: [],
    checkedOrder: []
}

export default function OrderCartComponent({ id, showToastMes }: Props) {
    const [state, setState] = useState<IState>(initState);
    const [option, setOption] = useState<boolean>(false);
    const toast = useToast();

    useEffect(() => {
        if (!id) return;
        const fetchData = async () => {
            try {
                setState(prev => ({ ...prev, loading: true }));
                const res = await apiGetTableDetail(id);
                setState(prev => ({ ...prev, data: res.data[0].bill_details, loading: false }));
            } catch (error) {
                setState(prev => ({ ...prev, loading: false }));
                console.log(error);
                showToastMes('error', 'Có lỗi xảy ra!')
            }
        }
        fetchData();
    }, [id]);

    const handleCheckedPro = useCallback((ids: number[]) => {
        setState(prev => ({ ...prev, checkedOrder: ids }))
    }, []);

    const handleToggleCheckAll = useCallback(() => {
        setState(prev => {
            if (prev.data.length == 0) {
                return prev;
            }
            let newChecked = [];
            if (prev.data.length > prev.checkedOrder.length) {
                newChecked = prev.data.map(i => i.id_bill_detail);
            } else {
                newChecked = [];
            }
            return {
                ...prev,
                checkedOrder: newChecked
            }
        })
    }, []);

    const handleActiveItem = useCallback(async (ids: number[]) => {
        if (ids.length == 0) {
            toast.showError('Vui lòng chọn món muốn xác nhận!');
            return;
        }
        try {
            setState(prev => ({ ...prev, loadingBtn: true }));
            await apiActiveItem({id_billdetails: ids});
            toast.showSuccess('Xác nhận món thành công!');
            setState(prev => {
                const newPros = [...prev.data.map(i => ids.includes(i.id_bill_detail) ? {...i, product: { ...i.product, status: !i.product.status}} : i)];
                return { ...prev, loadingBtn: false, data: newPros, checkedOrder: [] };
            });
        } catch (error: any) {
            console.log(error);
            toast.showError(error);
            setState(prev => ({ ...prev, loadingBtn: false }));
        }
    }, []);

    if (!id) {
        return <div className="mt-60">
            <Empty description={'Không có dữ liệu.'} />
        </div>
    }

    if (state.loading) {
        return <Spin tip="Đang tải..."><div className="mt-60" /></Spin>
    }

    return (
        <div className="pt-5">
            <Segmented
                className="m-2"
                options={[
                    { label: 'Chưa lên', value: false, icon: <PauseOutlined /> },
                    { label: 'Đã lên', value: true, icon: <CheckOutlined /> },
                ]}
                value={option}
                onChange={(value) => setOption(value)}
            />
            <Checkbox.Group className="w-full" value={state.checkedOrder} onChange={handleCheckedPro}>
                {
                    state?.data?.map((i: any) => {
                        return !!i?.product?.status == option && (
                            <Card key={i.id_bill_detail} className="m-2 px-2 basis-full" styles={{ body: { padding: '8px 0', display: 'flex', alignItems: 'center' } }}>
                                {
                                    !option && (
                                        <Checkbox className="ml-2 mr-4" value={i.id_bill_detail} />
                                    )
                                }
                                <Image src={i.product.thumbnail ? getImageUrl(i.product.thumbnail || '') : fallBackImg} preview={false} className="rounded max-w-[50px] min-h-[50px] object-cover object-center" />
                                <div className="ml-2 flex flex-col gap-2 justify-between">
                                    <div className="text-primary text-sm font-semibold">{i.product.name}</div>
                                    <div className="text-primary text-sm font-semibold">{convertPriceVND(i.product.product_detail.price)}</div>
                                </div>
                                <div className="ml-auto mr-5 font-semibold">x{i.quantity}</div>
                            </Card>
                        )
                    })
                }
            </Checkbox.Group>
            {
                state.data.length == 0 && !state.loading && (
                    <div className="text-center">
                        <SmileOutlined style={{ fontSize: 24 }} />
                        <p>Không có sản phẩm nào</p>
                    </div>
                )
            }
            {/*Btn choose all */}
            {
                !option && (
                    <>
                        <Space align="center" className="mt-4 mx-2">
                            <Button onClick={handleToggleCheckAll}>{state.data.length != 0 && state.data.length == state.checkedOrder.length ? 'Bỏ chọn' : 'Chọn tất cả'}</Button>
                            <span>{state.checkedOrder.length} sản phẩm đang chọn</span>
                        </Space>
                        <Flex align="center" justify="center" className="mt-4">
                            <Button loading={state.loading} type="primary" onClick={() => handleActiveItem(state.checkedOrder)}  className="w-4/5 py-4 bg-[#00813D]">Xác nhận món</Button>
                        </Flex>
                    </>
                )
            }
        </div>
    )
}