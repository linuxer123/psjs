var layerRef = layRef();
brightnessContrast();
// ���ȷ���
function brightnessContrast(a,b)
{
    var brightness = (a === undefined) ? 5 : a; //[-100..100]
    var contrast = (b === undefined) ? 10 : b; //[-100..100]
    layerRef.adjustBrightnessContrast(brightness,contrast);
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
