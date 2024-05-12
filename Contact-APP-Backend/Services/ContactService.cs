using Contact_APP_Backend.Enitity.ContanctSchema;
using Contact_APP_Backend.Helpers;

namespace Contact_APP_Backend.Services
{
   public class ContactService(APIContext context) : IContactService
   {
        private readonly APIContext _context = context;

        public IEnumerable<ContactSchema> GetAll()
        {
            return _context.Contacts;
        }

        public ContactSchema GetById(int id)
        {
            return GetUser(id);
        }

        public void Delete(int id)
        {
            var user = GetUser(id);
            _context.Contacts.Remove(user);
            _context.SaveChanges();
        }

        // helper methods

        private ContactSchema GetUser(int id)
        {
            var user = _context.Contacts.Find(id);
            if (user == null) throw new KeyNotFoundException("User not found");
            return user;
        }
    }
}