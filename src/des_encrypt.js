var IP_perm = new Array(-1,
    58, 50, 42, 34, 26, 18, 10, 2,
    60, 52, 44, 36, 28, 20, 12, 4,
    62, 54, 46, 38, 30, 22, 14, 6,
    64, 56, 48, 40, 32, 24, 16, 8,
    57, 49, 41, 33, 25, 17, 9, 1,
    59, 51, 43, 35, 27, 19, 11, 3,
    61, 53, 45, 37, 29, 21, 13, 5,
    63, 55, 47, 39, 31, 23, 15, 7);

// IP ^ (-1)
var FP_perm = new Array(-1,
    40, 8, 48, 16, 56, 24, 64, 32,
    39, 7, 47, 15, 55, 23, 63, 31,
    38, 6, 46, 14, 54, 22, 62, 30,
    37, 5, 45, 13, 53, 21, 61, 29,
    36, 4, 44, 12, 52, 20, 60, 28,
    35, 3, 43, 11, 51, 19, 59, 27,
    34, 2, 42, 10, 50, 18, 58, 26,
    33, 1, 41, 9, 49, 17, 57, 25);

// per-round expansion
var E_perm = new Array(-1,
    32, 1, 2, 3, 4, 5,
    4, 5, 6, 7, 8, 9,
    8, 9, 10, 11, 12, 13,
    12, 13, 14, 15, 16, 17,
    16, 17, 18, 19, 20, 21,
    20, 21, 22, 23, 24, 25,
    24, 25, 26, 27, 28, 29,
    28, 29, 30, 31, 32, 1);

// per-round permutation
var P_perm = new Array(-1,
    16, 7, 20, 21, 29, 12, 28, 17,
    1, 15, 23, 26, 5, 18, 31, 10,
    2, 8, 24, 14, 32, 27, 3, 9,
    19, 13, 30, 6, 22, 11, 4, 25);

// 8 S-Boxes
var S1 = new Array(
    14, 4, 13, 1, 2, 15, 11, 8, 3, 10, 6, 12, 5, 9, 0, 7,
    0, 15, 7, 4, 14, 2, 13, 1, 10, 6, 12, 11, 9, 5, 3, 8,
    4, 1, 14, 8, 13, 6, 2, 11, 15, 12, 9, 7, 3, 10, 5, 0,
    15, 12, 8, 2, 4, 9, 1, 7, 5, 11, 3, 14, 10, 0, 6, 13);
var S2 = new Array(
    15, 1, 8, 14, 6, 11, 3, 4, 9, 7, 2, 13, 12, 0, 5, 10,
    3, 13, 4, 7, 15, 2, 8, 14, 12, 0, 1, 10, 6, 9, 11, 5,
    0, 14, 7, 11, 10, 4, 13, 1, 5, 8, 12, 6, 9, 3, 2, 15,
    13, 8, 10, 1, 3, 15, 4, 2, 11, 6, 7, 12, 0, 5, 14, 9);
var S3 = new Array(
    10, 0, 9, 14, 6, 3, 15, 5, 1, 13, 12, 7, 11, 4, 2, 8,
    13, 7, 0, 9, 3, 4, 6, 10, 2, 8, 5, 14, 12, 11, 15, 1,
    13, 6, 4, 9, 8, 15, 3, 0, 11, 1, 2, 12, 5, 10, 14, 7,
    1, 10, 13, 0, 6, 9, 8, 7, 4, 15, 14, 3, 11, 5, 2, 12);
var S4 = new Array(
    7, 13, 14, 3, 0, 6, 9, 10, 1, 2, 8, 5, 11, 12, 4, 15,
    13, 8, 11, 5, 6, 15, 0, 3, 4, 7, 2, 12, 1, 10, 14, 9,
    10, 6, 9, 0, 12, 11, 7, 13, 15, 1, 3, 14, 5, 2, 8, 4,
    3, 15, 0, 6, 10, 1, 13, 8, 9, 4, 5, 11, 12, 7, 2, 14);
var S5 = new Array(
    2, 12, 4, 1, 7, 10, 11, 6, 8, 5, 3, 15, 13, 0, 14, 9,
    14, 11, 2, 12, 4, 7, 13, 1, 5, 0, 15, 10, 3, 9, 8, 6,
    4, 2, 1, 11, 10, 13, 7, 8, 15, 9, 12, 5, 6, 3, 0, 14,
    11, 8, 12, 7, 1, 14, 2, 13, 6, 15, 0, 9, 10, 4, 5, 3);
var S6 = new Array(
    12, 1, 10, 15, 9, 2, 6, 8, 0, 13, 3, 4, 14, 7, 5, 11,
    10, 15, 4, 2, 7, 12, 9, 5, 6, 1, 13, 14, 0, 11, 3, 8,
    9, 14, 15, 5, 2, 8, 12, 3, 7, 0, 4, 10, 1, 13, 11, 6,
    4, 3, 2, 12, 9, 5, 15, 10, 11, 14, 1, 7, 6, 0, 8, 13);
var S7 = new Array(
    4, 11, 2, 14, 15, 0, 8, 13, 3, 12, 9, 7, 5, 10, 6, 1,
    13, 0, 11, 7, 4, 9, 1, 10, 14, 3, 5, 12, 2, 15, 8, 6,
    1, 4, 11, 13, 12, 3, 7, 14, 10, 15, 6, 8, 0, 5, 9, 2,
    6, 11, 13, 8, 1, 4, 10, 7, 9, 5, 0, 15, 14, 2, 3, 12);
