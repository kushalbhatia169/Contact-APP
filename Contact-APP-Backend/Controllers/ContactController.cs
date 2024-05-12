// Importing necessary libraries
using Contact_APP_Backend.Enitity;
using Contact_APP_Backend.Helpers;
using Contact_APP_Backend.Services;
using Microsoft.AspNetCore.Mvc;

// Namespace declaration for the controller
namespace Contact_APP_Backend.Controllers
{
    // Attribute specifying that this class is an API controller
    [ApiController]
    // Attribute specifying the route for this controller
    [Route("[controller]")]
    // Declaration of the ContactController class, which inherits from ControllerBase
    public class ContactController : ControllerBase
    {
        // Readonly field to hold the IContactService object
        private readonly IContactService _contactService;

        // Constructor for the ContactController class
        public ContactController(IContactService contactService)
        {
            _contactService = contactService; // Initializing the _contactService field
        }

        // GET endpoint to retrieve all contacts
        [HttpGet(Name = "GetContactList")]
        public IEnumerable<ContactSchema> GetContacts()
        {
            return _contactService.GetAllContacts(); // Calling service to get all contacts
        }

        // GET endpoint to retrieve a contact by ID
        [HttpGet("{id}")]
        public IActionResult GetContactById(int id)
        {
            var user = _contactService.GetContactById(id); // Calling service to get contact by ID
            return Ok(user); // Returning OK response with the contact data
        }

        // POST endpoint to create a new contact
        [HttpPost]
        public IActionResult CreateContact(ContactSchema model)
        {
            _contactService.CreateContact(model); // Calling service to create a new contact
            return Ok(new { message = "Contact created" }); // Returning OK response with a success message
        }

        // PUT endpoint to update an existing contact
        [HttpPut("{id}")]
        public IActionResult UpdateContact(int id, ContactSchema model)
        {
            _contactService.UpdateContact(id, model); // Calling service to update the contact
            return Ok(new { message = "Contact updated" }); // Returning OK response with a success message
        }

        // DELETE endpoint to delete a contact by ID
        [HttpDelete("{id}")]
        public IActionResult DeleteContact(int id)
        {
            _contactService.DeleteContact(id); // Calling service to delete the contact
            return Ok(new { message = "Contact deleted" }); // Returning OK response with a success message
        }
    }
}
