//var selRef = app.activeDocument.selection;
//docRef.rotateCanvas(-90);
var layerRef = layRef();
//groupMode(BlendMode.SCREEN);
//groupColorBalance(503);
window.Event.onmousedown();
//dHgihHight();

// 选取图层
function layRef()
{
    // backgroundLayer
    // activeLayer
    // 当前选择的文档
    var docRef = app.activeDocument;
    var layerRef = docRef.activeLayer;
    /*
    try
    {
        var layerRef = docRef.artLayers.getByName("Background")
    }
    catch(err)
    {
        var layerRef = docRef.artLayers.getByName("背景")
    } 
    */
    return layerRef;
}
// 复制图层
function duplicateLayer()
{
    var docRef = app.activeDocument;
    var relativeObject = layerRef;
    var insertionLocation = ElementPlacement.PLACEBEFORE;
    layerRef.duplicate(relativeObject, insertionLocation); 
    var bgCopy = docRef.artLayers.getByName("Background copy");
    return bgCopy;
}


// 透明度
function opacity(layer, opap
{
    var opa = opa === undefined ? 50 : opa;
    layer.opacity = opa; //[0.0..100]
}
// 合并图层
function merge(layer)
{
    return layer.merge();
}
// 叠加深
function groupMode(mode)
{
    var copyLayer = duplicateLayer();
    blendMode(copyLayer, mode); 
    opacity(copyLayer);
    merge(copyLayer);
}
// F12 高光加色 
function groupColorBalance(v)
{
    switch (v)
    {
	case 503:
	    colorBalance([0,0,0],[0,0,0],[5,0,3]); 
	    break;
    	default:
	    colorBalance();
    }
}
// 去色
function desaturate()
{
    layerRef.desaturate();
}
// 调整色阶
function levels(v)
{
    inputRangeStart = 0 
    inputRangeEnd = 255
    inputRangeGamma = v
    outputRangeStart = 0
    outputRangeEnd = 255
    layerRef.adjustLevels(inputRangeStart, inputRangeEnd, inputRangeGamma, outputRangeStart, outputRangeEnd)
}
// 可选色
function selColor(v) 
{
    //layerRef.selectiveColor(selectionMethod, [,reds][,yellows][,greens][,cyans][,blues][,magentas][,whites][,neutrals][,blacks])	
    layerRef.selectiveColor(AdjustmentReference.RELATIVE, [0,0,0,0], [0,0,0,0], [0,0,0,0], [0,0,0,0], [0,0,0,0], [0,0,0,0], [0,0,0,0], [0,0,0,0], [0,0,0,v])	
}
// 调整色彩平衡
function colorBalance(a,b,c)
{
    var shadows = (a === undefined) ? [0,0,0] : a;
    var midtones = (b === undefined) ? [0,0,0] : b;
    var highlights = (c === undefined) ? [0,0,0] : c;
    var preserveLuminosity = true;

    layerRef.adjustColorBalance(shadows,midtones,highlights);
}
// 阴影高光
function shHighLight()
{
    var shadowAmout = 10; //[0..100]
    var shadowWidth = 50; //[0..100]
    var shadowRadius = 30; //[0..2500]
    var highlightAmout = 3; //[0..100]
    var highlightWidth = 47; //[0..100]
    var highlightRadius = 30; //[0..2500]
    var colorCorrection = 10; // [-100..100]
    var midtoneContrast = 0; // [-100..100]
    var blackClip = 0.01; //[0.000..50.000]
    var whiteClip = 0.01; //[0.000..50.000]
    layerRef.shadowHighlight(shadowAmout,shadowWidth,shadowRadius,highlightAmout,highlightWidth,highlightRadius,colorCorrection,midtoneContrast,blackClip,whiteClip);
}
//  锐化
function unsharpMask(a,b,c)
{
    var amount = (a === undefined) ? 4 : a; //[1..500]
    var radius = (b === undefined) ? 161.1 : b; //[0.1..250.0]
    var threshold = (c === undefined) ? 10 : c; //[1..255]
    layerRef.applyUnSharpMask(amount,radius,threshold);
}

// F11 去高光
function dHgihHight()
{
    shHighLight();    
    levels(0.90);
    unsharpMask();
    colorBalance([-4,0,0]);
    hs_10();
}
// 减10个红饱和度
function hs_10()
{
    var idHStr = charIDToTypeID( "HStr" );
    var desc2 = new ActionDescriptor();
    var idpresetKind = stringIDToTypeID( "presetKind" );
    var idpresetKindType = stringIDToTypeID( "presetKindType" );
    var idpresetKindCustom = stringIDToTypeID( "presetKindCustom" );
    desc2.putEnumerated( idpresetKind, idpresetKindType, idpresetKindCustom );
    var idClrz = charIDToTypeID( "Clrz" );
    desc2.putBoolean( idClrz, false );
    var idAdjs = charIDToTypeID( "Adjs" );
        var list1 = new ActionList();
            var desc3 = new ActionDescriptor();
            var idLclR = charIDToTypeID( "LclR" );
            desc3.putInteger( idLclR, 1 );
            var idBgnR = charIDToTypeID( "BgnR" );
            desc3.putInteger( idBgnR, 315 );
            var idBgnS = charIDToTypeID( "BgnS" );
            desc3.putInteger( idBgnS, 345 );
            var idEndS = charIDToTypeID( "EndS" );
            desc3.putInteger( idEndS, 15 );
            var idEndR = charIDToTypeID( "EndR" );
            desc3.putInteger( idEndR, 45 );
            var idH = charIDToTypeID( "H   " );
            desc3.putInteger( idH, 0 );
            var idStrt = charIDToTypeID( "Strt" );
            desc3.putInteger( idStrt, -10 );
            var idLght = charIDToTypeID( "Lght" );
            desc3.putInteger( idLght, 0 );
        var idHsttwo = charIDToTypeID( "Hst2" );
        list1.putObject( idHsttwo, desc3 );
    desc2.putList( idAdjs, list1 );
executeAction( idHStr, desc2, DialogModes.NO );
}
/*
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
docRef.foregroundColor = 'black';
docRef.backgroundColor = 'white';
var selRef = app.activeDocument.selection;
selRef.invert();
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
artLayerRef.merge()yy
//docRef.save();
//docRef.close();
// Release references
docRef = null
artLayerRef = null
textItemRef = null
// Restore original ruler unit setting
app.preferences.rulerUnits = originalUnit
kk*/
