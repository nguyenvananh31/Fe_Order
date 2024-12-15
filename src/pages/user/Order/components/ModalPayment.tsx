import { Card, Divider, Flex, Image, Row, Space, Tag } from "antd";
import moment from "moment";
import { useMemo } from "react";
import BaseModalSetting from "../../../../components/base/BaseModalSetting";
import { convertPriceVNDNotSupfix, getInfoBank, getQrImagePay } from "../../../../utils/common";

interface IProps {
    onCancel: () => void;
    billPros: any[],
    billDetail: any,
    isMobile: boolean;
}

const ModalPayment = (props: IProps) => {
    const bankInfo: any = useMemo(() => getInfoBank(), []);

    return <BaseModalSetting
        onConfirm={() => { }}
        onCancel={props.onCancel}
        title={
            <div className="text-lg font-bold text-[#00813D]">
                YaGi Thanh toán
            </div>
        }
        footer={false}
        width={'max-content'}
    >
        <Flex wrap={'wrap-reverse'} className="md:w-max" gap={16}>
            {
                props.billPros.length > 0 && props?.billPros[0]?.id && (
                    <div className={`bg-[#F5F5F5] md:p-4 max-md:p-2 rounded-md md:w-[400px] ${props.isMobile ? 'flex-1' : ''}`}>
                        <div className="text-lg font-semibold text-center mb-4">Đơn hàng</div>
                        <Row gutter={[16, 16]} justify={'center'} className="px-4">
                            {
                                props.billPros.map((i, y) => (
                                    <Card key={y} loading={false} bordered={false} style={{ boxShadow: 'unset' }} styles={{ body: { padding: 0 } }} className="w-full">
                                        <Card.Meta title={
                                            <div className="border rounded-md p-2 oredered-card">
                                                <Flex gap={4}>
                                                    <Flex flex={1} align="end" justify="space-between">
                                                        <Flex gap={8}>
                                                            <img width={50} src="./images/pasta.png" alt="Ảnh sản phẩm" />
                                                            <div>
                                                                <p className="line-clamp-1">{i.name} - {i.size_name}</p>
                                                                <p className="text-ghost text-sm">x{i.quantity}</p>
                                                            </div>
                                                        </Flex>
                                                        <Flex gap={4} vertical={true} justify="space-between" align="end">
                                                            <Tag color={i.status ? 'green' : 'red'}>{i.status ? 'Hoàn thành' : 'Huỷ'}</Tag>
                                                            <div>
                                                                <span className="text-sm font-bold">{convertPriceVNDNotSupfix(i?.price || 0)}</span>
                                                                <span className="text-[#00813D] text-[12px]  font-bold">vnđ</span>
                                                            </div>
                                                        </Flex>
                                                    </Flex>
                                                </Flex>
                                                <Divider className="my-2" />
                                                <Flex justify="space-between" align="center">
                                                    <span className="text-sm text-ghost">{moment(i?.time_order || undefined).format("DD/MM/YYYY, hh:mma")}</span>
                                                    <div>
                                                        <span className="text-md font-bold">{convertPriceVNDNotSupfix(i?.price * i.quantity)}</span>
                                                        <span className="text-[#00813D] text-[12px]  font-bold">vnđ</span>
                                                    </div>
                                                </Flex>
                                                {/* <div className="del">Huỷ món</div> */}
                                            </div>
                                        } />
                                    </Card>
                                ))
                            }
                        </Row>
                    </div>
                )
            }
            <div className={`bg-[#F5F5F5] md:p-4 rounded-md md:w-[350px] ${props.isMobile ? 'flex-1 py-2 px-4' : ''}`}>
                <div className="text-lg font-semibold text-center mb-4">Thanh toán</div>
                <div>
                    <div className="text-[#00813D] text-sm font-semibold my-2">Thông tin đơn</div>
                    <Space direction="vertical" className="bg-white rounded-md p-4 w-full">
                        <Flex justify="space-between" align="end" gap={12}>
                            <div>Số lượng</div>
                            <div>{props.billPros.length}</div>
                        </Flex>
                        <Flex justify="space-between" align="end" gap={12}>
                            <div>Thành tiền</div>
                            <div>
                                <span className="text-xs">{convertPriceVNDNotSupfix(props?.billDetail?.totalAmount || props?.billDetail?.total_amount)}</span>
                                <span className="text-[10px]">vnđ</span>
                            </div>
                        </Flex>
                        <Flex justify="space-between" align="end" gap={12}>
                            <div>Giảm giá</div>
                            <div>
                                <span className="text-xs">-{convertPriceVNDNotSupfix(0)}</span>
                                <span className="text-[10px]">vnđ</span>
                            </div>
                        </Flex>
                        <Flex justify="space-between" align="end" gap={12}>
                            <div>Thanh toán</div>
                            <div>
                                <span className="text-sm font-semibold text-[#00813D]">{convertPriceVNDNotSupfix(props?.billDetail?.totalAmount || props?.billDetail?.total_amount)}</span>
                                <span className="text-[#00813D] text-[12px]  font-semibold">vnđ</span>
                            </div>
                        </Flex>
                    </Space>
                </div>
                <div>
                    <div className="text-[#00813D] text-sm font-semibold my-2">QR Thanh toán</div>
                    <Space direction="vertical" className="bg-white rounded-md p-4 w-full">
                        <Flex vertical justify="space-between" align="center" gap={4}>
                            <div>Mở Ứng Dụng Ngân Hàng để quét QRCode</div>
                            <Image width={150} className="p-1 rounded border" src={getQrImagePay(+props?.billDetail?.totalAmount || +props?.billDetail?.total_amount, props?.billDetail?.id)} />
                        </Flex>
                        <Flex justify="space-between" align="end" gap={12}>
                            <div className="basis-2/5">Ngân hàng:</div>
                            <div className="flex-1 font-bold line-clamp-1">
                                {bankInfo?.bankType || 'MB'}
                            </div>
                        </Flex>
                        <Flex justify="space-between" align="end" gap={12}>
                            <div className="basis-2/5">Số tài khoản:</div>
                            <div className="flex-1 font-bold line-clamp-1">
                                {bankInfo?.numberBank || '0374339124'}
                            </div>
                        </Flex>
                        <Flex justify="space-between" align="end" gap={12}>
                            <div className="basis-2/5">Tên tài khoản:</div>
                            <div className="flex-1 font-bold line-clamp-1">
                                {'DO VAN KHOA'}
                            </div>
                        </Flex>
                    </Space>
                </div>
            </div>
        </Flex>
    </BaseModalSetting>
}

export default ModalPayment;