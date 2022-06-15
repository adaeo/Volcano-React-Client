// Component Import
import {
  Container,
  Row,
  Col,
  Button,
} from "reactstrap";

export default function LogoutForm(props) {
  return (
    <Container className="container-type form-type" fluid>
      <Row xs="1">
        <Col>
          <h1>Logout</h1>
          <h2>You are currently logged in.</h2>
        </Col>
      </Row>
      <Row xs="2">
        <Col>
          <Button
            className="form-button"
            onClick={() => {
              props.logout();
            }}
          >
            Logout
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
