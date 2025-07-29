import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MapPin } from 'lucide-react';

interface PropertyMapProps {
  coordinates: { lat: number; lng: number };
  address: string;
}

const PropertyMap = ({ coordinates, address }: PropertyMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState<string>(() => {
    return localStorage.getItem('mapbox_token') || '';
  });
  const [showTokenInput, setShowTokenInput] = useState(!mapboxToken);

  const handleSaveToken = () => {
    if (mapboxToken) {
      localStorage.setItem('mapbox_token', mapboxToken);
      setShowTokenInput(false);
      initializeMap();
    }
  };

  const initializeMap = () => {
    if (!mapContainer.current || !mapboxToken) return;

    mapboxgl.accessToken = mapboxToken;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [coordinates.lng, coordinates.lat],
      zoom: 15,
    });

    // Add marker for property location
    new mapboxgl.Marker({
      color: '#3B82F6'
    })
    .setLngLat([coordinates.lng, coordinates.lat])
    .setPopup(
      new mapboxgl.Popup({ offset: 25 }).setHTML(
        `<div class="p-2">
          <h3 class="font-semibold text-sm">${address}</h3>
          <p class="text-xs text-gray-600">Property Location</p>
        </div>`
      )
    )
    .addTo(map.current);

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
  };

  useEffect(() => {
    if (mapboxToken && !showTokenInput) {
      initializeMap();
    }

    return () => {
      map.current?.remove();
    };
  }, [mapboxToken, showTokenInput, coordinates]);

  if (showTokenInput) {
    return (
      <div className="h-48 bg-white/5 rounded-lg border border-white/20 flex flex-col items-center justify-center p-4">
        <MapPin className="h-8 w-8 text-gray-400 mb-3" />
        <p className="text-gray-400 text-sm mb-3 text-center">
          Enter your Mapbox public token to view the map
        </p>
        <div className="w-full max-w-xs space-y-2">
          <Input
            type="text"
            placeholder="pk.eyJ1..."
            value={mapboxToken}
            onChange={(e) => setMapboxToken(e.target.value)}
            className="bg-white/10 border-white/20 text-white"
          />
          <Button onClick={handleSaveToken} className="w-full" disabled={!mapboxToken}>
            Load Map
          </Button>
        </div>
        <p className="text-xs text-gray-500 mt-2 text-center">
          Get your token from{' '}
          <a href="https://mapbox.com/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
            mapbox.com
          </a>
        </p>
      </div>
    );
  }

  return (
    <div className="h-48 relative">
      <div ref={mapContainer} className="absolute inset-0 rounded-lg" />
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setShowTokenInput(true)}
        className="absolute top-2 left-2 bg-black/50 text-white hover:bg-black/70 text-xs"
      >
        Change Token
      </Button>
    </div>
  );
};

export default PropertyMap;