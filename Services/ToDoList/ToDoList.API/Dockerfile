#See https://aka.ms/customizecontainer to learn how to customize your debug container and how Visual Studio uses this Dockerfile to build your images for faster debugging.

#Depending on the operating system of the host machines(s) that will build or run the containers, the image specified in the FROM statement may need to be changed.
#For more information, please see https://aka.ms/containercompat

FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS base
WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /src
COPY ["Services/ToDoList/ToDoList.API/ToDoList.API.csproj", "Services/ToDoList/ToDoList.API/"]
COPY ["Services/ToDoList/ToDoList.Application/ToDoList.Application.csproj", "Services/ToDoList/ToDoList.Application/"]
COPY ["Services/ToDoList/ToDoList.Domain/ToDoList.Domain.csproj", "Services/ToDoList/ToDoList.Domain/"]
COPY ["Services/ToDoList/ToDoList.Infrastructure/ToDoList.Infrastructure.csproj", "Services/ToDoList/ToDoList.Infrastructure/"]
RUN dotnet restore "Services/ToDoList/ToDoList.API/ToDoList.API.csproj"
COPY . .
WORKDIR "/src/Services/ToDoList/ToDoList.API"
RUN dotnet build "ToDoList.API.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "ToDoList.API.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "ToDoList.API.dll"]