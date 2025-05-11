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
}

interface MarkerPosition {
  lat: number;
  lng: number;
}

const DEFAULT_POSITION: MarkerPosition = {
  lat: -6.8059,
  lng: 110.8417,
};

// Component untuk menangani event klik dan search
const InteractiveMap: React.FC<
  MapPickerProps & {
    marker: MarkerPosition;
    setMarker: (pos: MarkerPosition) => void;
  }
> = ({
  setAddress,
  setCoordinates,
  searchLocation,
  onSearchResult,
  marker,
  setMarker,
}) => {
  const map = useMap();

  const reverseGeocode = useCallback(
    async (lat: number, lng: number) => {
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
        );
        const data = await res.json();
        const displayName = data.display_name || "Alamat tidak ditemukan";
        setAddress(displayName);
        setCoordinates(lat, lng);
      } catch (error) {
        console.error("Reverse geocoding error:", error);
      }
    },
    [setAddress, setCoordinates]
  );

  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      setMarker({ lat, lng });
      reverseGeocode(lat, lng);
    },
  });

  useEffect(() => {
    if (!searchLocation) return;

    const controller = new AbortController();

    const search = async () => {
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
            searchLocation
          )}`,
          { signal: controller.signal }
        );
        const data = await res.json();
        if (data?.length > 0) {
          const { lat, lon } = data[0];
          const newLat = parseFloat(lat);
          const newLng = parseFloat(lon);
          setMarker({ lat: newLat, lng: newLng });
          map.setView([newLat, newLng], 15);
          reverseGeocode(newLat, newLng);
          onSearchResult?.(newLat, newLng);
        }
      } catch (error: unknown) {
        if (error instanceof Error && error.name !== "AbortError") {
          console.error("Search location error:", error);
        }
      }
    };
    search();
    return () => controller.abort();
  }, [searchLocation, reverseGeocode, map, setMarker, onSearchResult]);

  return <Marker position={[marker.lat, marker.lng] as LatLngExpression} />;
};

// Wrapper utama
export default function LeafletWrapper(props: MapPickerProps) {
  const [marker, setMarker] = useState<MarkerPosition>(DEFAULT_POSITION);

  return (
    <MapContainer
      center={[DEFAULT_POSITION.lat, DEFAULT_POSITION.lng]}
      zoom={13}
      className="h-64 lg:h-96 w-full rounded-lg z-0"
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <InteractiveMap {...props} marker={marker} setMarker={setMarker} />
    </MapContainer>
  );
}
