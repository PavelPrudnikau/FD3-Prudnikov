class Scales {
    products:Array<Product>=[];

    add(product:Product):void {
        this.products.push(product);
    }
    
    getSumScale():number {
        var sum:number = 0;
        for(let i=0;i<this.products.length;i++)
        { 
           sum += this.products[i].getScale();
        }
        //this.products.forEach( prod => {sum += prod.getScale()} );
        return sum;
    }
}

class Product {

    name: string;
    scale: number;

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

class Apple extends Product {
    
    constructor(_scale:number) {
        super("apple", _scale);
    }
}

class Tomat extends Product {
    
    constructor(_scale:number) {
        super("tomat", _scale);
    }
}

let apple1:Apple=new Apple(1);
let apple2:Apple=new Apple(2);
let tomat1:Apple=new Tomat(1);
let tomat2:Apple=new Tomat(2);

let Scales1:Scales = new Scales();

Scales1.add(apple1);
Scales1.add(apple2);
Scales1.add(tomat1);
Scales1.add(tomat2);

console.log( "Sum: " + Scales1.getSumScale() );
