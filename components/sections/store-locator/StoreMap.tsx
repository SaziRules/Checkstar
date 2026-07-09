"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, ZoomControl, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { Store } from "@/types";

function makeIcon(active: boolean) {
  const size = active ? 38 : 28;
  const cls  = active ? "cs-marker-active" : "cs-marker";
  return L.divIcon({
    className: "",
    html: `<div class="${cls}" style="width:${size}px;height:${size}px"></div>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -(size / 2) - 4],
  });
}

function FlyToStore({ store }: { store: Store | null }) {
  const map = useMap();
  useEffect(() => {
    if (store?.coordinates) {
      map.flyTo([store.coordinates.lat, store.coordinates.lng], 15, { duration: 1 });
    }
  }, [store, map]);
  return null;
}

interface Props {
  stores: Store[];
  selected: Store | null;
  onSelect: (store: Store) => void;
}

export default function StoreMap({ stores, selected, onSelect }: Props) {
  const center: [number, number] = [-29.83, 31.005];

  return (
    <MapContainer
      center={center}
      zoom={11}
      style={{ height: "100%", width: "100%" }}
      zoomControl={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions" target="_blank">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        subdomains="abcd"
        maxZoom={19}
      />
      <ZoomControl position="bottomright" />
      <FlyToStore store={selected} />

      {stores.map((store) => {
        if (!store.coordinates) return null;
        return (
          <Marker
            key={store.id}
            position={[store.coordinates.lat, store.coordinates.lng]}
            icon={makeIcon(selected?.id === store.id)}
            eventHandlers={{ click: () => onSelect(store) }}
          >
            <Popup>
              <div style={{ fontFamily: "system-ui, sans-serif", minWidth: "190px", padding: "4px 2px" }}>
                <p style={{ fontWeight: 700, fontSize: "13px", marginBottom: "3px", color: "#111" }}>
                  {store.name}
                </p>
                <p style={{ fontSize: "12px", color: "#666", marginBottom: "6px", lineHeight: "1.4" }}>
                  {store.address}<br />{store.suburb}
                </p>
                <a
                  href={`tel:${store.phone}`}
                  style={{ fontSize: "12px", color: "#e75b13", fontWeight: 600 }}
                >
                  {store.phone}
                </a>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}
