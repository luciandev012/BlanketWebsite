using Blanket.Server.Common;
using Blanket.Server.Models;
using Blanket.Server.Models.InputModel;
using Blanket.Server.Models.Model;
using Microsoft.EntityFrameworkCore;

namespace Blanket.Server.Services
{
    public class BlanketServices
    {
        private readonly BlanketDbContext _context;
        private readonly ImageServices _imageService;
        public BlanketServices(BlanketDbContext context, ImageServices imageService)
        {
            _context = context;
            _imageService = imageService;
        }
        public async Task<List<BlanketProduct>> GetBlanketsAsync()
        {
            return await _context.BlanketProducts
                .Include(ac => ac.Brand).ThenInclude(b => b.BrandImage)
                .Include(ac => ac.Images)
                .ToListAsync();
        }
        public async Task<BlanketProduct> GetBlanketProductByIdAsync(Guid id)
        {
            return await _context.BlanketProducts
                .Include(ac => ac.Brand)
                .Include(ac => ac.Images)
                .FirstOrDefaultAsync(ac => ac.Id == id);
        }

        public async Task<List<BlanketProduct>> GetBlanketProductsByBrandIdAsync(Guid brandId, Guid id)
        {
            var res = await _context.BlanketProducts
                .Where(ac => ac.BrandId == brandId)
                .Include(ac => ac.Images)
                .ToListAsync();
            return res.Where(ac => ac.Id != id).OrderByDescending(ac => decimal.Parse(ac.Price)).Take(4).ToList();
        }

