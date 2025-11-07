class OrderDTO {
    constructor(order_id, customer_name, order_date, item_qty, total_amount) {
        this._order_id = order_id;
        this._customer_name = customer_name;
        this._order_date = order_date;
        this._item_qty = item_qty;
        this._total_amount = total_amount;
    }

    get order_id() {
        return this._order_id;
    }

    set order_id(value) {
        this._order_id = value;
    }

    get customer_name() {
        return this._customer_name;
    }

    set customer_name(value) {
        this._customer_name = value;
    }

    get order_date() {
        return this._order_date;
    }

    set order_date(value) {
        this._order_date = value;
    }

    get item_qty() {
        return this._item_qty;
    }

    set item_qty(value) {
        this._item_qty = value;
    }

    get total_amount() {
        return this._total_amount;
    }

    set total_amount(value) {
        this._total_amount = value;
    }

}