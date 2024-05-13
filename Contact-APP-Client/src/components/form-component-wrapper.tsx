import { PropsWithChildren } from 'react'
import styles from  "../pages/modify-or-create-contact/modify-or-create-contact.module.css";
import { Box } from '@mui/system';

interface FormComponentWrapperProps {
  label: string
}
const FormComponentWrapper = (props: PropsWithChildren<FormComponentWrapperProps>) => {
  return (
    <Box className="d-flex flex-column flex-wrap align-items-start" maxWidth={500}>
      <Box component="span" className={`${styles.requiredField} mt-2`}>{props.label}</Box>
      {props.children}
    </Box>
  )
}

export default FormComponentWrapper
