import { Container, Row, Col } from "reactstrap";
import graph from "../img/graph.jpg";
import chart from "../img/chart.jpg";

// component import
import ButtonPrompt from "./ButtonPrompt";

export default function HomeBox(props) {
  return (
    <Container className="container-type home-section">
      <Row xs="3">
        <Col className="home-col">
          <h2 className="margin-center">
            View population data!
          </h2>
          <img src={graph} alt="Population Graph" className="home-image" />
        </Col>
        <Col className="home-col vertical-center">
          <Container className="container-type">
            <Row>
              <Col>
                <h1 className="margin-center">
                  {props.token
                    ? "You are logged in!"
                    : "Want to see more?"}
                </h1>
                <h2 className="margin-center mt-3">
                  {props.token
                    ? "Click below to start finding volcanoes!"
                    : "Create an account to unlock population statistics!"}
                </h2>
              </Col>
            </Row>
            <Row>
              <Col className="form-type">
                <ButtonPrompt token={props.token} />
              </Col>
            </Row>
          </Container>
        </Col>
        <Col className="home-col">
          {" "}
          <h2 className="margin-center">
            View volcano maps!
          </h2>
          <img src={chart} alt="Map of Volcano" className="home-image" />
        </Col>
      </Row>
    </Container>
  );
}
