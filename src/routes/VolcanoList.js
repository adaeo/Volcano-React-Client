import { useEffect, useState } from "react";
import { Container, Row, Col } from "reactstrap";

// import components
import FormSelector from "../components/FormSelector";
import DataTable from "../components/DataTable";

const API_URL = "http://sefdb02.qut.edu.au:3001";
const url = `${API_URL}/countries`;

export default function VolcanoList(props) {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("");

  useEffect(() => {
    (async () => {
      let res = await fetch(url);
      let data = await res.json();
      await setCountries(Object.values(data));
      await setCountry(Object.values(data)[0]);
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
        />
        <Row xs="1">
          <DataTable
            token={props.cookies.token}
            country={country}
            range={range}
          />
        </Row>
      </Container>
    );
  }
}
