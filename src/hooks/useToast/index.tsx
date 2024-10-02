import React, { useContext } from 'react';

interface IToastContext {
  showError: (err: ErrorResponse | string) => void;
  showSuccess: (message: string) => void;
  showLoading: (message: string) => void;
}

function useToast() {
  const { showError, showSuccess } = useContext(ToastContext);
  return { showError, showSuccess };
}

export const ToastContext = React.createContext<IToastContext>({
  showError: (_err: ErrorResponse | string) => ({}),
  showSuccess: (message: string) => ({}),
  showLoading: (message: string) => ({}),
});

export class ErrorResponse {
  constructor(public message: string, public statusCode: number, public response?: any) {}
}

export const UNAUTHORIZED = 401;
export const FORBIDDEN = 403;

export default useToast;
