var layerRef = layRef();
levels();
// 调整色阶
function levels()
{
    inputRangeStart = 0; 
    inputRangeEnd = 255
    inputRangeGamma = 0.90;
    outputRangeStart = 0
    outputRangeEnd = 255
    layerRef.adjustLevels(inputRangeStart, inputRangeEnd, inputRangeGamma, outputRangeStart, outputRangeEnd)
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
