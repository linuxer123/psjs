var layerRef = layRef();
groupColorBalance(503);
// F12 �߹��ɫ 
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
// ����ɫ��ƽ��
function colorBalance(a,b,c)
{
    var shadows = (a === undefined) ? [0,0,0] : a;
    var midtones = (b === undefined) ? [0,0,0] : b;
    var highlights = (c === undefined) ? [0,0,0] : c;
    var preserveLuminosity = true;

    layerRef.adjustColorBalance(shadows,midtones,highlights);
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
