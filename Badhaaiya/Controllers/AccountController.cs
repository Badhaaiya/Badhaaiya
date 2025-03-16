using Badhaaiya.Models;
using Dapper;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Twilio;
using Twilio.Rest.Api.V2010.Account;
using Twilio.Types;
using MySql.Data.MySqlClient;
using System.Data;
using System.Text;

namespace Badhaaiya.Controllers
{
    
    public class AccountController : Controller
    {
        //private readonly string connectionString = "Server=LAPTOP-O6K0FL6E\\SQLEXPRESS;Database=Badhaaiya;Integrated Security=True;";

        // Define the connection string for MySQL
        private string connectionString = "server=localhost;user id=root;database=Badhaaiya";

        [HttpPost]
        public JsonResult SendOTP(string phone)
        {
            try
            {
                using (IDbConnection db = new MySqlConnection(connectionString))
                {
                    // Check if the mobile number already exists
                    var existingUserQuery = "SELECT COUNT(*) FROM Users WHERE Phone = @Phone";
                    int userCount = db.ExecuteScalar<int>(existingUserQuery, new { Phone = phone });

                    if (userCount > 0)
                    {
                        // If the user already exists, do not send OTP and return a message
                        return Json(new { success = false, message = "User already exists. Please login." });
                    }

                    // Generate OTP
                    var otp = new Random().Next(100000, 999999).ToString();

                    // Save OTP to database (you may want to hash this)
                    var insertOtpQuery = "INSERT INTO OTPRequests (Phone, OTP, ExpiryTime) VALUES (@Phone, @OTP, @ExpiryTime)";
                    db.Execute(insertOtpQuery, new { Phone = phone, OTP = otp, ExpiryTime = DateTime.Now.AddMinutes(5) });

                    // Simulate sending OTP (use an SMS gateway here)
                    return Json(new { success = true, message = "OTP has been sent to your mobile number." });
                }
            }
            catch (Exception ex)
            {
                return Json(new { success = false, message = ex.Message });
            }
        }

        [HttpPost]
        public JsonResult ResendOTP(string phone)
        {
            try
            {
                using (IDbConnection db = new MySqlConnection(connectionString))
                {
                    // Validate the phone number
                    if (string.IsNullOrEmpty(phone))
                    {
                        return Json(new { success = false, message = "Invalid phone number." });
                    }

                    // Generate OTP
                    var otp = new Random().Next(100000, 999999).ToString();

                    // Delete the previous OTP
                    db.Execute("delete from OTPRequests WHERE PHONE='" + phone + "' ");

                    // Save OTP to database (you may want to hash this)
                    var insertOtpQuery = "INSERT INTO OTPRequests (Phone, OTP, ExpiryTime) VALUES (@Phone, @OTP, @ExpiryTime)";
                    db.Execute(insertOtpQuery, new { Phone = phone, OTP = otp, ExpiryTime = DateTime.Now.AddMinutes(5) });

                    // Send the OTP via SMS or any other method


                    return Json(new { success = true, message = "OTP sent successfully. Please check your phone." });
                }
            }
            catch (Exception ex)
            {
                return Json(new { success = false, message = ex.Message });
            }
        }


