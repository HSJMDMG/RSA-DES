fileContent = '';
fileName = '';
outputContent = '';
keyContent = '';

function checkKey1() {
    document.getElementById('alertbar1').innerHTML = "";
    key = d3.select('#key1').property('value');

    //check for length
    keylen = 2;
    if (key.length > keylen) {
        alertbar = d3.select('#alertbar1');
        alertblock = alertbar.append('div');
        alertblock.attr('class', 'alert alert-danger');
        alertblock.append('button')
            .attr('type', 'button')
            .attr('class', 'close')
            .attr('data-dismiss', 'alert')
            .text('×');
        alertblock.append('h4')
            .text('提示！');
        alertblock.append('p')
            .text('密钥过长，超过16位，请重新输入！');

        return false;
    }
    if (key.length < keylen) {
        alertbar = d3.select('#alertbar1');
        alertblock = alertbar.append('div');
        alertblock.attr('class', 'alert alert-danger');
        alertblock.append('button')
            .attr('type', 'button')
            .attr('class', 'close')
            .attr('data-dismiss', 'alert')
            .text('×');
        alertblock.append('h4')
            .text('提示！');
        alertblock.append('p')
            .text('密钥过短，少于16位，请重新输入！');

        return false;
    }

    function invalid(ch) {
        if ('0' <= ch && ch <= '9') return false;
        if ('a' <= ch && ch <= 'z') return false;
        if ('A' <= ch && ch <= 'Z') return false;
        return true;
    }

    //check for valid character
    for (var i = 0; i < keylen; i++) {
        if (invalid(key[i])) {
            alertbar = d3.select('#alertbar1');
            alertblock = alertbar.append('div');
            alertblock.attr('class', 'alert alert-danger');
            alertblock.append('button')
                .attr('type', 'button')
                .attr('class', 'close')
                .attr('data-dismiss', 'alert')
                .text('×');
            alertblock.append('h4')
                .text('提示！');
            alertblock.append('p')
                .text('密钥中出现非法字符，请修改！');
            return false;
        }
    }

    //d3.select('#key1').attr('disabled','');
    rsa_key = RSA_encode(key);

    d3.select('#rsakey1').property('value', rsa_key);
    d3.select('#rsa1').classed('hidden', false);
    keyContent = key;
    return true;
}

function checkKey2() {
    document.getElementById('alertbar2').innerHTML = "";
    key = d3.select('#key2').property('value');

    function invalid(ch) {
        if ('0' <= ch && ch <= '9') return false;
        if ('a' <= ch && ch <= 'z') return false;
        if ('A' <= ch && ch <= 'Z') return false;
        return true;
    }

    //check for valid character
    for (var i = 0; i < key.length; i++) {
        if (invalid(key[i])) {
          console.log(i);
            alertbar = d3.select('#alertbar2');
            alertblock = alertbar.append('div');
            alertblock.attr('class', 'alert alert-danger');
            alertblock.append('button')
                .attr('type', 'button')
                .attr('class', 'close')
                .attr('data-dismiss', 'alert')
                .text('×');
            alertblock.append('h4')
                .text('提示！');
            alertblock.append('p')
                .text('密钥中出现非法字符，请修改！');
            return false;
        }
    }

    //  d3.select('#key2').attr('disabled','');

    rsa_key = RSA_decode(key);
    key = rsa_key;
    //check for length
  /*  keylen = 16;
    if (key.length > keylen) {
        alertbar = d3.select('#alertbar2');
        alertblock = alertbar.append('div');
        alertblock.attr('class', 'alert alert-danger');
        alertblock.append('button')
            .attr('type', 'button')
            .attr('class', 'close')
            .attr('data-dismiss', 'alert')
            .text('×');
        alertblock.append('h4')
            .text('提示！');
        alertblock.append('p')
            .text('密钥过长，超过32位，请重新输入！');

        return false;
    }
    if (key.length < keylen) {
        alertbar = d3.select('#alertbar2');
        alertblock = alertbar.append('div');
        alertblock.attr('class', 'alert alert-danger');
        alertblock.append('button')
            .attr('type', 'button')
            .attr('class', 'close')
            .attr('data-dismiss', 'alert')
            .text('×');
        alertblock.append('h4')
            .text('提示！');
        alertblock.append('p')
            .text('密钥过短，少于32位，请重新输入！');

        return false;
    }

*/
    d3.select('#rsakey2').property('value', rsa_key);
    d3.select('#rsa2').classed('hidden', false);


    keyContent = rsa_key;
    return true;
}



