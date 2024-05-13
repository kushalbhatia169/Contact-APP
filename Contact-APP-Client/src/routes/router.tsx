
import { pages } from '../pages';
import { BrowserRouter, Switch, Route, HashRouter, Redirect } from 'react-router-dom';

const Router = () => {
  return (<>
    <BrowserRouter forceRefresh={false}>
      <HashRouter>
        <Switch>
          <Route
            exact
            path="/"
            render={() => {
              return <Redirect to="/listContacts" />
            }}
          />
          <Route exact path="/listContacts" component={pages["ListContacts"]} />
          <Route exact path="/updateContact/:id" component={pages["ModifyOrCreateContact"]} />
          <Route exact path="/createContact" component={pages["ModifyOrCreateContact"]} />
          <Route exact path="/viewContact/:id" component={pages["ViewContact"]} />
          <Route path="*">
            <NoMatch />
          </Route>
        </Switch>
      </HashRouter>
    </BrowserRouter></>
  );
};

const NoMatch = () => {
  return (
    <Redirect to="/listContacts" />
  );
};
export default Router;
