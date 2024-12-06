var popupContainer = document.getElementById('popup')
var popupContent = document.getElementById('popup-content')
var popupCloser = document.getElementById('popup-closer')

var popupOverlay = new ol.Overlay({
    element: popupContainer,
    autoPan: true,
    autoPanAnimation: {
        duration: 250
    }
});

map.addOverlay(popupOverlay)

/**
 * Add a click handler to hide the popup.
 * @return {boolean} Don't follow the href.
 */
popupCloser.onclick = function() {
    popupOverlay.setPosition(undefined);
    popupCloser.blur();
    return false;
};
