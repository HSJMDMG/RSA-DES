var p, q, e, d, n, t;

var zero, one, two;
zero = new BigInteger('0');
one = new BigInteger('1');
two = new BigInteger('2');

function exp(x, k, md) {
    //  console.log('ReachExp')
    if (k.equals(new BigInteger('0'))) return new BigInteger('1');
    //  console.log('ReachExp')
    if (k.equals(new BigInteger('1'))) return x;
    //  console.log('ReachExp')

    var ans = new BigInteger('0');
    //  console.log('ReachExp')
    ans = exp(x, k.divide(new BigInteger('2')), md);
    //    console.log('ReachExp')
    ans = (ans.square()).mod(md);
    if ((k.mod(two)).equals(one)) ans = (ans.multiply(x)).mod(md);
    //  console.log(x.toString(), k.toString(), md.toString());
    return ans;
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

    function ExtendEuclid(a, b, parameter) {
        if (b.equals(zero)) {
            parameter.x = one.clone();
            parameter.y = zero.clone();
            return a.clone();
        }

        /*
        x = x + y;
        y = x -y;
        x = x -y
        */
        var tmp;
        tmp = (parameter.x).clone();
        parameter.x = (parameter.y).clone();
        parameter.y = tmp.clone();


        var gcd = ExtendEuclid(b, a.mod(b), parameter);

        tmp = (parameter.x).clone();
        parameter.x = (parameter.y).clone();
        parameter.y = tmp.clone();


        parameter.y = parameter.y.subtract((a.divide(b)).multiply(parameter.x));
        return gcd;
    }

    function GeneratePrime() {
        // p : 64bit, q: 65 bit
        function checkPrime(n) {
            // Use Miller-Rabin Method
            if (n.equals(one)) return false;

            sp = [3, 5, 7];
            for (i = 0; i < sp.length; i++)
                if ((n.mod(new BigInteger(sp[i].toString()))).equals(zero)) return false;

            m = n.subtract(one);
            k = 0;
            while ((m.mod(two)).equals(zero)) {
                k++;
                m = m.shiftRight(1);
            }
            //  console.log(k);
            //  return true;
            times = 5;
            for (i = 0; i < times; i++) {
                // a in [2, n - 2]
                //    console.log(i);
                a = (Math.floor(n * Math.random()) + 1) % (n - 1) + 1;
                a = new BigInteger(a.toString());
                //  console.log('GetA');
                b = exp(a, m, n);
                //    console.log('GetB');
                if (b.equals(one) || b.equals(new BigInteger((n - 1).toString())))
                    continue;
                pass = false;
                for (var j = 0; j < k; j++) {
                    b = exp(b, two, n);
                    // if (b === 1) return false;
                    if (b.equals(new BigInteger((n - 1).toString()))) {
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
        //cnt = 0;
        while (!checkPrime(tp)) {
            //  console.log(cnt);
            //  cnt++;
            tp = new BigInteger('1');
            for (i = 0; i < lenp - 2; i++) {
                //  console.log(tp.toString());
                bit = (Math.random() - 0.5 > 0) ? 1 : 0;
                tp = tp.shiftLeft(1);
                //  console.log(tp.toString());
                tp = tp.add(new BigInteger(bit.toString()));
            }
            //  console.log(tp);
            tp = tp.shiftLeft(1);
            tp = tp.add(new BigInteger(bit.toString()));
            //  console.log(tp.toString());
        }


        while (!checkPrime(tq)) {
            //  console.log(cnt);
            //  cnt++;
            tq = new BigInteger('1');
            for (i = 0; i < lenq - 2; i++) {
                //  console.log(tp.toString());
                bit = (Math.random() - 0.5 > 0) ? 1 : 0;
                tq = tq.shiftLeft(1);
                //  console.log(tp.toString());
                tq = tq.add(new BigInteger(bit.toString()));
            }
            //  console.log(tp);
            tq = tq.shiftLeft(1);
            tq = tq.add(new BigInteger(bit.toString()));
            //  console.log(tp.toString());
        }


        /*
        while (!checkPrime(tq)) {
            tq = 1;
            for (i = 0; i < lenq - 2; i++) {
                bit = (Math.random() - 0.5 > 0) ? 1 : 0;
                tq = (tq << 1) + bit;
            }
            tq = (tq << 1) + 1;
        }

        */
        p = tp;
        q = tq;
        console.log(p.toString(), q.toString());


    }

    function BigIntRandom(n) {
        //[0,n]
        len = 66;
        //  console.log(len)
        ans = new BigInteger('0');
        for (var i = 0; i < len; i++) {
            //console.log(i);
            bit = (Math.random() - 0.5 > 0) ? 1 : 0;
            ans = ans.shiftLeft(1);
            //  console.log(tp.toString());
            ans = ans.add(new BigInteger(bit.toString()));
        }
        //    console.log(ans.mod(n.add(one)).toString());
        return ans.mod(n.add(one));
    }

    GeneratePrime();

    n = p.multiply(q);
    phin = (p.subtract(one)).multiply((q.subtract(one)));
    d = BigIntRandom(phin.subtract(one.add(two))).add(two);

    parameter = {
        x: new BigInteger('0'),
        y: new BigInteger('1')
    };
    cnt = 0;
    while (!(ExtendEuclid(d, phin, parameter).equals(one))) {
        cnt++;
        console.log(cnt);
        d = BigtIntRandom(phin.subtract(one.add(two))).add(two);
    }

    e = ((parameter.x.mod(phin)).add(phin)).mod(phin);
    console.log(d.toString(), e.toString(), phin.toString());

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
