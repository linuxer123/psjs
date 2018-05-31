var layerRef = layRef();
groupMode(BlendMode.SCREEN);
// ������
function groupMode(mode)
{
    var copyLayer = duplicateLayer();
    blendMode(copyLayer, mode); 
    opacity(copyLayer);
    merge(copyLayer);
    hs_r10();
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
// ����ͼ��
function duplicateLayer()
{
    var docRef = app.activeDocument;
    try
    {
        docRef.selection.copy();
       	docRef.paste();
    }
    catch(e)
    {
        docRef.activeLayer.copy();
       	docRef.paste();
    }
    return docRef.activeLayer;
}
//��ģʽ
function blendMode(layer, mode)
{
    //BlendMode.MULTIPLY BlendMode.SCREEN;
    var mode = mode === undefined ? BlendMode.MULTIPLY : mode;
    layer.blendMode = mode;
}
// ͸����
function opacity(layer, opa)
{
    var opa = opa === undefined ? 50 : opa;
    layer.opacity = opa; //[0.0..100]
}
// �ϲ�ͼ��
function merge(layer)
{
    return layer.merge();
}
// ��10���챥�Ͷ�
function hs_r10()
{
    var idHStr = charIDToTypeID( "HStr" );
    var desc2 = new ActionDescriptor();
    var idpresetKind = stringIDToTypeID( "presetKind" );
    var idpresetKindType = stringIDToTypeID( "presetKindType" );
    var idpresetKindCustom = stringIDToTypeID( "presetKindCustom" );
    desc2.putEnumerated( idpresetKind, idpresetKindType, idpresetKindCustom );
    var idClrz = charIDToTypeID( "Clrz" );
    desc2.putBoolean( idClrz, false );
    var idAdjs = charIDToTypeID( "Adjs" );
        var list1 = new ActionList();
            var desc3 = new ActionDescriptor();
            var idLclR = charIDToTypeID( "LclR" );
            desc3.putInteger( idLclR, 1 );
            var idBgnR = charIDToTypeID( "BgnR" );
            desc3.putInteger( idBgnR, 315 );
            var idBgnS = charIDToTypeID( "BgnS" );
            desc3.putInteger( idBgnS, 345 );
            var idEndS = charIDToTypeID( "EndS" );
            desc3.putInteger( idEndS, 15 );
            var idEndR = charIDToTypeID( "EndR" );
            desc3.putInteger( idEndR, 45 );
            var idH = charIDToTypeID( "H   " );
            desc3.putInteger( idH, 0 );
            var idStrt = charIDToTypeID( "Strt" );
            desc3.putInteger( idStrt, -10 );
            var idLght = charIDToTypeID( "Lght" );
            desc3.putInteger( idLght, 0 );
        var idHsttwo = charIDToTypeID( "Hst2" );
        list1.putObject( idHsttwo, desc3 );
    desc2.putList( idAdjs, list1 );
executeAction( idHStr, desc2, DialogModes.NO );
}
