// Remember current unit settings and then set units to
// the value expected by this script
var cnames = new Array('枝田'); 
var noAction = new Array('胡巴','例外'); 
if (app.documents.length !== 0)
{
    var docRef = activeDocument;
    docRef.selection.deselect();
    var height = docRef.height
    var width = docRef.width
    var absFile = docRef.fullName.toString();
    var p = docRef.path.toString();
    var n = docRef.name.toString();
    p = p.replace(/^\/(\w)/, "$1:");
    p = p.replace(/\//g, "\\\\");

    //Adjusts the levels of the selected channels parmater
    function init(docRef) {
        var resolution = 254;
        docRef.changeMode(ChangeMode.RGB);
        docRef.resizeImage(width, height, resolution) 
    }
    function contains(a, obj) {
        for (var i = 0; i < a.length; i++) {
            if (obj.indexOf(encodeURIComponent(a[i])) != -1 ) {
                return true;
            }
        }
        return false;
    }
    // 枝江田
    if (absFile.indexOf(encodeURIComponent(cnames[0])) != -1)
    {
        var resolution = 254;
        //docRef.resizeImage(width, height, resolution);     
        // Save the current preferences
        var startDisplayDialogs = app.displayDialogs;
        // Set Adobe Photoshop CS3 to use pixels and display no dialogs
        app.displayDialogs = DialogModes.NO;
        // save the outputs in JPEG
        var jpegOptions = new JPEGSaveOptions();
        // set the jpeg quality really low so the files are small
        jpegOptions.quality = 10;
        jpegOptions.embedColorProfile = true;
        jpegOptions.matte = MatteType.NONE;
        jpegOptions.formatOptions = FormatOptions.STANDARDBASELINE;
        docRef.save();
        docRef.saveAs(new File(p + "\\jpg" + n), jpegOptions, true, Extension.LOWERCASE);
        // don’t modify the original
        docRef.close(SaveOptions.DONOTSAVECHANGES)
    }
    // noAction user no changes
    else if (contains(noAction, absFile)) 
    {
        while(app.documents.length !== 0) {
            if (app.activeDocument.resolution !== 254)
            {   
                init(app.activeDocument);
                app.activeDocument.save();
            }
                app.activeDocument.close();
        }
    }
    else {
        hs_blue_11();
        init(docRef)
        colordeep();
        docRef.save();
        docRef.close();
    }
    // 去蓝
    function hs_blue_11()
    {
        var idHStr = charIDToTypeID( "HStr" );
        var desc134 = new ActionDescriptor();
        var idpresetKind = stringIDToTypeID( "presetKind" );
        var idpresetKindType = stringIDToTypeID( "presetKindType" );
        var idpresetKindCustom = stringIDToTypeID( "presetKindCustom" );
        desc134.putEnumerated( idpresetKind, idpresetKindType, idpresetKindCustom );
        var idClrz = charIDToTypeID( "Clrz" );
        desc134.putBoolean( idClrz, false );
        var idAdjs = charIDToTypeID( "Adjs" );
            var list4 = new ActionList();
                var desc135 = new ActionDescriptor();
                var idLclR = charIDToTypeID( "LclR" );
                desc135.putInteger( idLclR, 5 );
                var idBgnR = charIDToTypeID( "BgnR" );
                desc135.putInteger( idBgnR, 195 );
                var idBgnS = charIDToTypeID( "BgnS" );
                desc135.putInteger( idBgnS, 225 );
                var idEndS = charIDToTypeID( "EndS" );
                desc135.putInteger( idEndS, 255 );
                var idEndR = charIDToTypeID( "EndR" );
                desc135.putInteger( idEndR, 285 );
                var idH = charIDToTypeID( "H   " );
                desc135.putInteger( idH, 0 );
                var idStrt = charIDToTypeID( "Strt" );
                desc135.putInteger( idStrt, -11 );
                var idLght = charIDToTypeID( "Lght" );
                desc135.putInteger( idLght, 0 );
            var idHsttwo = charIDToTypeID( "Hst2" );
            list4.putObject( idHsttwo, desc135 );
        desc134.putList( idAdjs, list4 );
        executeAction( idHStr, desc134, DialogModes.NO );
       

    }
    function colordeep()
    {
        var color_deep = new Array('琉璃册','琉璃相册','冰雕册','冰雕相册','五彩米娜','糖果册','糖果相册','琉璃面','巴洛克册','封面深点');
        var name = new Array('fm', '封面', '封底', 'fd', 'FM', 'FD','Fd','Fm','fD','fM');
        var single = new Array('冰雕', '琉璃','玻璃','颜色深点','洗深', '深点','颜色出深','颜色加深','深一点', '芬兰', '不调亮了','稍深');
        var rc_paper = new Array('〓〓〓RC', '◆◆◆◆RC', '★★★海报', '◆◆◆◆艺术纸');
        var yl_name = new Array('沙市米兰贝贝', '米兰贝贝');    
        n = encodeURIComponent(n)
        if (contains(color_deep, absFile)) {
            if (contains(name, n)) {
                levels(0.85)
        } 
        }
        else {
            if (contains(single, n)) {
            if (contains(yl_name, absFile)) {
             levels(0.78);
            }       
        else
            levels(0.85);
            }   
        }
    //    if (contains(rc_paper, absFile)) {
    //   levels(1.15);
    //    }
    }
    // 选取图层
    function layRef()
    {
        var layerRef = docRef.activeLayer;
        return layerRef;
    }
    // 调整色阶
    function levels(v)
    {
        var layerRef = layRef();
        inputRangeStart = 0 
        inputRangeEnd = 255
        inputRangeGamma = v
        outputRangeStart = 0
        outputRangeEnd = 255
        layerRef.adjustLevels(inputRangeStart, inputRangeEnd, inputRangeGamma, outputRangeStart, outputRangeEnd)
    }

    docRef = null;
}

