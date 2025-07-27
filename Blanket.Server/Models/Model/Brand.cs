namespace Blanket.Server.Models.Model
{
    public class Brand
    {
        public Guid Id { get; set; }
        public string BrandName { get; set; }
        public BrandImage BrandImage { get; set; }
        public ICollection<BlanketProduct> Blankets { get; set; }
    }
}
