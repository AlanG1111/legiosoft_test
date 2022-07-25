import { ReactElement } from "react";

export type responseType = {
  data: object;
};

export type tableWrapperProps = {
  tableHead: Array<string>;
  children: ReactElement<any, any>;
};

export type tableRowProps = {
  tableRowArray: Array<string>;
};

export type tableRowItemProps = {
  item: string;
};

export type EditModalProps = {
  showEditModal: boolean;
  handleCloseEditModal: () => void;
  saveTransactionChanges: () => void;
};
