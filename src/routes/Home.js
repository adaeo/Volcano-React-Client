import { Container } from "reactstrap";

// component import
import HomeBox from "../components/HomeBox";

export default function Home(props) {
  const token = props.cookies.token;

  return (
    <main>
      <Container
        className="containerType hero-banner vertical-center"
        title="Image of Mount Fuji"
      >
        <h1>Welcome to Volcano World!</h1>
      </Container>
      <HomeBox token={token} />
    </main>
  );
}
