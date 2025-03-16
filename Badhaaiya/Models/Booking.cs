using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;
using System.Xml.Linq;

namespace Badhaaiya.Models
{
    public class VendorRegisterModel
    {
        [Required(ErrorMessage = "Mobile Number is required.")]
        [RegularExpression(@"^[0-9]{10}$", ErrorMessage = "Please enter a valid 10-digit mobile number.")]
        [Display(Name = "Mobile Number")]
        public string Phone { get; set; }

        [Required(ErrorMessage = "Full Name is required.")]
        [StringLength(100, ErrorMessage = "Full Name cannot exceed 100 characters.")]
        [Display(Name = "Full Name")]
        public string FullName { get; set; }

        [Required(ErrorMessage = "Email Address is required.")]
        [EmailAddress(ErrorMessage = "Invalid Email Address.")]
        [Display(Name = "Email Address")]
        public string Email { get; set; }

        [Required(ErrorMessage = "New Password is required.")]
        [StringLength(100, MinimumLength = 6, ErrorMessage = "Password must be at least 6 characters long.")]
        [DataType(DataType.Password)]
        [Display(Name = "New Password")]
        public string NewPassword { get; set; }

        [Required(ErrorMessage = "Confirm Password is required.")]
        [DataType(DataType.Password)]
        [Compare("NewPassword", ErrorMessage = "The new password and confirmation password do not match.")]
        [Display(Name = "Confirm Password")]
        public string ConfirmPassword { get; set; }

        public int UserId { get; set; }


    }
    public class Booking
    {
        public string BookingId { get; set; }
        public string CustomerName { get; set; }
        public string MobileNumber { get; set; }
        public decimal Amount { get; set; }
        public DateTime StartDate { get; set; }
        public bool IsOnline { get; set; } // Indicates if the booking is online or offline
    }

    public class BookingViewModel
    {
        public int BookingId { get; set; }
        public string Name { get; set; }
        public string MobileNo { get; set; }
        public string Email { get; set; }
        public decimal TotalAmount { get; set; }
        public decimal PaidAmount { get; set; }
        public decimal BalanceAmount { get; set; }
        public DateTime BookingDate { get; set; }
        public DateTime EventDate { get; set; }
        public string Package { get; set; }
        public string BookingType { get; set; }
        public int NumberOfGuests { get; set; }
        public string BookingStatus { get; set; }
        public string ServiceLocation { get; set; }
    }

    public class LoginModel
    {
        public string Phone { get; set; }
        public string Password { get; set; }
        public string DeviceInfo { get; set; }  // Add this property
        public bool RememberMe { get; set; }
    }


    public class OtpModel
    {
        public string MobileNumber { get; set; }
        public string Otp { get; set; }
    }

    public class User
    {
        public int UserId { get; set; }              // Unique identifier for the user
        public string Phone { get; set; }     // Mobile number of the user
        public string PasswordHash { get; set; }     // Hashed password
        public string FullName { get; set; }

        public string Email { get; set; }
    }

    public class UserSession
    {
        public Guid SessionId { get; set; }          // Unique identifier for each session
        public int UserId { get; set; }              // Foreign key referencing the User
        public string DeviceInfo { get; set; }       // Information about the device (e.g., device name, OS, browser)
        public string SessionToken { get; set; }     // Unique session token generated for this session
        public DateTime CreatedAt { get; set; }      // Timestamp when the session was created
        public DateTime ExpiresAt { get; set; }      // Timestamp when the session expires
    }

    



}