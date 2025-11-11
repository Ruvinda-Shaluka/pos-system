import {
    add_order,
    get_recent_orders,
    get_todays_orders,
    get_todays_revenue
} from "../model/OrderModel.js";
import { get_customers } from "../model/CustomerModel.js";
import { get_items } from "../model/ItemModel.js";

let currentOrder = {
    customer_id: null,
    customer_name: '',
    items: [],
    subtotal: 0,
    tax: 0,
    total: 0,
    notes: ''
};

let initialized = false;

// ==================== Load Customers for Dropdown =======================
const load_customer_options = () => {
    const $customerSelect = $("#customerSelect");
    if (!$customerSelect.length) return;

    $customerSelect.empty();
    $customerSelect.append('<option selected>Choose customer...</option>');

    const customers = get_customers();
    customers.forEach(customer => {
        $customerSelect.append(`<option value="${customer.customer_id}">${customer.name}</option>`);
    });
};

// ==================== Load Available Items =======================
const load_available_items = () => {
    const $availableItemsTable = $("#available-items-table tbody");
    if (!$availableItemsTable.length) return;

    $availableItemsTable.empty();

    const items = get_items();
    if (items.length === 0) {
        $availableItemsTable.append(`
            <tr>
                <td colspan="5" class="text-center text-muted">No items available</td>
            </tr>
        `);
        return;
    }

    items.forEach(item => {
        const row = `
        <tr data-item-code="${item.item_code}">
            <td>${item.name}</td>
            <td>${item.category}</td>
            <td>$${item.price.toFixed(2)}</td>
            <td>${item.stock}</td>
            <td>
                <button class="btn btn-sm btn-outline-primary add-to-order-btn" 
                        data-item-code="${item.item_code}"
                        data-item-name="${item.name}"
                        data-item-price="${item.price}"
                        data-item-stock="${item.stock}">
                    <i class="bi bi-plus-circle"></i> Add
                </button>
            </td>
        </tr>`;
        $availableItemsTable.append(row);
    });
};

// ==================== Add Item to Order =======================
const add_item_to_order = (item_code, item_name, item_price, item_stock) => {
    // Check if item already exists in order
    const existingItemIndex = currentOrder.items.findIndex(item => item.item_code === item_code);

    if (existingItemIndex !== -1) {
        // Increase quantity if item already exists
        currentOrder.items[existingItemIndex].quantity += 1;
        currentOrder.items[existingItemIndex].subtotal = currentOrder.items[existingItemIndex].quantity * currentOrder.items[existingItemIndex].price;
    } else {
        // Add new item to order
        currentOrder.items.push({
            item_code: item_code,
            name: item_name,
            price: item_price,
            quantity: 1,
            subtotal: item_price
        });
    }

    update_order_summary();
    load_order_items_table();
};

// ==================== Remove Item from Order =======================
const remove_item_from_order = (item_code) => {
    currentOrder.items = currentOrder.items.filter(item => item.item_code !== item_code);
    update_order_summary();
    load_order_items_table();
};

// ==================== Update Item Quantity =======================
const update_item_quantity = (item_code, newQuantity) => {
    if (newQuantity < 1) {
        remove_item_from_order(item_code);
        return;
    }

    const itemIndex = currentOrder.items.findIndex(item => item.item_code === item_code);
    if (itemIndex !== -1) {
        currentOrder.items[itemIndex].quantity = newQuantity;
        currentOrder.items[itemIndex].subtotal = currentOrder.items[itemIndex].quantity * currentOrder.items[itemIndex].price;
        update_order_summary();
        load_order_items_table();
    }
};

// ==================== Load Order Items Table =======================
const load_order_items_table = () => {
    const $orderItemsTable = $("#order-items");
    if (!$orderItemsTable.length) return;

    $orderItemsTable.empty();

    if (currentOrder.items.length === 0) {
        $orderItemsTable.append(`
            <tr>
                <td colspan="6" class="text-center text-muted">No items added to order</td>
            </tr>
        `);
        return;
    }

    currentOrder.items.forEach(item => {
        const row = `
        <tr data-item-code="${item.item_code}">
            <td>${item.name}</td>
            <td>$${item.price.toFixed(2)}</td>
            <td>${item.quantity}</td>
            <td>
                <div class="input-group input-group-sm" style="width: 120px;">
                    <button class="btn btn-outline-secondary minus-btn" type="button" data-item-code="${item.item_code}">-</button>
                    <input type="number" class="form-control text-center quantity-input" 
                           value="${item.quantity}" min="1" data-item-code="${item.item_code}">
                    <button class="btn btn-outline-secondary plus-btn" type="button" data-item-code="${item.item_code}">+</button>
                </div>
            </td>
            <td>$${item.subtotal.toFixed(2)}</td>
            <td>
                <button class="btn btn-sm btn-outline-danger remove-item-btn" data-item-code="${item.item_code}">
                    <i class="bi bi-trash"></i>
                </button>
            </td>
        </tr>`;
        $orderItemsTable.append(row);
    });
};

// ==================== Update Order Summary =======================
const update_order_summary = () => {
    currentOrder.subtotal = currentOrder.items.reduce((sum, item) => sum + item.subtotal, 0);
    currentOrder.tax = currentOrder.subtotal * 0.10; // 10% tax
    currentOrder.total = currentOrder.subtotal + currentOrder.tax;

    // Update UI
    $("#order-subtotal").text(`$${currentOrder.subtotal.toFixed(2)}`);
    $("#order-tax").text(`$${currentOrder.tax.toFixed(2)}`);
    $("#order-total").text(`$${currentOrder.total.toFixed(2)}`);
};

