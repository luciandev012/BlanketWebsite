namespace Blanket.Server.Models.InputModel
{
    public class InputOrder
    {
        public string PhoneNumber { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public List<string> BlanketProductIds { get; set; }
    }
}
