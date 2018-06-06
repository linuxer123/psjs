var layerRef = layRef();
selColor(11);
// 可选色
function selColor(v) 
{
    //layerRef.selectiveColor(selectionMethod, [,reds][,yellows][,greens][,cyans][,blues][,magentas][,whites][,neutrals][,blacks])	
    layerRef.selectiveColor(AdjustmentReference.RELATIVE, [0,0,0,0], [0,0,0,0], [0,0,0,0], [0,0,0,0], [0,0,0,0], [0,0,0,0], [0,0,0,0], [0,0,0,0], [0,0,0,v])	
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
