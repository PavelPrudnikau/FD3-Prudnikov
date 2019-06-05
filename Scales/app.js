var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Scales = /** @class */ (function () {
    function Scales() {
        this.products = [];
    }
    Scales.prototype.add = function (product) {
        this.products.push(product);
    };
    Scales.prototype.getSumScale = function () {
        var sum = 0;
        for (var i = 0; i < this.products.length; i++) {
            sum += this.products[i].getScale();
        }
        //this.products.forEach( prod => {sum += prod.getScale()} );
        return sum;
    };
    return Scales;
}());
var Product = /** @class */ (function () {
    function Product(_name, _scale) {
        this.name = _name;
        this.scale = _scale;
    }
    Product.prototype.getScale = function () {
        return this.scale;
    };
    Product.prototype.getName = function () {
        return this.name;
    };
    return Product;
}());
var Apple = /** @class */ (function (_super) {
    __extends(Apple, _super);
    function Apple(_scale) {
        return _super.call(this, "apple", _scale) || this;
    }
    return Apple;
}(Product));
var Tomat = /** @class */ (function (_super) {
    __extends(Tomat, _super);
    function Tomat(_scale) {
        return _super.call(this, "tomat", _scale) || this;
    }
    return Tomat;
}(Product));
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
/*
car1.show();
car1.start(100);
car1.show();
car1.stop();
car1.show();

car1.beep();

let ship1:Ship=new Ship();

ship1.show();
ship1.setSail(true);
ship1.show();
ship1.setSail(false);
ship1.show();

ship1.start(100);
ship1.show();
ship1.stop();
ship1.show();
*/ 
//# sourceMappingURL=app.js.map