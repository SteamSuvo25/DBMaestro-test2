var baseURL = "http://13.127.134.229/";

$(document).ready(function () {
    // Initial binding of the "Add More" button
    bindActionButton();
    getData();

    $('button.btn-primary').on('click', formSubmit);
    $('button.btn-info').on('click', getData);
});

// Function to create a new row
function createNewRow() {
    return `<div class="row mb-3 g-2" data-index="2">
               <div class="col">
                   <div class="form-floating">
                       <input type="text" class="form-control" id="key2" placeholder="Key">
                       <label for="key2">Key</label>
                   </div>
               </div>
               <div class="col">
                   <div class="form-floating">
                       <input type="text" class="form-control" minlength="2" maxlength="10" id="value2" pattern="[A_Z]{1,3}[0-9]{1,7}" placeholder="Value">
                       <label for="value2">Value</label>
                   </div>
               </div>
               <div class="col-auto">
                   <button type="button" class="btn btn-outline-primary action-button">
                       <i class="bi bi-plus-lg fs-3"></i>
                   </button>
               </div>
            </div>`;
}

// Function to bind the click event to the "Add More" button
function bindActionButton() {
    $('.action-button').off('click').on('click', $(this), addRemoveRows);
}

function addRemoveRows(event) {
    if ($(event.currentTarget).hasClass('btn-outline-primary')) {
        addNewRow($(event.currentTarget));
    }
    else if ($(event.currentTarget).hasClass('btn-outline-danger')) {
        removeRow($(event.currentTarget));
    }
}

// Function to handle adding a new row
function addNewRow(elem) {
    elem.removeClass('btn-outline-primary');
    elem.addClass('btn-outline-danger');

    // Change the Add More button from the previous last row to Delete Row
    elem.html('<i class="bi bi-x-lg fs-3"></i>');

    // Append the new row to the container
    $('#dynamicFieldsContainer').append(createNewRow());
    $('#dynamicFieldsContainer').scrollTop($('#dynamicFieldsContainer').prop('scrollHeight'));

    let index = elem.parent().parent().data('index') + 1;
    let lastBlockElem = $('#dynamicFieldsContainer').children().last();

    lastBlockElem.data('index', index);

    $(lastBlockElem.find('.form-control')[0]).prop('id', 'key' + index);
    $(lastBlockElem.find('.form-control')[1]).prop('id', 'value' + index);

    // Rebind the click event to the new button
    bindActionButton();
}

function removeRow(elem) {
    elem.parent().parent().remove();
}

function formSubmit() {
    let range = [];
    let sheetNo = null;

    $('#dynamicFieldsContainer').children().each(function (i) {
        if (i != 0) {
            let elem = $(this).find('.form-control');

            let item = {};

            item["Key"] = $(elem[0]).val();
            item["Value"] = $(elem[1]).val();

            range.push(item);
        }
        else {
            sheetNo = $(this).find('.form-control').val();
        }
    });

    if (range.length > 0) {
        $.ajax({
            method: "POST",
            url: baseURL + "data/Settings",
            contentType: 'application/json',
            data: JSON.stringify({ "SheetNo": sheetNo, "Range": range })
        })
            .done(function (msg) {
                //if (msg.status == true) {
                //    alert("Data Saved Successfully");
                //}
                //else {
                //    alert("Sorry, something went wrong, please try again later");
                //}
                alert(msg.message);
            })
            .fail(function () {
                alert("Some error occured, please try again later");
            });
    }
}

function getData() {
    $.ajax({
        method: "GET",
        url: baseURL + "data/Get",
    })
        .done(function (msg) {
            if (msg.status == true) {
                $('#json-data').html(JSON.stringify(msg, null, 4));
            }
            else {
                alert(msg.message);
            }
        })
        .fail(function () {
            alert("Error occured, please try again later");
        });
}
