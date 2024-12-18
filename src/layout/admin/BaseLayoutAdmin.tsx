import { FloatButton, Layout, Table } from 'antd';
import React, { Suspense, useCallback, useEffect, useMemo, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { HeaderMain } from './HeaderMain';
import Sidebar from './Sidebar';
import SpinnerLoader from '../../components/loader';
import SidebarOder from './SidebarOder';
import { usePusher } from '@/hooks/usePusher';
import { PUSHER_CHANNEL } from '@/constants/enum';
import useCallStaff from '@/hooks/useCallStaff';
import { InfoCircleOutlined } from '@ant-design/icons';
import BaseModalSetting from '@/components/base/BaseModalSetting';
import useToast from '@/hooks/useToast';

const { Header, Content, Footer } = Layout;

const BaseLayoutAdmin: React.FC = () => {

  const [showModal, setShowModal] = useState<boolean>(false);
  const pusher = usePusher();
  const { callStaff, setCallStaffToLocal, deCrease } = useCallStaff();
  const [option, setOption] = useState<any[]>([]);
  const toast = useToast();

  useEffect(() => {
    if (!pusher) return;
    const channel = pusher.subscribe(PUSHER_CHANNEL.CALL);
    channel.bind('call.ok', function (data: any) {
      setCallStaffToLocal(data?.call);
    })
    return () => {
      channel.unbind_all();
      pusher.unsubscribe(PUSHER_CHANNEL.CALL);
    }
  }, []);

  const handleToogleShowModal = useCallback((isStatus: boolean) => () => {
    setShowModal(isStatus);
  }, []);

  const handleDisMiss = useCallback(() => () => {
    setShowModal(false);
  }, []);

  const columns: any = useMemo(() => {
    return [
      {
        title: 'Tên bàn',
        dataIndex: 'name',
        render: (_: any, item: any) => {
          const text = item?.table_id?.length > 0 ? item?.table_id?.reduce((acc: any, curr: any, index: number, arr: any[]) => {
            if (arr.length == index + 1) {
              return acc + (curr?.table || '');
            }
            return acc + (curr?.table || '') + ' - ';
          }, '') : '';
          return text;
        },
      }
    ];
  }, []);

  // rowSelection object indicates the need for row selection
  const rowSelection: any = useMemo(() => {
    return {
      onChange: (_: React.Key[], selectedRows: any[]) => {
        setOption(selectedRows);
      },
      getCheckboxProps: (record: any) => ({
        // disabled: record.name === 'Disabled User', // Column configuration not to be checked
        name: record.name,
      }),
    }
  }, []);

  const handleChosse = useCallback(() => {
    const res = deCrease(option);
    if (res) {
      handleDisMiss();
      toast.showSuccess('Cập nhật thành công!');
    } else {
      toast.showError('Vui lòng chọn bàn!');
    }
  }, [option]);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sidebar />
      <Layout>
        <Header style={{ padding: 0, backgroundColor: "transparent", minHeight: "78px" }}>
          <HeaderMain />
        </Header>
        <Content style={{ margin: '24px 24px 0 24px' }}>
          <Suspense fallback={<SpinnerLoader />}>
            <Outlet></Outlet>
          </Suspense>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          DATN ©{new Date().getFullYear()} Yagi
        </Footer>
      </Layout>
      <SidebarOder />
      {callStaff?.list?.length > 0 && <FloatButton badge={{ count: callStaff?.list?.length || 0 }} tooltip={'Yêu cầu nhân viên'} icon={<InfoCircleOutlined />} type='primary' onClick={handleToogleShowModal(true)} />}
      {
        showModal && callStaff?.list?.length > 0 && (<BaseModalSetting
          okText={'Đã xem'}
          cancelText={'Đóng'}
          destroyOnClose
          title={'Danh sách bàn yêu cầu nhân viên'}
          onCancel={handleDisMiss}
          onConfirm={handleChosse}
        >
          <Table<any>
            rowSelection={{ ...rowSelection }}
            columns={columns}
            dataSource={callStaff?.list}
            pagination={false}
            key={'bill_id'}
          />
        </BaseModalSetting>)
      }
    </Layout>
  );
};

export default BaseLayoutAdmin;