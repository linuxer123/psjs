var layerRef = layRef();
levels();
// ����ɫ��
function levels()
{
    inputRangeStart = 3 
    inputRangeEnd = 255
    inputRangeGamma = 1.20;
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
