//docShui= open(shuiFlie);
// Remember current unit settings and then set units to
// the value expected by this script
var originalUnit = preferences.rulerUnits
preferences.rulerUnits = Units.CM
//The new color profile or mode for a document, specified in
// Create a new 2x4 inch document and assign it to a variable
//var docRef = app.documents.add( 2, 4 )
var docRef = activeDocument
docRef.changeMode(ChangeMode.RGB)
var white = new SolidColor();
white.rgb["hexValue"] = 'ffffff'
var black = new SolidColor();
black.rgb["hexValue"] = '000000'
docRef.foregroundColor =black;
docRef.backgroundColor = white
var filename = activeDocument.name
filename=filename.substring(0,filename.lastIndexOf("."))
var height = docRef.height
var width = docRef.width
var mod = docRef.mode
var originalResolution = docRef.resolution
var resolution = 254
var stroke = 0.3
//text size
var size = 10
//Changes the color profile of the document.
//Changes the size of the image.
docRef.resizeImage(width, height, resolution) 
width = parseFloat(width)
height = parseFloat(height)
// Create a new art layer containing text
var artLayerRef = docRef.artLayers.add()
artLayerRef.kind = LayerKind.TEXT
// Set the contents of the text layer.
var textItemRef = artLayerRef.textItem
//textItemRef.warpVerticalDistortion =  
//textItemRef.warpHorizontalDistortion = 0
var myLayer = app.activeDocument.layers[0];
var myFont = app.fonts.getByName(myLayer.textItem.font).name;
//var myFont = app.fonts.getByName("SIMSUN")
textItemRef.font = myFont
textItemRef.size = size
textItemRef.font = 0
textItemRef.color = foregroundColor
textItemRef.position = Array(0,0)
textItemRef.contents = filename
if (height < width && width< 13.00) {
    isCanvas(width, height, stroke, textItemRef, artLayerRef)
}
else if (width < height && 13.00 < height && height < 18.00) {
    isCanvas(width, height, stroke, textItemRef, artLayerRef)
}
else {
    anchor = AnchorPosition.TOPRIGHT
    docRef.resizeCanvas(width, height+stroke, anchor) 
    textItemRef.direction = Direction.HORIZONTAL
    artLayerRef.translate(0, docRef.height);
}
function isCanvas(width, height, stroke, textItemRef, artLayerRef)
{
    anchor = AnchorPosition.MIDDLELEFT
    docRef.resizeCanvas(width+stoke, height, anchor) 
    textItemRef.direction = Direction.VERTICAL
    artLayerRef.translate(docRef.width-0.1, 0);
} 
artLayerRef.merge()
docRef.save();
docRef.close();
// Release references
docRef = null
artLayerRef = null
textItemRef = null
// Restore original ruler unit setting
app.preferences.rulerUnits = originalUnit
