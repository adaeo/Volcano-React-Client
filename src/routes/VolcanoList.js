import { useState } from "react";
import { Container, Row, Col } from "reactstrap";

// import components
import FormSelector from "../components/FormSelector";

export default function VolcanoList() {
  const [country, setCountry] = useState("japan");
  const countries = ["japan", "australia", "new zealand", "usa", "ukraine"];

  return (
    <Container className="containerType" fluid>
      <Row xs="1">
        <Col>
          <h1>Volcano List</h1>
        </Col>
      </Row>
      <FormSelector country={country} setCountry={setCountry} countries={countries} />
      <h1>{country}</h1>{" "}
    </Container>
  );
}
