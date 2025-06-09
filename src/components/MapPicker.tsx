import {
  MapContainer,
  TileLayer,
  Marker,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { useEffect, useState, useCallback, useRef } from "react";
import { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Icon } from "@iconify/react";

// Fix agar marker icon muncul
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
  latitude?: string; // Dari database atau input lain
  longitude?: string; // Dari database atau input lain
  initialAddress?: string; // Alamat awal dari database
}

interface MarkerPosition {
  lat: number;
  lng: number;
}

const DEFAULT_POSITION: MarkerPosition = {
  lat: -6.791056288976382,
  lng: 110.79990770370684,
};

const MapPicker: React.FC<MapPickerProps> = ({
  setAddress,
  setCoordinates,
  searchLocation,
  latitude,
  longitude,
  initialAddress,
}) => {
  const [marker, setMarker] = useState<MarkerPosition>(DEFAULT_POSITION);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Refs untuk mencegah race condition
  const lastSearchLocation = useRef<string>("");
  const initializationDone = useRef(false);

  // Komponen untuk mengatur view peta
  const MapViewUpdater = ({ position }: { position: MarkerPosition }) => {
    const map = useMap();
    useEffect(() => {
      map.setView([position.lat, position.lng], 15, { animate: true });
    }, [map, position.lat, position.lng]);
    return null;
  };

  const reverseGeocode = useCallback(
    async (lat: number, lng: number, skipAddressUpdate = false) => {
      setIsLoading(true);
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`,
          { headers: { "User-Agent": "KaryaAdiGrafika/1.0" } }
        );
        const data = await res.json();
        const displayName = data.display_name || "Alamat tidak ditemukan";

        // Hanya update address jika tidak diminta untuk skip
        if (!skipAddressUpdate) {
          setAddress(displayName);
        }
        setCoordinates(lat, lng);
      } catch (error) {
        console.error("Reverse geocoding error:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [setAddress, setCoordinates]
  );

  // Inisialisasi awal dari database - hanya sekali saat component mount
  useEffect(() => {
    if (initializationDone.current) return;

    const lat = parseFloat(latitude || "");
    const lng = parseFloat(longitude || "");

    if (!isNaN(lat) && !isNaN(lng)) {
      setMarker({ lat, lng });
      if (initialAddress) {
        setAddress(initialAddress);
        setCoordinates(lat, lng);
      } else {
        reverseGeocode(lat, lng);
      }
    } else {
      setMarker(DEFAULT_POSITION);
      if (!initialAddress) {
        reverseGeocode(DEFAULT_POSITION.lat, DEFAULT_POSITION.lng);
      }
    }

    setIsInitialized(true);
    initializationDone.current = true;
  }, []); // Empty dependency array - hanya run sekali

  // Effect terpisah untuk update koordinat dari parent jika berubah setelah inisialisasi
  useEffect(() => {
    if (!isInitialized) return;

    const lat = parseFloat(latitude || "");
    const lng = parseFloat(longitude || "");

    if (!isNaN(lat) && !isNaN(lng)) {
      // Cek apakah koordinat benar-benar berubah
      if (
        Math.abs(marker.lat - lat) > 0.0001 ||
        Math.abs(marker.lng - lng) > 0.0001
      ) {
        setMarker({ lat, lng });
        if (initialAddress) {
          setAddress(initialAddress);
          setCoordinates(lat, lng);
        }
      }
    }
  }, [
    latitude,
    longitude,
    initialAddress,
    isInitialized,
    marker.lat,
    marker.lng,
    setAddress,
    setCoordinates,
  ]);

  const handleSearch = useCallback(async () => {
    if (!searchLocation || !searchLocation.trim()) return;
    if (lastSearchLocation.current === searchLocation) return; // Prevent duplicate searches

    lastSearchLocation.current = searchLocation;
    setIsLoading(true);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          searchLocation
        )}`,
        {
          signal: controller.signal,
          headers: { "User-Agent": "KaryaAdiGrafika/1.0" },
        }
      );
      const data = await res.json();

      if (data?.length > 0) {
        const { lat, lon } = data[0];
        const newLat = parseFloat(lat);
        const newLng = parseFloat(lon);
        setMarker({ lat: newLat, lng: newLng });
        reverseGeocode(newLat, newLng);
      }
    } catch (error: unknown) {
      if (error instanceof Error && error.name !== "AbortError") {
        console.error("Search location error:", error);
      }
    } finally {
      clearTimeout(timeoutId);
      setIsLoading(false);
    }
  }, [searchLocation, reverseGeocode]);

  // Effect untuk search - hanya trigger jika searchLocation berubah dan sudah initialized
  useEffect(() => {
    if (!isInitialized) return;
    if (!searchLocation || searchLocation.trim() === "") return;

    // Debounce search
    const timeoutId = setTimeout(() => {
      handleSearch();
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchLocation, isInitialized, handleSearch]);

  // Komponen untuk menangani klik peta
  const MapEvents = () => {
    useMapEvents({
      click(e) {
        if (!isInitialized) return; // Prevent clicks during initialization

        const { lat, lng } = e.latlng;
        setMarker({ lat, lng });
        reverseGeocode(lat, lng);
      },
    });
    return null;
  };

  return (
    <div className="relative">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100/50 z-10 transition-opacity duration-300">
          <Icon
            icon="mdi:loading"
            className="text-4xl text-green-700 animate-spin"
          />
        </div>
      )}
      <MapContainer
        center={[marker.lat, marker.lng] as LatLngExpression}
        zoom={13}
        className="h-64 lg:h-96 w-full rounded-lg z-0 transition-all duration-300"
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={[marker.lat, marker.lng] as LatLngExpression} />
        <MapEvents />
        <MapViewUpdater position={marker} />
      </MapContainer>
    </div>
  );
};

export default MapPicker;
