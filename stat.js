Array.prototype.equals = function (array) {
    // if the other array is a falsy value, return
    if (!array)
        return false;

    // compare lengths - can save a lot of time 
    if (this.length != array.length)
        return false;

    for (var i = 0, l = this.length; i < l; i++) {
        // Check if we have nested arrays
        if (this[i] instanceof Array && array[i] instanceof Array) {
            // recurse into the nested arrays
            if (!this[i].equals(array[i]))
                return false;
        }
        else if (this[i] != array[i]) {
            // Warning - two different object instances will never be equal: {x:20} != {x:20}
            return false;
        }
    }
    return true;
}

var _run = 0;
var dataSet = { array: null, min: null, q1: null, med: null, q3: null, max: null, mean: null, mode: null, outliers: null };
var arrOps = {
    get arrA() {
        var str = document.getElementById('inp').value.split(',').map(Number);
        var arr = str.sort(function (a, b) { return a - b; });
        if (arr.equals(dataSet.array)) {
            return arr;
        }
        else {
            console.log("New data");
            dataSet = { array: null, min: null, q1: null, med: null, q3: null, max: null, mean: null, mode: null, outliers: null };
            dataSet.array = arr;
            return arr;
        }

    },
    get out() {
        delete this.out;
        return this.out = document.getElementById('res');
    },
    get mean() {
        if (dataSet.mean === null) {
            console.log("Mean getter called");
            var a = arrOps.arrA;
            var res = 0;
            for (var i = 0; i < a.length; i++) {
                res += a[i];
            }
            dataSet.mean = res / a.length;
            return res / a.length;
        }
        else
            return dataSet.mean;
    },
    get mode() {
        if (dataSet.mode === null) {
            console.log("Mode getter called");
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
            dataSet.mode = res2;
            return res2;
        }
        else
            return dataSet.mode;
    },
    median: function (a) {
        console.log("Median getter called")
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
        var min, max, ret;
        if (dataSet.min === null) {
            min = array[0];
            dataSet.min = min
        }
        else
            min = dataSet.min;
        if (dataSet.max === null) {
            max = array[array.length - 1];
            dataSet.max = max
        }
        else
            max = dataSet.max;
        if (dataSet.med === null) {
            ret = arrOps.median(array);
            dataSet.med = ret;
        }
        else
            ret = dataSet.med;
        var med = ret.ans,q1, q3;
        if (dataSet.q1 === null || dataSet.q3 === null) {
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
            dataSet.q1 = q1;
            dataSet.q3 = q3;
        }
        else {
            q1 = dataSet.q1;
            q3 = dataSet.q3;
        }
        output('p', ar2Str([min,q1,med,q3,max]), 'array');
        _run++;
    },
    outliers : function () {
        var array = arrOps.arrA;
        var ret;
        if (dataSet.med === null) {
            ret = arrOps.median(array);
            dataSet.med = ret;
        }
        else
            ret = dataSet.med;
        var q1, q3, ans = new Array();
        if (dataSet.outliers === null) {
            if (dataSet.q1 === null || dataSet.q3 === null) {
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
                dataSet.q1 = q1;
                dataSet.q3 = q3;
            }
            else {
                q1 = dataSet.q1;
                q3 = dataSet.q3;
            }
            var diff = (q3 - q1) * 1.5;
            var q1Diff = q1 - diff, q3Diff = q3 + diff;
            for (var i = 0; i < Math.ceil(array.length / 4) ; i++) {
                if (array[i] < q1Diff)
                    ans.push(array[i]);
            }
            for (var j = array.length - 1 - Math.floor(array.length / 4) ; j < array.length; j++) {
                if (array[j] > q3Diff)
                    ans.push(array[j])
            }
            if (ans.length === 0)
                ans.push('No outliers');
            dataSet.outliers = ans;
        }
        else
            ans = dataSet.outliers;
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