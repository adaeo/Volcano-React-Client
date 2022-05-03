import { Container } from "reactstrap";

export default function InfoBox(props) {
  return (
    <Container className="no-padding">
      <div className="infoBox">
        <div>
          <p><b>Name:</b> {props.volcano.name}</p>
          <p><b>Country:</b> {props.volcano.country}</p>
          <p><b>Region:</b> {props.volcano.region}</p>
          <p><b>Subregion:</b> {props.volcano.subregion}</p>
          <p><b>Last Eruptions:</b> {props.volcano.last_eruption}</p>
          <p><b>Elevation:</b> {props.volcano.elevation}</p>
          <p><b>Summit:</b> {props.volcano.summit}</p>
          <p><b>Latitude:</b> {props.volcano.latitude}</p>
          <p><b>Longitude:</b> {props.volcano.longitude}</p>
        </div>
        {props.cookies.token && (
          <div>
            <p><b>Population 5km:</b> {props.volcano.population_5km}</p>
            <p><b>Population 10km:</b> {props.volcano.population_10km}</p>
            <p><b>Population 30km:</b> {props.volcano.population_30km}</p>
            <p><b>Population 100km:</b> {props.volcano.population_100km}</p>
          </div>
        )}
      </div>
    </Container>
  );
}