function checkFile(i) {

    filename = d3.select('#inputFile' + i).property('value');

    var pos = filename.lastIndexOf(".");
    var lastname = filename.substring(pos, filename.length); //此处文件后缀名也可用数组方式获得str.split(".")

    function fileInvalid(str) {
        for (var i = 0; i < str.length; i++)
            if ((str[i] != '0') && (str[i] != '1')) return true;
        return false;
    }
    if ((lastname.toLowerCase() != ".txt") || fileInvalid(fileContent)) {
        alertbar = d3.select('#alertbar' + i);
        alertblock = alertbar.append('div');
        alertblock.attr('class', 'alert alert-danger');
        alertblock.append('button')
            .attr('type', 'button')
            .attr('class', 'close')
            .attr('data-dismiss', 'alert')
            .text('×');
        alertblock.append('h4')
            .text('提示！');
        alertblock.append('p')
            .text('不是有效的txt文件，请重新上传！');

        return false;
    } else {
        pos = filename.lastIndexOf("\\");
        fileName = filename.substring(pos + 1, filename.length - 4);
        return true;
    }
}

function upload(input) {
    var xmlDoc;
    //支持chrome IE10

    if (window.FileReader) {
        var file = input.files[0];
        filename = file.name.split(".")[0];
        var reader = new FileReader();
        reader.onload = function() {
            /*console.log(this.result);
            alert(this.result);*/
            fileContent = this.result;
        };
        reader.readAsText(file);
    }
    //支持IE 7 8 9 10
    else if (typeof window.ActiveXObject != 'undefined') {

        xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
        xmlDoc.async = false;
        xmlDoc.load(input.value);
        //alert(xmlDoc.xml);
        fileContent = xmlDoc.xml;
    }
    //支持FF
    else if (document.implementation && document.implementation.createDocument) {
        xmlDoc = document.implementation.createDocument("", "", null);
        xmlDoc.async = false;
        xmlDoc.load(input.value);
        fileContent = xmlDoc.xml;
    } else {
        alert('不支持这种浏览器，请换一种试试');
    }
}

function doSave(value, type, name) {
    var blob;
    if (typeof window.Blob == "function") {
        blob = new Blob([value], {
            type: type
        });
    } else {
        var BlobBuilder = window.BlobBuilder || window.MozBlobBuilder || window.WebKitBlobBuilder || window.MSBlobBuilder;
        var bb = new BlobBuilder();
        bb.append(value);
        blob = bb.getBlob(type);
    }
    var URL = window.URL || window.webkitURL;
    var bloburl = URL.createObjectURL(blob);
    var anchor = document.createElement("a");
    if ('download' in anchor) {
        anchor.style.visibility = "hidden";
        anchor.href = bloburl;
        anchor.download = name;
        document.body.appendChild(anchor);
        var evt = document.createEvent("MouseEvents");
        evt.initEvent("click", true, true);
        anchor.dispatchEvent(evt);
        document.body.removeChild(anchor);
    } else if (navigator.msSaveBlob) {
        navigator.msSaveBlob(blob, name);
    } else {
        location.href = bloburl;
    }
}

function saveFile() {
    doSave(outputContent, "text", fileName + '_output.txt');
}



function Work(i) {
    console.log(i);
    if (i == 1)
        valid = checkKey1() & checkFile(1);
    else {
        valid = checkKey2() & checkFile(2);
    }

    if (!valid) return;
    //console.log(fileContent);
    //console.log(fileName);

    //outputContent = fileContent;
    console.log(keyContent);

    if (i == 1) encode = true;
    else encode = false;
    alertbar = d3.select('#alertbar' + i);
    alertblock = alertbar.append('div');

    if ((!encode) && (fileContent.length % 64 !== 0)) {

        alertblock.attr('class', 'alert alert-danger');
        alertblock.append('button')
            .attr('type', 'button')
            .attr('class', 'close')
            .attr('data-dismiss', 'alert')
            .text('×');
        alertblock.append('h4')
            .text('提示！');
        alertblock.append('p')
            .text('解密失败！请检查密文长度！');


        return;

    }
    console.log(fileContent);

    outputContent = CBC_DES(fileContent, keyContent, encode);


    alertblock.attr('class', 'alert alert-success');
    alertblock.append('button')
        .attr('type', 'button')
        .attr('class', 'close')
        .attr('data-dismiss', 'alert')
        .text('×');
    alertblock.append('h4')
        .text('提示！');
    if (encode) {
        alertblock.append('p')
            .text('加密成功！');
    } else {
        alertblock.append('p')
            .text('解密成功！');
    }

    //d3.select('#key').attr('disabled',false);
    $("#key").removeAttr("disabled");
    d3.select('#output' + i).classed('hidden', false);
    d3.select('#result' + i).text(outputContent);
    //  saveFile();


}
