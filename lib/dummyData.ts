export const USERS = [
    {
        id: "EMP001",
        name: "Alex Johnson",
        email: "alex@dayflow.com",
        role: "Employee",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
        designation: "Software Engineer",
        department: "Engineering",
        joinDate: "2023-01-15",
    },
    {
        id: "EMP002",
        name: "Sarah Williams",
        email: "sarah@dayflow.com",
        role: "Employee",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
        designation: "Product Designer",
        department: "Design",
        joinDate: "2023-03-10",
    },
    {
        id: "ADM001",
        name: "Michael Brown",
        email: "admin@dayflow.com",
        role: "Admin",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
        designation: "HR Manager",
        department: "Human Resources",
        joinDate: "2022-11-01",
    },
];

export const ATTENDANCE = [
    { id: 1, employeeId: "EMP001", date: "2024-05-20", checkIn: "09:00 AM", checkOut: "05:30 PM", status: "Present" },
    { id: 2, employeeId: "EMP001", date: "2024-05-19", checkIn: "09:15 AM", checkOut: "05:45 PM", status: "Present" },
    { id: 3, employeeId: "EMP001", date: "2024-05-18", checkIn: "-", checkOut: "-", status: "Absent" },
    { id: 4, employeeId: "EMP002", date: "2024-05-20", checkIn: "08:55 AM", checkOut: "05:00 PM", status: "Present" },
];

export const LEAVES = [
    { id: 1, employeeId: "EMP001", type: "Sick Leave", from: "2024-06-01", to: "2024-06-03", reason: "Viral Fever", status: "Pending" },
    { id: 2, employeeId: "EMP002", type: "Casual Leave", from: "2024-05-25", to: "2024-05-25", reason: "Family Event", status: "Approved" },
    { id: 3, employeeId: "EMP001", type: "Vacation", from: "2023-12-20", to: "2023-12-30", reason: "Year end break", status: "Rejected" },
];

export const PAYROLL = [
    { id: 1, employeeId: "EMP001", month: "April 2024", basic: 5000, allowances: 1200, deductions: 200, net: 6000, status: "Paid" },
    { id: 2, employeeId: "EMP002", month: "April 2024", basic: 4500, allowances: 1000, deductions: 150, net: 5350, status: "Paid" },
];

export const STATISTICS = {
    employee: {
        attendance: "92%",
        leaveBalance: 12,
        nextHoliday: "Memorial Day (May 27)",
    },
    admin: {
        totalEmployees: 42,
        pendingLeaves: 5,
        onLeaveToday: 3,
        totalPayroll: "$125,400",
    }
};
