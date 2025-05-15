import { Cartesian3, Math as CesiumMath } from 'cesium';
import { UTRECHT_COORDINATES } from './constants';

export function setupCamera(viewer) {
  const [longitude, latitude, height] = UTRECHT_COORDINATES;
  const utrecht = Cartesian3.fromDegrees(longitude, latitude, height);

  viewer.camera.flyTo({
    destination: utrecht,
    orientation: {
      heading: CesiumMath.toRadians(0.0),
      pitch: CesiumMath.toRadians(-60.0),
      roll: 0.0
    }
  });
}
