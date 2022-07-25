import { useAppSelector } from "../redux/hooks";

const TableHeader = () => {
  const dataArray = useAppSelector((state) => state.data.data);
  return dataArray.length > 1 ? (
    <thead>
      <tr>
        <th>TransactionId</th>
        <th>Status</th>
        <th>Type</th>
        <th>ClientName</th>
        <th>Amount</th>
        <th>Action</th>
      </tr>
    </thead>
  ) : null;
};

export default TableHeader;
