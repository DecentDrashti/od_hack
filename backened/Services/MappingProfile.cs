using AutoMapper;
using Human_Resource_Management_System.DTOs;
using Human_Resource_Management_System.Models;

namespace Human_Resource_Management_System.Services
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            // --- Employee Mappings ---
            CreateMap<RegisterDto, Employee>(); // Basic fields

            CreateMap<Employee, EmployeeProfileDto>()
                .ForMember(dest => dest.LoginId, opt => opt.MapFrom(src => src.User.LoginId))
                .ForMember(dest => dest.Email, opt => opt.MapFrom(src => src.User.Email))
                .ForMember(dest => dest.FullName, opt => opt.MapFrom(src => $"{src.FirstName} {src.LastName}"))
                .ForMember(dest => dest.ManagerName, opt => opt.MapFrom(src => src.Manager != null ? $"{src.Manager.FirstName} {src.Manager.LastName}" : "None"));

            CreateMap<UpdateProfileDto, Employee>();

            // --- Attendance Mappings ---
            CreateMap<Attendance, AttendanceLogDto>()
                .ForMember(dest => dest.Date, opt => opt.MapFrom(src => src.Date.ToString("dd MMM yyyy")))
                .ForMember(dest => dest.CheckIn, opt => opt.MapFrom(src => src.CheckInTime.ToString(@"hh\:mm")))
                .ForMember(dest => dest.CheckOut, opt => opt.MapFrom(src => src.CheckOutTime != null ? src.CheckOutTime.Value.ToString(@"hh\:mm") : "-"))
                .ForMember(dest => dest.Status, opt => opt.MapFrom(src => src.Status.ToString()));

            // --- Leave Mappings ---
            CreateMap<LeaveRequest, LeaveHistoryDto>()
                .ForMember(dest => dest.TypeName, opt => opt.MapFrom(src => src.LeaveType.Name))
                .ForMember(dest => dest.Duration, opt => opt.MapFrom(src => $"{src.StartDate:dd MMM} - {src.EndDate:dd MMM}"));

            CreateMap<User, AuthResponseDto>()
                .ForMember(dest => dest.LoginId, opt => opt.MapFrom(src => src.LoginId))
                .ForMember(dest => dest.Role, opt => opt.MapFrom(src => src.Role.ToString()))
                // Flattening: Get Name/Pic from the related Employee object
                .ForMember(dest => dest.FullName, opt => opt.MapFrom(src => $"{src.Employee.FirstName} {src.Employee.LastName}"))
                .ForMember(dest => dest.ProfilePictureUrl, opt => opt.MapFrom(src => src.Employee.ProfilePictureUrl))
                .ForMember(dest => dest.Token, opt => opt.Ignore()); // Token is generated manually
        }
    }
}
