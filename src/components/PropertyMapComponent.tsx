import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import 'mapbox-gl/dist/mapbox-gl.css';

interface PropertyMapProps {
  address: string;
  onLocationChange?: (coordinates: [number, number], address: string) => void;
}

export const PropertyMapComponent: React.FC<PropertyMapProps> = ({ address, onLocationChange }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const marker = useRef<mapboxgl.Marker | null>(null);
  const [mapboxToken, setMapboxToken] = useState('');
  const [coordinates, setCoordinates] = useState<[number, number]>([90.4125, 23.8103]); // Default to Dhaka, Bangladesh

  useEffect(() => {
    if (!mapContainer.current || !mapboxToken) return;

    // Initialize map
    mapboxgl.accessToken = mapboxToken;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/satellite-streets-v12',
      center: coordinates,
      zoom: 15,
    });

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    // Create draggable marker
    marker.current = new mapboxgl.Marker({
      draggable: true,
      color: '#3b82f6'
    })
      .setLngLat(coordinates)
      .addTo(map.current);

    // Handle marker drag
    marker.current.on('dragend', () => {
      if (marker.current) {
        const lngLat = marker.current.getLngLat();
        const newCoords: [number, number] = [lngLat.lng, lngLat.lat];
        setCoordinates(newCoords);
        onLocationChange?.(newCoords, address);
      }
    });

    // Cleanup
    return () => {
      map.current?.remove();
    };
  }, [mapboxToken]);

  // Geocode address when it changes
  useEffect(() => {
    if (!address || !mapboxToken) return;

    const geocodeAddress = async () => {
      try {
        const response = await fetch(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${mapboxToken}&country=BD&limit=1`
        );
        const data = await response.json();

        if (data.features && data.features.length > 0) {
          const [lng, lat] = data.features[0].center;
          const newCoords: [number, number] = [lng, lat];
          
          setCoordinates(newCoords);
          
          if (map.current && marker.current) {
            map.current.flyTo({ center: newCoords, zoom: 16 });
            marker.current.setLngLat(newCoords);
          }
          
          onLocationChange?.(newCoords, address);
        }
      } catch (error) {
        console.error('Geocoding error:', error);
      }
    };

    geocodeAddress();
  }, [address, mapboxToken, onLocationChange]);

  const handleTokenSubmit = () => {
    if (mapboxToken.trim()) {
      // Token will be used in the next useEffect
    }
  };

  if (!mapboxToken) {
    return (
      <Card className="bg-white/5 border border-white/20">
        <CardHeader>
          <CardTitle className="text-white">Mapbox Configuration</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label className="text-white">
              Enter your Mapbox Public Token to enable the interactive map
            </Label>
            <p className="text-sm text-gray-400 mb-3">
              Get your token from{' '}
              <a 
                href="https://mapbox.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline"
              >
                mapbox.com
              </a>
              {' '}(free account required)
            </p>
            <div className="flex space-x-2">
              <Input
                type="password"
                placeholder="pk.eyJ1IjoieW91cnVzZXJuYW1lIi..."
                value={mapboxToken}
                onChange={(e) => setMapboxToken(e.target.value)}
                className="bg-white/5 border-white/20 text-white flex-1"
              />
              <Button onClick={handleTokenSubmit} disabled={!mapboxToken.trim()}>
                Load Map
              </Button>
            </div>
          </div>
          <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-3">
            <p className="text-sm text-yellow-300">
              <strong>Note:</strong> Since this project has Supabase enabled, you should add your Mapbox token 
              to the Supabase Edge Function Secrets for production use. This input is for testing purposes.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div 
        ref={mapContainer} 
        className="h-64 bg-white/5 rounded-lg border border-white/20"
        style={{ minHeight: '300px' }}
      />
      <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-3">
        <p className="text-sm text-blue-300">
          <strong>Tip:</strong> Drag the blue pin to adjust the exact location of your property.
          The map will automatically center on the address you entered above.
        </p>
      </div>
      {coordinates && (
        <div className="text-sm text-gray-400">
          Coordinates: {coordinates[1].toFixed(6)}, {coordinates[0].toFixed(6)}
        </div>
      )}
    </div>
  );
};