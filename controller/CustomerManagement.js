// controller/CustomerManagement.js
import { add_customer, delete_customer, get_customers, get_customer_detail, update_customer } from "../model/CustomerModel.js";

let selected_row = null;

// ==================== Load Customer Table =======================
const load_customer_table = () => {
    $("#customer_tbl_body").empty();

    let customer_list = get_customers();

    customer_list.map((obj, index) => {
        let tbl_row = `
        <tr data-index="${index}">
            <td>${obj.id}</td>
            <td>${obj.name}</td>
            <td>${obj.contact}</td>
            <td>${obj.address}</td>
        </tr>`;
        $("#customer_tbl_body").append(tbl_row);
    });
};

// ==================== Add Customer =======================
$("#customer_save_btn").on("click", function () {
    let id = $("#cust_id").val();
    let name = $("#cust_name").val();
    let contact = $("#cust_contact").val();
    let address = $("#cust_address").val();

    if (!id || !name || !contact || !address) {
        Swal.fire("Error", "Please fill all fields", "error");
        return;
    }

    add_customer(id, name, contact, address);
    load_customer_table();
    $("#customer_reset_btn").click();

    Swal.fire("Success", "Customer added successfully!", "success");
});

// ==================== Select Customer =======================
$("#customer_tbl_body").on('click', 'tr', function () {
    selected_row = $(this).data('index');
    let customer_obj = get_customer_detail(selected_row);

    $("#cust_id").val(customer_obj.id);
    $("#cust_name").val(customer_obj.name);
    $("#cust_contact").val(customer_obj.contact);
    $("#cust_address").val(customer_obj.address);
});

// ==================== Update Customer =======================
$("#customer_update_btn").on("click", () => {
    if (selected_row === null) {
        Swal.fire("Warning", "Please select a customer to update", "warning");
        return;
    }

    let id = $("#cust_id").val();
    let name = $("#cust_name").val();
    let contact = $("#cust_contact").val();
    let address = $("#cust_address").val();

    update_customer(selected_row, id, name, contact, address);
    load_customer_table();
    $("#customer_reset_btn").click();

    Swal.fire("Updated!", "Customer updated successfully.", "success");
});

// ==================== Delete Customer =======================
$("#customer_delete_btn").on('click', () => {
    if (selected_row === null) {
        Swal.fire("Warning", "Please select a customer first!", "warning");
        return;
    }

    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {
        if (result.isConfirmed) {
            delete_customer(selected_row);
            load_customer_table();
            $("#customer_reset_btn").click();
            selected_row = null;

            Swal.fire("Deleted!", "Customer record removed.", "success");
        }
    });
});

// ==================== Reset Form =======================
$("#customer_reset_btn").on("click", function () {
    $("#cust_id").val("");
    $("#cust_name").val("");
    $("#cust_contact").val("");
    $("#cust_address").val("");
    selected_row = null;
});

// ==================== Initialize =======================
$(document).ready(function () {
    load_customer_table();
});
