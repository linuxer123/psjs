var layerRef = layRef();
selColor();
// ��ѡɫ
function selColor(v) 
{
    //layerRef.selectiveColor(selectionMethod, [,reds][,yellows][,greens][,cyans][,blues][,magentas][,whites][,neutrals][,blacks])	
    layerRef.selectiveColor(AdjustmentReference.RELATIVE, [0,0,0,0], [0,0,-27,0], [0,0,0,0], [0,0,0,0], [0,0,0,0], [0,0,0,0], [0,0,0,0], [0,0,0,0], [0,0,0,0])	
}
// ѡȡͼ��
function layRef()
{
    // backgroundLayer
    // activeLayer
    // ��ǰѡ����ĵ�
    var docRef = app.activeDocument;
    var layerRef = docRef.activeLayer;
    return layerRef;
}
