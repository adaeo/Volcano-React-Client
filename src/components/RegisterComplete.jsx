// Component Import
import { Container, Row, Col, Button } from "reactstrap";
import { useNavigate } from "react-router-dom";

export default function RegisterComplete() {
  const navigate = useNavigate();

  return (
    <Container className="containerType formType" fluid>
      <Row xs="1">
        <Col>
          <h1>Registration completed!</h1>
        </Col>
      </Row>
      <Row xs="1">
        <p>Click below to go to login.</p>
      </Row>
      <Row xs="3">
        <Col>
          <Button
            className="formButton"
            onClick={() => {
              navigate("/login");
            }}
          >
            Login
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
