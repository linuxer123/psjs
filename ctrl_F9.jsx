var layerRef = layRef();
levels();
// ����ɫ��
function levels()
{
    inputRangeStart = 0; 
    inputRangeEnd = 255
    inputRangeGamma = 0.90;
    outputRangeStart = 0
    outputRangeEnd = 255
    layerRef.adjustLevels(inputRangeStart, inputRangeEnd, inputRangeGamma, outputRangeStart, outputRangeEnd)
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
