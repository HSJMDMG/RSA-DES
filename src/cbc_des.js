
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



var groupSize = 64;

function chExtend(data)
{
  var i;
  cnt = 8;


  while (true) {
    if ((data.length - 1 + 8) % groupSize === 0) {
        for (i = 7; i >= 0; i--) {
          digit = ((1 << i) & cnt) === 0 ? 0 : 1;
          data.push(digit);
        }
        console.log(data.length);
        break;
    }
    data.push(Math.floor(Math.random() * 2));
    cnt++;
  }

}

function chRefine(data)
{
  var i;
  cnt = 0;
  for (i = data.length - 8; i <= data.length - 1; i++)
    cnt = cnt * 2 + data[i];
  for (i = 0; i < cnt; i++)
    data.pop();
  console.log(data.length);

}

function CBC(data) {
  var i, j;
  IV = new Array(65);
  for (i = 0; i <= 64; i++)
    IV[i] = 0;
  IV[0] = -1;

  groupNum = (data.length - 1) / groupSize;
  //  console.log(groupNum, groupSize);

  for (i = 0; i < groupNum; i++)
    for (j = 1; j <= groupSize; j++)
      if (i === 0)
        {
          data[j] ^= IV[j];
        }
      else {
        data[i * groupSize + j] ^= data[(i - 1) * groupSize + j];
      }

}


function ToString(data) {
  str = "";
  for (var i = 1; i < data.length; i++)
    str = str + data[i];
  return str;
}


function CBC_DES(fileInput, keyInput, encode) {
  //console.log(fileInput, keyInput, encode);

  //use data[1~64] && key[1~64]
  var i, j;

  data = new Array([]);
  key = new Array([]);

  changeFormat(data, key, fileInput, keyInput);

  if (encode) {
    chExtend(data);
    CBC(data);
  }

  groupData = new Array(65);
  result = new Array([]);

  for (i = 1;i <= data.length; i++)
    if (i % groupSize === 0) {
      groupData[groupSize] = data[i];
      result.concat(des_encrypt(groupData, key, encode));
    }
    else {
      groupData[i % groupSize] = data[i];
    }



  encode = false;
  result = data;
  if (!encode) {
    CBC(result);
    chRefine(result);
  }


  return ToString(result);

}
