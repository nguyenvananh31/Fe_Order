import { CheckOutlined, PauseOutlined } from "@ant-design/icons";
import { Card, Empty, Image, Segmented, Spin } from "antd";
import { useEffect, useState } from "react";
import { fallBackImg, getImageUrl } from "../../../constants/common";
import { convertPriceVND } from "../../../utils/common";
import { apiGetTableDetail } from "../../../pages/admin/Tables/utils/rable.service";

type Props = {
    id?: number;
    showToastMes: any;
}

interface IState {
    loading: boolean;
    data: any;
}

const initState: IState = {
    loading: false,
    data: []
}

export default function OrderCartComponent({ id, showToastMes }: Props) {
    const [state, setState] = useState<IState>(initState);
    const [option, setOption] = useState<boolean>(false);

    useEffect(() => {
        if (!id) return;
        const fetchData = async () => {
            try {
                setState(prev => ({ ...prev, loading: true }));
                const res = await apiGetTableDetail(id);
                setState(prev => ({ ...prev, data: res.data[0].bill_details , loading: false }));
            } catch (error) {
                setState(prev => ({ ...prev, loading: false }));
                console.log(error);
                showToastMes('error', 'Có lỗi xảy ra!')
            }
        }
        fetchData();
    }, [id]);


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
            {
                state?.data?.map((i: any) => {
                    if (!!i.product.status !== option) {
                        return ''
                    }

                    return (
                        <Card key={i.product.id} className="m-2 px-2" styles={{ body: { padding: '8px 0', display: 'flex', alignItems: 'center' } }}>
                            <Image src={i.product.thumbnail ? getImageUrl(i.product.thumbnail || '') : fallBackImg} preview={false} width={50} className="rounded" />
                            <div className="ml-2 flex flex-col gap-2 justify-between">
                                <div className="text-primary text-sm font-semibold">{i.product.name}</div>
                                <div className="text-primary text-sm font-semibold">{convertPriceVND(i.product.product_detail.price)}</div>
                            </div>
                            <div className="ml-auto mr-5 font-semibold">x{i.quantity}</div>
                        </Card>
                    )
                })
            }
            <Card className="m-2 px-2" styles={{ body: { padding: '8px 0', display: 'flex', alignItems: 'center' } }}>
                <Image src={fallBackImg} preview={false} width={50} className="rounded" />
                <div className="ml-2 flex flex-col gap-2 justify-between">
                    <div className="text-primary text-sm font-semibold">San pham 1</div>
                    <div className="text-primary text-sm font-semibold">{convertPriceVND(123456)}</div>
                </div>
                <div className="ml-auto mr-5 font-semibold">x4</div>
            </Card>
            <Card className="m-2 px-2" styles={{ body: { padding: '8px 0', display: 'flex', alignItems: 'center' } }}>
                <Image src={fallBackImg} preview={false} width={50} className="rounded" />
                <div className="ml-2 flex flex-col gap-2 justify-between">
                    <div className="text-primary text-sm font-semibold">San pham 1</div>
                    <div className="text-primary text-sm font-semibold">{convertPriceVND(123456)}</div>
                </div>
                <div className="ml-auto mr-5 font-semibold">x4</div>
            </Card>
            <Card className="m-2 px-2" styles={{ body: { padding: '8px 0', display: 'flex', alignItems: 'center' } }}>
                <Image src={fallBackImg} preview={false} width={50} className="rounded" />
                <div className="ml-2 flex flex-col gap-2 justify-between">
                    <div className="text-primary text-sm font-semibold">San pham 1</div>
                    <div className="text-primary text-sm font-semibold">{convertPriceVND(123456)}</div>
                </div>
                <div className="ml-auto mr-5 font-semibold">x4</div>
            </Card>
        </div>
    )
}