using Blanket.Server.Models.Model;

namespace Blanket.Server.Models.InputModel
{
    public class InputBlanketProduct
    {
        public string Name { get; set; }
        public string Price { get; set; }
        public string Color { get; set; }
        public string Description { get; set; }
        public string ProductType { get; set; }
        public string Size { get; set; }
        public List<IFormFile> Images { get; set; }
        public Guid BrandId { get; set; }
    }
}
