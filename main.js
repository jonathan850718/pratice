require([
  "esri/config",
  "esri/Map",
  "esri/views/MapView",
  "esri/Graphic",
  "esri/layers/GraphicsLayer",
  "esri/views/layers/FeatureLayerView",
  "esri/widgets/Search",
  "esri/layers/RouteLayer",
  "esri/widgets/Directions",
  "esri/widgets/Print",
  "esri/WebMap",
  "esri/widgets/Expand",
], function (
  esriConfig,
  Map,
  MapView,
  Graphic,
  GraphicsLayer,
  FeatureLayerView,
  Search,
  RouteLayer,
  Directions,
  Print,
  WebMap,
  Expand
) {
  esriConfig.apiKey =
    "AAPK22fd93892d2a44eb883276b84dba43eeIyPfkyiUlLRLP0Zv-Drll77VW_DX1cSR6VGbCRngFukNTR0rBsn4SKMzAknDhFVa";

  const routeLayer = new RouteLayer({
    defaultSymbols: {
      directionLines: {
        type: "simple-line",
        color: [255, 255, 255],
        width: 5,
        cap: "round",
        join: "round",
        style: "dash",
      },
      directionPoints: {
        type: "simple-marker",
        size: 2,
      },
      routeInfo: {
        type: "simple-line",
        width: 1,
      },
    },
  }); //4.19版本沒辦法變更屬性4.26的才能變更

  const map = new Map({
    basemap: "arcgis-topographic", // Basemap layer
    ground: "world-elevation",
    layers: [routeLayer],
  });

  const view = new MapView({
    center: [120.651, 24.17],
    zoom: 13, // scale: 72223.819286
    container: "viewDiv",
    map: map,
    constraints: {
      snapToZoom: false,
    },
  });

  let directionsWidget = new Directions({
    unit: "miles",
    layer: routeLayer,
    view,
    Symbol,
  });

  //匯出pdf等檔案功能
  const print = new Print({
    view: view,
    printServiceUrl:
      "https://utility.arcgisonline.com/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task",
  });

  const searchWidget = new Search({
    view: view,
    allPlaceholder: "find",
  });
  view.ui.add(print, "top-left");

  //將兩個以上的功能進行縮放
  //這個是尋找最短路徑功能
  let expand1 = new Expand({
    view: view,
    content: directionsWidget,
    expandIconClass: "esri-icon-dashboard",
    group: "bottom-right",
    declaredClass: "試試看",
  });

  //這個是匯出功能
  let expand2 = new Expand({
    view: view,
    content: print,
    expandIconClass: "esri-icon-printer",
    group: "bottom-right",
  });

  // 這個是搜尋功能
  let expand3 = new Expand({
    view: view,
    content: searchWidget,
    expandIconClass: "esri-icon-search",
  });
  //  合併兩個功能
  view.ui.add([expand3, expand1, expand2], "top-right");

  //製作縮放視窗範例
  // layerListExpand = new Expand({
  //   expandIconClass:"esri-icon-layer-list",
  //   view:view,
  //   content:directionsWidget
  // });
  // view.ui.add(layerListExpand,"top-right")

  // 製作地圖搜尋視窗
  // const searchWidget = new Search({
  //     view:view
  // });
  // view.ui.add(searchWidget,{
  //     position:"top-right"
  // });

  // //製作線點面範例
  // const graphicsLayer = new GraphicsLayer();
  // map.add(graphicsLayer);

  // const polyline = {
  //     type :"polyline",
  //     paths:[
  //         [120.651,24.17],
  //         [120.51,23.1],
  //         [120.41,22.1]
  //     ]
  // };//定義線段
  // const simplelineSymbol = {
  //     type:"simple-line",
  //     color:[0,0,0],
  //     width:2
  // };//定義線段的顏色

  // //製作跳窗的視窗
  // const popupTemplate = {
  //     title:"{Name}",
  //     content:"{Description}"
  // }
  // const attributes = {
  //     name:"Graphic",
  //     Description:"我是線"
  // }

  // const polylineGraphic = new Graphic({
  //     geometry: polyline,
  //     symbol:simplelineSymbol,
  //     attributes:attributes,
  //     popupTemplate:popupTemplate

  // });

  // graphicsLayer.add(polylineGraphic);
});
