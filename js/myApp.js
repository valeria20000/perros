var app;

require([
  "esri/Map",

  "esri/views/MapView",
  "esri/Basemap",
  // TileLayers
  "esri/layers/TileLayer",
  "esri/layers/WMSLayer",
  //Print
  "esri/geometry/SpatialReference",
  "esri/geometry/Extent",
  
 
  "esri/widgets/Print",
  "esri/widgets/CoordinateConversion",
  // KMLLayer
  "esri/layers/KMLLayer",

 //Pintar en 2d
  "esri/widgets/DistanceMeasurement2D",
  "esri/widgets/AreaMeasurement2D",
 //Localizacion
  "esri/widgets/Locate",
  "esri/views/SceneView",
  //Coordenadas
  "esri/widgets/CoordinateConversion/support/Format",
  "esri/widgets/CoordinateConversion/support/Conversion",
  "esri/geometry/Point",
  "esri/geometry/support/webMercatorUtils",

  "esri/widgets/Search",
  "esri/widgets/BasemapGallery",
  "esri/core/watchUtils",
  // Calcite Maps
  "calcite-maps/calcitemaps-v0.8",
  // Calcite Maps ArcGIS Support
  "calcite-maps/calcitemaps-arcgis-support-v0.8",
  // Bootstrap
  "bootstrap/Collapse",
  "bootstrap/Dropdown",
  "bootstrap/Tab",
  // Can use @dojo shim for Array.from for IE11
  "@dojo/framework/shim/array"
], function( Map,  MapView, Basemap, TileLayer, WMSLayer, SpatialReference, Extent, Print,  CoordinateConversion,  KMLLayer, DistanceMeasurement2D, AreaMeasurement2D,  Locate, SceneView, Format, Conversion, Point,webMercatorUtils,   Search, Basemaps, watchUtils,
  CalciteMaps, CalciteMapsArcGIS) {
    

  /******************************************************************
   *
   * App settings
   *
   ******************************************************************/

  app = {
    center: [-2.9166700, 43.2500000],
    scale: 123456789,
    viewPadding: {
      top: 50,
      bottom: 0
    },
    uiComponents: ["zoom", "compass", "attribution"],
    mapView: null,
    sceneView: null,
    containerMap: "mapViewDiv",
    containerScene: "sceneViewDiv",
    activeView: null,
    searchWidget: null
  };

  /******************************************************************
   *
   * KMLLAYERS
   *
   ******************************************************************/

   //KML
  var kmls = [];
  kmls[0] = "http://apli.bizkaia.net/APPS/DANOK/GHCA/TRAMOS/RedVerde.kmz";
  kmls[1] = "http://apli.bizkaia.net/APPS/DANOK/GHCA/TRAMOS/RedNaranja.kmz";
  kmls[2] = "http://apli.bizkaia.net/APPS/DANOK/GHCA/TRAMOS/RedRoja.kmz";
  kmls[3] = "http://apli.bizkaia.net/APPS/DANOK/GHCA/TRAMOS/RedAmarilla.kmz";
  kmls[4] = "http://apli.bizkaia.net/APPS/DANOK/GHCA/TRAMOS/RedAzul.kmz";

  const layerKmlRojo = new KMLLayer({
    url: "http://apli.bizkaia.net/APPS/DANOK/GHCA/TRAMOS/RedRoja.kmz"
  });
  const layerKmlVerde = new KMLLayer({
    url: "http://apli.bizkaia.net/APPS/DANOK/GHCA/TRAMOS/RedVerde.kmz"
  });
  const layerKmlNaranja =  new KMLLayer({
    url: "http://apli.bizkaia.net/APPS/DANOK/GHCA/TRAMOS/RedNaranja.kmz"
  });
  const layerKmlAzul = new KMLLayer({
    url: "http://apli.bizkaia.net/APPS/DANOK/GHCA/TRAMOS/RedAzul.kmz"
  });
  const layerKmlAmarilla = new KMLLayer({
    url: "http://apli.bizkaia.net/APPS/DANOK/GHCA/TRAMOS/RedAmarilla.kmz"
  });
  // CIERRE KML
  

  const layerTouristInfo = new WMSLayer("http://www.geobilbao.eus/WMS_Turismo/wmservice.aspx?request=getCapabilities&service=wms");

  //ORTOFOTOS
  var ortofotos = [];
  ortofotos[0]  = "http://arcgis.bizkaia.net/arcgis/rest/services/ORTOFOTOS/GOBIERNO_VASCO_1945/MapServer";
  ortofotos[1]  = "http://arcgis.bizkaia.net/arcgis/rest/services/ORTOFOTOS/GOBIERNO_VASCO_1956/MapServer";
  ortofotos[2]  = "http://arcgis.bizkaia.net/arcgis/rest/services/ORTOFOTOS/GOBIERNO_VASCO_1977/MapServer";
  ortofotos[3]  = "http://arcgis.bizkaia.net/arcgis/rest/services/ORTOFOTOS/GOBIERNO_VASCO_1984/MapServer";
  ortofotos[4]  = "http://arcgis.bizkaia.net/arcgis/rest/services/ORTOFOTOS/GOBIERNO_VASCO_1990/MapServer";
  ortofotos[5]  = "http://arcgis.bizkaia.net/arcgis/rest/services/ORTOFOTOS/GOBIERNO_VASCO_2001/MapServer";
  ortofotos[6]  = "http://arcgis.bizkaia.net/arcgis/rest/services/ORTOFOTOS/GOBIERNO_VASCO_2002/MapServer";
  ortofotos[7]  = "http://arcgis.bizkaia.net/arcgis/rest/services/ORTOFOTOS/GOBIERNO_VASCO_2004/MapServer";
  ortofotos[8]  = "http://arcgis.bizkaia.net/arcgis/rest/services/ORTOFOTOS/GOBIERNO_VASCO_2005/MapServer";
  ortofotos[9]  = "http://arcgis.bizkaia.net/arcgis/rest/services/ORTOFOTOS/GOBIERNO_VASCO_2006/MapServer";
  ortofotos[10]  = "http://arcgis.bizkaia.net/arcgis/rest/services/ORTOFOTOS/GOBIERNO_VASCO_2007/MapServer";
  ortofotos[11]  = "http://arcgis.bizkaia.net/arcgis/rest/services/ORTOFOTOS/GOBIERNO_VASCO_2008/MapServer";
  ortofotos[12]  = "http://arcgis.bizkaia.net/arcgis/rest/services/ORTOFOTOS/GOBIERNO_VASCO_2009/MapServer";
  ortofotos[13]  = "http://arcgis.bizkaia.net/arcgis/rest/services/ORTOFOTOS/GOBIERNO_VASCO_2010/MapServer";
  ortofotos[14]  = "http://arcgis.bizkaia.net/arcgis/rest/services/ORTOFOTOS/GOBIERNO_VASCO_2011/MapServer";
  ortofotos[15]  = "http://arcgis.bizkaia.net/arcgis/rest/services/ORTOFOTOS/GOBIERNO_VASCO_2012/MapServer";
  ortofotos[16]  = "http://arcgis.bizkaia.net/arcgis/rest/services/ORTOFOTOS/GOBIERNO_VASCO_2013_AMPLIADO/MapServer";
  ortofotos[17]  = "http://arcgis.bizkaia.net/arcgis/rest/services/ORTOFOTOS/GOBIERNO_VASCO_2014_AMPLIADO/MapServer";
  ortofotos[18]  = "http://arcgis.bizkaia.net/arcgis/rest/services/ORTOFOTOS/GOBIERNO_VASCO_2015_AMPLIADO/MapServer";
  ortofotos[19]  = "http://arcgis.bizkaia.net/arcgis/rest/services/ORTOFOTOS/GOBIERNO_VASCO_2016_AMPLIADO/MapServer";
  ortofotos[20]  = "http://arcgis.bizkaia.net/arcgis/rest/services/ORTOFOTOS/GOBIERNO_VASCO_2017_AMPLIADO/MapServer";

  selectOrtofotos = function selectOrtofotos(option){
    let basemapOrtofoto = new Basemap();
    if(option){
      basemapOrtofoto.baseLayers = [new TileLayer(ortofotos[option])];
    }else{
      basemapOrtofoto.baseLayers = [new TileLayer(ortofotos[21])];
    }

    map.basemap = basemapOrtofoto;
  }

  let basemapOrtofoto = new Basemap({
    baseLayers: [
      new TileLayer("http://arcgis.bizkaia.net/arcgis/rest/services/ORTOFOTOS/GOBIERNO_VASCO_2017_AMPLIADO/MapServer")
    ]
  });
    // CIERRE ORTOFOTOS




  var activeWidget = null;
 
  // Map
  const map = new Map({
    basemap: basemapOrtofoto,
    layers: [layerKmlRojo, layerKmlAzul, layerKmlVerde, layerKmlNaranja, layerKmlAmarilla]
  });
  

  // 2D view
  app.mapView = new MapView({
    container: app.containerMap,
    map: map,
    center: [-98.5795, 39.8282],
    scale: 1011893.9132160028,
    zoom: 9,
    center: app.center,
    scale: app.scale,
    padding: app.viewPadding,
    ui: {
      components: app.uiComponents
    }
  });

  app.mapView.extent = new Extent({
    xmin: 451503.83999999985,
    ymin: 4731578.84,
    xmax: 558596.1600000001,
    ymax: 4838671.16,
    spatialReference: new SpatialReference({wkid:25830}),
  });


  //Imprimir
  app.mapView.when(function(){
    var print = new Print({
      view: app.mapView,
      printServiceUrl:"https://utility.arcgisonline.com/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task"
    });
    app.mapView.ui.add(print, "top-right")
  })

  //Coordenadas
  const ccWidget = new CoordinateConversion({
  view: app.mapView
  });

  app.mapView.ui.add(ccWidget, "bottom-left");

  //Localizacion

  const locateBtn = new Locate({
    view: app.mapView
    
  });

  app.mapView.ui.add(locateBtn,{
    position: "top-left"

  });

  //Barra Herramientas

  app.mapView.ui.add("topbar", "top-right");
  
  document.getElementById("distanceButton").addEventListener("click",
  function () {
    setActiveWidget(null);
    if (!this.classList.contains('active')) {
      setActiveWidget('distance');
    } else {
      setActiveButton(null);
    }
  });

document.getElementById("areaButton").addEventListener("click",
  function () {
    setActiveWidget(null);
    if (!this.classList.contains('active')) {
      setActiveWidget('area');
    } else {
      setActiveButton(null);
    }
  });

function setActiveWidget(type) {
  switch (type) {
    case "distance":
      activeWidget = new DistanceMeasurement2D({
        view: app.mapView
      });

      // skip the initial 'new measurement' button
      activeWidget.viewModel.newMeasurement();

      app.mapView.ui.add(activeWidget, "top-right");
      setActiveButton(document.getElementById('distanceButton'));
      break;
    case "area":
      activeWidget = new AreaMeasurement2D({
        view: app.mapView
      });

      // skip the initial 'new measurement' button
      activeWidget.viewModel.newMeasurement();

      app.mapView.ui.add(activeWidget, "top-right");
      setActiveButton(document.getElementById('areaButton'));
      break;

    case null:
      if (activeWidget) {
        app.mapView.ui.remove(activeWidget);
        activeWidget.destroy();
        activeWidget = null;
      }
      break;
  }
}

function setActiveButton(selectedButton) {
  // focus the view to activate keyboard shortcuts for sketching
  app.mapView.focus();
  var elements = document.getElementsByClassName("active");
  for (var i = 0; i < elements.length; i++) {
    elements[i].classList.remove("active");
  }
  if (selectedButton) {
    selectedButton.classList.add("active");
  } 
}
CalciteMapsArcGIS.setPopupPanelSync(app.mapView);
 

  // 3D view
  app.sceneView = new SceneView({
    container: app.containerScene,
    map: map,
    clippingArea:{
      xmin: -124.45,
      xmax: -119.99,
      ymax: 43.01,
      ymin: 39.59
    },
    center: {
      x: -2.9166700,
      y: 43.2500000
    },
    zoom: 10,
    scale: app.scale,
    padding: app.viewPadding,
    ui: {
      components: app.uiComponents
    }
  });
  //Imprimir
   // the button that triggers area selection mode
   const screenshotBtn = document.getElementById("screenshotBtn");

   // the orange mask used to select the area
   const maskDiv = document.getElementById("maskDiv");

   // element where we display the print preview
   const screenshotDiv = document.getElementById("screenshotDiv");

   // replace the navigation elements with screenshot area selection button
   app.sceneView.ui.empty("top-left");
   app.sceneView.ui.add(screenshotBtn, "top-left");

   // add an event listener to trigger the area selection mode
   screenshotBtn.addEventListener("click", function() {

     screenshotBtn.classList.add("active");
     app.sceneView.container.classList.add("screenshotCursor");
     let area = null;

     // listen for drag events and compute the selected area
     const dragHandler = app.sceneView.on("drag", function(event) {

       // prevent navigation in the view
       event.stopPropagation();

       // when the user starts dragging or is dragging
       if (event.action !== "end") {
         // calculate the extent of the area selected by dragging the cursor
         const xmin = clamp(Math.min(event.origin.x, event.x), 0, app.sceneView.width);
         const xmax = clamp(Math.max(event.origin.x, event.x), 0, app.sceneView.width);
         const ymin = clamp(Math.min(event.origin.y, event.y), 0, app.sceneView.height);
         const ymax = clamp(Math.max(event.origin.y, event.y), 0, app.sceneView.height);
         area = {
             x: xmin,
             y: ymin,
             width: xmax - xmin,
             height: ymax - ymin
         };
         // set the position of the div element that marks the selected area
         setMaskPosition(area);
       }
       // when the user stops dragging
       else {
         // remove the drag event listener from the SceneView
         dragHandler.remove();
         // the screenshot of the selected area is taken
         app.sceneView.takeScreenshot({ area: area, format: "png" })
           .then(function(screenshot) {

             // display a preview of the image
             showPreview(screenshot);

             // create the image for download
             document.getElementById("downloadBtn").onclick = function() {

               const text = document.getElementById("textInput").value;
               // if a text exists, then add it to the image
               if (text) {
                 const dataUrl = getImageWithText(screenshot, text);
                 downloadImage(app.sceneView + ".png", dataUrl);
               }
               // otherwise download only the webscene screenshot
               else {
                 downloadImage(app.sceneView+ ".png", screenshot.dataUrl);
               }
             }

             // the screenshot mode is disabled
             screenshotBtn.classList.remove("active");
             view.container.classList.remove("screenshotCursor");
             setMaskPosition(null);
           });
       }
     });

     function setMaskPosition(area) {
       if (area) {
         maskDiv.classList.remove("hide");
         maskDiv.style.left = area.x + "px";
         maskDiv.style.top = area.y + "px";
         maskDiv.style.width = area.width + "px";
         maskDiv.style.height = area.height + "px";
       }
       else {
         maskDiv.classList.add("hide");
       }
     }

     function clamp(value, from, to) {
       return value < from ? from : value > to ? to : value;
     }

   });

   // creates an image that will be appended to the DOM
   // so that users can have a preview of what they will download
   function showPreview(screenshot) {
     screenshotDiv.classList.remove("hide");
     // add the screenshot dataUrl as the src of an image element
     const screenshotImage = document.getElementsByClassName("js-screenshot-image")[0];
     screenshotImage.width = screenshot.data.width;
     screenshotImage.height = screenshot.data.height;
     screenshotImage.src =  screenshot.dataUrl;
   }

   // returns a new image created by adding a custom text to the webscene image
   function getImageWithText(screenshot, text) {

     const imageData = screenshot.data;

     // to add the text to the screenshot we create a new canvas element
     const canvas = document.createElement("canvas");
     const context = canvas.getContext("2d");
     canvas.height = imageData.height;
     canvas.width = imageData.width;

     // add the screenshot data to the canvas
     context.putImageData(imageData, 0, 0);
     context.font = "20px Arial";
     context.fillStyle="#000";
     context.fillRect(0, imageData.height - 40, context.measureText(text).width + 20, 30);

     // add the text from the textInput element
     context.fillStyle="#fff";
     context.fillText(text, 10, imageData.height - 20);

     return canvas.toDataURL();
   }

   function downloadImage(filename, dataUrl) {

     // the download is handled differently in Microsoft browsers
     // because the download attribute for <a> elements is not supported
     if (!window.navigator.msSaveOrOpenBlob) {

       // in browsers that support the download attribute
       // a link is created and a programmatic click will trigger the download
       const element = document.createElement("a");
       element.setAttribute("href", dataUrl);
       element.setAttribute("download", filename);
       element.style.display = "none";
       document.body.appendChild(element);
       element.click();
       document.body.removeChild(element);
     }
     else {
       // for MS browsers convert dataUrl to Blob
       const byteString = atob(dataUrl.split(",")[1]);
       const mimeString = dataUrl.split(",")[0].split(":")[1].split(";")[0]
       const ab = new ArrayBuffer(byteString.length);
       const ia = new Uint8Array(ab);
       for (let i = 0; i < byteString.length; i++) {
           ia[i] = byteString.charCodeAt(i);
       }
       const blob = new Blob([ab], {type: mimeString});

       // download file
       window.navigator.msSaveOrOpenBlob(blob, filename);
     }

   }
   // button to hide the print preview html element
   document.getElementById("closeBtn").addEventListener("click", function() {
     screenshotDiv.classList.add("hide");
   });  
  CalciteMapsArcGIS.setPopupPanelSync(app.sceneView);

 

  // Set the active view to scene
  setActiveView(app.mapView);

  // Create the search widget and add it to the navbar instead of view
  app.searchWidget = new Search({
    view: app.activeView
  }, "searchWidgetDiv");

  CalciteMapsArcGIS.setSearchExpandEvents(app.searchWidget);

  // Create basemap widget
  app.basemapWidget = new Basemaps({
    view: app.activeView,
    container: "basemapPanelDiv"
  });

  /******************************************************************
   *
   * Synchronize the view, search and popup
   *
   ******************************************************************/
  // Views
  function setActiveView(view) {
    app.activeView = view;
  }

  function syncViews(fromView, toView) {
    const viewPt = fromView.viewpoint.clone();
    fromView.container = null;
    if (fromView.type === "3d") {
      toView.container = app.containerMap;
    } else {
      toView.container = app.containerScene;
    }
    toView.padding = app.viewPadding;
    toView.viewpoint = viewPt;
  }

  // Search Widget
  function syncSearch(view) {
    watchUtils.whenTrueOnce(view, "ready", function() {
      app.searchWidget.view = view;
      if (app.searchWidget.selectedResult) {
        app.searchWidget.search(app.searchWidget.selectedResult.name)
      }
    });
  }

  // Tab - toggle between map and scene view
  const tabs = Array.from(document.querySelectorAll(
    ".calcite-navbar li a[data-toggle='tab']"));
  tabs.forEach(function(tab) {
    tab.addEventListener("click", function(event) {
      if (event.target.text.indexOf("2D") > -1) {
        map.layers = [layerKmlRojo, layerKmlAzul, layerKmlVerde,layerKmlNaranja, layerKmlAmarilla];
        syncViews(app.sceneView, app.mapView);
        setActiveView(app.mapView);
      } else {
       // map.layers = [transportationLayer];
        syncViews(app.mapView, app.sceneView);
        setActiveView(app.sceneView);
      }
      syncSearch(app.activeView);
    });
  });

  /******************************************************************
   *
   * Apply Calcite Maps CSS classes to change application on the fly
   *
   * For more information about the CSS styles or Sass build visit:
   * http://github.com/esri/calcite-maps
   *
   ******************************************************************/

  const cssSelectorUi = [document.querySelector(".calcite-navbar"),
    document.querySelector(".calcite-panels")
  ];
  const cssSelectorMap = document.querySelector(".calcite-map");



  // Widgets - light (default) or dark theme
  const settingsWidgets = document.getElementById("settingsWidgets");
  settingsWidgets.addEventListener("change", function(event) {
    const theme = event.target.value;
    cssSelectorMap.classList.remove("calcite-widgets-dark",
      "calcite-widgets-light");
    cssSelectorMap.classList.add(theme);
  });

  const opcionCambiarBaseMap = document.getElementById("anadirInfoTurist");
  opcionCambiarBaseMap.addEventListener("click", function(){
    app.mapView.map.layers.add(layerTouristInfo);
  })


  // Layout - top or bottom nav position
  const settingsLayout = document.getElementById("settingsLayout");
  settingsLayout.addEventListener("change", function(event) {
    const layout = event.target.value;
    const layoutNav = event.target.options[event.target.selectedIndex]
      .dataset.nav;

    document.body.classList.remove("calcite-nav-bottom",
      "calcite-nav-top");
    document.body.classList.add(layout);

    const nav = document.querySelector("nav");
    nav.classList.remove("navbar-fixed-bottom", "navbar-fixed-top");
    nav.classList.add(layoutNav);
    setViewPadding(layout);
  });

  // Set view padding for widgets based on navbar position
  function setViewPadding(layout) {
    let padding, uiPadding;
    // Top
    if (layout === "calcite-nav-top") {
      padding = {
        padding: {
          top: 50,
          bottom: 0
        }
      };
      uiPadding = {
        padding: {
          top: 15,
          right: 15,
          bottom: 30,
          left: 15
        }
      };
    } else { // Bottom
      padding = {
        padding: {
          top: 0,
          bottom: 50
        }
      };
      uiPadding = {
        padding: {
          top: 30,
          right: 15,
          bottom: 15,
          left: 15
        }
      };
    }
    app.mapView.set(padding);
    app.mapView.ui.set(uiPadding);
    app.sceneView.set(padding);
    app.sceneView.ui.set(uiPadding);
    // Reset popup
    if (app.activeView.popup.visible && app.activeView.popup.dockEnabled) {
      app.activeView.popup.visible = false;
      app.activeView.popup.visible = true;
    }
  }

});