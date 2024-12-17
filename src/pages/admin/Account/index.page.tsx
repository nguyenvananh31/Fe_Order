import { CloseCircleFilled, EditOutlined, LoadingOutlined, QuestionCircleOutlined, SearchOutlined, UndoOutlined } from "@ant-design/icons";
import { AutoComplete, Breadcrumb, Button, Col, Popconfirm, Row, Tag, Tooltip } from "antd";
import Table, { ColumnProps } from "antd/es/table";
import { useMemo } from "react";
import Avatar from "react-avatar";
import { IUser } from "../../../interFaces/common.types";
import AccountModel from "./components/AccountModel";
import useAccount from "./utils/account.hooks";


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
                dataIndex: 'email',
                sorter: true,
                showSorterTooltip: { title: 'Sắp xếp theo tên và email' },
                width: '20%',
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
                width: '40%',
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
                width: 80,
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
                fixed: 'right',
                width: 50,
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
                        title: <div className="font-bold">Tài khoản</div>,
                    },
                ]}
            />
            <div className='bg-primary drop-shadow-primary rounded-primary'>
                <Row gutter={[16, 16]} className="px-6 py-6" align={"middle"} justify={"space-between"} >
                    <Col xs={24} sm={24} md={24} lg={15} className="flex gap-2 max-sm:flex-col">
                        <AutoComplete
                            size="large"
                            options={hooks.options}
                            className="max-sm:w-full md:w-[400px] flex-1"
                            onSearch={hooks.handleChangeTextSearch}
                            placeholder={
                                <div className="flex items-center gap-1 cursor-pointer h-max">
                                    <SearchOutlined className="text-lg text-ghost" />
                                    <span className="text-ghost text-[14px]">Tìm tên hoặc email</span>
                                </div>
                            }
                            allowClear={{ clearIcon: state.loadingSearch ? <LoadingOutlined /> : <CloseCircleFilled /> }}
                            onSelect={(id) => hooks.handleOpenModal(+id)}
                            value={state.textSearch}
                        />
                        <div className="flex gap-2">
                            <Button onClick={hooks.handleSearchBtn} className="w-max" size="large" icon={<SearchOutlined />}>Tìm kiếm</Button>
                            <Button className="w-max" size="large" icon={<UndoOutlined />} onClick={hooks.refreshPage}>Làm mới</Button>
                        </div>
                    </Col>
                    {/* <Col>
                        <Button
                            size="large"
                            type='primary'
                            icon={<PlusOutlined />}
                            onClick={() => hooks.handleOpenModal()}
                        >
                            Thêm tài khoản
                        </Button>
                    </Col> */}
                </Row>
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
                    onChange={hooks.handleTableChange}
                    scroll={{ x: 'max-content' }}
                />
            </div>

            {
                state.showModal &&
                <AccountModel onClose={hooks.handleDismissModal} onRefresh={hooks.refreshPage} itemId={state.selectedItemId} />
            }
        </>
    )
}