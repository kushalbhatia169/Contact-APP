// Namespace declaration for the helper class
namespace Contact_APP_Backend.Helpers;

using Contact_APP_Backend.Enitity;

// Importing necessary libraries
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

// Declaration of the APIContext class, which inherits from DbContext
public class APIContext : DbContext
{
    // Readonly field to hold the IConfiguration object
    protected readonly IConfiguration Configuration;

    // Constructor for the APIContext class
    public APIContext(IConfiguration configuration)
    {
        Configuration = configuration; // Initializing the Configuration field
    }

    // Override method to configure the database connection
    protected override void OnConfiguring(DbContextOptionsBuilder options)
    {
        // Setting up an in-memory database for simplicity
        // For production applications, this should be changed to a real database
        options.UseInMemoryDatabase("TestDb");
    }

    // DbSet property to represent the 'Contacts' table in the database
    public DbSet<ContactSchema> Contacts { get; set; }
}
