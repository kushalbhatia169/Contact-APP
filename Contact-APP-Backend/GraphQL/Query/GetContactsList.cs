using Contact_APP_Backend.GraphQL.Types;
using GraphQL.Types;

namespace Contact_APP_Backend.GraphQL.Query
{
    public class GetContactsList : ObjectGraphType
    {
        private readonly IContactService _contactService;

        // Constructor for the ContactController class
        public GetContactsList(IContactService contactService)
        {
            _contactService = contactService; // Initializing the _contactService field

            Field<ListGraphType<ContactType>>("contacts")
                .Resolve(context =>
                {
                    var contacts = _contactService.GetAllContacts();
                    if(!contacts.Any())
                    {
                        _contactService.GenerateDummyContact();
                    }

                    return contacts ?? _contactService.GetAllContacts();
                });
        }
    }

    public class GetContactsDetailsSchema : Schema
    {
        public GetContactsDetailsSchema(IServiceProvider serviceProvider) : base(serviceProvider)
        {
            Query = serviceProvider.GetRequiredService<GetContactsList>();
        }
    }
}
