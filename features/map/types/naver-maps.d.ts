declare namespace naver.maps {
  interface LatLng {
    lat(): number;
    lng(): number;
    x: number;
    y: number;
    _lat: number;
    _lng: number;
  }

  interface MapOptions {
    center: LatLng;
    zoom: number;
    draggable?: boolean;
    pinchZoom?: boolean;
    scrollWheel?: boolean;
    keyboardShortcuts?: boolean;
    disableKineticPan?: boolean;
    scaleControl?: boolean;
    logoControl?: boolean;
    mapDataControl?: boolean;
    zoomControl?: boolean;
    mapTypeControl?: boolean;
  }

  interface Map {
    setOptions(options: Partial<MapOptions>): void;
    setSize(size: Size): void;
    setCenter(latLng: LatLng): void;
    setZoom(level: number, useEffect?: boolean): void;
    panTo(latLng: LatLng, options?: any): void;
    panBy(x: number, y: number): void;
    getCenter(): LatLng;
    getZoom(): number;
    getBounds(): Bounds;
  }

  interface MarkerOptions {
    position: LatLng;
    map: Map;
    icon?: string | ImageIcon;
    title?: string;
    draggable?: boolean;
    clickable?: boolean;
    visible?: boolean;
    zIndex?: number;
  }

  interface Marker {
    setMap(map: Map | null): void;
    setPosition(position: LatLng): void;
    setVisible(visible: boolean): void;
    getPosition(): LatLng;
    getMap(): Map | null;
  }

  interface InfoWindowOptions {
    content: string;
    position?: LatLng;
    maxWidth?: number;
    backgroundColor?: string;
    borderColor?: string;
    borderWidth?: number;
    disableAnchor?: boolean;
    pixelOffset?: Point;
  }

  interface InfoWindow {
    open(map: Map, marker?: Marker): void;
    close(): void;
    setContent(content: string): void;
    setPosition(position: LatLng): void;
    getPosition(): LatLng;
    getMap(): Map | null;
  }

  interface Size {
    width: number;
    height: number;
  }

  interface Point {
    x: number;
    y: number;
  }

  interface Bounds {
    getNorthEast(): LatLng;
    getSouthWest(): LatLng;
  }

  interface ImageIcon {
    url: string;
    size?: Size;
    scaledSize?: Size;
    origin?: Point;
    anchor?: Point;
  }

  // 생성자 인터페이스
  interface MapConstructor {
    new (element: HTMLElement, options: MapOptions): Map;
  }

  interface LatLngConstructor {
    new (lat: number, lng: number): LatLng;
  }

  interface MarkerConstructor {
    new (options: MarkerOptions): Marker;
  }

  interface InfoWindowConstructor {
    new (options: InfoWindowOptions): InfoWindow;
  }

  interface SizeConstructor {
    new (width: number, height: number): Size;
  }

  interface PointConstructor {
    new (x: number, y: number): Point;
  }
}

declare global {
  interface Window {
    naver: {
      maps: {
        Map: naver.maps.MapConstructor;
        LatLng: naver.maps.LatLngConstructor;
        Marker: naver.maps.MarkerConstructor;
        InfoWindow: naver.maps.InfoWindowConstructor;
        Size: naver.maps.SizeConstructor;
        Point: naver.maps.PointConstructor;
      };
    };
  }
}
