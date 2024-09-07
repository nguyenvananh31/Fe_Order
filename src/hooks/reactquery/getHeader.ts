export const getHeaderReactQuery = () => {
    const token = localStorage.getItem("AUTH"); // Lấy token từ localStorage
    if (token) {
      return {
        Authorization: `Bearer ${token}`,
      };
    } else {
      return {};
    }
  };