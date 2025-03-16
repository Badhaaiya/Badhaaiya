using Badhaaiya.Models;
using Dapper;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web.Mvc;

public class CalendarController : Controller
{
    //private readonly BookingRepository _bookingRepository;
    //private readonly string connectionString = "Server=LAPTOP-O6K0FL6E\\SQLEXPRESS;Database=Badhaaiya;Integrated Security=True;";

    //public CalendarController()
    //{
    //    // Ensure to replace with your actual connection string
    //    string connectionString = "Server=LAPTOP-O6K0FL6E\\SQLEXPRESS;Database=Badhaaiya;Integrated Security=True;";
    //    _bookingRepository = new BookingRepository(connectionString);
    //}

    //[HttpGet]
    //public JsonResult GetBookings()
    //{
    //    IEnumerable<Booking> bookings = _bookingRepository.GetAllBookings();
    //    return Json(bookings, JsonRequestBehavior.AllowGet);
    //}



    //public JsonResult GetEvents()
    //{
    //    using (var connection = new SqlConnection(connectionString))
    //    {
    //        string query = @"
    //                SELECT 
    //                    BookingCode,
    //                    Name,
    //                    MobileNo,
    //                    Amount,
    //                    StartDate,
    //                    CASE 
    //                        WHEN IsOnline = 1 THEN 'OnlineEvent' 
    //                        ELSE 'OfflineEvent' 
    //                    END AS ClassName
    //                FROM Bookings
    //                WHERE StartDate BETWEEN @startDate AND @endDate";

    //        var startDate = new DateTime(2024, 8, 1);
    //        var endDate = startDate.AddDays(7);

    //        var events = connection.Query(query, new { startDate, endDate })
    //            .Select(e => new
    //            {
    //                title = $"#{e.BookingCode} {e.Name} {e.MobileNo} ₹{e.Amount}",
    //                start = e.StartDate.ToString("yyyy-MM-dd"),
    //                display = "background",
    //                className = e.ClassName
    //            }).ToList();

    //        return Json(events, JsonRequestBehavior.AllowGet);
    //    }
    //}

    //public JsonResult GetEvents(DateTime start, DateTime end)
    //{
    //    using (var connection = new SqlConnection(connectionString))
    //    {
    //        string query = @"
    //                SELECT 
    //                    BookingCode,
    //                    Name,
    //                    MobileNo,
    //                    Amount,
    //                    StartDate,
    //                    CASE 
    //                        WHEN IsOnline = 1 THEN 'OnlineEvent' 
    //                        ELSE 'OfflineEvent' 
    //                    END AS ClassName
    //                FROM Bookings
    //                WHERE StartDate BETWEEN @startDate AND @endDate";

    //        var events = connection.Query(query, new { startDate = start, endDate = end })
    //            .Select(e => new
    //            {
    //                title = $"#{e.BookingCode} {e.Name} {e.MobileNo} ₹{e.Amount}",
    //                start = e.StartDate.ToString("yyyy-MM-dd"),
    //                display = "background",
    //                className = e.ClassName
    //            }).ToList();

    //        return Json(events, JsonRequestBehavior.AllowGet);
    //    }
    //}

}
