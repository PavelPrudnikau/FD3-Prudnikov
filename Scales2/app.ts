interface IScalable {

    getScale():number;
    getName():string;

}

class Apple implements IScalable {

    name: string;
    scale: number;

    constructor(_scale:number) {
        this.name = "apple";
        this.scale = _scale;
    }

    getScale():number {
        return this.scale;
    }

    getName():string {
        return this.name;
    }    
}

class Tomat implements IScalable {

    name: string;
    scale: number;

    constructor(_scale:number) {
        this.name = "tomat";
        this.scale = _scale;
    }

    getScale():number {
        return this.scale;
    }

    getName():string {
        return this.name;
    }    
}

class Scales {
    //products:Array<Apple|Tomat>=[];
    products:IScalable[]=[];

    add(product:IScalable):void {
        this.products.push(product);
    }
    
    getSumScale():number {
        var sum:number = 0;
        this.products.forEach( prod => {sum += prod.getScale()} );
        return sum;
    }

    getNameList():Array<string> {
        var names:Array<string> = [];
        this.products.forEach( prod => {names.push( prod.getName() )} );
        return names;
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
console.log( "Names: " + Scales1.getNameList() );
