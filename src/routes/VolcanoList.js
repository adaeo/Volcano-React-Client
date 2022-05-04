import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Button } from "reactstrap";

// import components
import FormSelector from "../components/FormSelector";
import DataTable from "../components/DataTable";

const API_URL = "http://sefdb02.qut.edu.au:3001";
const url = `${API_URL}/countries`;

export default function VolcanoList(props) {
  const navigate = useNavigate();

  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState(null);
  const [empty, setEmpty] = useState(false);
  const [initSubmit, setInitSubmit] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    (async () => {
      let res = await fetch(url);
      if (res.status === 200) {
        let data = await res.json();
        await setCountries(Object.values(data));
        await setCountry(Object.values(data)[0]);
      } else if (res.status === 400 || res.status === 401) {
        setError(true);
      }
    })();
  }, []);

  const ranges = ["None", "5km", "10km", "30km", "100km"];

  const [range, setRange] = useState(ranges[0]);

  if (countries && country) {
    return (
      <Container className="containerType" fluid>
        <Row xs="1">
          <Col>
            <h1>Volcano List</h1>
          </Col>
        </Row>
        <FormSelector
          token={props.cookies.token}
          country={country}
          setCountry={setCountry}
          countries={countries}
          range={range}
          setRange={setRange}
          ranges={ranges}
          setEmpty={setEmpty}
          setInitSubmit={setInitSubmit}
        />
        <Row xs="1">
          <DataTable
            token={props.cookies.token}
            country={country}
            range={range}
            empty={empty}
            initSubmit={initSubmit}
          />
        </Row>
      </Container>
    );
  } else if (error) {
    return (
      <Container className="containerType formType">
        <h3>Something went wrong...</h3>
        <Button
          className="formButton"
          onClick={() => {
            navigate("/");
          }}
        >
          Return Home
        </Button>
      </Container>
    );
  } else {
    return (
      <Container className="containerType">
        <h3>Loading...</h3>
      </Container>
    );
  }
}
