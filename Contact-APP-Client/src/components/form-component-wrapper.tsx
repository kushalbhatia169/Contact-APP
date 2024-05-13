import { PropsWithChildren } from 'react'; // Importing PropsWithChildren type from React
import styles from  "../pages/modify-or-create-contact/modify-or-create-contact.module.css"; // Importing CSS module for styling
import { Box } from '@mui/system'; // Importing Box component from Material-UI
import { FormComponentWrapperProps } from '../types/form-compnent-wrapper'; // Importing type definition for form component wrapper props

// Functional component for wrapping form components
const FormComponentWrapper = (props: PropsWithChildren<FormComponentWrapperProps>) => {
  return (
    <Box className="d-flex flex-column flex-wrap align-items-start" maxWidth={500}>
      {/* Displaying the label for the form component */}
      <Box component="span" className={`${styles.requiredField} mt-2`}>{props.label}</Box>
      {props.children} {/* Rendering child components within the wrapper */}
    </Box>
  );
};

export default FormComponentWrapper; // Exporting the FormComponentWrapper component as the default export
