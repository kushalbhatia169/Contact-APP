using Contact_APP_Backend.Enitity;
using GraphQL.Types;
namespace Contact_APP_Backend.GraphQL.Types
{
    public class ContactType : ObjectGraphType<ContactSchema>
    {
        public ContactType()
        {
            Name = nameof(ContactType);
            Field(a => a.Id);
            Field(a => a.Name);
            Field(a => a.Email);
            Field(a => a.Address);
            Field(a => a.PostalCode);
            Field(a => a.PhoneNumber);
            Field(a => a.City);
            Field(a => a.Country);
            Field(a => a.Picture);
        }
    }
}