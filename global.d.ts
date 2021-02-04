// 声明process对象
// declare const process: any;
// 天地图全局对象
interface TMapOption {
  center: [number, number];
  zoom?: number;
  minZoom?: number;
  maxZoom?: number;
  maxBounds?: [number, number];
  projection?: 'EPSG:900913' | 'EPSG:4326';
}

interface LngLatType {
  lng: number;
  lat: number;
}

interface InfoWindowProps {
  autoPan: boolean;
  closeOnClick: boolean;
}

declare namespace T {
  class Map {
    constructor(dom: HTMLElement | string, option?: TMapOption): any;
  }

  class Marker {
    constructor(LngLat: LngLatType): any;
  }

  class LngLat {
    constructor([number, number]): LngLatType;
  }

  class InfoWindow {
    constructor(InfoWindow: InfoWindowProps): any;
  }
}

// map实例
interface TMap_getCenter {
  (any): LngLatType;
}

interface TMap {
  getCenter: TMap_getCenter;
}

export default T;
export { T, TMap };
