import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { filterByTypeAndStatus } from "../redux/slice";

function Filters() {
  const dataArray = useAppSelector((state) => state.data.filterLabels);
  const dispatch = useAppDispatch();
  const [type, setType] = useState("ALL");
  const [status, setStatus] = useState("ALL");

  useEffect(() => {
    dispatch(filterByTypeAndStatus({ type: type, status: status }));
  }, [type, status, dispatch]);

  const statusFilterHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.target.value);
  };

  const typeFilterHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setType(e.target.value);
  };
  return (
    <div className='w-25 d-flex'>
      <Form.Select className='w-25' size='sm' onChange={statusFilterHandler}>
        <option value={"ALL"}>ALL</option>
        {dataArray.status.map((item: string) => {
          return (
            <option key={item} value={item}>
              {item}
            </option>
          );
        })}
      </Form.Select>
      <Form.Select className='w-25 ms-3' size='sm' onChange={typeFilterHandler}>
        <option value={"ALL"}>ALL</option>
        {dataArray.types.map((item: string) => {
          return (
            <option key={item} value={item}>
              {item}
            </option>
          );
        })}
      </Form.Select>
    </div>
  );
}

export default Filters;
