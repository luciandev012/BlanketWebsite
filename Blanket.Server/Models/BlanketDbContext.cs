using Blanket.Server.Models.Model;
using Microsoft.EntityFrameworkCore;

namespace Blanket.Server.Models
{
    public class BlanketDbContext :DbContext
    {
        public BlanketDbContext(DbContextOptions<BlanketDbContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<BlanketProduct>().ToTable("BlanketProducts").HasKey(e => e.Id);

            modelBuilder.Entity<BlanketProduct>().HasMany(e => e.Images).WithOne(e => e.Blanket).HasForeignKey(e => e.BlanketId).OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Image>().ToTable("Images").HasKey(e => e.Id);
            modelBuilder.Entity<BrandImage>().ToTable("BrandImages").HasKey(e => e.Id);

            modelBuilder.Entity<Brand>().ToTable("Brands").HasKey(e => e.Id);
            modelBuilder.Entity<Brand>().HasMany(e => e.Blankets).WithOne(e => e.Brand).HasForeignKey(e => e.BrandId).OnDelete(DeleteBehavior.Cascade);
            modelBuilder.Entity<Brand>().HasOne(e => e.BrandImage).WithOne(e => e.Brand).HasForeignKey<BrandImage>(e => e.BrandId).OnDelete(DeleteBehavior.Cascade);
        }

        public virtual DbSet<BlanketProduct> BlanketProducts { get; set; }
        public virtual DbSet<Image> Images { get; set; }
        public virtual DbSet<Brand> Brands { get; set; }
        public virtual DbSet<BrandImage> BrandImages { get; set; }
    }
}
