import {
  MapContainer,
  TileLayer,
  Marker,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { useEffect, useState, useCallback } from "react";
import { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix agar marker icon muncul
// eslint-disable-next-line @typescript-eslint/no-explicit-any
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: new URL(
    "leaflet/dist/images/marker-icon-2x.png",
    import.meta.url
  ).toString(),
  iconUrl: new URL(
    "leaflet/dist/images/marker-icon.png",
    import.meta.url
  ).toString(),
  shadowUrl: new URL(
    "leaflet/dist/images/marker-shadow.png",
    import.meta.url
  ).toString(),
});

interface MapPickerProps {
  setAddress: (address: string) => void;
  setCoordinates: (lat: number, lng: number) => void;
  searchLocation?: string;
  onSearchResult?: (lat: number, lng: number) => void;
  initialCoordinates?: [number, number]; // ⬅ tambahan prop baru
}

interface MarkerPosition {
  lat: number;
  lng: number;
}

const MapPicker: React.FC<MapPickerProps> = ({
  setAddress,
  setCoordinates,
  searchLocation,
  onSearchResult,
  initialCoordinates,
}) => {
  const [marker, setMarker] = useState<MarkerPosition>({
    lat: initialCoordinates?.[0] || -6.8059,
    lng: initialCoordinates?.[1] || 110.8417,
  });
  const [hasInitialized, setHasInitialized] = useState(false);
  const map = useMap();

  const reverseGeocode = useCallback(
    (lat: number, lng: number) => {
      fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
      )
        .then((res) => res.json())
        .then((data) => {
          const displayName = data.display_name || "Alamat tidak ditemukan";
          setAddress(displayName);
          setCoordinates(lat, lng);
        });
    },
    [setAddress, setCoordinates]
  );

  useEffect(() => {
    if (initialCoordinates && !hasInitialized) {
      const [lat, lng] = initialCoordinates;
      setMarker({ lat, lng });
      reverseGeocode(lat, lng);
      if (map) map.setView([lat, lng], 15);
      setHasInitialized(true);
    }
  }, [initialCoordinates, map, reverseGeocode, hasInitialized]);

  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      setMarker({ lat, lng });
      reverseGeocode(lat, lng);
    },
  });

  useEffect(() => {
    if (!searchLocation) return;

    fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
        searchLocation
      )}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data && data.length > 0) {
          const result = data[0];
          const lat = parseFloat(result.lat);
          const lng = parseFloat(result.lon);
          setMarker({ lat, lng });
          setCoordinates(lat, lng);
          if (map) map.setView([lat, lng], 15);
          reverseGeocode(lat, lng);
          onSearchResult?.(lat, lng);
        }
      });
  }, [searchLocation, map, reverseGeocode, onSearchResult, setCoordinates]);

  return marker ? (
    <Marker position={[marker.lat, marker.lng] as LatLngExpression} />
  ) : null;
};

export default function LeafletWrapper(props: MapPickerProps) {
  return (
    <MapContainer
      center={props.initialCoordinates || [-6.8059, 110.8417]}
      zoom={13}
      className="h-64 lg:h-96 w-full rounded-lg z-0"
      key={props.initialCoordinates?.join(",")} // ⬅ penting untuk re-mount
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <MapPicker {...props} />
    </MapContainer>
  );
}
