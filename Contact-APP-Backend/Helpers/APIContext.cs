using Contact_APP_Backend.Enitity.ContanctSchema;
using Microsoft.EntityFrameworkCore;

namespace Contact_APP_Backend.Helpers;

public class APIContext : DbContext
{
    protected readonly IConfiguration Configuration;

    public APIContext(IConfiguration configuration)
    {
        Configuration = configuration;
    }

    protected override void OnConfiguring(DbContextOptionsBuilder options)
    {
        // in memory database used for simplicity, change to a real db for production applications
        options.UseInMemoryDatabase("TestDb");
    }

    public DbSet<ContactSchema> Contacts { get; set; }
}