import { Breadcrumb, Button } from "antd"
import useTable from "./utils/table.hooks"
import { showSideOder } from "../../../utils/event-bus/event-bus.events";

export default function TablePage() {

    const { ...hooks } = useTable();

    return <>
        {/* {hooks.contextHolder} */}
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
                    title: <h1 className="font-bold">Danh sách bàn</h1>,
                },
            ]}
        />
        <Button onClick={() => {showSideOder(true, 12)}}>Test</Button>
    </>
}