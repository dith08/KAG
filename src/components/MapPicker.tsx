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

// Fix agar marker icon bisa muncul dengan benar
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
  setAddress: (address: string) => void; // Menyimpan alamat yang ditampilkan
  setCoordinates: (lat: number, lng: number) => void; // Menyimpan lat/lng untuk dikirim ke backend
  searchLocation?: string;
  onSearchResult?: (lat: number, lng: number) => void;
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
}) => {
  const [marker, setMarker] = useState<MarkerPosition>({
    lat: -6.8059,
    lng: 110.8417,
  });

  const map = useMap();

  // Fungsi untuk mendapatkan alamat berdasarkan lat/lng
  const reverseGeocode = useCallback(
    (lat: number, lng: number) => {
      fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
      )
        .then((res) => res.json())
        .then((data) => {
          const displayName = data.display_name || "Alamat tidak ditemukan";
          setAddress(displayName); // Menampilkan alamat di textarea
          setCoordinates(lat, lng); // Menyimpan lat/lng
        });
    },
    [setAddress, setCoordinates]
  );

  // Ketika peta di-klik
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      setMarker({ lat, lng });
      reverseGeocode(lat, lng); // Menampilkan alamat dan menyimpan lat/lng saat klik
    },
  });

  // Untuk menangani pencarian lokasi
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
          setCoordinates(lat, lng); // Menyimpan lat/lng
          if (map) map.setView([lat, lng], 15);
          reverseGeocode(lat, lng); // Mendapatkan alamat berdasarkan lat/lng
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
      center={[-6.8059, 110.8417]} // Default ke Kudus
      zoom={13}
      className="h-64 lg:h-96 w-full rounded-lg z-0"
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <MapPicker {...props} />
    </MapContainer>
  );
}
