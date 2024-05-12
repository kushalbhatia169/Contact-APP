// Namespace declaration for the entity class
 namespace Contact_APP_Backend.Enitity // Commenting out unused namespace
{
// Declaration of the ContactSchema class
    public class ContactSchema
    {
        // Property to represent the ID of the contact
        public int Id { get; set; }

        // Property to represent the name of the contact
        public string Name { get; set; } = string.Empty;

        // Property to represent the name of the contact
        public string Picture { get; set; } = string.Empty;

        // Property to represent the email of the contact
        public string Email { get; set; } = string.Empty;

        // Property to represent the address of the contact
        public string Address { get; set; } = string.Empty;

        // Property to represent the city of the contact
        public string City { get; set; } = string.Empty;

        // Property to represent the country of the contact
        public string Country { get; set; } = string.Empty;

        // Property to represent the postal code of the contact
        public string PostalCode { get; set; } = string.Empty;

        // Property to represent the phone number of the contact
        public string PhoneNumber { get; set; } = string.Empty;
    }
}
