import { DeleteOutlined, EditOutlined, PlusOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { Breadcrumb, Button, Popconfirm, Tag, Tooltip } from "antd";
import useAccount from "./utils/account.hooks";
import { useMemo } from "react";
import Table, { ColumnProps } from "antd/es/table";
import { IUser } from "../../../interFaces/common.types";
import Avatar from "react-avatar";
import AccountModel from "./components/AccountModel";


export default function AccountPage() {

    const { state, ...hooks } = useAccount();

    const columns = useMemo(() => {
        const tblColumns: ColumnProps<IUser>[] = [
            {
                title: 'STT',
                dataIndex: 'stt',
                width: 50,
                align: 'center',
                fixed: 'left',
                render: (_: any, __: IUser, index: number) => {
                    return (
                        <span>
                            {Number(state.pageIndex) > 1 ? (Number(state.pageIndex) - 1) * state.pageSize + (index + 1) : index + 1}
                        </span>
                    );
                },
            },
            {
                title: 'Name/Email',
                dataIndex: 'name/email',
                render: (_: any, user: IUser) => {
                    return (
                        <div className='flex items-center gap-3'>
                            <Avatar className="cursor-pointer" onClick={() => { hooks.handleOpenModal(user.id) }} name={user.name || user.email} size="32" round={true} />
                            <div className="flex flex-col">
                                <span className="text-purple text-base font-semibold cursor-pointer" onClick={() => { hooks.handleOpenModal(user.id) }}>{user.name || user.email}</span>
                                <span className="text-ghost text-sm" onClick={() => { hooks.handleOpenModal(user.id) }}>{user.name ? user.email : ''}</span>
                            </div>
                        </div>
                    )
                }
            },
            {
                title: "Vai trò",
                key: 'roles',
                dataIndex: 'roles',
                render: (_: any, { roles }: IUser) => (
                    <>
                        {roles?.map((role) => {
                            // Lấy màu từ hàm hash
                            const color = hooks.colors[hooks.hashStringToColorIndex(role.name)];
                            return (
                                <Tag color={color} key={role.name}>
                                    {role.name.toUpperCase()}
                                </Tag>
                            );
                        })}
                        {
                            !roles && (
                                <Tag color={hooks.colors[hooks.hashStringToColorIndex('khách hàng')]} key={'user'}>
                                    KHÁCH HÀNG
                                </Tag>
                            )
                        }
                    </>
                ),
            },
            {
                title: 'Trạng thái',
                dataIndex: 'status',
                align: 'center',
                width: '15%',
                render: (_: any, user: IUser) => (
                    <Tooltip title="Thay đổi trạng thái">
                        <Popconfirm
                            placement='topRight'
                            title={`${user.is_locked ? 'Mở khoá' : 'Khoá'} tài khoản`}
                            description={`Bạn có muốn ${user.is_locked ? 'mở khoá' : 'khoá'} tài khoản này?`}
                            icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                            okText="Có"
                            cancelText="Không"
                            onConfirm={() => hooks.handleChangeLock(user.id)}
                        >
                            <Button danger={user.is_locked} className={`${!user.is_locked && 'border-green-600 text-green-600'} min-w-[80px]`}>
                                {!user.is_locked ? "Hoạt động" : 'Khoá'}
                            </Button>
                        </Popconfirm>
                    </Tooltip>
                )
            },
            {
                title: 'Hành động',
                dataIndex: 'action',
                align: 'center',
                width: '15%',
                fixed: 'right',
                render: (_: any, { id }: any) => (
                    <Tooltip title="Chi tiết và cập nhập">
                        <Button onClick={() => hooks.handleOpenModal(id)} className='ml-2 text-yellow-500 border-yellow-500' icon={<EditOutlined />}></Button>
                    </Tooltip>
                )
            },
        ];

        return tblColumns;
    }, [state.pageIndex, state.pageSize, hooks.handleOpenModal])

    return (
        <>
            {hooks.contextHolder}
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
                        title: <h1 className="font-bold">Tài khoản</h1>,
                    },
                ]}
            />
            <div className='bg-primary drop-shadow-primary rounded-primary'>
                <div className='flex items-center justify-between'>
                    <h1 className='p-6 text-xl font-semibold'>Tài khoản</h1>
                    <Button
                        type='primary'
                        icon={<PlusOutlined />}
                        className='mx-6'
                    // onClick={() => hooks.handleOpenModal()}
                    >
                        Tạo tài khoản
                    </Button>
                </div>
                <Table
                    loading={state.loading}
                    dataSource={state.data}
                    columns={columns}
                    rowKey="id"
                    pagination={{
                        pageSize: state.pageSize,
                        showSizeChanger: true,
                        pageSizeOptions: ['5', '10', '20', '50'], // Các tùy chọn số lượng bản ghi
                        total: state.total,
                        current: state.pageIndex,
                        style: {
                            paddingRight: "24px",
                        },
                        onChange(page, pageSize) {
                            hooks.handlePageChange(page, pageSize);
                        },
                    }}
                />
            </div>

            {
                state.showModal &&
                <AccountModel showToast={hooks.showToast} onClose={hooks.handleDismissModal} onRefresh={hooks.refreshPage} itemId={state.selectedItemId} />
            }
        </>
    )
}