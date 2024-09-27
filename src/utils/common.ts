export const convertPriceVND = (price: number) => {
    // Chuyển đổi số thành chuỗi với dấu chấm ngăn cách hàng nghìn
    return price.toLocaleString('vi-VN') + 'đ';
  }