// ==================== Place Order =======================
const place_order = () => {
    // Validate order
    if (!currentOrder.customer_id) {
        Swal.fire("Error", "Please select a customer", "error");
        return;
    }

    if (currentOrder.items.length === 0) {
        Swal.fire("Error", "Please add at least one item to the order", "error");
        return;
    }

    if (currentOrder.total <= 0) {
        Swal.fire("Error", "Order total must be greater than 0", "error");
        return;
    }

    // Get order notes
    currentOrder.notes = $("#orderNotes").val();

    // Add order to database
    const newOrder = add_order(
        currentOrder.customer_id,
        currentOrder.customer_name,
        currentOrder.items,
        currentOrder.subtotal,
        currentOrder.tax,
        currentOrder.total,
        currentOrder.notes
    );

    // Reset order
    reset_order();

    // Update dashboard
    update_dashboard_stats();
    load_recent_orders();

    Swal.fire("Success", `Order ${newOrder.order_id} placed successfully!`, "success");
};

// ==================== Reset Order =======================
const reset_order = () => {
    currentOrder = {
        customer_id: null,
        customer_name: '',
        items: [],
        subtotal: 0,
        tax: 0,
        total: 0,
        notes: ''
    };

    $("#customerSelect").val('Choose customer...');
    $("#orderNotes").val('');
    update_order_summary();
    load_order_items_table();
};

// ==================== Update Dashboard Stats =======================
const update_dashboard_stats = () => {
    const todaysOrders = get_todays_orders();
    const todaysRevenue = get_todays_revenue();

    $("#today-orders").text(todaysOrders.length);
    $("#today-revenue").text(`$${todaysRevenue.toFixed(2)}`);
};

// ==================== Load Recent Orders =======================
const load_recent_orders = () => {
    const $recentOrdersTable = $("#recent-orders-table tbody");
    if (!$recentOrdersTable.length) return;

    $recentOrdersTable.empty();

    const recentOrders = get_recent_orders(5);

    if (recentOrders.length === 0) {
        $recentOrdersTable.append(`
            <tr>
                <td colspan="7" class="text-center text-muted">No recent orders</td>
            </tr>
        `);
        return;
    }

    recentOrders.forEach(order => {
        const totalItems = order.items.reduce((sum, item) => sum + item.quantity, 0);
        const row = `
        <tr>
            <td>${order.order_id}</td>
            <td>${order.customer_name}</td>
            <td>${order.date}</td>
            <td>${totalItems}</td>
            <td>$${order.total.toFixed(2)}</td>
            <td><span class="badge bg-success">${order.status}</span></td>
            <td>
                <button class="btn btn-sm btn-outline-primary view-order-btn" data-order-id="${order.order_id}">
                    <i class="bi bi-eye"></i> View
                </button>
            </td>
        </tr>`;
        $recentOrdersTable.append(row);
    });
};

// ==================== Initialize Order Management =======================
const initializeOrderManagement = () => {
    if (initialized) {
        console.log("Order Management already initialized");
        return;
    }

    console.log("Initializing Order Management...");

    // Load initial data
    load_customer_options();
    load_available_items();
    load_order_items_table();
    load_recent_orders();
    update_dashboard_stats();

    // Customer selection
    $("#customerSelect").on("change", function() {
        const selectedCustomerId = $(this).val();
        if (selectedCustomerId && selectedCustomerId !== 'Choose customer...') {
            const customers = get_customers();
            const selectedCustomer = customers.find(c => c.customer_id === selectedCustomerId);
            if (selectedCustomer) {
                currentOrder.customer_id = selectedCustomer.customer_id;
                currentOrder.customer_name = selectedCustomer.name;
            }
        } else {
            currentOrder.customer_id = null;
            currentOrder.customer_name = '';
        }
    });

    // Add item to order
    $(document).on("click", ".add-to-order-btn", function() {
        const itemCode = $(this).data("item-code");
        const itemName = $(this).data("item-name");
        const itemPrice = $(this).data("item-price");
        const itemStock = $(this).data("item-stock");

        add_item_to_order(itemCode, itemName, itemPrice, itemStock);

        // Close modal after adding item
        $("#addItemToOrderModal").modal("hide");
    });

    // Remove item from order
    $(document).on("click", ".remove-item-btn", function() {
        const itemCode = $(this).data("item-code");
        remove_item_from_order(itemCode);
    });

    // Quantity controls
    $(document).on("click", ".plus-btn", function() {
        const itemCode = $(this).data("item-code");
        const item = currentOrder.items.find(item => item.item_code === itemCode);
        if (item) {
            update_item_quantity(itemCode, item.quantity + 1);
        }
    });

    $(document).on("click", ".minus-btn", function() {
        const itemCode = $(this).data("item-code");
        const item = currentOrder.items.find(item => item.item_code === itemCode);
        if (item) {
            update_item_quantity(itemCode, item.quantity - 1);
        }
    });

    // Quantity input change
    $(document).on("change", ".quantity-input", function() {
        const itemCode = $(this).data("item-code");
        const newQuantity = parseInt($(this).val()) || 1;
        update_item_quantity(itemCode, newQuantity);
    });

    // Place order button
    $("#place-order-btn").on("click", place_order);

    // Reset order when section is shown
    $(document).on("sectionChanged", function(event, section) {
        if (section === 'place-order') {
            reset_order();
            load_customer_options();
            load_available_items();
        }
    });

    initialized = true;
    console.log("Order Management initialized successfully");
};

export { initializeOrderManagement, update_dashboard_stats, load_recent_orders };