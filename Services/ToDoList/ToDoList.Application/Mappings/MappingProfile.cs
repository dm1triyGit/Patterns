using AutoMapper;
using ToDoList.Application.Models;
using ToDoList.Domain.Entities;

namespace ToDoList.Application.Mappings
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<ToDoItem, ToDoItemViewModel>().ReverseMap();
        }
    }
}