        [HttpPost]
        public JsonResult VerifyOTP(string phone, string otp)
        {
            try
            {
                using (IDbConnection db = new MySqlConnection(connectionString))
                {
                    var query = "SELECT COUNT(*) FROM OTPRequests WHERE Phone = @Phone AND OTP = @OTP AND ExpiryTime > NOW()";
                    var result = db.ExecuteScalar<int>(query, new { Phone = phone, OTP = otp });

                    if (result > 0)
                    {
                        // Clear OTP after successful validation

                        db.Execute("delete from OTPRequests WHERE PHONE='" + phone + "' ");
                        return Json(new { success = true, message = "OTP verified successfully." });
                    }
                    else
                    {
                        return Json(new { success = false, message = "Invalid or expired OTP." });
                    }
                }
            }
            catch (Exception ex)
            {
                return Json(new { success = false, message = ex.Message });
            }
        }

       
        [HttpPost]
        public JsonResult Register(VendorRegisterModel model)
        {
            if (!ModelState.IsValid)
            {
                // Collect validation errors
                var errors = ModelState.Values.SelectMany(v => v.Errors)
                                               .Select(e => e.ErrorMessage)
                                               .ToList();

                // Return validation errors to the client
                return Json(new { success = false, message = string.Join(", ", errors) });
            }

            try
            {
                using (IDbConnection db = new MySqlConnection(connectionString))
                {
                    // Check if the phone number already exists
                    var checkUserQuery = "SELECT COUNT(*) FROM Users WHERE Phone = @Phone";
                    var userExists = db.ExecuteScalar<int>(checkUserQuery, new { Phone = model.Phone }) > 0;

                    if (userExists)
                    {
                        return Json(new { success = false, message = "User already exists. Please login." });
                    }

                    // Hash the password before saving it to the database
                    var passwordHash = HashPassword(model.NewPassword); // Ensure you implement the HashPassword method

                    // Insert the new user into the database
                    var query = "INSERT INTO Users (FullName, Phone, Email, PasswordHash) VALUES (@FullName, @Phone, @Email, @PasswordHash)";
                    db.Execute(query, new
                    {
                        FullName = model.FullName,
                        Phone = model.Phone,
                        Email = model.Email,
                        PasswordHash = passwordHash // Hash the password before saving
                    });
                }

                return Json(new { success = true, message = "Registration successful." });
            }
            catch (Exception ex)
            {
                // Log the exception here (optional)
                return Json(new { success = false, message = "An error occurred while processing your request." });
            }
        }


        private string HashPassword(string password)
        {
            // Implement your password hashing logic here, for example using SHA256
            using (var sha256 = System.Security.Cryptography.SHA256.Create())
            {
                byte[] bytes = sha256.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                StringBuilder builder = new StringBuilder();
                for (int i = 0; i < bytes.Length; i++)
                {
                    builder.Append(bytes[i].ToString("x2"));
                }
                return builder.ToString();
            }
        }








        
        [HttpGet]
        public ActionResult Login()
        {
            // Check if there's an active session token in the cookies
            if (Request.Cookies["SessionToken"] != null)
            {
                string sessionToken = Request.Cookies["SessionToken"].Value;

                using (var connection = new MySqlConnection(connectionString)) // Use MySqlConnection for MySQL
                {
                    // Check if the session token is still valid in the database
                    var activeSession = connection.QuerySingleOrDefault<UserSession>(
                        "SELECT * FROM UserSessions WHERE SessionToken = @SessionToken AND ExpiresAt > @CurrentTime",
                        new { SessionToken = sessionToken, CurrentTime = DateTime.Now });

                   


                    if (activeSession != null)
                    {
                        int UserId = activeSession.UserId;

                        var fetchdetails = connection.QuerySingleOrDefault<User>("SELECT * FROM Users WHERE UserId='" + UserId + "'");
                        Session["UserName"] = fetchdetails.FullName;
                        Session["UserEmail"] = fetchdetails.Email;
                        Session["UserId"] = fetchdetails.UserId;
                        // Session is still active, redirect the user to the desired page
                        return RedirectToAction("Index", "Badhaaiya");
                    }
                }
            }
            return View();
        }

        [HttpPost]
        public ActionResult Logout()
        {
            // Invalidate the current session (delete session token for this device)
            if (Request.Cookies["SessionToken"] != null)
            {
                var sessionToken = Request.Cookies["SessionToken"].Value;

                using (var connection = new MySqlConnection(connectionString))
                {
                    connection.Execute("DELETE FROM UserSessions WHERE SessionToken = @SessionToken", new { SessionToken = sessionToken });
                }

                Response.Cookies["SessionToken"].Expires = DateTime.Now.AddDays(-1); // Expire the session cookie
            }

            return Json(new { success = true, message = "Successfully logged out from this device." });
        }

        [HttpPost]
        public ActionResult LogoutAllDevices()
        {
            // Invalidate all sessions for this user (delete all session tokens for this user)
            var userId = Session["UserId"]; // Assuming you have a way to get the logged-in user's ID from the session

            using (var connection = new MySqlConnection(connectionString))
            {
                connection.Execute("DELETE FROM UserSessions WHERE UserId = @UserId", new { UserId = userId });
            }

            if (Request.Cookies["SessionToken"] != null)
            {
                Response.Cookies["SessionToken"].Expires = DateTime.Now.AddDays(-1); // Expire the session cookie for the current device
            }

            return Json(new { success = true, message = "Successfully logged out from all devices." });
        }


        [HttpGet]
        public ActionResult Registation()
        {
            return View();
        }

