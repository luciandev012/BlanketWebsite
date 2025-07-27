namespace Blanket.Server.Models.Model
{
    public class Image
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Path { get; set; }

        //relationship
        public Guid BlanketId { get; set; }
        public BlanketProduct Blanket { get; set; }
    }
}
