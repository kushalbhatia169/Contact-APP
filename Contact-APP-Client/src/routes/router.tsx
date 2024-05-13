import { pages } from '../pages'; // Importing pages from '../pages'
import { BrowserRouter, Route, Routes } from 'react-router-dom'; // Importing necessary components from react-router-dom

const Router = () => {
  const { ListContacts, ModifyOrCreateContact } = pages; // Destructuring ListContacts and ModifyOrCreateContact from pages

  return (
    <BrowserRouter> {/* Wrapping the routes with BrowserRouter */}
      <Routes> {/* Defining the routes */}
        {/* Route for displaying the list of contacts */}
        <Route path="/listContacts" element={<ListContacts />} />
        {/* Route for updating a contact, passing the contact ID as a parameter */}
        <Route path="/updateContact/:id" element={<ModifyOrCreateContact />} />
        {/* Route for creating a new contact */}
        <Route path="/createContact" element={<ModifyOrCreateContact />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
