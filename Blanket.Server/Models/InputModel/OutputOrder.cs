using Blanket.Server.Models.Model;

namespace Blanket.Server.Models.InputModel
{
    public class OutputOrder
    {
        public Guid Id { get; set; }
        public string PhoneNumber { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public ICollection<BlanketProduct> BlanketProducts { get; set; } = new List<BlanketProduct>();
        public ORDER_STATUS Status { get; set; }
        public float TotalPrice { get; set; }
    }
}
