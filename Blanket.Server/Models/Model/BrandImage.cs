namespace Blanket.Server.Models.Model
{
    public class BrandImage
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Path { get; set; }

        //relationship
        public Guid BrandId { get; set; }
        public Brand Brand { get; set; }
    }
}
