export const convertPriceVND = (price: number) => {
  // Chuyển đổi số thành chuỗi với dấu chấm ngăn cách hàng nghìn
  return price.toLocaleString('vi-VN') + 'đ';
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