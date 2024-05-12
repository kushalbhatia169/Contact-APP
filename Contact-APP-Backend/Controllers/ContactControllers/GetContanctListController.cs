using Contact_APP_Backend.Controllers.DBControllers;
using Contact_APP_Backend.Enitity.ContanctSchema;
using Microsoft.AspNetCore.Mvc;

namespace Contact_APP_Backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class GetContactListController : ControllerBase
    {
        private readonly ApiContext apiContext;

        public GetContactListController(ApiContext apiContext)
        {
            this.apiContext = apiContext;
        }

        [HttpGet(Name = "GetContactList")]
        public IEnumerable<ContactSchema> Get()
        {
            List<ContactSchema> contacts = apiContext.GetCategories();
            return contacts;
        }
    }
}

