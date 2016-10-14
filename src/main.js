

fileContent = '';
fileName = '';
outputContent ='';

function checkKey() {
  document.getElementById('alertbar').innerHTML="";
  key = d3.select('#key').property('value');

  //check for length
  keylen = 5;
  if (key.length > keylen) {
    alertbar = d3.select('#alertbar');
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
              .text('密钥过长，超过64位，请重新输入！');

    return false;
  }
  if (key.length < keylen) {
    alertbar = d3.select('#alertbar');
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
              .text('密钥过短，少于64位，请重新输入！');
    return false;
  }


  //check for 0/1
  for (var i = 0; i < keylen; i++) {
    if ((key[i] != '0') && (key[i] != '1')){
      alertbar = d3.select('#alertbar');
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

  d3.select('#key').attr('disabled','');
  return true;
}

function checkFile() {
    filename = d3.select('#inputFile').property('value');

    var pos = filename.lastIndexOf(".");
    var lastname = filename.substring(pos,filename.length);  //此处文件后缀名也可用数组方式获得str.split(".")

    if (lastname.toLowerCase()!=".txt") {
      alertbar = d3.select('#alertbar');
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
    }
    else
      {
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
  else if (typeof window.ActiveXObject != 'undefined'){

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
        blob = new Blob([value], {type: type});
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

function Work(encode, input) {
  valid = checkKey() & checkFile();

  if (!valid) return true;
  console.log(fileContent);
  console.log(fileName);
  outputContent = fileContent;

  //outputContent = DES(fileContent, encode)
  saveFile();


}
