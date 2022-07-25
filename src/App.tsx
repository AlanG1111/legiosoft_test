import { Container, Navbar, Table } from "react-bootstrap";
import ButtonsGroup from "./Components/ButtonsGroup";
import Filters from "./Components/Filters";
import PaginationWrapper from "./Components/PaginationComponent";
import TableRowList from "./Components/TableRowList";
import { useAppSelector } from "./redux/hooks";

function App() {
  const dataArray = useAppSelector((state) => state.data.data);
  return (
    <div className='App'>
      <Navbar bg='dark' variant='dark'>
        <Container>
          <Filters />
          <ButtonsGroup />
        </Container>
      </Navbar>
      <Container>
        <Table striped bordered hover>
          <TableRowList tableRowArray={dataArray} />
        </Table>
        <PaginationWrapper />
      </Container>
    </div>
  );
}

export default App;
