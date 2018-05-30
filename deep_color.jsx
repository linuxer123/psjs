// Remember current unit settings and then set units to
// the value expected by this script
var cnames = new Array('֦����'); 
var docRef = activeDocument;
var absFile = docRef.fullName.toString();
var p = docRef.path.toString();
var n = docRef.name.toString();
p = p.replace(/^\/(\w)/, "$1:");
p = p.replace(/\//g, "\\\\");
//Adjusts the levels of the selected channels parmater
function init() {
    var height = docRef.height
    var width = docRef.width
    docRef.changeMode(ChangeMode.RGB);
    var resolution = 254
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
if (absFile.indexOf(encodeURIComponent(cnames[0])) != -1)
{
    var height = docRef.height;
    var width = docRef.width;
    var mod = docRef.mode;
    var originalResolution = docRef.resolution;
    var resolution = 254;
    docRef.resizeImage(width, height, resolution);     
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
    docRef.saveAs(new File(p + "\\jpg" + n), jpegOptions, true, Extension.LOWERCASE);
    // don��t modify the original
    docRef.close(SaveOptions.DONOTSAVECHANGES)
}
else {
    init()
    colordeep()
}
function colordeep()
{
    var color_deep = new Array('������','�������','�����','�������','�������','�ǹ���','�ǹ����','������','����˲�','�������');
    var name = new Array('fm', '����', '���', 'fd', 'FM', 'FD','Fd','Fm','fD','fM');
    var single = new Array('����', '����','����','��ɫ���','ϴ��', '���','��ɫ����','��ɫ����','��һ��', '����', '��������','����');
    var rc_paper = new Array('������RC', '��������RC', '���ﺣ��', '������������ֽ');
    var yl_name = new Array('ɳ����������', '��������');	
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
//	 levels(1.15);
//    }

}
// ����ɫ��
function levels(v)
{
    try
    {
        var layerRef = docRef.artLayers.getByName("Background")
    }
    catch(err)
    {
        var layerRef = docRef.artLayers.getByName("����")
    } 
    inputRangeStart = 0 
    inputRangeEnd = 255
    inputRangeGamma = v
    outputRangeStart = 0
    outputRangeEnd = 255
    layerRef.adjustLevels(inputRangeStart, inputRangeEnd, inputRangeGamma, outputRangeStart, outputRangeEnd)
}
docRef.save();
docRef.close();
docRef = null