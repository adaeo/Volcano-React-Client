import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";

// component import
import InfoBox from "../components/InfoBox";
import WikiBox from "../components/WikiBox";
import VolcanoMap from "../components/VolcanoMap";
import PopulationChart from "../components/PopulationChart";

const API_URL = "http://sefdb02.qut.edu.au:3001";

export default function Volcano(props) {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const [volcano, setVolcano] = useState(null);

  useEffect(() => {
    (async () => {
      // console.log(props.token);
      const url = `${API_URL}/volcano/${id}`;

      const headers = {
        method: "GET",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${props.cookies.token}`,
        },
      };

      let res = props.cookies.token
        ? await fetch(url, headers)
        : await fetch(url);
      let data = await res.json();
      setVolcano(data);
    })();
    // eslint-disable-next-line
  }, []);

  if (volcano === null) {
    return (
      <Container className="containerType">
        <p>Loading...</p>
      </Container>
    );
  } else {
    return (
      <Container className="containerType" fluid>
        <Row xs="1">
          <Col>
            <h1>{volcano.name}</h1>
          </Col>
        </Row>
        <Row xs="2">
          <Col xs="auto">
            <InfoBox volcano={volcano} cookies={props.cookies} />
          </Col>
          <Col className="fillCol">
            <Row>
              <WikiBox volcano={volcano} />
            </Row>
            <Row xs="2">
              <Col>
                <PopulationChart alt="Marked chart of volcano" volcano={volcano} cookies={props.cookies} />
              </Col>
              <Col>
                <VolcanoMap volcano={volcano} />
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    );
  }
}
