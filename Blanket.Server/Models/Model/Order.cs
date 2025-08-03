namespace Blanket.Server.Models.Model
{
    public enum ORDER_STATUS
    {
        PENDING = 0,
        ACCEPTED,
        DENIED,
    };
    public class Order
    {
        public Guid Id { get; set; }
        public string PhoneNumber { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public ICollection<string> BlanketProductIds { get; set; }
        public ORDER_STATUS Status { get; set; } = ORDER_STATUS.PENDING;
    }
}
