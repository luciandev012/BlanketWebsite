using Blanket.Server.Models.InputModel;
using Blanket.Server.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Blanket.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BrandController : ControllerBase
    {
        private readonly BrandServices _brandService;
        public BrandController(BrandServices brandService)
        {
            _brandService = brandService;
        }

        [HttpGet]
        public async Task<IActionResult> GetBrandsAsync()
        {
            var res = await _brandService.GetBrandsAsync();
            return Ok(res);
        }

        [HttpGet("with-airconditions")]
        public async Task<IActionResult> GetBrandsWithAirConditionsAsync()
        {
            var res = await _brandService.GetBrandsWithBlanketsAsync();
            return Ok(res);
        }

        [HttpPost]
        public async Task<IActionResult> CreateBrandAsync([FromForm] InputBrand brand)
        {
            var res = await _brandService.CreateBrandAsync(brand);
            if (res.HasError)
            {
                return Conflict(res.Message);
            }
            return Created($"api/brand/{res.Data.Id}", res.Data);
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateBrandAsync([FromRoute] Guid id, [FromForm] InputBrand brand)
        {
            var res = await _brandService.UpdateBrandAsync(id, brand);
            if (res.HasError)
            {
                return Conflict(res.Message);
            }
            return Ok(res.Data);
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBrandASync([FromRoute] Guid id)
        {
            var res = await _brandService.DeleteBrandAsync(id);
            return Ok();

        }
    }
}
