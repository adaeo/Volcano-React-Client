import { useState } from "react";
import { Container } from "reactstrap";
import { Map, Marker, ZoomControl } from "pigeon-maps";

export default function VolcanoMap(props) {
  const lat = parseFloat(props.volcano.latitude);
  const lon = parseFloat(props.volcano.longitude);

  const [center, setCenter] = useState([lat, lon]);

  const [zoom, setZoom] = useState(10);
  const color = `hsl(19deg, 94%, 56%)`;

  if (lon && lat) {
    return (
      <Container className="containerType mapType">
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
              setZoom(12);
            }}
          />
        </Map>
      </Container>
    );
  }
}
