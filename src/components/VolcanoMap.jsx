import { useState } from "react";
import { Container } from "reactstrap";
import { Map, Marker, ZoomControl } from "pigeon-maps";

export default function VolcanoMap(props) {
  const lat = parseFloat(props.volcano.latitude);
  const lon = parseFloat(props.volcano.longitude);

  const [center, setCenter] = useState([lat, lon]);

  const [zoom, setZoom] = useState(4);
  const color = `hsl(18deg, 99%, 42%)`;

  if (lon && lat) {
    return (
      <Container className="container-type map-type">
        <Map
          center={center}
          zoom={zoom}
          onBoundsChanged={({ center, zoom }) => {
            setCenter(center);
            setZoom(zoom);
          }}
          minZoom={3}
        >
          <ZoomControl />
          <Marker
            width={50}
            anchor={[lat, lon]}
            color={color}
            onClick={() => {
              setCenter([lat, lon]);
              setZoom(10);
            }}
          />
        </Map>
      </Container>
    );
  }
}
