var layerRef = layRef();
selColor(11);
// ��ѡɫ
function selColor(v) 
{
    //layerRef.selectiveColor(selectionMethod, [,reds][,yellows][,greens][,cyans][,blues][,magentas][,whites][,neutrals][,blacks])	
    layerRef.selectiveColor(AdjustmentReference.RELATIVE, [0,0,0,0], [0,0,0,0], [0,0,0,0], [0,0,0,0], [0,0,0,0], [0,0,0,0], [0,0,0,0], [0,0,0,0], [0,0,0,v])	
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
