var layerRef = layRef();
groupColorBalance(503);
// F12 高光加色 
function groupColorBalance(v)
{
    switch (v)
    {
	case 503:
	    colorBalance([0,0,0],[0,0,0],[5,0,-4]); 
	    break;
    	default:
	    colorBalance();
    }
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
// 选取图层
function layRef()
{
    // backgroundLayer
    // activeLayer
    // 当前选择的文档
    var docRef = app.activeDocument;
    var layerRef = docRef.activeLayer;
    return layerRef;
}
