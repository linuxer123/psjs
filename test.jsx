var originalUnit = preferences.rulerUnits;
var color = SolidColor;
var angle = 90;
var resolution = 254;
var width = 12.7 ;
var height = 8.9;
var num = 0;
var docName = "myDcoument" + num;
app.preferences.rulerUnits = Units.CM;
color.rgb.hexValue = '000000';
app.foregroundColor = color;
color.rgb.hexValue = 'ffffff';
app.backgroundColor = color;
while(app.documents.length !== 0) {
    var lastRef = activeDocument;
    var n = app.documents.length;
    var firstRef = app.documents[0];
    init(lastRef); 
    addText(lastRef);
    duplicateLayer(lastRef);
    /*
    if ((docs-1) !== 0) {
    }
    //
    break;
    break;
    //app.documents.add(width, height, resolution, "myDocumnet", NewDocumentMode.RGB)
    num++;
    docRef.selection.deselect();
    var height = docRef.height
    var width = docRef.width
//    var absFile = docRef.fullName.toString();
    var p = docRef.path.toString();
    var n = docRef.name.toString();
    p = p.replace(/^\/(\w)/, "$1:");
    p = p.replace(/\//g, "\\\\");
    */
    docRef = null;
}
// ¸´ÖÆÍ¼²ã
function duplicateLayer(docRef)
{
    var selRegion = Array(Array(0,0),
                        Array(docRef.width.value, 0),
                        Array(docRef.width.value, docRef.height.value/2),
                        Array(0, docRef.height.value/2),
                        Array(0,0));
    
    // Create the selection
    // docRef.selection.select(selRegion);
    docRef.selection.selectAll();
    docRef.selection.copy();
    if (app.activeDocument === lastRef) {
        docRef.selection.fill(app.backgroundColor); 
        docRef.paste();
        if (n>=2) {
            app.activeDocument = firstRef;
            init(firstRef); 
            addText(firstRef);
            duplicateLayer(firstRef);
        } else {
             canvas(activeDocument, activeDocument.width*2, activeDocument.height, AnchorPosition.MIDDLELEFT);
        canvas(activeDocument, width, height, AnchorPosition.MIDDLECENTER);
            save(activeDocument);
        }
    } else {
        app.activeDocument = lastRef;
        firstRef.close(SaveOptions.DONOTSAVECHANGES);
        activeDocument.paste();
        // Moves the layer the specified amount(in the given unit)relative to its current position
        activeDocument.activeLayer.translate(lastRef.width,0); 
        canvas(activeDocument, activeDocument.width*2, activeDocument.height, AnchorPosition.MIDDLELEFT);
        canvas(activeDocument, width, height, AnchorPosition.MIDDLECENTER);
        save(activeDocument);
    }
//    docRef.selection.stroke(app.foregroundColor, 2, StrokeLocation.OUTSIDE, ColorBlendMode.NORMAL, 100 );
    return;
}
//
function init(docRef)
{
    if (docRef.mode !== DocumentMode.RGB) {
        docRef.changeMode(ChangeMode.RGB);
    }
    if (docRef.resolution !== 254) {
        docRef.resizeImage(docRef.width, docRef.height, resolution)
    }
    if (docRef.height <= docRef.width) {
        docRef.rotateCanvas(angle);
    }
}
// ÐÞ¸Ä»­²¼
function canvas(docRef, width, height, anchor) 
{
    docRef.resizeCanvas(width, height, anchor);
}
// saveas
function save(docRef)
{
    var p = docRef.path.toString();
    var n = docRef.name.toString();
    p = p.replace(/^\/(\w)/, "$1:");
    p = p.replace(/\//g, "\\\\");
    // Save the current preferences
    var startDisplayDialogs = app.displayDialogs;
    // Set Adobe Photoshop CS3 to use pixels and display no dialogs
    app.displayDialogs = DialogModes.NO;
    // save the outputs in JPEG
    var jpegOptions = new JPEGSaveOptions();
    // set the jpeg quality really low so the files are small
    jpegOptions.quality = 10;
    jpegOptions.embedColorProfile = true;
    jpegOptions.matte = MatteType.NONE;
    jpegOptions.formatOptions = FormatOptions.STANDARDBASELINE;
    docRef.saveAs(new File(p + "\\jpg" + n), jpegOptions, true, Extension.LOWERCASE);
    // don¡¯t modify the original
    docRef.close(SaveOptions.DONOTSAVECHANGES)    
}
// add Text
function addText(docRef)
{
    var white = new SolidColor();
    white.rgb["hexValue"] = 'ffffff'
    var black = new SolidColor();
    black.rgb["hexValue"] = '000000'
    docRef.foregroundColor = black;
    docRef.backgroundColor = white;
    var filename = docRef.name;
    filename=filename.substring(0,filename.lastIndexOf("."));
    var stroke = 0.2;
    //text size
    var size = 8;
    //Changes the color profile of the document.
    //Changes the size of the image.

    var width = parseFloat(docRef.width);
    var height = parseFloat(docRef.height);
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

    artLayerRef.merge();
    artLayerRef = null;
}
function isCanvas(width, height, stroke, textItemRef, artLayerRef)
{
    anchor = AnchorPosition.MIDDLELEFT
    docRef.resizeCanvas(width+stoke, height, anchor) 
    textItemRef.direction = Direction.VERTICAL
    artLayerRef.translate(docRef.width-0.1, 0);
} 
