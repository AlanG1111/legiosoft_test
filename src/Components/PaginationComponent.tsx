import { Pagination } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setPageNumber } from "../redux/slice";

function PaginationComponent() {
  const dispatch = useAppDispatch();
  const currentPage = useAppSelector((state) => state.data.currentPage);
  const dataArray = useAppSelector((state) => state.data.data);
  const pages = Math.ceil(dataArray.length / 12);
  const paginationItems = [];

  const changePage = (pageNumber: number) => {
    dispatch(setPageNumber(pageNumber));
  };
  for (let index = 1; index <= pages; index++) {
    paginationItems.push(
      <Pagination.Item
        onClick={() => {
          changePage(index);
        }}
        key={index}
        active={index === currentPage}
      >
        {index}
      </Pagination.Item>
    );
  }
  return <Pagination>{paginationItems}</Pagination>;
}

export default PaginationComponent;
