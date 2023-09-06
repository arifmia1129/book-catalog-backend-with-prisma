type Option = {
  page?: number | string;
  size?: number | string;
  sortBy?: string;
  sortOrder?: string;
};

type CalculatePagination = {
  page: number;
  size: number;
  skip: number;
  sortBy?: string;
  sortOrder?: string;
};

const calculatePagination = (option: Option): CalculatePagination => {
  const page = Number(option.page || 1);
  const size = Number(option.size || 10);
  const skip = (page - 1) * size;

  const sortBy = option.sortBy || "title";
  const sortOrder = option.sortOrder || "desc";

  return {
    page,
    size,
    skip,
    sortBy,
    sortOrder,
  };
};

export const paginationHelper = {
  calculatePagination,
};
