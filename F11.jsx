var layerRef = layRef();
dHgihHight();
// 调整色彩平衡
function colorBalance(a,b,c)
{
    var shadows = (a === undefined) ? [0,0,0] : a;
    var midtones = (b === undefined) ? [0,0,0] : b;
    var highlights = (c === undefined) ? [0,0,0] : c;
    var preserveLuminosity = true;

    layerRef.adjustColorBalance(shadows,midtones,highlights);
}
// 阴影高光
function shHighLight()
{
    var shadowAmout = 10; //[0..100]
    var shadowWidth = 50; //[0..100]
    var shadowRadius = 30; //[0..2500]
    var highlightAmout = 3; //[0..100]
    var highlightWidth = 47; //[0..100]
    var highlightRadius = 30; //[0..2500]
    var colorCorrection = 10; // [-100..100]
    var midtoneContrast = 0; // [-100..100]
    var blackClip = 0.01; //[0.000..50.000]
    var whiteClip = 0.01; //[0.000..50.000]
    layerRef.shadowHighlight(shadowAmout,shadowWidth,shadowRadius,highlightAmout,highlightWidth,highlightRadius,colorCorrection,midtoneContrast,blackClip,whiteClip);
}
//  锐化
function unsharpMask(a,b,c)
{
    var amount = (a === undefined) ? 4 : a; //[1..500]
    var radius = (b === undefined) ? 161.1 : b; //[0.1..250.0]
    var threshold = (c === undefined) ? 10 : c; //[1..255]
    layerRef.applyUnSharpMask(amount,radius,threshold);
}
// F11 去高光
function dHgihHight()
{
    shHighLight();    
    levels(0.90);
    unsharpMask();
    colorBalance([-4,0,0]);
    hs_r10();
}
// 调整色阶
function levels(v)
{
    inputRangeStart = 0 
    inputRangeEnd = 255
    inputRangeGamma = v
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
// 减10个红饱和度
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
