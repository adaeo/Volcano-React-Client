import { Container } from "reactstrap";

export default function InfoBox(props) {
  return (
    <Container className="no-padding">
      <div className="infoBox">
        <div>
          <p>Name: {props.volcano.name}</p>
          <p>Country: {props.volcano.country}</p>
          <p>Region: {props.volcano.region}</p>
          <p>Subregion: {props.volcano.subregion}</p>
          <p>Last Eruptions: {props.volcano.last_eruption}</p>
          <p>Elevation: {props.volcano.elevation}</p>
          <p>Summit: {props.volcano.summit}</p>
          <p>Latitude: {props.volcano.latitude}</p>
          <p>Longitude: {props.volcano.longitude}</p>
        </div>
        {props.cookies.token && (
          <div>
            <p>Population 5km: {props.volcano.population_5km}</p>
            <p>Population 10km: {props.volcano.population_10km}</p>
            <p>Population 30km: {props.volcano.population_30km}</p>
            <p>Population 100km: {props.volcano.population_100km}</p>
          </div>
        )}
      </div>
    </Container>
  );
}
