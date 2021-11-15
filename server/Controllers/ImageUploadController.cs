using System.IO;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ImageUploadController : ControllerBase
    {
        private readonly IWebHostEnvironment _hosting;

        public ImageUploadController(IWebHostEnvironment hosting)
        {
            _hosting = hosting;
        }

        [HttpGet]
        public string Get()
        {
            return "Use POST to upload image.";
        }
        
        [HttpPost]
        [Route("[action]")]
        public ActionResult SaveImage(IFormFile file)
        {
            string webRootPath = _hosting.WebRootPath;
            string absolutePath = Path.Combine($"{webRootPath}/images/{file.FileName}");
            try
            {
                using (var fileStream = new FileStream(absolutePath, FileMode.Create))
                {
                    file.CopyTo(fileStream);
                }

                return StatusCode(201);
            }
            catch
            {
                return StatusCode(500);
            }
        }
    }
}