import { Viewer, CesiumTerrainProvider, SunLight } from 'cesium';
import { PDOK_DTM_URL } from './constants';

export async function initializeViewer() {
  const viewer = new Viewer('cesiumContainer', {
    terrainProvider: await CesiumTerrainProvider.fromUrl(PDOK_DTM_URL),
    shadows: true,
    infoBox: false,
    baseLayerPicker: false,
    shouldAnimate: true,
    creditContainer: document.createElement("Kadaster")
  });

  configureAtmosphere(viewer);

  return viewer;
}

function configureAtmosphere(viewer) {
  viewer.scene.globe.enableLighting = true;
  viewer.scene.skyAtmosphere.hueShift = 0.0002;
  viewer.scene.light = new SunLight();
  viewer.scene.light.intensity = 0.7;
  viewer.scene.skyAtmosphere.show = true;
  viewer.scene.skyBox.show = true;
  viewer.clock.shouldAnimate = true;
}
