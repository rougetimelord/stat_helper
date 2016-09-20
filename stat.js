var _run = 0;
var arrOps = {
    get arrA() {
        var str = document.getElementById('inp').value.split(',').map(Number);
        return str.sort(function (a, b) { return a - b; });
    },
    get out() {
        delete this.out;
        return this.out = document.getElementById('res');
    },
    get mean() {
        var a = arrOps.arrA;
        var res = 0;
        for (var i = 0; i < a.length; i++) {
            res += a[i];
        }
        return res / a.length;
    },
    get mode(){
        var a = arrOps.arrA;
        var res = [], num = [], res2 = [];
        for (var i = 0; i < a.length; i++) {
            if (num.indexOf(a[i]) === -1) {
                res.push([a[i], 1]);
                num.push(a[i]);
            }
            else {
                res[num.indexOf(a[i])][1]++;
            }
        }
        res = res.sort(function (a, b) { return b[1] - a[1] });
        var all = !0, max = 0;
        for (var i = 0; i < res.length; i++) {
            if (res[i][1] >= max) {
                max = res[i][1];
                res2.push(res[i][0]);
            }
            if (i < res.length - 1 && res[i][1] != res[i + 1][1]) {
                all = !1;
                break;
            }
        }
        if (all)
            res2 = ["No mode"];
        return res2;
    },
    median: function (a) {
        var half = Math.floor(a.length / 2);
        if (a.length % 2 == 1)
            return { ans: a[half], half: half, incl: !0 };
        else {
            var avg = a[half-1] + a[half];
            return { ans: avg/2, half: half, incl: !1 };
        }
    }
}
var stOps = {
    bWdat : function () {
        var array = arrOps.arrA;
        var min = array[0];
        var max = array[array.length - 1];
        var ret = arrOps.median(array);
        var med = ret.ans;
        var q1, q3;
        if (ret.incl) {
            var a1 = array.slice(0, ret.half + 1), a2 = array.slice(ret.half, array.length + 1);
            q1 = arrOps.median(a1).ans;
            q3 = arrOps.median(a2).ans;
        }
        else {
            var a1 = array.slice(0, ret.half), a2 = array.slice(ret.half, array.length + 1);
            q1 = arrOps.median(a1).ans;
            q3 = arrOps.median(a2).ans;
        }
        output('p', ar2Str([min,q1,med,q3,max]), 'array');
        _run++;
    },
    outliers : function () {
        var array = arrOps.arrA;
        var ret = arrOps.median(array);
        var q1, q3, ans = new Array();
        if (ret.incl) {
            var a1 = array.slice(0, ret.half + 1), a2 = array.slice(ret.half, array.length + 1);
            q1 = arrOps.median(a1).ans;
            q3 = arrOps.median(a2).ans;
        }
        else {
            var a1 = array.slice(0, ret.half), a2 = array.slice(ret.half, array.length + 1);
            q1 = arrOps.median(a1).ans;
            q3 = arrOps.median(a2).ans;
        }
        var diff = (q3 - q1) * 1.5;
        var q1Diff = q1 - diff, q3Diff = q3 + diff;
        for (var i = 0; i < Math.ceil(array.length / 4); i++) {
            if (array[i] < q1Diff)
                ans.push(array[i]);
        }
        for (var j = array.length - 1 - Math.floor(array.length / 4); j < array.length; j++) {
            if (array[j] > q3Diff)
                ans.push(array[j])
        }
        if (ans.length === 0)
            ans.push('No outliers');
        output('p', ar2Str(ans), 'array');
        _run++;
    },
    meanMode: function () {
        var array = arrOps.arrA;
        var mean = arrOps.mean;
        var mode = arrOps.mode;
        output('p', ar2Str([mean, ar2Str(mode)]), 'array');
    },
    arrange: function () {
        output('p', ar2Str(arrOps.arrA), 'array');
    }
}
var ar2Str = function (a) {
    var result = "[";
    for (var i = 0; i < a.length; i++) {
        if(i < a.length - 1)
            result += a[i] + ", ";
        else
            result += a[i]
    }
    result += "]";
    return result;
}
var output = function (tag, content, classN) {
    var el = document.createElement(tag);
    el.innerText = content;
    el.classList.add(classN, _run);
    arrOps.out.appendChild(el);
    scroller();
}
var init = function () {
    console.log('Initiating');
    document.getElementById('btn').addEventListener("click", stOps.bWdat);
    document.getElementById('btn1').addEventListener("click", stOps.outliers);
    document.getElementById('btn2').addEventListener("click", stOps.meanMode);
    document.getElementById('btn3').addEventListener("click", stOps.arrange)
}
setTimeout(init, 100);