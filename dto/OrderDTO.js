class OrderDTO {
    constructor(order_id, customer_id, customer_name, items, subtotal, tax, total, date, status = 'Pending', notes = '') {
        this._order_id = order_id;
        this._customer_id = customer_id;
        this._customer_name = customer_name;
        this._items = items; // Array of {item_code, name, quantity, price, subtotal}
        this._subtotal = subtotal;
        this._tax = tax;
        this._total = total;
        this._date = date;
        this._status = status;
        this._notes = notes;
    }

    get order_id() {
        return this._order_id;
    }

    get customer_id() {
        return this._customer_id;
    }

    get customer_name() {
        return this._customer_name;
    }

    get items() {
        return this._items;
    }

    get subtotal() {
        return this._subtotal;
    }

    get tax() {
        return this._tax;
    }

    get total() {
        return this._total;
    }

    get date() {
        return this._date;
    }

    get status() {
        return this._status;
    }

    set status(value) {
        this._status = value;
    }

    get notes() {
        return this._notes;
    }

    toObject() {
        return {
            order_id: this._order_id,
            customer_id: this._customer_id,
            customer_name: this._customer_name,
            items: this._items,
            subtotal: this._subtotal,
            tax: this._tax,
            total: this._total,
            date: this._date,
            status: this._status,
            notes: this._notes
        };
    }
}

export default OrderDTO;