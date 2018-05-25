// Remember current unit settings and then set units to
// the value expected by this script
var cnames = new Array('枝江田'); 
var docRef = activeDocument;
var absFile = docRef.fullName.toString();
var p = docRef.path.toString();
var n = docRef.name.toString();
p = p.replace(/^\/(\w)/, "$1:");
p = p.replace(/\//g, "\\\\");
//Adjusts the levels of the selected channels parmater
function init() {
    var height = docRef.height
    var width = docRef.width
    docRef.changeMode(ChangeMode.RGB);
    var resolution = 254
    docRef.resizeImage(width, height, resolution) 
}
function contains(a, obj) {
    for (var i = 0; i < a.length; i++) {
        if (obj.indexOf(encodeURIComponent(a[i])) != -1 ) {
            return true;
        }
    }
    return false;
}
if (absFile.indexOf(encodeURIComponent(cnames[0])) != -1)
{
    var height = docRef.height;
    var width = docRef.width;
    var mod = docRef.mode;
    var originalResolution = docRef.resolution;
    var resolution = 254;
    docRef.resizeImage(width, height, resolution);     
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
else {
    init()
    colordeep()
}
function colordeep()
{
    var color_deep = new Array('琉璃册','琉璃相册','冰雕册','冰雕相册','五彩米娜','糖果册','糖果相册','琉璃面','巴洛克册','封面深点');
    var name = new Array('fm', '封面', '封底', 'fd', 'FM', 'FD','Fd','Fm','fD','fM');
    var single = new Array('冰雕', '琉璃','玻璃','颜色深点','洗深', '深点','颜色出深','颜色加深','深一点', '芬兰', '不调亮了','稍深');
    var rc_paper = new Array('〓〓〓RC', '◆◆◆◆RC', '★★★海报', '◆◆◆◆艺术纸');
    var yl_name = new Array('沙市米兰贝贝', '米兰贝贝');	
    n = encodeURIComponent(n)
    if (contains(color_deep, absFile)) {
        if (contains(name, n)) {
            levels(0.85)
	} 
    }
    else {
        if (contains(single, n)) {
	    if (contains(yl_name, absFile)) {
		 levels(0.78);
	    }		
	else
		levels(0.85);
        }   
    }
//    if (contains(rc_paper, absFile)) {
//	 levels(1.15);
//    }

}
// 调整色阶
function levels(v)
{
    try
    {
        var layerRef = docRef.artLayers.getByName("Background")
    }
    catch(err)
    {
        var layerRef = docRef.artLayers.getByName("背景")
    } 
    inputRangeStart = 0 
    inputRangeEnd = 255
    inputRangeGamma = v
    outputRangeStart = 0
    outputRangeEnd = 255
    layerRef.adjustLevels(inputRangeStart, inputRangeEnd, inputRangeGamma, outputRangeStart, outputRangeEnd)
}
docRef.save();
docRef.close();
docRef = null
