class ItemDTO {
    constructor(item_code, name, category, price, stock) {
        this._item_code = item_code;
        this._name = name;
        this._category = category;
        this._price = price;
        this._stock = stock;
    }

    get item_code() {
        return this._item_code;
    }

    set item_code(value) {
        this._item_code = value;
    }

    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }

    get category() {
        return this._category;
    }

    set category(value) {
        this._category = value;
    }

    get price() {
        return this._price;
    }

    set price(value) {
        this._price = value;
    }

    get stock() {
        return this._stock;
    }

    set stock(value) {
        this._stock = value;
    }

    toObject() {
        return {
            item_code: this._item_code,
            name: this._name,
            category: this._category,
            price: this._price,
            stock: this._stock
        };
    }
}

export default ItemDTO;