class CustomerDTO {
    constructor(customer_id, name, email, phone, address) {
        this._customer_id = customer_id;
        this._name = name;
        this._email = email;
        this._phone = phone;
        this._address = address;
    }


    get customer_id() {
        return this._customer_id;
    }

    set customer_id(value) {
        this._customer_id = value;
    }

    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }

    get email() {
        return this._email;
    }

    set email(value) {
        this._email = value;
    }

    get phone() {
        return this._phone;
    }

    set phone(value) {
        this._phone = value;
    }

    get address() {
        return this._address;
    }

    set address(value) {
        this._address = value;
    }
}