using Contact_APP_Backend.GraphQL.Query;
using Contact_APP_Backend.Helpers;
using Contact_APP_Backend.Services;
using GraphQL;
using GraphQL.Types;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

// builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
// builder.Services.AddEndpointsApiExplorer();
// builder.Services.AddSwaggerGen();

builder.Services.Configure<IISServerOptions>(options =>
{
    options.AutomaticAuthentication = false;
});

builder.Services.AddScoped<APIContext>();
builder.Services.AddScoped<IContactService, ContactService>();
builder.Services.AddScoped<ISchema, GetContactsDetailsSchema>();
builder.Services.AddScoped<GetContactsList>();
builder.Services.AddScoped<GetContactsDetailsSchema>();

builder.Services.AddGraphQL(options =>
{
    options.AddSystemTextJson();
    options.AddGraphTypes();
});

// Add GraphQL services
//builder.Services.AddGraphQL(b => b
//    .AddAutoSchema<GetContactsList>()  // schema
//    .AddSystemTextJson());             // serializer

var app = builder.Build();

app.UseRouting();

app.UseEndpoints(endpoints =>
{
    _ = endpoints.MapGraphQL("/graphql");
});

app.UseGraphQLPlayground();
//app.UseHttpsRedirection();

// app.UseCors();

// app.UseAuthorization();

// app.UseCors(builder => builder
//     .AllowAnyOrigin()
//     .AllowAnyMethod()
//     .AllowAnyHeader());

// app.MapControllers();

app.Run();
