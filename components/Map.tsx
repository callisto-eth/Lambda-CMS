'use client';

import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';

const locationMarker = new Icon({
  iconUrl: '/Location.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

export default function Map({ xVal, yVal }: { xVal: number; yVal: number }) {
  return (
    <MapContainer
      id="map"
      center={[yVal, xVal]}
      className="w-full h-[250px] rounded-xl mt-4"
      zoom={13}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[yVal, xVal]} icon={locationMarker}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
}