        //[HttpPost]
        //public ActionResult Login(LoginModel model)
        //{
        //    //// Check if there's an active session token in the cookies
        //    //if (Request.Cookies["SessionToken"] != null)
        //    //{
        //    //    string sessionToken = Request.Cookies["SessionToken"].Value;

        //    //    using (var connection = new SqlConnection(connectionString))
        //    //    {
        //    //        // Check if the session token is still valid in the database
        //    //        var activeSession = connection.QuerySingleOrDefault<UserSession>(
        //    //            "SELECT * FROM UserSessions WHERE SessionToken = @SessionToken AND ExpiresAt > @CurrentTime",
        //    //            new { SessionToken = sessionToken, CurrentTime = DateTime.Now });

        //    //        if (activeSession != null)
        //    //        {
        //    //            // Session is still active, redirect the user to the desired page
        //    //            return RedirectToAction("Index", "Badhaaiya");
        //    //        }
        //    //    }
        //    //}

        //    using (var connection = new SqlConnection(connectionString))
        //    {
        //        var user = connection.QuerySingleOrDefault<User>("SELECT * FROM Users WHERE MobileNumber = @MobileNumber AND PasswordHash = @Password",
        //            new { model.MobileNumber, model.Password });

        //        if (user != null)
        //        {
        //            string otp = GenerateOtp();
        //            user.OtpCode = otp;
        //            user.OtpExpiration = DateTime.Now.AddMinutes(5);

        //            connection.Execute("UPDATE Users SET OtpCode = @OtpCode, OtpExpiration = @OtpExpiration WHERE UserId = @UserId", user);

        //            // Generate a unique session token
        //            var sessionToken = Guid.NewGuid().ToString();

        //            // Store the session token in the database
        //            connection.Execute("INSERT INTO UserSessions (SessionId, UserId, DeviceInfo, SessionToken, CreatedAt, ExpiresAt) VALUES (@SessionId, @UserId, @DeviceInfo, @SessionToken, @CreatedAt, @ExpiresAt)",
        //                new
        //                {
        //                    SessionId = Guid.NewGuid(),
        //                    UserId = user.UserId,
        //                    DeviceInfo = model.DeviceInfo, // You can pass this from the client
        //                    SessionToken = sessionToken,
        //                    CreatedAt = DateTime.Now,
        //                    ExpiresAt = DateTime.Now.AddDays(30)
        //                });

        //            // Store the session token in a cookie or cache
        //            Response.Cookies["SessionToken"].Value = sessionToken;
        //            Response.Cookies["SessionToken"].Expires = DateTime.Now.AddDays(30);


        //            // Send OTP to user's mobile number
        //            //SendOtpToMobile(user.MobileNumber, otp);

        //            return Json(new { success = true, message = "OTP sent successfully." });
        //        }
        //        else
        //        {
        //            return Json(new { success = false, message = "Invalid mobile number or password." });
        //        }
        //    }
        //}

        [HttpPost]
        public ActionResult Login(LoginModel model)
        {
            using (var connection = new MySqlConnection(connectionString))
            {
                // Query to check if the user exists with the provided mobile number and password hash
                var user = connection.QuerySingleOrDefault<User>(
                    "SELECT * FROM Users WHERE Phone = @Phone AND PasswordHash = @PasswordHash",
                    new { model.Phone, PasswordHash = HashPassword(model.Password) });

                if (user != null)
                {
                    

                    // Generate a unique session token
                    var sessionToken = Guid.NewGuid().ToString();

                    // Insert session information into the database
                    connection.Execute(
                        "INSERT INTO UserSessions (SessionId, UserId, DeviceInfo, SessionToken, CreatedAt, ExpiresAt) VALUES (@SessionId, @UserId, @DeviceInfo, @SessionToken, @CreatedAt, @ExpiresAt)",
                        new
                        {
                            SessionId = Guid.NewGuid(),
                            UserId = user.UserId,
                            DeviceInfo = model.DeviceInfo, // Pass this from the client
                            SessionToken = sessionToken,
                            CreatedAt = DateTime.Now,
                            ExpiresAt = DateTime.Now.AddDays(30)
                        });

                    // Store the session token in a cookie
                    var sessionCookie = new HttpCookie("SessionToken")
                    {
                        Value = sessionToken,
                        Expires = DateTime.Now.AddDays(30)
                    };
                    Response.Cookies.Add(sessionCookie);

                    Session["UserId"] = user.UserId;
                    Session["UserName"] = user.FullName;
                    Session["UserEmail"] = user.Email;

                    // Send OTP to the user's mobile number
                    // SendOtpToMobile(user.MobileNumber, otp);

                    return Json(new { success = true, message = "Login successfully." });
                }
                else
                {
                    return Json(new { success = false, message = "User Not Found Please Register." });
                }
            }
        }


