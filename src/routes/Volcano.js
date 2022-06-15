import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { Container, Row, Col, Button } from "reactstrap";

// component import
import InfoBox from "../components/InfoBox";
import WikiBox from "../components/WikiBox";
import VolcanoMap from "../components/VolcanoMap";
import PopulationChart from "../components/PopulationChart";

const API_URL = "http://sefdb02.qut.edu.au:3001";

export default function Volcano(props) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const [volcano, setVolcano] = useState(null);
  const [relog, setRelog] = useState(false);
  const [timeout, setTimeout] = useState(false);

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
      if (res.status === 200) {
        let data = await res.json();
        setVolcano(data);
      } else if (res.status === 401 || res.status === 400) {
        setRelog(true);
      } else if (res.status === 429) {
        setTimeout(true);
      }
    })();
    // eslint-disable-next-line
  }, []);

  if (timeout) {
    return (
      <Container className="container-type form-type">
        <h3>Too many requests! Please wait 3 minutes before trying again.</h3>
        <Button
          onClick={() => {
            navigate("/");
          }}
          className="form-button"
        >
          Back Home
        </Button>
      </Container>
    );
  }

  if (relog) {
    return (
      <Container className="container-type form-type">
        <p className="error">Login expired. Please click below to login again.</p>
        <Button
          onClick={() => {
            props.removeCookie("token");
            navigate("/login");
          }}
          className="form-button"
        >
          Login
        </Button>
      </Container>
    );
  }

  if (volcano === null) {
    return (
      <Container className="container-type">
        <p>Loading...</p>
      </Container>
    );
  } else {
    return (
      <Container className="container-type mb-2" fluid>
        <Row xs="1">
          <Col>
            <h1>{volcano.name}</h1>
          </Col>
        </Row>
        <Row xs="2" className="mt-2">
          <Col xs="auto">
            <InfoBox volcano={volcano} cookies={props.cookies} />
          </Col>
          <Col className="fill-col">
            <Row xs="2">
              <Col>
                <PopulationChart
                  alt="Marked chart of volcano"
                  volcano={volcano}
                  cookies={props.cookies}
                />
              </Col>
              <Col>
                <VolcanoMap volcano={volcano} />
              </Col>
            </Row>
            <Row>
              <WikiBox volcano={volcano} />
            </Row>
          </Col>
        </Row>
      </Container>
    );
  }
}
