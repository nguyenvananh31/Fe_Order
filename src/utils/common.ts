
export const convertPriceVND = (price: number) => {
  // Chuyển đổi số thành chuỗi với dấu chấm ngăn cách hàng nghìn
  price = price * 1;
  return price.toLocaleString('vi-VN') + 'đ';
}

export const convertPriceVNDNotSupfix = (price: number) => {
  // Chuyển đổi số thành chuỗi với dấu chấm ngăn cách hàng nghìn
  price = price * 1;
  return price.toLocaleString('vi-VN', { style: 'decimal', useGrouping: true }).replace(/\./g, ',');
}

//Chuyển đổi từ dạng Date thành 1h30p20g
export function formatDurationDate(date: Date): string {
  const now = new Date();
  const diffInSeconds = Math.abs(Math.floor((now.getTime() - date.getTime()) / 1000));

  const hours = Math.floor(diffInSeconds / 3600);
  const minutes = Math.floor((diffInSeconds % 3600) / 60);
  const seconds = diffInSeconds % 60;

  let result = '';

  if (hours > 0) {
    result += `${hours}h`;
  }

  if (minutes > 0) {
    result += `${minutes}p`;
  }

  if (seconds > 0) {
    result += `${seconds}g`;
  }

  return result || '0p';
}

//Lấy đường dẫn qr
export function getUrlQrCheck(id: string) {
  return import.meta.env.VITE_URL + '/qr-check/' + id;
}

//Lấy thông tin tài khoản thanh toán
export function getInfoBank() {
  const numberBank = import.meta.env.VITE_NUMBER_BANK || '';
  const nameBank = import.meta.env.VITE_NAME_BANK || '';
  const bankPin = import.meta.env.VITE_BANK_PIN || '';
  const bankType = import.meta.env.VITE_BANK_TYPE || '';
  if (!numberBank || !bankPin || !bankType || !nameBank) {
    return '';
  }
  return { numberBank, bankPin, bankType, nameBank };
}

//Get link qr image payment
export function getQrImagePay(amount: number, id: number) {
  const qrLink = import.meta.env.VITE_QR_URL_IMGAE || '';
  return qrLink + 'accountName=' + import.meta.env.VITE_NAME_BANK || '' + '&amount=' + amount + '&addInfo=donhang' + id;
} 