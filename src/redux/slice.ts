import { createSlice, current } from "@reduxjs/toolkit";

interface CounterState {
  data: Array<any>;
  staticValue: Array<any>;
  filterLabels: {
    types: Array<string>;
    status: Array<string>;
  };
  currentPage: number;
  input: string;
}

const initialState: CounterState = {
  data: [],
  staticValue: [],
  filterLabels: {
    types: [],
    status: [],
  },
  currentPage: 1,
  input: "",
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    fetchCVSFile: (state, action) => {
      console.log(state, action);
      const statusFilterLabels: Array<string> = [];
      const typeFilterLabel: Array<string> = [];
      action.payload.users.forEach((item: string, i: number) => {
        if (i === 0) return;
        const type = item.split(",")[2];
        const status = item.split(",")[1];
        if (!typeFilterLabel.includes(type)) {
          typeFilterLabel.push(type);
        }
        if (!statusFilterLabels.includes(status)) {
          statusFilterLabels.push(status);
        }
      });

      state.filterLabels = {
        types: typeFilterLabel,
        status: statusFilterLabels,
      };
      state.staticValue = action.payload.users;
      state.data = action.payload.users;
    },
    getData: () => {
      console.log("getData");
    },
    deleteItem: (state, action) => {
      const currentList = current(state).data;
      // eslint-disable-next-line array-callback-return
      const filteredList = currentList.filter((item: string) => {
        const ID = item.split(",")[0];
        if (ID !== action.payload) {
          return item;
        }
      });
      state.data = filteredList;
    },
    changeTransaction: (state, action) => {
      const currentList = current(state).data;
      state.data = currentList.map((item: string) => {
        const ID = item.split(",")[0];
        if (ID === action.payload.id) {
          const newItem = item.split(",");
          newItem[1] = action.payload.text;
          return newItem.join(",");
        }
        return item;
      });
    },
    filterByTypeAndStatus: (state, action) => {
      const currentList = current(state).staticValue;
      // eslint-disable-next-line array-callback-return
      const filteredList = currentList.filter((item: string) => {
        const status = item.split(",")[1];
        const type = item.split(",")[2];
        if (
          (status === action.payload.status ||
            action.payload.status === "ALL") &&
          (type === action.payload.type || action.payload.type === "ALL")
        ) {
          return item;
        }
      });
      state.data = filteredList;
      state.currentPage = 1;
    },
    setDataFromFile: (state, action) => {
      state.data = action.payload;
      state.staticValue = action.payload;
    },
    setPageNumber: (state, action) => {
      state.currentPage = action.payload;
    },
    changeText: (state, action) => {
      state.input = action.payload;
    },
  },
});

export const {
  setPageNumber,
  setDataFromFile,
  filterByTypeAndStatus,
  getData,
  fetchCVSFile,
  deleteItem,
  changeTransaction,
  changeText,
} = counterSlice.actions;

export default counterSlice.reducer;
