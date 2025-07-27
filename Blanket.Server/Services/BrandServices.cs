using Blanket.Server.Models;
using Blanket.Server.Models.InputModel;
using Blanket.Server.Models.Model;
using Microsoft.EntityFrameworkCore;

namespace Blanket.Server.Services
{
    public class BrandServices
    {
        private readonly BlanketDbContext _context;
        private readonly ImageServices _imageService;

        public BrandServices(BlanketDbContext context, ImageServices imageService)
        {
            _context = context;
            _imageService = imageService;
        }

        public async Task<List<Brand>> GetBrandsAsync() => await _context.Brands.Include(b => b.BrandImage).ToListAsync();

        public async Task<List<Brand>> GetBrandsWithBlanketsAsync() =>
            await _context.Brands.Include(b => b.BrandImage).Include(b => b.Blankets).ThenInclude(ac => ac.Images).ToListAsync();

        public async Task<Brand> GetBrandAsync(Guid id) => await _context.Brands.FindAsync(id);

        public async Task<Result<Brand>> CreateBrandAsync(InputBrand inputBrand)
        {
            var existingBrand = await _context.Brands.FirstOrDefaultAsync(b => b.BrandName == inputBrand.BrandName);
            if (existingBrand != null)
            {
                return new Result<Brand>(data: null, message: "Hãng đã tồn tại");
            }
            var brand = new Brand()
            {
                Id = Guid.NewGuid(),
                BrandName = inputBrand.BrandName
            };

            var brandImage = new BrandImage
            {
                Id = Guid.NewGuid(),
                Path = await _imageService.SaveFileAsync(inputBrand.Image),
                Name = inputBrand.Image.FileName,
                BrandId = brand.Id
            };

            await _context.Brands.AddAsync(brand);
            await _context.BrandImages.AddAsync(brandImage);
            var res = await _context.SaveChangesAsync();
            return res > 0 ? new Result<Brand>(data: brand) : null;
        }

        public async Task<Result<Brand>> UpdateBrandAsync(Guid id, InputBrand inputBrand)
        {
            var brand = await _context.Brands.FindAsync(id);
            var existingBrand = await _context.Brands.FirstOrDefaultAsync(b => b.BrandName == inputBrand.BrandName);
            if (existingBrand != null && existingBrand.Id != id)
            {
                return new Result<Brand>(data: null, message: "Hãng đã tồn tại");
            }

            if (brand != null)
            {
                brand.BrandName = inputBrand.BrandName;
                if (inputBrand.Image != null)
                {
                    var brandImage = await _context.BrandImages.FirstOrDefaultAsync(bi => bi.BrandId == id);
                    if (brandImage != null)
                    {
                        _imageService.DeleteImage(brandImage.Path);
                        brandImage.Path = await _imageService.SaveFileAsync(inputBrand.Image);
                        brandImage.Name = inputBrand.Image.FileName;
                    }
                    else
                    {
                        var newBrandImage = new BrandImage()
                        {
                            BrandId = id,
                            Id = Guid.NewGuid(),
                            Name = inputBrand.Image.FileName,
                            Path = await _imageService.SaveFileAsync(inputBrand.Image)
                        };
                        await _context.BrandImages.AddAsync(newBrandImage);
                    }
                }

                await _context.SaveChangesAsync();
                return new Result<Brand>(brand);
            }
            return new Result<Brand>(null, "Không có nhãn hiệu trùng với ID");
        }

        public async Task<bool> DeleteBrandAsync(Guid id)
        {
            var brand = await _context.Brands.FindAsync(id);
            if (brand != null)
            {
                _context.Brands.Remove(brand);
                await _context.SaveChangesAsync();
                return true;
            }
            return false;
        }
    }
}
