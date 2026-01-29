using ETicaretAPI.Application.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ETicaretAPI.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        readonly private IProductWriteRepository _productWriteRepository;
        readonly private IProductReadRepository _productReadRepository;

        public ProductsController(IProductWriteRepository productWriteRepository, IProductReadRepository productReadRepository)
        {
            _productWriteRepository = productWriteRepository;
            _productReadRepository = productReadRepository;
        }
        [HttpPost]
        public async Task<IActionResult> post()
        {
            await _productWriteRepository.AddRangeAsync(new()
            {
                new(){Id = Guid.NewGuid(), Name = "supurge", stock = 5 , Price= 25000,CreateDate = DateTime.UtcNow},
                new(){Id = Guid.NewGuid(), Name = "kahve makinası", stock = 5 , Price= 25000,CreateDate = DateTime.UtcNow},
                new(){Id = Guid.NewGuid(), Name = "Telefon", stock = 5 , Price= 25000,CreateDate = DateTime.UtcNow}
            });
           await  _productWriteRepository.SaveAsync();

            return Ok();
        }
        [HttpGet("{id}")]
        public async Task<ActionResult> Get(string id)
        {
            var product = await _productReadRepository.GetByIdAsync(id);
            return Ok(product);
        }
    }
}
