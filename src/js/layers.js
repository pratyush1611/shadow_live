import { WebMapTileServiceImageryProvider, Credit, Cesium3DTileset, Cesium3DTileStyle, 
    Cesium3DTileColorBlendMode, ShadowMode
 } from 'cesium';
import { BRT_WMTS_URL, KADASTER_WMTS_URL, BRT_LAYER_NAME, BUILDING_TILESET } from './constants';

export async function setupLayers(viewer) {
  viewer.imageryLayers.removeAll();

  const brt_wmts = createImageryProvider(BRT_WMTS_URL, BRT_LAYER_NAME);
  viewer.imageryLayers.addImageryProvider(brt_wmts);

  const kadaster_wmts = createImageryProvider(KADASTER_WMTS_URL, 'Kadastralekaart');
  viewer.imageryLayers.addImageryProvider(kadaster_wmts);



    const tileset = await add3DBuildings(BUILDING_TILESET);

  viewer.scene.primitives.add(tileset);
}

function createImageryProvider(url, layer) {
  return new WebMapTileServiceImageryProvider({
    url,
    layer,
    style: 'default',
    format: 'image/png',
    tileMatrixSetID: 'EPSG:3857',
    maximumLevel: 19,
    credit: new Credit('Kadaster')
  });
}

async function add3DBuildings(url) {
    const tileset = await Cesium3DTileset.fromUrl(url);

    // Apply a style to make the buildings white
    tileset.style = new Cesium3DTileStyle({
        color: {
            conditions: [
                ['true', 'color("#ffffff")']
            ]
        }
    });

    tileset.shadows = ShadowMode.ENABLED; 

    // Adjust lighting to reduce unwanted reflection and make buildings matte
    tileset.luminanceAtZenith = 0.4; // Adjust brightness for a better look

    // Disable feature colors and enforce tile-level color blending
    tileset.colorBlendMode = Cesium3DTileColorBlendMode.REPLACE;

    // Adjust screen space error for performance
    tileset.maximumScreenSpaceError = 8;

    return tileset;
}