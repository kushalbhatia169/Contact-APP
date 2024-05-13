import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import TextField from '@mui/material/TextField/TextField';
import { Box, Button, InputAdornment } from '@mui/material';
import {useCallback, useRef, useState } from 'react';
import styles from "./modify-or-create-contact.module.css";
import axios from 'axios';
import { convertBase64 } from '../../helpers/create-blob-from-file';
import { useForm } from 'react-hook-form';
import MuiPhoneNumber from 'mui-phone-number';
import { Email, GpsFixed, Home, LocationCity, Map, Person, Phone } from '@mui/icons-material';
import FormComponentWrapper from '../../components/form-component-wrapper';

export interface IModifyOrCreateContact {
  id: string;
  name: string;
  pictureFile?: string | ArrayBuffer | null;
  email: string;
  address: string;
  city: string;
  country: string;
  postalCode: string;
  phoneNumber: string;
}

const initialState = {
  id: "",
  name: "",
  pictureFile: "",
  email: "",
  address: "",
  city: "",
  country: "",
  postalCode: "",
  phoneNumber: ""
}

export const ModifyOrCreateContact = () => {
  const [createOrUpdateContact, setCreateOrUpdateContact] = useState<IModifyOrCreateContact>(initialState),
    {register, handleSubmit, formState: { errors } } = useForm({ reValidateMode: 'onBlur' }),
    [phoneError, setPhoneError] = useState(false),
    [errorKey, setErrorKey] = useState<string[]>([]),
    nameRef = useRef<HTMLInputElement>(null),
    emailRef =  useRef<HTMLInputElement>(null),
    addressRef =  useRef<HTMLInputElement>(null),
    cityRef =  useRef<HTMLInputElement>(null),
    countryRef =  useRef<HTMLInputElement>(null),
    postalCodeRef =  useRef<HTMLInputElement>(null),
    phoneNumberRef =  useRef<HTMLInputElement>(null),
    phone_Number_Check = () => {
      if (createOrUpdateContact.phoneNumber) {
        if (createOrUpdateContact.phoneNumber.replace(/\D+/g, '').length < 10) {
          setPhoneError(true);
          return false;
        }
      }
      if (!createOrUpdateContact.phoneNumber) {
        setPhoneError(true);
        return false;
      }

      setPhoneError(false);
      return true;
    },
    hasValidEmail = (value: string ) => /\S+@\S+\.\S+/i.test(value?.toString()),
    handleOnChange = useCallback((keyVal: string, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if(e?.target.value) {
      setCreateOrUpdateContact({
        ...createOrUpdateContact,
        [keyVal]: e.target.value
      });

      setErrorKey(errorKey.filter(i => i !== keyVal));
    } else {
      setCreateOrUpdateContact({
        ...createOrUpdateContact,
        [keyVal]: ""
      });

      setErrorKey([...errorKey, keyVal]);
    }
  },[createOrUpdateContact, errorKey]);

  const onSubmit = () => {
    const fieldsToCheck = ["name", "email", "address", "city", "country", "postalCode", "phoneNumber"];
    let focusRef = null;

    const emptyFields = fieldsToCheck.filter(field => !createOrUpdateContact[field as keyof IModifyOrCreateContact]);

    if (emptyFields.length > 0 && phone_Number_Check()) {
      setErrorKey(emptyFields);
      focusRef = emptyFields[0] === "name" ? nameRef :
                  emptyFields[0] === "email" ? emailRef :
                  emptyFields[0] === "address" ? addressRef : 
                  emptyFields[0] === "city" ? cityRef :
                  emptyFields[0] === "country" ?  countryRef : 
                  emptyFields[0] === "postalCode" ? postalCodeRef : phone_Number_Check() ? phoneNumberRef : null;
    }

    if (focusRef) {
      focusRef?.current?.focus();
    } else {
      axios.put("http://localhost:3000/posts/createPost", {
        title: createOrUpdateContact[fieldsToCheck[0] as keyof IModifyOrCreateContact],
        message: createOrUpdateContact[fieldsToCheck[1] as keyof IModifyOrCreateContact],
        creator: createOrUpdateContact[fieldsToCheck[2] as keyof IModifyOrCreateContact],
        tags: createOrUpdateContact[fieldsToCheck[3] as keyof IModifyOrCreateContact], 
        selectedFile: createOrUpdateContact['pictureFile']
      })
      .then((res) => {
        if(res?.status === 200) {
          console.log(res.data.message);
        } else {
          throw new Error("Sorry your memory can not be saved");
        }
      })
      .catch((error) => {
        console.warn(error);
      });
    }
  };

  const handleUploadFile = async (event: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
    if(event.target.files) {
      const file = event.target.files[0];
      const base64 = await convertBase64(file);

      try {
        if(base64) {
          setCreateOrUpdateContact({
            ...createOrUpdateContact,
            pictureFile: base64
          });
        } else {
          throw new Error("base64 does not created");
        }
      } catch(error) {
        if(error instanceof Error) {
          console.log(error.message);
        }
      }
    }
  }

  return (
    <Card sx={{ minWidth: 500, overflowX: "auto" }}>
      <CardHeader
        title="Create a Contact"
      />
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormComponentWrapper label='Name'>
            <TextField
              fullWidth
              id="outlined-basic"
              placeholder="Name"
              variant="outlined"
              className={`mt-2`}
              value={createOrUpdateContact.name}
              inputRef={nameRef}
              {...register("name", { onChange: item => handleOnChange("name", item), required: true, maxLength: 20, pattern: /^[0-9a-zA-Z]+$/i })}
              error={Boolean(errors && errors.name)}
              {...{
                inputProps:{ maxLength:20 },
                InputProps: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person/>
                    </InputAdornment>
                  )}
              }}
              helperText= {errors && errors.name &&
                <Box style={{ marginLeft: '-1rem', fontSize: '13px', color: 'red' }} component="span">
                  *Name is rquired.
                </Box>
              }
            />
          </FormComponentWrapper>
          <FormComponentWrapper label='Email'>
            <TextField 
              fullWidth
              id="outlined-basic"
              placeholder="Name"
              variant="outlined"
              className="mt-2"
              value={createOrUpdateContact.email}
              {...register("email", { onChange: item => handleOnChange("email", item), required: true, maxLength: 50 ,  validate: hasValidEmail })}
              inputRef={emailRef}
              error={Boolean(errors && errors.email)}
              {...{
                InputProps: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email/>
                    </InputAdornment>
                  )}
              }}
              helperText= {errors && errors.email &&
                <Box style={{ marginLeft: '-1rem', fontSize: '13px', color: 'red' }} component="span">
                  *Email is rquired.
                </Box>
              }
            />
          </FormComponentWrapper>
          <FormComponentWrapper label='Address'>
            <TextField
              fullWidth
              id="outlined-basic"
              placeholder="Address"
              variant="outlined"
              className="mt-2"
              value={createOrUpdateContact.address}
              inputRef={addressRef}
              {...register("address",{ onChange: item => handleOnChange("address", item), required: true })}
              error={Boolean(errors && errors.address)}
              {...{
                InputProps: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <Home/>
                    </InputAdornment>
                  )}
              }}
              helperText= {errors && errors.address &&
                <Box style={{ marginLeft: '-1rem', fontSize: '13px', color: 'red' }} component="span">
                  *Address is rquired.
                </Box>
              }
            />
          </FormComponentWrapper>
          <FormComponentWrapper label='City'>
          <TextField
            fullWidth
            id="outlined-basic"
            placeholder="City"
            variant="outlined"
            className="mt-2"
            value={createOrUpdateContact.city}
            inputRef={cityRef}
            {...register("city", { onChange: item => handleOnChange("city", item), required: true })}
            error={Boolean(errors && errors.city)}
            {...{
              InputProps: {
                startAdornment: (
                  <InputAdornment position="start">
                    <LocationCity/>
                  </InputAdornment>
                )}
            }}
            helperText= {errors && errors.city &&
              <Box style={{ marginLeft: '-1rem', fontSize: '13px', color: 'red' }} component="span">
                *City is rquired.
              </Box>
            }
          />
          </FormComponentWrapper>
          <FormComponentWrapper label="Country">
            <TextField
              fullWidth
              id="outlined-basic"
              placeholder="Country"
              variant="outlined"
              className="mt-2"
              value={createOrUpdateContact.country}
              inputRef={countryRef}
              {...register("country", { onChange: item => handleOnChange("country", item), required: true })}
              error={Boolean(errors && errors.country)}
              {...{
              InputProps: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Map/>
                  </InputAdornment>
                )}
              }}
              helperText= {errors && errors.country &&
                <Box style={{ marginLeft: '-1rem', fontSize: '13px', color: 'red' }} component="span">
                  *Country is rquired.
                </Box>
              }
            />
          </FormComponentWrapper>
          <FormComponentWrapper label="Postal Code">
            <TextField
              fullWidth
              id="outlined-basic"
              placeholder="Postal Code"
              variant="outlined"
              className="mt-2"
              value={createOrUpdateContact.postalCode}
              inputRef={postalCodeRef}
              {...register("postalCode", { onChange: item => handleOnChange("postalCode", item), required: true, validate: (value: string ) => /^[0-9]+$/i.test(value?.toString()) })}
              error={Boolean(errors && errors.postalCode)}
              {...{inputProps:{maxLength:6}}}
              {...{
              InputProps: {
                startAdornment: (
                  <InputAdornment position="start">
                    <GpsFixed/>
                  </InputAdornment>
                )}
              }}
              helperText= {errors && errors.postalCode &&
                <Box style={{ marginLeft: '-1rem', fontSize: '13px', color: 'red' }} component="span">
                  {!createOrUpdateContact.postalCode ? "*Postal Code is rquired." : "*Invalid postal code."}
                </Box>
              }
            />
          </FormComponentWrapper>
          <FormComponentWrapper label='Phone Number'>
            <MuiPhoneNumber
              id="outlined-basic"
              fullWidth
              InputProps={{
                className: `mt-3`,
                startAdornment: (
                  <InputAdornment position="start">
                    <Phone />
                  </InputAdornment>
                ),
              }}
              placeholder="Phone Number"
              variant="outlined"
              disableCountryCode={true}
              type="text"
              autoComplete="new-password"
              name={createOrUpdateContact.phoneNumber}
              countryCodeEditable={true}
              defaultCountry="in"
              onlyCountries={['in']}
              value={createOrUpdateContact.phoneNumber}
              ref={phoneNumberRef}
              onChange={(phone) => setCreateOrUpdateContact({
                ...createOrUpdateContact,
                phoneNumber: phone.toString()
              })}
              onBlur={phone_Number_Check}
              error={Boolean(phoneError)}
              helperText= {phoneError &&
                <Box style={{ marginLeft: '-1rem', fontSize: '13px', color: 'red' }} component="span">
                  *Phone Number is rquired.
                </Box>
              }
            />
          </FormComponentWrapper>
          <input type="file" className="mt-3" onChange={handleUploadFile}/>
          <hr className="ms-2 me-2"/>
          <CardActions sx={{display:"flex", flexDirection:"column"}}>
            <Button variant="contained" type="submit" fullWidth>Submit</Button>
            <Button variant="contained" fullWidth className={`mt-2 me-2 ${styles.clearButton}`} onClick={()=> {
              setErrorKey([]);
              return setCreateOrUpdateContact(initialState);
            }}> Clear</Button>
          </CardActions>
        </form>
      </CardContent>
    </Card>
  );
}

export default ModifyOrCreateContact;