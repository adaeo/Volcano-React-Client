// Component Import
import {
  Form,
  FormGroup,
  Label,
  Input,
  Container,
  Row,
  Col,
  Button,
} from "reactstrap";

export default function LoginForm(props) {
  return (
    <Container className="container-type form-type" fluid>
      <Row xs="1">
        <Col>
          <h1>Login</h1>
        </Col>
      </Row>
      {props.error !== "" && (
        <Row xs="1">
          <Col>
            <p className="error">{props.error}</p>
          </Col>
        </Row>
      )}
      <Row xs="3">
        <Col>
          <Form>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                id="email"
                name="email"
                placeholder="Email"
                type="email"
                value={props.email}
                onChange={(event) => props.setEmail(event.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="password">Password</Label>
              <Input
                id="password"
                name="password"
                placeholder="Password"
                type="password"
                value={props.password}
                autoComplete="on"
                onChange={(event) => props.setPassword(event.target.value)}
              />
            </FormGroup>
          </Form>
          <Button
            className="form-button"
            onClick={() => {
              props.login(props.email, props.password);
            }}
          >
            Login
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
