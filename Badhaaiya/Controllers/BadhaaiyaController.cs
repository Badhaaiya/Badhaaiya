using Badhaaiya.Models;
using Dapper;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Linq;
using System.Runtime.Remoting.Contexts;
using System.Web;
using System.Web.Mvc;


namespace Badhaaiya.Controllers
{
   
    public class BadhaaiyaController : Controller
    {
        // private readonly string connectionString = "Server=LAPTOP-O6K0FL6E\\SQLEXPRESS;Database=Badhaaiya;Integrated Security=True;";

        private string connectionString = "server=localhost;user id=root;database=Badhaaiya";

        // GET: Badhaaiya
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult profile()
        {
            return View();
        }

        public ActionResult About()
        {
            return View();
        }

        public ActionResult Addofflinebooking()
        {
            return View();
        }

        public ActionResult ViewAllbooking()
        {
            return View();
        }

        public ActionResult ViewTransaction()
        {
            return View();
        }

        public ActionResult ManageAvailability()
        {
            return View();
        }

        public ActionResult Serving()
        {
            return View();
        }

        public ActionResult ViewService()
        {
            return View();
        }

        public ActionResult PriceDiffer()
        {
            return View();
        }

        public ActionResult PaymentAdvance()
        {
            return View();
        }

        public ActionResult BookedDate()
        {
            return View();
        }


        public ActionResult ServiceDetails()
        {
            return View();
        }

        public ActionResult Monopoly()
        {
            return View();
        }

        public ActionResult ViewBookingDetails(int id)
        {
            BookingViewModel bookingDetails = null;

            // Using Dapper to retrieve booking details with MySQL
            using (MySqlConnection connection = new MySqlConnection(connectionString)) // Use MySqlConnection for MySQL
            {
                string query = "SELECT * FROM Bookings WHERE BookingId = @BookingId";
                bookingDetails = connection.QueryFirstOrDefault<BookingViewModel>(query, new { BookingId = id });
            }

            return View(bookingDetails);
        }

        public ActionResult BankAccount()
        {
            return View();
        }

        public ActionResult ViewAgreement()
        {
            return View();
        }

        public ActionResult ViewProfileImg()
        {
            return View();
        }


        [HttpPost]
        public ActionResult Profiledetails(string nameofbusiness)
        {
            using (var connection = new MySqlConnection(connectionString)) // Use MySqlConnection for MySQL
            {
                connection.Open();
                var query = "INSERT INTO vendorDetails (BUSINESSNAME) VALUES (@NameOfBusiness)";
                var parameters = new { NameOfBusiness = nameofbusiness };

                connection.Execute(query, parameters); // Dapper's Execute method works the same way with MySQL
                string message = "SUCCESS";

                return Json(new { Message = message }, JsonRequestBehavior.AllowGet);
            }
        }


        [HttpGet]
        public JsonResult GetBookings()
        {
            var UserId = Session["UserId"];
            using (var connection = new MySqlConnection(connectionString)) // Use MySqlConnection for MySQL
            {
                var query = @"SELECT 
                        BookingId,
                        CONCAT(Name, ', ', MobileNo, ', ', Email) AS CustomerDetails,
                        BookingStatus,
                        BookingType,
                        StartDate,
                        PaymentStatus,
                        ServiceLocation
                      FROM Bookings where UserId='"+UserId+"' ";

                var bookings = connection.Query(query).ToList(); // Fetch data using Dapper
                return Json(bookings, JsonRequestBehavior.AllowGet);
            }
        }


        public JsonResult GetEvents(DateTime start, DateTime end)
        {
            var UserId = Session["UserId"];
            using (var connection = new MySqlConnection(connectionString))
            {
                string query = @"
            SELECT 
                BookingCode,
                Name,
                MobileNo,
                Amount,
                StartDate,
                CASE 
                    WHEN IsOnline = 0 THEN 'OfflineEvent' 
                    ELSE 'OnlineEvent' 
                END AS ClassName
            FROM Bookings
            WHERE StartDate BETWEEN @startDate AND @endDate and UserId='"+UserId+"'";

                var events = connection.Query(query, new { startDate = start, endDate = end })
                    .Select(e => new
                    {
                        title = $"#{e.BookingCode} {e.Name} {e.MobileNo} ₹{e.Amount}",
                        start = ((DateTime)e.StartDate).ToString("yyyy-MM-dd"),  // Ensure proper casting
                        display = "background",
                        className = e.ClassName
                    }).ToList();

                return Json(events, JsonRequestBehavior.AllowGet);
            }
        }

        // Action to handle form submission
        [HttpPost]
        public JsonResult SaveBankDetails(string acc_number, string acc_name, string ifsc_code, string branch_name, string upi_id)
        {
            bool isSuccess = false;
            // Retrieve the UserId from the session
            int userId = Convert.ToInt32(Session["UserId"]);

            using (MySqlConnection connection = new MySqlConnection(connectionString))
            {
                try
                {
                    connection.Open();
                    string query = @"INSERT INTO BankDetails (UserId,AccNumber, AccName, IFSCCode, BranchName, UPIID)
                                     VALUES (@userId,@AccNumber, @AccName, @IFSCCode, @BranchName, @UPIID)";

                    using (MySqlCommand cmd = new MySqlCommand(query, connection))
                    {
                        cmd.Parameters.AddWithValue("@UserId", userId);
                        cmd.Parameters.AddWithValue("@AccNumber", acc_number);
                        cmd.Parameters.AddWithValue("@AccName", acc_name);
                        cmd.Parameters.AddWithValue("@IFSCCode", ifsc_code);
                        cmd.Parameters.AddWithValue("@BranchName", branch_name);
                        cmd.Parameters.AddWithValue("@UPIID", upi_id);

                        cmd.ExecuteNonQuery();
                        isSuccess = true;
                    }
                }
                catch (Exception ex)
                {
                    // Log error (not shown here)
                    isSuccess = false;
                }
                finally
                {
                    connection.Close();
                }
            }

            return Json(new { success = isSuccess });
        }


        // Action to load dropdown values
        public JsonResult GetDropdownValues(string dropdownType)
        {
            List<string> values = new List<string>();

            using (MySqlConnection conn = new MySqlConnection(connectionString))
            {
                string query = "SELECT Elements FROM PARAM WHERE Type = @Type";
                MySqlCommand cmd = new MySqlCommand(query, conn);
                cmd.Parameters.AddWithValue("@Type", dropdownType);

                conn.Open();
                var result = cmd.ExecuteScalar();

                if (result != null)
                {
                    string elements = result.ToString();
                    // Split the comma-separated values and add to the list
                    values.AddRange(elements.Split(new[] { ',' }, StringSplitOptions.RemoveEmptyEntries));
                }
            }

            return Json(values, JsonRequestBehavior.AllowGet);
        }

        


    }
}