import { useAppSelector } from "../redux/hooks";
import { tableRowProps } from "../types";
import TableHeader from "./TableHeader";
import TableRowItem from "./TableRowItem";

function TableRowList({ tableRowArray }: tableRowProps) {
  const currentPage = useAppSelector((state) => state.data.currentPage);
  return (
    <>
      <TableHeader />
      {(tableRowArray.slice(currentPage * 12 - 12, currentPage * 12) || []).map(
        (el: string) => {
          if (el.split(",")[0] === "TransactionId") {
            return;
          }
          return (
            <>
              <tbody key={el}>
                <TableRowItem item={el} />
              </tbody>
            </>
          );
        }
      )}
    </>
  );
}

export default TableRowList;
