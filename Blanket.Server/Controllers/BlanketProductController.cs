using Blanket.Server.Models.InputModel;
using Blanket.Server.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Blanket.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BlanketProductController : ControllerBase
    {
        private readonly BlanketServices _blanketServices;
        public BlanketProductController(BlanketServices blanketServices)
        {
            _blanketServices = blanketServices;
        }
        [AllowAnonymous]
        [HttpGet]
        public async Task<IActionResult> GetBlanketProductsAsync()
        {
            var res = await _blanketServices.GetBlanketsAsync();
            return Ok(res);
        }
        [AllowAnonymous]
        [HttpGet("latest")]
        public async Task<IActionResult> GetNewestBlanketProductsAsync()
        {
            var res = await _blanketServices.GetNewestBlanketProductsAsync(5);
            return Ok(res);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetAirConditionByIdAsync(Guid id)
        {
            var res = await _blanketServices.GetBlanketProductByIdAsync(id);
            if (res == null) return NotFound();
            return Ok(res);
        }

        [HttpGet("{brandId}/{id}")]
        public async Task<IActionResult> GetBlanketProductsByBrandId([FromRoute] Guid brandId, Guid id)
        {
            var res = await _blanketServices.GetBlanketProductsByBrandIdAsync(brandId, id);
            if (res == null) return NotFound();
            return Ok(res);
        }

        [HttpPost]
        public async Task<IActionResult> CreateAirConditionAsync([FromForm] InputBlanketProduct blanketProduct)
        {
            var res = await _blanketServices.CreateBlanketProductAsync(blanketProduct);
            if (res.HasError) return Conflict(res.Message);
            return Created($"api/aircondition/{res.Data.Id}", res.Data);
        }
        [AllowAnonymous]    
        [HttpPost("order")]
        public async Task<IActionResult> CreateOrderAsync([FromBody] InputOrder order)
        {
            var res = await _blanketServices.CreateOrderAsync(order);
            if (res)
            {
                return Ok();
            }
            else
            {
                return BadRequest("Đơn hàng với số điện thoại của bạn đã trùng");
            }
        }
        [HttpGet("order")]
        public async Task<IActionResult> GetOrdersAsync()
        {
            var res = await _blanketServices.GetOrdersAsync();
            return Ok(res);
        }

        [AllowAnonymous]
        [HttpGet("order/{phoneNumber}")]
        public async Task<IActionResult> GetOrdersByPhoneNumberAsync(string phoneNumber)
        {
            var res = await _blanketServices.GetOrderByPhoneNumberAsync(phoneNumber);
            return Ok(res);
        }

        [HttpPut("order/{id}/{status}")]
        public async Task<IActionResult> UpdateOrderStatusAsync([FromRoute] string id, string status)
        {
            var res = await _blanketServices.UpdateOrderStatusAsync(Guid.Parse(id), int.Parse(status));
            return Ok(res);
        }

        [HttpDelete("order/{id}")]
        public async Task<IActionResult> DeleteOrderAsync([FromRoute] string id)
        {
            var res = await _blanketServices.DeleteOrderAsync(Guid.Parse(id));
            return Ok(res);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateBlanketProductAsync(Guid id, [FromForm] InputBlanketProduct updatedAirCondition)
        {
            var res = await _blanketServices.UpdateBlanketProductAsync(id, updatedAirCondition);
            if (res.HasError) return NotFound();
            return Ok(res.Data);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBlanketProductAsync(Guid id)
        {
            var success = await _blanketServices.DeleteBlanketProductAsync(id);
            if (!success) return NotFound();
            return NoContent();
        }
    }
}
