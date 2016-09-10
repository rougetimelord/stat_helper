var _out, _run = 0;
var arrOps = {
    asc: function(array) {
        return array.sort(function(a,b){return a-b;});
    },
    dec: function (array) {
        return array.sort(function(a,b){return b-a;});
    },
    get arr() {
        var str = document.getElementById('inp').replace(' ', '').split(',');
        return arrOps.asc(str);
    },
    ar2Str: function (a) {
        var result = "[";
        for (var i = 0; i < a.length; i++) {
            if(i < a.length - 1)
                result += a[i] + ", ";
            else
                resul += a[i]
        }
        result += "]";
        return result;
    }
}
var output = function (tag, content, classN) {
    var el = document.createElement(tag);
    el.innerText = content;
    el.classList.add(classN, _run);
    _out.appendChild(el);
}
var stats = function () {
    var array = arrOps.arr;
    output('p', arrOps.ar2Str(array), 'array');
    _run++;
}
var addListeners = function () {
    _out = document.getElementById('res');
    var b = document.getElementById('btn');
    b.addEventListener("click", stats, false);
}
document.addEventListener("DOMContentLoaded", addListeners, false);
