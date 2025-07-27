namespace Blanket.Server.Services
{
    public class ImageServices
    {
        private readonly string _imageFolderPath;

        public ImageServices(IWebHostEnvironment env)
        {
            // wwwroot/Upload/Images
            _imageFolderPath = Path.Combine(env.WebRootPath, "Upload", "Images");
            if (!Directory.Exists(_imageFolderPath))
            {
                Directory.CreateDirectory(_imageFolderPath);
            }
        }
        public async Task<string> SaveFileAsync(IFormFile file)
        {
            var fileName = DateTime.Now.Ticks + Path.GetExtension(file.FileName);
            var path = Path.Combine(_imageFolderPath, fileName);
            if (File.Exists(path))
            {
                File.Delete(path);
            }
            using (Stream stream = new FileStream(path, FileMode.Create))
            {
                await file.CopyToAsync(stream);
                stream.Flush();
            }
            return fileName;
        }

        public async Task<FileStream> GetImageAsync(string fileName)
        {
            var path = Path.Combine(_imageFolderPath, fileName);
            return File.OpenRead(path);
        }
        public void DeleteImage(string fileName)
        {
            var path = Path.Combine(_imageFolderPath, fileName);
            if (File.Exists(path))
            {
                File.Delete(path);
            }
        }
    }
}
