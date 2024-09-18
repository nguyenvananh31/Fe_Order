import { Loading3QuartersOutlined } from '@ant-design/icons';
import { Spin, Typography } from 'antd';
import React from 'react';

interface IProps {
  title?: string;
}

const SpinnerLoader = ({ title }: IProps) => {
  const antIcon = <Loading3QuartersOutlined className="loading3QuartersOutlinedStyled" spin={true} />;

  return (
    <div className="fixed inset-0 w-full h-full z-[9999] bg-transparent">
      <div className="absolute top-[50%] left-[50%] transform -translate-x-[50%] -translate-y-[50%] z-[9999] bg-primary p-[8px_10px_4px] rounded-md text-center">
        <Spin indicator={antIcon} className="mb-[5px]" />
        <br />
        <Typography.Text className="mb-0 color-white">{title || 'Tải dữ liệu...'}</Typography.Text>
      </div>
    </div>
  );
};

export default React.memo(SpinnerLoader);