        [HttpPost]
        //public ActionResult ValidateOtp(OtpModel model)
        //{
        //    using (var connection = new SqlConnection(connectionString))
        //    {
        //        var user = connection.QuerySingleOrDefault<User>("SELECT * FROM Users WHERE MobileNumber = @MobileNumber AND OtpCode = @Otp AND OtpExpiration > GETDATE()",
        //            new { model.MobileNumber, model.Otp });

        //        if (user != null)
        //        {
        //            // Clear OTP after successful validation
        //            user.OtpCode = null;
        //            user.OtpExpiration = null;
        //            connection.Execute("UPDATE Users SET OtpCode = NULL, OtpExpiration = NULL WHERE UserId = @UserId", user);

        //            return Json(new { success = true, message = "OTP validated successfully." });
        //        }
        //        else
        //        {
        //            return Json(new { success = false, message = "Invalid or expired OTP." });
        //        }
        //    }
        //}

        private string GenerateOtp()
        {
            var random = new Random();
            return random.Next(100000, 999999).ToString();
        }

        private void SendOtpToMobile(string mobileNumber, string otp)
        {
            // Initialize Twilio client
            InitializeTwilio();
            // Twilio account configuration
            string fromPhoneNumber = System.Configuration.ConfigurationManager.AppSettings["TwilioPhoneNumber"];

            try
            {
                var message = MessageResource.Create(
                    to: new PhoneNumber(mobileNumber),
                    from: new PhoneNumber(fromPhoneNumber),
                    body: $"Your OTP code is {otp}"
                );
            }
            catch (Twilio.Exceptions.ApiException ex)
            {
                // Log the detailed error
                Console.WriteLine($"Twilio API Exception: {ex.Message}");
            }
            catch (Exception ex)
            {
                // Log general exceptions
                Console.WriteLine($"Exception: {ex.Message}");
            }

        }


        // Ensure this is called at application startup or at least before any Twilio API call
        private void InitializeTwilio()
        {
            // Fetch Twilio credentials from configuration
            string accountSid = ConfigurationManager.AppSettings["TwilioAccountSid"];
            string authToken = ConfigurationManager.AppSettings["TwilioAuthToken"];

            // Initialize the Twilio client
            TwilioClient.Init(accountSid, authToken);
        }

        //private string HashPassword(string password)
        //{
        //    // Implement your password hashing logic here
        //}


        //[HttpPost]
        //public ActionResult ResetPassword(PasswordResetModel model)
        //{
        //    using (var connection = new SqlConnection(connectionString))
        //    {
        //        var user = connection.QuerySingleOrDefault<User>("SELECT * FROM Users WHERE MobileNumber = @MobileNumber AND OtpCode = @Otp AND OtpExpiration > GETDATE()",
        //            new { model.MobileNumber, model.Otp });

        //        if (user != null)
        //        {
        //            // Hash the new password
        //            //string hashedPassword = HashPassword(model.NewPassword);

        //            // Update the user's password and clear the OTP
        //            connection.Execute("UPDATE Users SET PasswordHash = @PasswordHash, OtpCode = NULL, OtpExpiration = NULL WHERE UserId = @UserId",
        //                new { PasswordHash = hashedPassword, user.UserId });

        //            // Invalidate all sessions for this user
        //            connection.Execute("DELETE FROM UserSessions WHERE UserId = @UserId", new { user.UserId });

        //            // Clear cookies or cache for the current device
        //            if (Request.Cookies["SessionToken"] != null)
        //            {
        //                Response.Cookies["SessionToken"].Expires = DateTime.Now.AddDays(-1); // Expire the session token
        //            }

        //            // Optionally, notify the user via email or SMS that their password was reset
        //            //NotifyUserOfPasswordReset(user.MobileNumber);

        //            return Json(new { success = true, message = "Password reset successfully. You will need to log in again on all devices." });
        //        }
        //        else
        //        {
        //            return Json(new { success = false, message = "Invalid or expired OTP." });
        //        }
        //    }
        //}

    }
}