// Remember current unit settings and then set units to
// the value expected by this script
var originalUnit = preferences.rulerUnits;
preferences.rulerUnits = Units.CM;
var white = new SolidColor();
white.rgb["hexValue"] = 'ffffff';
var black = new SolidColor();
black.rgb["hexValue"] = '000000';
app.foregroundColor =black;
app.backgroundColor = white;
// Open the document in the script
//var files = app.openDialog();
var cnames = new Array("蒙娜丽莎", "枝江田", '分班');
var color_deep = new Array('洗深', '琉璃','稍深','芬兰','米娜');
var docRef = activeDocument;
docRef.changeMode(ChangeMode.RGB);
var absFile = docRef.fullName.toString();
var p = docRef.path.toString();
var n = docRef.name.toString();
p = p.replace(/^\/(\w)/, "$1:");
p = p.replace(/\//g, "\\\\");

function contains(a, obj) {
    for (var i = 0; i < color_deep.length; i++) {
        if (obj.indexOf(color_deep[i]) != -1 ) {
            return true;
        }
    }
    return false;
}

if (absFile.indexOf(encodeURIComponent(cnames[0])) != -1)
{
    var layerRef = docRef.artLayers.getByName("背景")
    //Adjusts the range of tones in the image’s shadows and highlights.
    shadowAmount = 10
    shadowWidth = 50
    shadowRadius = 30
    highlightAmount = 3
    highlightWidth = 47
    highlightRadius = 30
    colorCorrection = 10
    midtoneContrast = 0
    blackClip = 0.01
    whiteClip = 0.01
    //Applies the Unsharp Mask filter parmater
    amount = 4
    radius = 161.1
    threshold = 10
    //Adjusts the levels of the selected channels parmater
    inputRangeStart = 0 
    inputRangeEnd = 255
    inputRangeGamma = 0.90
    outputRangeStart = 0
    outputRangeEnd = 255
    //Adjusts the color balance of the layer’s component channels parmater
    shadows = [-4, 0, 0]
    midtones = [0, 0, 0]
    highlights = [0, 0, 0]
    shadowHighlight(layerRef, shadowAmount, shadowWidth, shadowRadius, highlightAmount, highlightWidth, highlightRadius, colorCorrection, midtoneContrast, blackClip, whiteClip)
    levels(layerRef, inputRangeStart, inputRangeEnd, inputRangeGamma, outputRangeStart, outputRangeEnd)
    hue()
    UnSharpMask(layerRef, amount, radius, threshold)
    colorBalance(layerRef, shadows, midtones, highlights, true)
     
}
else if (absFile.indexOf(encodeURIComponent(cnames[1])) != -1)
{
    var height = docRef.height;
    var width = docRef.width;
    var mod = docRef.mode;
    var originalResolution = docRef.resolution;
    var resolution = 254;
    if (absFile.indexOf(encodeURIComponent(cnames[2])) == -1)
    {
        docRef.resizeImage(width, height, resolution);     
    }
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
    // don’t modify the original
    docRef.close(SaveOptions.DONOTSAVECHANGES)
}
else if (contains(color_deep, n))
{
    var layerRef = docRef.artLayers.getByName("Background")
    inputRangeStart = 0 
    inputRangeEnd = 255
    inputRangeGamma = 0.90
    outputRangeStart = 0
    outputRangeEnd = 255
    levels(layerRef, inputRangeStart, inputRangeEnd, inputRangeGamma, outputRangeStart, outputRangeEnd) 
}


function shadowHighlight(lr, shadowAmount, shadowWidth, shadowRadius, highlightAmount, highlightWidth, highlightRadius, colorCorrection, midtoneContrast, blackClip, whiteClip) 
{
    lr.shadowHighlight(shadowAmount, shadowWidth, shadowRadius, highlightAmount, highlightWidth, highlightRadius, colorCorrection, midtoneContrast, blackClip, whiteClip)
}
function UnSharpMask(lr, amount, radius, threshold)
{
    lr.applyUnSharpMask(amount, radius, threshold)
}
function levels(lr, inputRangeStart, inputRangeEnd, inputRangeGamma, outputRangeStart, outputRangeEnd)
{
    lr.adjustLevels(inputRangeStart, inputRangeEnd, inputRangeGamma, outputRangeStart, outputRangeEnd)
}
function colorBalance(lr, shadows, midtones, highlights, preserveLuminosity)
{
    lr.adjustColorBalance(shadows, midtones, highlights, preserveLuminosity)
}
function hue()
{
    var id554 = charIDToTypeID( "HStr" );
    var desc160 = new ActionDescriptor();
    var id555 = charIDToTypeID( "Clrz" );
    desc160.putBoolean( id555, false );
    var id556 = charIDToTypeID( "Adjs" );
    var list1 = new ActionList();
    var desc161 = new ActionDescriptor();
    var id557 = charIDToTypeID( "LclR" );
    desc161.putInteger( id557, 1 );
    var id558 = charIDToTypeID( "BgnR" );
    desc161.putInteger( id558, 315 );
    var id559 = charIDToTypeID( "BgnS" );
    desc161.putInteger( id559, 345 );
    var id560 = charIDToTypeID( "EndS" );
    desc161.putInteger( id560, 15 );
    var id561 = charIDToTypeID( "EndR" );
    desc161.putInteger( id561, 45 );
    var id562 = charIDToTypeID( "H   " );
    desc161.putInteger( id562, 0 );
    var id563 = charIDToTypeID( "Strt" );
    desc161.putInteger( id563, -5 );
    var id564 = charIDToTypeID( "Lght" );
    desc161.putInteger( id564, 0 );
    var id565 = charIDToTypeID( "Hst2" );
    list1.putObject( id565, desc161 );
    var desc162 = new ActionDescriptor();
    var id566 = charIDToTypeID( "LclR" );
    desc162.putInteger( id566, 5 );
    var id567 = charIDToTypeID( "BgnR" );
    desc162.putInteger( id567, 195 );
    var id568 = charIDToTypeID( "BgnS" );
    desc162.putInteger( id568, 225 );
    var id569 = charIDToTypeID( "EndS" );
    desc162.putInteger( id569, 255 );
    var id570 = charIDToTypeID( "EndR" );
    desc162.putInteger( id570, 285 );
    var id571 = charIDToTypeID( "H   " );
    desc162.putInteger( id571, 0 );
    var id572 = charIDToTypeID( "Strt" );
    desc162.putInteger( id572, -10 );
    var id573 = charIDToTypeID( "Lght" );
    desc162.putInteger( id573, 0 );
    var id574 = charIDToTypeID( "Hst2" );
    list1.putObject( id574, desc162 );
    desc160.putList( id556, list1 );
    executeAction( id554, desc160, DialogModes.NO );
}
// Release references
docRef = null
layerRef = null
// Restore original ruler unit setting
app.preferences.rulerUnits = originalUnit
