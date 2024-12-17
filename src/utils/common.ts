
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

export function truncateWords(input: string, length: number = 4): string {
  // Tách chuỗi thành từng từ dựa trên dấu cách
  const words = input.split(" ");

  // Nếu chuỗi có 3 từ trở xuống, trả về chuỗi gốc
  if (words.length <= length) {
    return input;
  }

  // Ghép 3 từ đầu tiên và thêm dấu ba chấm
  return words.slice(0, length).join(" ") + "...";
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
  return (qrLink + '?accountName=' + (import.meta.env.VITE_NAME_BANK || '') + '&amount=' + amount + '&addInfo=don' + id);
}

type TypeOption = "month" | "week" | "3days";

export function customizeDataToChart(
  dataArray: any[],
  type: TypeOption,
  keysMapping: [string, string, any][]
): Record<string, any>[] {
  // Hàm chia nhỏ mảng và gộp trung bình dữ liệu
  function chunkAndAverage(array: any[], chunkSize: number): Record<string, any>[] {
    const result: Record<string, any>[] = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      const chunk = array.slice(i, i + chunkSize);
      const averagedObject: Record<string, any> = {};

      keysMapping.forEach(([key, newKey, transform]) => {
        const sum = chunk.reduce((acc, item) => {
          if (typeof item[key] == 'string') {
            const value = item[key] || '';
            return transform ? transform(item) : value
          }
          const value = item[key] || '';
          return acc + (Number(transform ? transform(item) : value) || 0);
        }, 0);
        averagedObject[newKey] = (sum / chunk.length).toFixed(2);
      });

      result.push(averagedObject);
    }
    return result;
  }

  // Hàm map object và áp dụng logic xử lý riêng
  function mapObject(item: any): Record<string, any> {
    const mappedObject: Record<string, any> = {};
    keysMapping.forEach(([key, newKey, transform]) => {
      const value = item[key] || '';
      mappedObject[newKey] = transform ? transform(item) : value;
    });
    return mappedObject;
  }

  // Xử lý tùy theo type
  switch (type) {
    case "month":
      return dataArray.map(mapObject);
    case "week":
      return chunkAndAverage(dataArray, 7);
    case "3days":
      return chunkAndAverage(dataArray, 3);
    default:
      throw new Error("Type không hợp lệ");
  }
}
