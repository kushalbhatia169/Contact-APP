using Contact_APP_Backend.Enitity.ContanctSchema;

namespace Contact_APP_Backend.Services
{
    public interface IContactService
    {
        IEnumerable<ContactSchema> GetAll();
        ContactSchema GetById(int id);
        //void Create(CreateRequest model);
        //void Update(int id, UpdateRequest model);
        void Delete(int id);
    }
}
