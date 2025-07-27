namespace Blanket.Server.Models.InputModel
{
    public class Result<T>
    {
        public string Message { get; set; } = string.Empty;
        public T Data { get; set; }
        public bool HasError => !string.IsNullOrEmpty(Message);
        public Result(T data, string message = null)
        {
            Data = data;
            Message = message ?? string.Empty;
        }
    }
}
