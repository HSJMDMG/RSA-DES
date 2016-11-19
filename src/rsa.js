var p, q, e, d, n, t;


function exp(x, k, md) {
    if (k.equals(new BigInteger('0'))) return new BigInteger('1');
    if (k.equals(new BigInteger('1'))) return x;

    var ans = new BigInteger('0');
    ans = exp(x, k.divide(2), md);
    ans = (ans.square()).mod(md);
    if ((k.mod(2)).equals(new BigInteger('1'))) ans = (ans.multiply(x)).mod(md);
    return ans;
}

function ExtendEuclid(a, b, parameter) {
    if (b === 0) {
        parameter.x = 1;
        parameter.y = 0;
        return a;
    }
    var tmp;
    tmp = parameter.x;
    parameter.x = parameter.y;
    parameter.y = tmp;


    var gcd = ExtendEuclid(b, a % b, parameter);

    tmp = parameter.x;
    parameter.x = parameter.y;
    parameter.y = tmp;


    parameter.y -= parseInt((a / b)) * parameter.x;
    return gcd;
}


function GenerateKeyPair_smallnum_bak() {


    function show_ne() {
        d3.select('#rsa-output').classed('hidden', false);
        d3.select('#keypair').text("n:" + n.toString(16) + "          e:" + e.toString(16));

        d3.select('#secret').text("p:" + p.toString(16) + "          q:" + q.toString(16) + "          d:" + d.toString(16));


    }


    function GeneratePrime() {
        // p : 64bit, q: 65 bit
        function checkPrime(n) {
            // Use Miller-Rabin Method
            if (n === 1) return false;

            sp = [3, 5, 7, 9, 11];
            for (i = 0; i < sp.length; i++)
                if (n % sp[i] === 0) return false;

            m = n - 1;
            k = 0;
            while ((m & 1) === 0) {
                k++;
                m >>= 1;
            }

            times = 5;
            for (i = 0; i < times; i++) {
                // a in [2, n - 2]
                a = (Math.floor(n * Math.random()) + 1) % (n - 1) + 1;
                b = exp(a, m, n);

                if (b === 1 || b == (n - 1)) continue;
                pass = false;
                for (var j = 0; j < k; j++) {
                    b = (b * b) % n;
                    // if (b === 1) return false;
                    if (b == (n - 1)) {
                        pass = true;
                        break;
                    }
                }
                if (!pass) return false;
            }

            return true;


        }
        var tp, tq;
        tp = 1;
        tq = 1;
        lenp = 5;
        lenq = 5;

        while (!checkPrime(tp)) {
            tp = 1;
            for (i = 0; i < lenp - 2; i++) {
              //  console.log(tp);
                bit = (Math.random() - 0.5 > 0) ? 1 : 0;
                tp = (tp << 1) + bit;
            }
          //  console.log(tp);
            tp = (tp << 1) + 1;
          //  console.log(tp);
        }


        while (!checkPrime(tq)) {
            tq = 1;
            for (i = 0; i < lenq - 2; i++) {
                bit = (Math.random() - 0.5 > 0) ? 1 : 0;
                tq = (tq << 1) + bit;
            }
            tq = (tq << 1) + 1;
        }

        p = tp;
        q = tq;
        console.log(p, q);



    }


    GeneratePrime();
    n = p * q;
    phin = (p - 1) * (q - 1);
    d = parseInt(Math.random() * n);

    parameter = {
        x: 0,
        y: 0
    };
    while (d === 0 || ExtendEuclid(d, phin, parameter) != 1) {
        d = parseInt(Math.random() * n);
    }

    e = (parameter.x % phin + phin) % phin;
    console.log(d, e, phin);

    show_ne();
}



function GenerateKeyPair() {


    function show_ne() {
        d3.select('#rsa-output').classed('hidden', false);
        d3.select('#keypair').text("n:" + n.toString(16) + "          e:" + e.toString(16));

        d3.select('#secret').text("p:" + p.toString(16) + "          q:" + q.toString(16) + "          d:" + d.toString(16));


    }


    function GeneratePrime() {
        // p : 64bit, q: 65 bit
        function checkPrime(n) {
            // Use Miller-Rabin Method
            if (n.equals(new BigInteger('1'))) return false;

            sp = [3, 5, 7, 9, 11];
            for (i = 0; i < sp.length; i++)
                if (n.mod(new BigInteger(sp[i].toString())) === 0) return false;

            m = n.subtract(new BigInteger('1'));
            k = 0;
            while ((m.mod(new BigInteger('2'))) === 0) {
                k++;
                m = m.shiftRight(1);
            }

            times = 5;
            for (i = 0; i < times; i++) {
                // a in [2, n - 2]
                a = (Math.floor(n * Math.random()) + 1) % (n - 1) + 1;
                a = new BigInteger(a.toString());

                b = exp(a, m, n);

                if (b.equals(new BigInteger('1')) || b.equals(new BigInteger((n-1).toString()))) continue;
                pass = false;
                for (var j = 0; j < k; j++) {
                    b = exp(b, 2, n);
                    // if (b === 1) return false;
                    if (b.equals(new BigInteger((n-1).toString()))) {
                        pass = true;
                        break;
                    }
                }
                if (!pass) return false;
            }

            return true;


        }
        var tp, tq;
        tp = new BigInteger('1');
        tq = new BigInteger('1');

        lenp = 64;
        lenq = 65;

        while (!checkPrime(tp)) {

            for (i = 0; i < lenp - 2; i++) {
                console.log(tp.toString());
                bit = (Math.random() - 0.5 > 0) ? 1 : 0;
                tp = tp.shiftLeft(1);
              //  console.log(tp.toString());
                tp = tp.add(new BigInteger(bit.toString()));
            }
          //  console.log(tp);
          tp = tp.shiftLeft(1);
          tp = tp.add(new BigInteger(bit.toString()));
          console.log(tp.toString());
        }

        console.log(tp.toString());

/*
        while (!checkPrime(tq)) {
            tq = 1;
            for (i = 0; i < lenq - 2; i++) {
                bit = (Math.random() - 0.5 > 0) ? 1 : 0;
                tq = (tq << 1) + bit;
            }
            tq = (tq << 1) + 1;
        }

        p = tp;
        q = tq;
        console.log(p, q);

*/

    }


    GeneratePrime();
    n = p * q;
    phin = (p - 1) * (q - 1);
    d = parseInt(Math.random() * n);

    parameter = {
        x: 0,
        y: 0
    };
    while (d === 0 || ExtendEuclid(d, phin, parameter) != 1) {
        d = parseInt(Math.random() * n);
    }

    e = (parameter.x % phin + phin) % phin;
    console.log(d, e, phin);

    show_ne();
}



function RSA_encode(m) {
    m = parseInt(m, 16);
    c = exp(m, e, n);
    c = c.toString(16);
    return c;
}


function RSA_decode(c) {
    c = parseInt(c, 16);
    m = exp(c, d, n);
    m = m.toString(16);

    return m;
}
