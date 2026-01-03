namespace Human_Resource_Management_System.Models
{
    public class Enums
    {
        public enum LeaveRequestStatus
        {
            Pending,
            Approved,
            Rejected
        }

        public enum AttendanceStatus
        {
            Present,
            Absent,
            HalfDay,
            Leave
        }

        public enum SalaryCalculationType
        {
            Percentage = 1,
            FixedAmount = 2
        }

        public enum UserRole
        {
            Employee = 1,
            Admin = 2,
            HROfficer = 3
        }
    }
}