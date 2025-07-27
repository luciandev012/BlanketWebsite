using static System.Net.Mime.MediaTypeNames;

namespace Blanket.Server.Models.Model
{
    public class BlanketProduct
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Price { get; set; }
        public string Color { get; set; }
        public string Description { get; set; }
        public string ProductType { get; set; }
        public string Size { get; set; }
        public string PathName { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

        public ICollection<Image> Images { get; } = new List<Image>();
        public Brand Brand { get; set; }
        public Guid BrandId { get; set; }
    }
}
