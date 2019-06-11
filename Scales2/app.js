var Apple = /** @class */ (function () {
    function Apple(_scale) {
        this.name = "apple";
        this.scale = _scale;
    }
    Apple.prototype.getScale = function () {
        return this.scale;
    };
    Apple.prototype.getName = function () {
        return this.name;
    };
    return Apple;
}());
var Tomat = /** @class */ (function () {
    function Tomat(_scale) {
        this.name = "tomat";
        this.scale = _scale;
    }
    Tomat.prototype.getScale = function () {
        return this.scale;
    };
    Tomat.prototype.getName = function () {
        return this.name;
    };
    return Tomat;
}());
var Scales = /** @class */ (function () {
    function Scales() {
        //products:Array<Apple|Tomat>=[];
        this.products = [];
    }
    Scales.prototype.add = function (product) {
        this.products.push(product);
    };
    Scales.prototype.getSumScale = function () {
        var sum = 0;
        this.products.forEach(function (prod) { sum += prod.getScale(); });
        return sum;
    };
    Scales.prototype.getNameList = function () {
        var names = [];
        this.products.forEach(function (prod) { names.push(prod.getName()); });
        return names;
    };
    return Scales;
}());
var apple1 = new Apple(1);
var apple2 = new Apple(2);
var tomat1 = new Tomat(1);
var tomat2 = new Tomat(2);
var Scales1 = new Scales();
Scales1.add(apple1);
Scales1.add(apple2);
Scales1.add(tomat1);
Scales1.add(tomat2);
console.log("Sum: " + Scales1.getSumScale());
console.log("Names: " + Scales1.getNameList());
//# sourceMappingURL=app.js.map