$(document).ready(function () {
    // Disable buttons initially
    $('#mob_num').prop('disabled', true);
    $('#verify_otp').prop('disabled', true);
    $('#resend_otp').prop('disabled', true);

    // Enable Send OTP button if phone number has 10 digits
    $('#phone').on('input', function () {
        debugger;
        if ($(this).val().length === 10) {
            $('#mob_num').prop('disabled', false);
        } else {
            $('#mob_num').prop('disabled', true);
        }
    });

   

    // Enable Verify OTP button if OTP has 6 digits
    $('#otp').on('input', function () {
        if ($(this).val().length === 6) {
            $('#verify_otp').prop('disabled', false);
        } else {
            $('#verify_otp').prop('disabled', true);
        }
    });

    // Send OTP button click handler
    $('#mob_num').click(function () {
        debugger;
        // Disable button to prevent multiple clicks
        $(this).prop('disabled', true);

        // Call server-side method to check if the number exists and send OTP
        $.ajax({
            url: '/Account/SendOTP',
            type: 'POST',
            data: { phone: $('#phone').val() },
            success: function (response) {
                debugger;
                if (response.success) {
                    // Show success message with SweetAlert
                    Swal.fire({
                        title: 'Success!',
                        text: response.message,
                        icon: 'success',
                        confirmButtonText: 'OK'
                    }).then(() => {
                        startResendOtpCountdown(); // Start the OTP resend countdown
                    });
                    $('#phone').prop('disabled', true);
                } else {
                    // Show error message with SweetAlert
                    Swal.fire({
                        title: 'Error!',
                        text: response.message,
                        icon: 'error',
                        confirmButtonText: 'OK'
                    }).then(() => {
                        window.location.href = '/Account/Login'
                    });
                    
                }
            },
            error: function (xhr, status, error) {
                // Show general error message with SweetAlert
                Swal.fire({
                    title: 'Oops...',
                    text: 'Something went wrong! Please try again later.',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            },
            
        });
    });

    // Resend OTP button click handler
    $('#resend_otp').click(function () {
        // Call server-side method to resend OTP
        $.ajax({
            url: '/Account/ResendOTP',
            type: 'POST',
            data: { phone: $('#phone').val() },
            success: function (response) {
                if (response.success) {
                    // Show success message with SweetAlert
                    Swal.fire({
                        title: 'Success!',
                        text: response.message,
                        icon: 'success',
                        confirmButtonText: 'OK'
                    }).then(() => {
                        startResendOtpCountdown(); // Restart the resend countdown
                    });
                } else {
                    // Show error message with SweetAlert
                    Swal.fire({
                        title: 'Error!',
                        text: response.message,
                        icon: 'error',
                        confirmButtonText: 'OK'
                    });
                }
            },
            error: function (xhr, status, error) {
                // Show general error message with SweetAlert
                Swal.fire({
                    title: 'Oops...',
                    text: 'Something went wrong! Please try again later.',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
        });
    });


    // Verify OTP button click handler
    // Verify OTP button click handler
    $('#verify_otp').click(function () {
        // Call server-side method to verify OTP
        $.ajax({
            url: '/Account/VerifyOTP',
            type: 'POST',
            data: { phone: $('#phone').val(), otp: $('#otp').val() },
            success: function (response) {
                debugger;
                if (response.success) {
                    // Show success message with SweetAlert
                    Swal.fire({
                        title: 'Success!',
                        text: response.message,
                        icon: 'success',
                        confirmButtonText: 'OK'
                    }).then(() => {
                        // Optionally redirect or perform other actions on success
                        // window.location.href = '/somePage'; // Example: Redirect to another page
                    });
                    $('#verify_otp').prop('disabled', true);
                    //disableResendDiv();
                    hideResendDiv();
                    $('#mob_num').prop('disabled', true);
                    $('#phone').prop('disabled', true);
                    $('#otp').prop('disabled', true);
                } else {
                    // Show error message with SweetAlert
                    Swal.fire({
                        title: 'Error!',
                        text: response.message,
                        icon: 'error',
                        confirmButtonText: 'OK'
                    });
                }
            },
            error: function (xhr, status, error) {
                // Show general error message with SweetAlert
                Swal.fire({
                    title: 'Oops...',
                    text: 'Something went wrong! Please try again later.',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
           
        });
    });

    $('#register_vendor01').click(function (e) {
        debugger;
        e.preventDefault(); // Prevent default form submission

        // Collect data from form fields
        var formData = {
            Phone: $('#phone').val(),
            FullName: $('#fullname').val(),
            Email: $('#email_address').val(),
            NewPassword: $('#new_password').val(),
            ConfirmPassword: $('#confirm_password').val()
        };

        $.ajax({
            url: '/Account/Register', // Adjust URL as needed
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(formData),
            success: function (response) {
                if (response.success) {
                    Swal.fire({
                        title: 'Success!',
                        text: response.message,
                        icon: 'success',
                        confirmButtonText: 'OK'
                    }).then(() => {
                        // Optionally redirect or perform other actions on success
                         window.location.href = '/Account/Login'; // Example: Redirect to another page
                    });
                } else {
                    Swal.fire({
                        title: 'Error!',
                        text: response.message,
                        icon: 'error',
                        confirmButtonText: 'OK'
                    });
                }
            },
            error: function (xhr, status, error) {
                Swal.fire({
                    title: 'Oops...',
                    text: 'Something went wrong! Please try again later.',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
        });
    });

    // Resend OTP countdown
    function startResendOtpCountdown() {
        let countdown = 60; // Countdown time in seconds
        $('#resend_otp').prop('disabled', true); // Disable resend button initially
        $('#resend_otp_timer').text(countdown + ' sec'); // Display initial countdown

        let interval = setInterval(function () {
            countdown--;
            $('#resend_otp_timer').text(countdown + ' sec');
            if (countdown <= 0) {
                clearInterval(interval);
                $('#resend_otp').prop('disabled', false); // Enable resend button after countdown
                $('#resend_otp_timer').text(''); // Clear timer text
            }
        }, 1000);
    }

    function disableResendDiv() {
        var resendDiv = document.getElementById("resend");
        resendDiv.style.pointerEvents = "none";  // Disables any mouse events (like clicks)
        resendDiv.style.opacity = "0.5";         // Makes the div look disabled (optional)
    }

    function hideResendDiv() {
        var resendDiv = document.getElementById("resend");
        resendDiv.style.display = "none";  // Hides the div
    }
});
