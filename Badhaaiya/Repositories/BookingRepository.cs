using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using Badhaaiya.Models;
using Dapper;

public class BookingRepository
{
    private readonly string _connectionString;

    public BookingRepository(string connectionString)
    {
        _connectionString = connectionString;
    }

    public IEnumerable<Booking> GetAllBookings()
    {
        using (IDbConnection db = new SqlConnection(_connectionString))
        {
            string sql = "SELECT BookingId, CustomerName, MobileNumber, Amount, Datetime, Bookingtype FROM BookingDetails";
            return db.Query<Booking>(sql).ToList();
        }
    }
}
