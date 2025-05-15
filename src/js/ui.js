import { Cartographic, Cartesian3, Math as CesiumMath } from 'cesium';

export function setupAlignButton(viewer) {
  const alignButton = document.getElementById('alignButton');
  const compassImage = alignButton.querySelector('img');

  alignButton.addEventListener('click', function() {
    compassImage.style.animation = 'none';
    compassImage.offsetHeight; // Trigger reflow
    compassImage.style.animation = null;
    compassImage.classList.add('rotating');
    alignCamera(viewer);
    setTimeout(() => {
      compassImage.classList.remove('rotating');
    }, 1000);
  });
  
}

function alignCamera(viewer) {
  const currentPosition = viewer.camera.position;
  const cartographic = Cartographic.fromCartesian(currentPosition);
  
  const longitude = CesiumMath.toDegrees(cartographic.longitude);
  const latitude = CesiumMath.toDegrees(cartographic.latitude);

  const newPosition = Cartesian3.fromDegrees(longitude, latitude, 3000);

  viewer.camera.flyTo({
    destination: newPosition,
    orientation: {
      heading: CesiumMath.toRadians(0.0),
      pitch: CesiumMath.toRadians(-90.0),
      roll: 0.0
    },
    duration: 1.5
  });
}
