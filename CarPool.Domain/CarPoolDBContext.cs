using CarPool.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using System.IO;

namespace CarPool.Persistence
{
    public class DesignTimeDbContextFactory : IDesignTimeDbContextFactory<CarPoolDBContext>
    {
        public CarPoolDBContext CreateDbContext(string[] args)
        {
            IConfigurationRoot configuration = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory()).AddJsonFile(@Directory.GetCurrentDirectory() + "/../CarPool.API/appsettings.Development.json").Build();
            var builder = new DbContextOptionsBuilder<CarPoolDBContext>();
            var connectionString = configuration.GetConnectionString("DefaultConnection");
            builder.UseSqlServer(connectionString);
            return new CarPoolDBContext(builder.Options);
        }
    }

    public class CarPoolDBContext : DbContext
    {
        public CarPoolDBContext(DbContextOptions opts): base(opts)
        {

        }
        public DbSet<Rating> Ratings { get; set; }
        public DbSet<RideProvider> Rides { get; set; }
        public DbSet<PassengerRide> PassengerRides { get; set; }
        public DbSet<User> Users{ get; set; }
        public DbSet<Vehicle> Vehicles { get; set; }

        //protected override void OnConfiguring(DbContextOptionsBuilder options)
        //     => options.UseSqlServer(@"data source = CNK_003\MYSQL; initial catalog = CarPoolDB; Integrated Security = true");

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //modelBuilder.Entity<RideProvider>().HasMany(ride => ride.Rating)
            //               .WithRequired().HasForeignKey(con => con.RideId);
            modelBuilder.Entity<User>().HasIndex(u => u.PhoneNumber).IsUnique();
            modelBuilder.Entity<User>().HasIndex(u => u.Email).IsUnique();
        }
    }
}
