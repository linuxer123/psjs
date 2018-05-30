var layerRef = layRef();
brightnessContrast();
// 明度反差
function brightnessContrast(a,b)
{
    var brightness = (a === undefined) ? 5 : a; //[-100..100]
    var contrast = (b === undefined) ? 10 : b; //[-100..100]
    layerRef.adjustBrightnessContrast(brightness,contrast);
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
