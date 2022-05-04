import { useNavigate } from "react-router-dom";
import { Button } from "reactstrap";

export default function ButtonPrompt(props) {
  const navigate = useNavigate();

  if (props.token) {
    return (
      <Button
        onClick={() => {
          navigate("/volcano-list");
        }}
        className="formButton mt-4"
      >
        View Volcanoes
      </Button>
    );
  } else {
    return (
      <Button
        onClick={() => {
          navigate("/register");
        }}
        className="formButton mt-4"
      >
        Register Now
      </Button>
    );
  }
}
