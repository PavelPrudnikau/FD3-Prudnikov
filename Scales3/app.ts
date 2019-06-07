
interface IStorageEngine {

    addItem(item:Product):void;
    getItem(index:number):Product;
    getCount():number;

}
class Product {

    private name: string;
    private scale: number;

    constructor(_name:string, _scale:number) {
        this.name=_name;
        this.scale=_scale;
    }

    getScale():number {
        return this.scale;
    }

    getName():string {
        return this.name;
    }
}

class ScalesStorageEngineArray implements IStorageEngine {
    
    products:Array<Product>=[];

    addItem(item: Product):void {
        this.products.push(item);
    };
    getItem(index: number): Product{
        return this.products[index];
    };
    getCount(): number{
        return this.products.length;
    };
}


class ScalesStorageEngineLocalStorage implements IStorageEngine {

    LStorage:any;
    
    constructor (){
        this.LStorage=window.localStorage;
        this.LStorage.setItem('storageEngine', JSON.stringify([]));
    }      

    addItem(item:Product):void{
        let myStorage  = this.LStorage.getItem ('storageEngine');
        myStorage=JSON.parse(myStorage); 
        myStorage.push(item);
        
        this.LStorage.setItem( 'storageEngine' , JSON.stringify(myStorage));
    }
    
    getItem(index: number):Product{   
        let myStorage  = this.LStorage.getItem ('storageEngine');
        myStorage=JSON.parse(myStorage);           
        // add methods           
        return new Product (myStorage[index].name, myStorage[index].scale);
    }

    getCount():number{
        let myStorage  = this.LStorage.getItem ('storageEngine');
        myStorage=JSON.parse (myStorage);
        
        return myStorage.length;
    }     
}

class Scales<StorageEngine extends IStorageEngine> {
    
    storage: StorageEngine;

    constructor(_storage:StorageEngine) {
        this.storage=_storage;
    }

    add(product:Product):void {
        this.storage.addItem(product);
    }

    getSumScale():number{
        let sum:number = 0;
        let qnt:number = this.storage.getCount();
        for(let i=0;i<qnt;i++)
        {
            let item=this.storage.getItem(i);
            sum += item.getScale();
        }
        return sum;
    }

    getNameList():Array<string>{
        var names:Array<string> = [];
        let qnt:number = this.storage.getCount();
        for(let i=0;i<qnt;i++)
        { 
            let item=this.storage.getItem(i);
            names.push(item.getName());
        }
        return names;
    }
}

let product0 = new Product('Product0', 1);
let product1 = new Product('Product1', 2);
let product2 = new Product('Product2', 3);
let product3 = new Product('Product3', 4);

let scales1 = new Scales(new ScalesStorageEngineArray);
scales1.add(product0);
scales1.add(product1);
scales1.add(product2);
scales1.add(product3);

console.log("Sum_Array: "   + scales1.getSumScale());
console.log("Names_Array: " + scales1.getNameList());

let scales2 = new Scales(new ScalesStorageEngineLocalStorage);

scales2.add(product0);
scales2.add(product1);
scales2.add(product2);
scales2.add(product3);

console.log("Sum_LS: "   + scales2.getSumScale());
console.log("Names_LS: " + scales2.getNameList());
