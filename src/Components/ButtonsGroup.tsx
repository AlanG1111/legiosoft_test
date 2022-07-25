import React, { useRef } from "react";
import Papa from "papaparse";
import { Button } from "react-bootstrap";
import { getData, getFile } from "../redux/slice";
import { useAppDispatch } from "../redux/hooks";

const ButtonsGroup = () => {
  const dispatch = useAppDispatch();

  const fetchData = () => {
    dispatch(getData());
  };
  const inputFile = useRef<HTMLInputElement>(null);

  const importData = () => {
    if (inputFile.current) {
      inputFile.current.click();
    }
  };

  const fileLoadHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsText(file);

      reader.onload = function () {
        if (typeof reader.result === "string") {
          const parcedFile = Papa.parse(reader.result);
          dispatch(getFile(parcedFile.data.flat()));
          e.target.value = "";
          e.target.files = null;
        }
      };

      reader.onerror = function () {
        console.log(reader.error);
      };
    }
  };
  return (
    <div>
      <Button onClick={fetchData} variant='secondary'>
        EXPORT
      </Button>
      <Button className='ms-3' onClick={importData} variant='secondary'>
        IMPORT
        <input
          onChange={fileLoadHandler}
          ref={inputFile}
          type='file'
          hidden={true}
        />
      </Button>
    </div>
  );
};

export default ButtonsGroup;
