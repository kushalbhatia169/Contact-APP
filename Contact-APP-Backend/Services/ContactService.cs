// Importing necessary libraries
using Contact_APP_Backend.Enitity;
using Contact_APP_Backend.Helpers;

// Namespace declaration for the service class
namespace Contact_APP_Backend.Services
{
    // Declaration of the ContactService class, implementing the IContactService interface
    public class ContactService(APIContext context) : IContactService
    {
        // Readonly field to hold the APIContext object
        private readonly APIContext _context = context;

        // Method to retrieve all contacts
        public IEnumerable<ContactSchema> GetAllContacts()
        {
            return _context.Contacts; // Returning all contacts from the context
        }

        // Method to retrieve a contact by ID
        public ContactSchema GetContactById(int id)
        {
            return GetContact(id); // Calling a helper method to retrieve the contact by ID
        }

        // Method to delete a contact by ID
        public void DeleteContact(int id)
        {
            var contact = GetContact(id); // Retrieving the contact by ID
            _context.Contacts.Remove(contact); // Removing the contact from the context
            _context.SaveChanges(); // Saving changes to the database
        }

        // Method to create a new contact
        public void CreateContact(ContactSchema model)
        {
            // Validation: checking if a contact with the same email already exists
            if (_context.Contacts.Any(x => x.Email == model.Email))
                throw new Exception("contact with the email '" + model.Email + "' already exists");

            // Saving the new contact to the context
            _context.Contacts.Add(model);
            _context.SaveChanges(); // Saving changes to the database
        }

        // Method to update an existing contact
        public void UpdateContact(int id, ContactSchema model)
        {
            var contact = GetContact(id); // Retrieving the contact by ID

            // Checking if the contact exists
            if (contact != null)
            {
                // Updating the contact properties with the values from the provided model
                contact.Name = model.Name;
                contact.Picture = model.Picture;
                contact.Email = model.Email;
                contact.Address = model.Address;
                contact.City = model.City;
                contact.Country = model.Country;
                contact.PostalCode = model.PostalCode;
                contact.PhoneNumber = model.PhoneNumber;
            }
            else
            {
                throw new Exception("Object not found with the specified Id!"); // Throwing an exception if the contact does not exist
            }

            _context.Contacts.Update(contact); // Updating the contact in the context
            _context.SaveChanges(); // Saving changes to the database
        }

        // Helper method to retrieve a contact by ID
        private ContactSchema GetContact(int id)
        {
            var contact = _context.Contacts.Find(id); // Finding the contact by ID in the context
            return contact ?? throw new KeyNotFoundException("contact not found"); // Returning the contact or throwing an exception if not found
        }
    }
}
