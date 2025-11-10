class OrderDTO {
    constructor(order_id, customer_id, items, total, date, status = 'Pending') {
        this._order_id = order_id;
        this._customer_id = customer_id;
        this._items = items; // Array of {item_code, quantity, price}
        this._total = total;
        this._date = date;
        this._status = status;
    }

    get order_id() {
        return this._order_id;
    }

    set order_id(value) {
        this._order_id = value;
    }

    get customer_id() {
        return this._customer_id;
    }

    set customer_id(value) {
        this._customer_id = value;
    }

    get items() {
        return this._items;
    }

    set items(value) {
        this._items = value;
    }

    get total() {
        return this._total;
    }

    set total(value) {
        this._total = value;
    }

    get date() {
        return this._date;
    }

    set date(value) {
        this._date = value;
    }

    get status() {
        return this._status;
    }

    set status(value) {
        this._status = value;
    }

    toObject() {
        return {
            order_id: this._order_id,
            customer_id: this._customer_id,
            items: this._items,
            total: this._total,
            date: this._date,
            status: this._status
        };
    }
}

export default OrderDTO;