var S8 = new Array(
    13, 2, 8, 4, 6, 15, 11, 1, 10, 9, 3, 14, 5, 0, 12, 7,
    1, 15, 13, 8, 10, 3, 7, 4, 12, 5, 6, 11, 0, 14, 9, 2,
    7, 11, 4, 1, 9, 12, 14, 2, 0, 6, 10, 13, 15, 3, 5, 8,
    2, 1, 14, 7, 4, 10, 8, 13, 15, 12, 9, 0, 3, 5, 6, 11);

//generate the subkey: permutation choice 1
var PC_1_perm = new Array(-1,
    // C subkey bits
    57, 49, 41, 33, 25, 17, 9, 1, 58, 50, 42, 34, 26, 18,
    10, 2, 59, 51, 43, 35, 27, 19, 11, 3, 60, 52, 44, 36,
    // D subkey bits
    63, 55, 47, 39, 31, 23, 15, 7, 62, 54, 46, 38, 30, 22,
    14, 6, 61, 53, 45, 37, 29, 21, 13, 5, 28, 20, 12, 4);

//generate the subkey: permutation choice 2
var PC_2_perm = new Array(-1,
    14, 17, 11, 24, 1, 5, 3, 28, 15, 6, 21, 10,
    23, 19, 12, 4, 26, 8, 16, 7, 27, 20, 13, 2,
    41, 52, 31, 37, 47, 55, 30, 40, 51, 45, 33, 48,
    44, 49, 39, 56, 34, 53, 46, 42, 50, 36, 29, 32);



function num_to_bits(a, start, bitnum, val) {
    for (var j = bitnum - 1; j >= 0; j--) {
        a[start + j] = val & 1;
        val >>= 1;
    }
}

function do_permutation(dest, src, perm) {
    for (var i = 1; i < perm.length; i++)
        dest[i] = src[perm[i]];
}

function array_xor(a, b) {
    for (var i = 1; i < a.length; i++)
        a[i] ^= b[i];
}

function do_one_Sbox(SBox, index, inbits) {

    var S_index = inbits[index] * 32 + inbits[index + 5] * 16 +
        inbits[index + 1] * 8 + inbits[index + 2] * 4 +
        inbits[index + 3] * 2 + inbits[index + 4];

    return SBox[S_index];
}

// one round of DES
function des_round(L, R, Kr) {

  var Sres = new Array(33);
  var R_expend = new Array(49);
    // L = old R, R = old L xor f(old R, K)
    var tmpL = new Array(33);
    for (i = 0; i < 33; i++) {
        tmpL[i] = L[i];
        L[i] = R[i];
    }


    //function f:

    // expand R
    do_permutation(R_expend, R, E_perm);


    array_xor(R_expend, Kr);

    // put into the S-Boxes
    num_to_bits(Sres, 1, 4, do_one_Sbox(S1, 1, R_expend));
    num_to_bits(Sres, 5, 4, do_one_Sbox(S2, 7, R_expend));
    num_to_bits(Sres, 9, 4, do_one_Sbox(S3, 13, R_expend));
    num_to_bits(Sres, 13, 4, do_one_Sbox(S4, 19, R_expend));
    num_to_bits(Sres, 17, 4, do_one_Sbox(S5, 25, R_expend));
    num_to_bits(Sres, 21, 4, do_one_Sbox(S6, 31, R_expend));
    num_to_bits(Sres, 25, 4, do_one_Sbox(S7, 37, R_expend));
    num_to_bits(Sres, 29, 4, do_one_Sbox(S8, 43, R_expend));


    do_permutation(R, Sres, P_perm);

    // get new R
    array_xor(R, tmpL);

}

function lsh_CD_1(CD) {
    var i;

    // note we use [0] to hold the bit shifted around the end
    for (i = 0; i <= 55; i++)
        CD[i] = CD[i + 1];

    // shift D bit around end
    CD[56] = CD[28];
    // shift C bit around end
    CD[28] = CD[0];
}

function lsh_CD_2(CD) {
    var i;
    var C1 = CD[1];

    // note we use [0] to hold the bit shifted around the end
    for (i = 0; i <= 54; i++)
        CD[i] = CD[i + 2];

    // shift D bits around end
    CD[55] = CD[27];
    CD[56] = CD[28];
    // shift C bits around end
    CD[27] = C1;
    CD[28] = CD[0];
}


// do the actual DES encryption/decryption
function des_encrypt(data, Key, encode) {
    //console.log(data);
    var tempData = new Array(65);
    var CD = new Array(57);
    var SubKeys = new Array(16);
    var L = new Array(33);
    var R = new Array(33);
    var result = new Array(65);
    var i;

    // permutation choice 1
    do_permutation(CD, Key, PC_1_perm);

    // create the subkeys
    for (i = 1; i <= 6; i++) {
        SubKeys[i] = new Array(49);
        if (i == 1 || i == 2)
            lsh_CD_1(CD);
        else
            lsh_CD_2(CD);

        do_permutation(SubKeys[i], CD, PC_2_perm);
    }

    //IP
    do_permutation(tempData, data, IP_perm);

    // split data into L & R
    for (i = 1; i <= 32; i++) {
        L[i] = tempData[i];
        R[i] = tempData[i + 32];
    }

    if (encode) {
        for (i = 1; i <= 6; i++) {
            des_round(L, R, SubKeys[i]);
        }
    } else {
        for (i = 6; i >= 1; i--) {
            des_round(L, R, SubKeys[i]);
        }
    }

    for (i = 1; i <= 32; i++) {
        tempData[i] = R[i];
        tempData[i + 32] = L[i];
    }

    //IP^-1
    do_permutation(result, tempData, FP_perm);
    return result;
}
