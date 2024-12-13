import { Breadcrumb } from "antd";


const ShipperPage = () => {

    return <>
        <Breadcrumb
            style={{
                fontSize: "24px",
                margin: "16px 0 28px 0"
            }}
            items={[
                {
                    title: 'Dashboard',
                },
                {
                    title: <div className="font-bold">Quản lý giao hàng</div>,
                },
            ]}
        />
        <div className='bg-primary drop-shadow-primary rounded-primary'>
             aa
        </div>
    </>
}

export default ShipperPage;