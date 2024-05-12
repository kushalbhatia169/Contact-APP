using Contact_APP_Backend.Enitity;

public interface IContactService
{
    // Method to retrieve all contacts
    IEnumerable<ContactSchema> GetAllContacts();

    // Method to retrieve a contact by ID
    ContactSchema GetContactById(int id);

    // Method to create a new contact
    void CreateContact(ContactSchema model);

    // Method to update an existing contact
    void UpdateContact(int id, ContactSchema model);

    // Method to delete a contact by ID
    void DeleteContact(int id);
}

