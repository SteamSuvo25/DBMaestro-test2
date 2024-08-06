$(document).ready(function() {
    // Function to create a new row
    function createNewRow() {
        return `
            <div class="row mb-3 align-items-end">
                <div class="col-md-5">
                    <label class="form-label">First Input</label>
                    <input type="text" class="form-control" placeholder="Enter first text">
                </div>
                <div class="col-md-5">
                    <label class="form-label">Second Input</label>
                    <input type="text" class="form-control" placeholder="Enter second text">
                </div>
                <div class="col-md-2 text-end">
                    <button type="button" class="btn btn-primary add-more-button">Add More</button>
                </div>
            </div>`;
    }

    // Function to handle adding a new row
    function addNewRow() {
        // Append the new row to the container
        $('#dynamicFieldsContainer').append(createNewRow());

        // Rebind the click event to the new button
        bindAddMoreButton();
    }

    // Function to bind the click event to the "Add More" button
    function bindAddMoreButton() {
        $('.add-more-button').off('click').on('click', function() {
            addNewRow();
        });
    }

    // Initial binding of the "Add More" button
    bindAddMoreButton();
});
