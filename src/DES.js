
function changeFormat(data, key, fileInput, keyInput) {

  data[0] = -1;
  key[0] = -1;

  for (var i = 0; i < fileInput.length; i++)
    data[i + 1] = fileInput[i] - '0';

  keyInput.toLowerCase();

  for (i = 0; i < keyInput.length; i++) {
    if (('0' <= key[i]) && (key[i] <= '9')) {
      num = keyInput[i] - '0';
    }
    else
      num = keyInput[i] - 'a' + 10;

    for (var j = 4; j >= 1; j--)  {
      key[i * 4 + j] = num & 1;
      num >>= 1;
    }
  }

}


function DES(fileInput, keyInput, encode) {
  //console.log(fileInput, keyInput, encode);

  //use data[1~64] && key[1~64]
  data = new Array(65);
  key = new Array(65);
  changeFormat(data, key, fileInput, keyInput);
//  console.log(data);
//  console.log(key);

  return fileInput;

}
