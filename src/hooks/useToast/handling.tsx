import { message, notification } from 'antd';
import React, { useCallback } from 'react';
import { ErrorResponse, ToastContext } from '.';

interface BaseProps {
  children: any;
}

const Component = (props: BaseProps) => {

  const showError = async (err: ErrorResponse | string) => {
    if (typeof err === 'string') {
      notification.error({ message: 'Thông báo', description: err, key: 'toast' });
      return;
    }

    if (err?.response?.data) {
      let message;

      if (typeof err.response.data === 'string') {
        message = err.response.data;
      } else {
        if (typeof err.response.data?.message === 'string') {
          message = err.response.data?.message;
        } else {
          message = err.response.data?.message[0];
        }
      }

      notification.error({
        message: 'Thông báo',
        description: message || 'Lỗi hệ thống, bạn vui lòng liên hệ quản trị viên!',
      });
      return;
    }
    notification.error({ message: 'Thông báo', description: err.message, key: 'toast' });
  };

  const showSuccess = async (message: string) => {
    notification.success({ message: 'Thông báo', description: message, key: 'toast' });
  };
  const showLoading = async (msg: string) => {
    message.loading(msg + '...');
  };

  const contextValue = {
    showError: useCallback((err: ErrorResponse | string) => showError(err), []),
    showSuccess: useCallback((message: string) => showSuccess(message), []),
    showLoading: useCallback((message: string) => showLoading(message), []),
  };

  return <ToastContext.Provider value={contextValue}>{props.children}</ToastContext.Provider>;
};

const ToastProvider = React.memo(Component);

export { ToastProvider };

