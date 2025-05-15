import { CESIUM_BASE_URL } from './constants';
import { initializeViewer } from './viewer';
import { setupLayers } from './layers';
import { setupCamera } from './camera';
import { setupAlignButton } from './ui';
import "cesium/Build/Cesium/Widgets/widgets.css";

window.CESIUM_BASE_URL = CESIUM_BASE_URL;

async function main() {
  const viewer = await initializeViewer();
  await setupLayers(viewer);
  setupCamera(viewer);
  setupAlignButton(viewer);
}

main();
