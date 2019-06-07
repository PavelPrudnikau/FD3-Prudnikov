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
var ScalesStorageEngineArray = /** @class */ (function () {
    function ScalesStorageEngineArray() {
        this.products = [];
    }
    ScalesStorageEngineArray.prototype.addItem = function (item) {
        this.products.push(item);
    };
    ;
    ScalesStorageEngineArray.prototype.getItem = function (index) {
        return this.products[index];
    };
    ;
    ScalesStorageEngineArray.prototype.getCount = function () {
        return this.products.length;
    };
    ;
    return ScalesStorageEngineArray;
}());
var ScalesStorageEngineLocalStorage = /** @class */ (function () {
    function ScalesStorageEngineLocalStorage() {
        this.LStorage = window.localStorage;
        this.LStorage.setItem('storageEngine', JSON.stringify([]));
    }
    ScalesStorageEngineLocalStorage.prototype.addItem = function (item) {
        var myStorage = this.LStorage.getItem('storageEngine');
        myStorage = JSON.parse(myStorage);
        myStorage.push(item);
        this.LStorage.setItem('storageEngine', JSON.stringify(myStorage));
    };
    ScalesStorageEngineLocalStorage.prototype.getItem = function (index) {
        var myStorage = this.LStorage.getItem('storageEngine');
        myStorage = JSON.parse(myStorage);
        // add methods           
        return new Product(myStorage[index].name, myStorage[index].scale);
    };
    ScalesStorageEngineLocalStorage.prototype.getCount = function () {
        var myStorage = this.LStorage.getItem('storageEngine');
        myStorage = JSON.parse(myStorage);
        return myStorage.length;
    };
    return ScalesStorageEngineLocalStorage;
}());
var Scales = /** @class */ (function () {
    function Scales(_storage) {
        this.storage = _storage;
    }
    Scales.prototype.add = function (product) {
        this.storage.addItem(product);
    };
    Scales.prototype.getSumScale = function () {
        var sum = 0;
        var qnt = this.storage.getCount();
        for (var i = 0; i < qnt; i++) {
            var item = this.storage.getItem(i);
            sum += item.getScale();
        }
        return sum;
    };
    Scales.prototype.getNameList = function () {
        var names = [];
        var qnt = this.storage.getCount();
        for (var i = 0; i < qnt; i++) {
            var item = this.storage.getItem(i);
            names.push(item.getName());
        }
        return names;
    };
    return Scales;
}());
var product0 = new Product('Product0', 1);
var product1 = new Product('Product1', 2);
var product2 = new Product('Product2', 3);
var product3 = new Product('Product3', 4);
var scales1 = new Scales(new ScalesStorageEngineArray);
scales1.add(product0);
scales1.add(product1);
scales1.add(product2);
scales1.add(product3);
console.log("Sum_Array: " + scales1.getSumScale());
console.log("Names_Array: " + scales1.getNameList());
var scales2 = new Scales(new ScalesStorageEngineLocalStorage);
scales2.add(product0);
scales2.add(product1);
scales2.add(product2);
scales2.add(product3);
console.log("Sum_LS: " + scales2.getSumScale());
console.log("Names_LS: " + scales2.getNameList());
//# sourceMappingURL=app.js.map