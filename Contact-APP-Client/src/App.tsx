import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material'; // Importing components from Material-UI
import { Box } from '@mui/system'; // Importing Box component from Material-UI
import './App.css'; // Importing custom styles
import Router from './routes/router'; // Importing Router component
import Store from './store/store'; // Importing Store component

// Main component for the entire application
const App = () => {

  return (
    <Store> {/* Wrapping the entire application with the Store component */}
      <Box> {/* Container component from Material-UI */}
        <AppBar position="absolute" > {/* Material-UI AppBar component */}
          <Toolbar> {/* Material-UI Toolbar component */}
            <Typography variant="h3" component="div" className="flex-grow-1"> {/* Material-UI Typography component */}
              Contacts Library App {/* Application title */}
            </Typography>
          </Toolbar>
        </AppBar>
        <Router/> {/* Routing component for handling navigation */}
      </Box>
    </Store>
  )
}

export default App; // Exporting the App component as the default export
