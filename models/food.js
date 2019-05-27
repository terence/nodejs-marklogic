class Food {
    constructor(){
        this.name = null;
        this.price = null;
    }

    initModel (data) {
        this.name = data.name;
        this.price = data.price
    }

    getPrice () { return this.price;}

    setPrice (price) { this.price = price; }

    getName () {this.name;}

    setName (name) {this.name = name;}

    equals (otherFood) {
        return otherFood.getName() == this.getName()
            && otherFood.getPrice() == this.getPrice();
    }

    fill (newFields) {
        for (let field in newFields) {
            if (this.hasOwnProperty(field) && newFields.hasOwnProperty(field)) {
                if (this[field] !== 'undefined') {
                    this[field] = newFields[field];
                }
            }
        }
    };
    
}

