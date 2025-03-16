//$(document).ready(function () {
//    debugger;
//    $('#btnSubmit').click(function (event) {
//        debugger;
//        nameofbusiness = $("#nameofbusiness").val();
//        $.ajax({
//            type: "POST",
//            url: "/Badhaaiya/Profiledetails",
//            data: nameofbusiness:nameofbusiness,
//            dataType: "json",
//            success: function (data) {
//                alert(data.msg);
//            },
//            error: function () {
//                alert("Error occured!!")
//            }
//        });
//    });
//});


$(document).ready(function () {
    // Load dropdown values on page load
    loadDropdown('BusinessCategory', '#businessCategoryDropdown');
    debugger;

    $.ajax({
        url: '/Badhaaiya/GetBookings',
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            debugger;
            if (data.length > 0) {
                var rows = '';
                var bookings = []; // Array to store parsed booking objects

                // Group data into booking objects
                for (var i = 0; i < data.length; i++) {
                    var booking = {};
                    $.each(data[i], function (index, item) {
                        booking[item.Key] = item.Value;
                    });
                    bookings.push(booking);
                }

                // Iterate over each booking and generate table rows
                $.each(bookings, function (index, booking) {
                    var bookingId = booking.BookingId || '';
                    var customerDetails = booking.CustomerDetails || 'N/A';
                    var bookingStatus = booking.BookingStatus || 'Unknown';
                    var bookingType = booking.BookingType || 'Unknown';
                    var paymentStatus = booking.PaymentStatus || 'Unknown';
                    var serviceLocation = booking.ServiceLocation || 'Unknown';

                    // Extract date from the StartDate field and format it
                    var startDateValue = booking.StartDate || '';
                    var startDate = startDateValue ? new Date(parseInt(startDateValue.match(/\d+/)[0])) : null;
                    var formattedDate = startDate ? startDate.toLocaleDateString('en-US', {
                        year: 'numeric', month: 'short', day: 'numeric'
                    }) : 'Invalid Date';

                    rows += '<tr>';
                    rows += '<td>' + (index + 1) + '</td>';
                    rows += '<td>' + customerDetails + '</td>';
                    rows += '<td><span class="badge light badge-' + (bookingStatus === "Accepted" ? "success" : "danger") + '"><i class="fa fa-circle text-' + (bookingStatus === "Accepted" ? "success" : "danger") + ' mr-1"></i>' + bookingStatus + '</span></td>';
                    rows += '<td><span class="badge light badge-warning"><i class="fa fa-circle text-warning mr-1"></i>' + bookingType + '</span></td>';
                    rows += '<td>' + formattedDate + '</td>';
                    rows += '<td><span class="badge light badge-' + (paymentStatus === "Full Payment" ? "success" : "warning") + '"><i class="fa fa-circle text-' + (paymentStatus === "Full Payment" ? "success" : "warning") + ' mr-1"></i>' + paymentStatus + '</span></td>';
                    rows += '<td>' + serviceLocation + '</td>';
                    rows += '<td>';
                    rows += '<div class="dropdown ml-auto text-center">';
                    rows += '<div class="btn-link" data-toggle="dropdown">';
                    rows += '<svg width="24px" height="24px" viewBox="0 0 24 24" version="1.1">';
                    rows += '<g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">';
                    rows += '<rect x="0" y="0" width="24" height="24"></rect>';
                    rows += '<circle fill="#000000" cx="5" cy="12" r="2"></circle>';
                    rows += '<circle fill="#000000" cx="12" cy="12" r="2"></circle>';
                    rows += '<circle fill="#000000" cx="19" cy="12" r="2"></circle>';
                    rows += '</g></svg></div>';
                    rows += '<div class="dropdown-menu dropdown-menu-right">';
                    rows += '<button class="dropdown-item accept-booking-btn" data-toggle="modal" data-target="#accept_alert" data-booking-id="' + bookingId + '">Accept Booking</button>';
                    rows += '<button class="dropdown-item reject-booking-btn" data-toggle="modal" data-target="#reject_alert" data-booking-id="' + bookingId + '">Reject Booking</button>';
                    rows += '<a href="/Badhaaiya/ViewBookingDetails/' + bookingId + '"><button class="dropdown-item" data-booking-id="' + bookingId + '">View Booking Details</button></a>';
                    rows += '</div></div></td>';
                    rows += '</tr>';
                });
                $('#booking-tbody').html(rows);
            } else {
                $('#booking-tbody').html('<tr><td colspan="8" class="text-center">No data available</td></tr>');
            }
        },
        error: function () {
            alert('Failed to fetch data.');
        }
    });






    $('#btnSubmit').on('click', function (e) {
        e.preventDefault();
        debugger;
        var nameofbusiness = $("#nameofbusiness").val();
        var data = {
            nameofbusiness: nameofbusiness
        };

        // Make the AJAX request
        $.ajax({
            type: 'POST',
            url: '/Badhaaiya/Profiledetails',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(data),
            success: function (response) {
                // Handle success response
                alert('Data submitted successfully');
            },
            error: function (error) {
                // Handle error response
                alert('Error submitting data');
            }
        });
    });




    function loadDropdown(type, elementId) {
        debugger;
        $.ajax({
            url: '/Badhaaiya/GetDropdownValues',
            type: 'GET',
            data: { dropdownType: type },
            success: function (data) {
                $(elementId).empty();
                $.each(data, function (index, value) {
                    $(elementId).append($('<option>', {
                        value: value,
                        text: value
                    }));
                });
            }
        });
    }



    // Logout from this device
    $('#logout').on('click', function () {
        swal.fire({
            title: 'Are you sure?',
            text: 'You will be logged out from this device.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, logout',
            cancelButtonText: 'Cancel'
        }).then((result) => {
            if (result.isConfirmed) {
                $.ajax({
                    url: '/Account/Logout',  // Endpoint to handle logout from current device
                    type: 'POST',
                    success: function (response) {
                        if (response.success) {
                            swal.fire({
                                title: 'Logged out!',
                                text: response.message,
                                icon: 'success',
                                confirmButtonText: 'OK'
                            }).then(() => {
                                window.location.href = '/Account/Login';  // Redirect to login page
                            });
                        } else {
                            swal.fire('Error', response.message, 'error');
                        }
                    },
                    error: function (xhr, status, error) {
                        swal.fire('Error', 'An error occurred: ' + error, 'error');
                    }
                });
            }
        });
    });

    // Logout from all devices
    $('#logoutall').on('click', function () {
        swal.fire({
            title: 'Are you sure?',
            text: 'You will be logged out from all devices.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, logout all',
            cancelButtonText: 'Cancel'
        }).then((result) => {
            if (result.isConfirmed) {
                $.ajax({
                    url: '/Account/LogoutAllDevices',  // Endpoint to handle logout from all devices
                    type: 'POST',
                    success: function (response) {
                        if (response.success) {
                            swal.fire({
                                title: 'Logged out!',
                                text: response.message,
                                icon: 'success',
                                confirmButtonText: 'OK'
                            }).then(() => {
                                window.location.href = '/Account/Login';  // Redirect to login page
                            });
                        } else {
                            swal.fire('Error', response.message, 'error');
                        }
                    },
                    error: function (xhr, status, error) {
                        swal.fire('Error', 'An error occurred: ' + error, 'error');
                    }
                });
            }
        });
    });







    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        // Initialize SmartWizard with custom toolbar settings
        $('#smartwizard').smartWizard({
            selected: 0,  // Initial selected step
            theme: 'dots', // Theme for the wizard
            transition: {
                animation: 'fade', // None/fade/slide-horizontal/slide-vertical/slide-swing
                speed: '400'
            },
            toolbarSettings: {
                toolbarPosition: 'bottom',  // Show toolbar at the bottom
                toolbarExtraButtons: [
                    $('<button></button>').text('Submit')  // Create the Submit button
                        .addClass('btn btn-success sw-btn-submit')  // Add classes to the Submit button
                        .attr('type', 'button')  // Set button type
                        .hide()  // Hide the Submit button initially
                        .on('click', function () {  // Add click event handler
                            // Handle form submission logic here
                            alert('Form submitted!');
                            // You can also submit the form programmatically:
                            // $('form').submit(); // If your form is ready for submission
                        })
                ]
            }
        });

        // Function to update the visibility of the Next and Submit buttons
        function updateButtons() {
            var currentStep = $('#smartwizard').smartWizard('getStepIndex'); // Get the current step index
            var totalSteps = $('#smartwizard .nav-link').length; // Get the total number of steps

            if (currentStep === totalSteps - 1) { // If it's the last step
                $('.sw-btn-next').hide(); // Hide the "Next" button
                $('.sw-btn-submit').show();   // Show the "Submit" button
            } else {
                $('.sw-btn-next').show();  // Show the "Next" button
                $('.sw-btn-submit').hide();    // Hide the "Submit" button
            }
        }

        // Event handler for when the step changes
        $("#smartwizard").on("showStep", function (e, anchorObject, stepNumber, stepDirection) {
            updateButtons();  // Update the buttons when the step changes
        });

        // Initialize the buttons on page load
        updateButtons();
    





});