        public async Task<List<BlanketProduct>> GetNewestBlanketProductsAsync(int num)
        {
            var res = await _context.BlanketProducts
                .Include(ac => ac.Images)
                .ToListAsync();
            return res.OrderByDescending(bp => bp.UpdatedAt).Take(num).ToList();
        }
        public async Task<Result<BlanketProduct>> CreateBlanketProductAsync(InputBlanketProduct inputBlanketProduct)
        {
            var blanket = new BlanketProduct
            {
                Id = Guid.NewGuid(),
                Name = inputBlanketProduct.Name,
                Color = inputBlanketProduct.Color,
                Description = inputBlanketProduct.Description,
                ProductType = inputBlanketProduct.ProductType,
                Size = inputBlanketProduct.Size,
                BrandId = inputBlanketProduct.BrandId,
                Price = inputBlanketProduct.Price,
                PathName = Helper.GetSlug(inputBlanketProduct.Name)
            };

            if (inputBlanketProduct.Images != null && inputBlanketProduct.Images.Any())
            {
                foreach (var image in inputBlanketProduct.Images)
                {
                    var imageResult = await _imageService.SaveFileAsync(image);
                    if (!string.IsNullOrEmpty(imageResult))
                    {
                        blanket.Images.Add(new Image
                        {
                            Id = Guid.NewGuid(),
                            Path = imageResult,
                            BlanketId = blanket.Id,
                            Name = image.FileName
                        });
                    }
                }
            }

            _context.BlanketProducts.Add(blanket);
            var res = await _context.SaveChangesAsync();
            return res > 0 ? new Result<BlanketProduct>(blanket) : new Result<BlanketProduct>(null, "Thêm chăn không thành công");
        }
        public async Task<Result<BlanketProduct>> UpdateBlanketProductAsync(Guid id, InputBlanketProduct updatedBlanketProduct)
        {
            var existingBlanket = await GetBlanketProductByIdAsync(id);
            if (existingBlanket == null) return new Result<BlanketProduct>(null, "Không tìm thấy chăn với id này");
            existingBlanket.Name = updatedBlanketProduct.Name;
            existingBlanket.Color = updatedBlanketProduct.Color;
            existingBlanket.Size = updatedBlanketProduct.Size;
            existingBlanket.Description = updatedBlanketProduct.Description;
            existingBlanket.ProductType = updatedBlanketProduct.ProductType;
            existingBlanket.BrandId = updatedBlanketProduct.BrandId;
            existingBlanket.UpdatedAt = DateTime.UtcNow;
            existingBlanket.Price = updatedBlanketProduct.Price;
            existingBlanket.PathName = Helper.GetSlug(updatedBlanketProduct.Name);
            if (updatedBlanketProduct.Images != null && updatedBlanketProduct.Images.Any())
            {
                foreach (var item in existingBlanket.Images)
                {
                    _imageService.DeleteImage(item.Path);
                }
                _context.Images.RemoveRange(existingBlanket.Images);
                var listImage = new List<Image>();
                foreach (var item in updatedBlanketProduct.Images)
                {
                    var image = new Image()
                    {
                        Id = Guid.NewGuid(),
                        Name = item.FileName,
                        Path = await _imageService.SaveFileAsync(item),
                        BlanketId = id
                    };
                    listImage.Add(image);
                }
                await _context.Images.AddRangeAsync(listImage);
            }
            await _context.SaveChangesAsync();
            return new Result<BlanketProduct>(existingBlanket);
        }
        public async Task<bool> DeleteBlanketProductAsync(Guid id)
        {
            var blanketProduct = await GetBlanketProductByIdAsync(id);
            if (blanketProduct == null) return false;
            // Delete associated images
            foreach (var image in blanketProduct.Images)
            {
                _imageService.DeleteImage(image.Path);
            }
            _context.Images.RemoveRange(blanketProduct.Images);
            _context.BlanketProducts.Remove(blanketProduct);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> CreateOrderAsync(InputOrder inputOrder)
        {
            var existOrder = await _context.Orders
                .FirstOrDefaultAsync(order => order.PhoneNumber == inputOrder.PhoneNumber);
            if (existOrder != null)
            {
                return false;
            }
            var order = new Order()
            {
                Id = Guid.NewGuid(),
                PhoneNumber = inputOrder.PhoneNumber,
                BlanketProductIds = inputOrder.BlanketProductIds,
                Name = inputOrder.Name,
                Address = inputOrder.Address,
            };
            var res = await _context.Orders.AddAsync(order);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<List<OutputOrder>> GetOrdersAsync()
        {
            var orders = new List<OutputOrder>();
            var res = await _context.Orders.ToListAsync();
            foreach (var order in res)
            {
                var outputOrder = new OutputOrder();
                outputOrder.Id = order.Id;
                outputOrder.PhoneNumber = order.PhoneNumber;
                outputOrder.Status = order.Status;
                outputOrder.Name = order.Name;
                outputOrder.Address = order.Address;
                foreach (var blanketProductId in order.BlanketProductIds)
                {
                    var blanketProduct = await _context.BlanketProducts.FindAsync(Guid.Parse(blanketProductId));
                    if (blanketProduct != null)
                    {
                        outputOrder.BlanketProducts.Add(blanketProduct);
                        outputOrder.TotalPrice += float.Parse(blanketProduct.Price);
                    }
                }
                orders.Add(outputOrder);
            }
            return orders;
        }

        public async Task<OutputOrder> GetOrderByPhoneNumberAsync(string phoneNumber)
        {

            var res = await _context.Orders.FirstOrDefaultAsync(order => order.PhoneNumber == phoneNumber);
            var outputOrder = new OutputOrder();
            outputOrder.PhoneNumber = res.PhoneNumber;
            outputOrder.Id = res.Id;
            outputOrder.Status = res.Status;
            outputOrder.Name = res.Name;
            outputOrder.Address = res.Address;
            foreach (var blanketProductId in res.BlanketProductIds)
            {
                var blanketProduct = await _context.BlanketProducts.FindAsync(Guid.Parse(blanketProductId));
                if (blanketProduct != null)
                {
                    outputOrder.BlanketProducts.Add(blanketProduct);
                    outputOrder.TotalPrice += float.Parse(blanketProduct.Price);
                }
            }
            return outputOrder;
        }

        public async Task<bool> UpdateOrderStatusAsync(Guid id, int status)
        {
            var order = await _context.Orders.FindAsync(id);
            if (order == null) return false;
            // Explicitly cast the integer 'status' to the ORDER_STATUS enum
            order.Status = (ORDER_STATUS)status;
            _context.Orders.Update(order);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteOrderAsync(Guid id)
        {
            var order = await _context.Orders.FindAsync(id);
            if (order != null)
            {
                _context.Orders.Remove(order);
                await _context.SaveChangesAsync();
                return true;
            }
            return false;
        }
    }
}
