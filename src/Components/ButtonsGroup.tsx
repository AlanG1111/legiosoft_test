import React, { useRef } from "react";
import Papa from "papaparse";
import { Button } from "react-bootstrap";
import { getData, setDataFromFile } from "../redux/slice";
import { useAppDispatch } from "../redux/hooks";

const ButtonsGroup = () => {
  const dispatch = useAppDispatch();

  const fetchData = () => {
    dispatch(getData());
  };
  const inputFile = useRef<HTMLInputElement>(null);

  const exportData = () => {
    if (inputFile.current) {
      inputFile.current.click();
    }
  };

  const fileLoadHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      console.log(file);
      const reader = new FileReader();
      reader.readAsText(file);

      reader.onload = function () {
        if (typeof reader.result === "string") {
          const parcedFile = Papa.parse(reader.result);

          dispatch(setDataFromFile(parcedFile.data.flat().filter(Boolean)));
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
        IMPORT
      </Button>
      <Button className='ms-3' onClick={exportData} variant='secondary'>
        EXPORT
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
