import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import TextField from '@mui/material/TextField/TextField';
import { Button } from '@mui/material';
import { red } from '@mui/material/colors';
import { useCallback, useRef, useState } from 'react';
import styles from "./creatingMemory.module.css";
import axios from 'axios';
import { convertBase64 } from '../../helpers/create-blob-from-file';

interface ModifyOrCreateContact {
  name: string,
  pictureFile: string | ArrayBuffer | null
  email: string,
  address: string,
  city: string,
  country: string,
  postalCode: string,
  phoneNumber: string 
}

const initialState = {
  name: "",
  pictureFile: "",
  email: "",
  address: "",
  city: "",
  country: "",
  postalCode: "",
  phoneNumber: ""
}

export const CreatingMemoryCard = () => {
  const [createOrUpdateContact, setCreateOrUpdateContact] = useState<ModifyOrCreateContact>(initialState);
  const [isAnyFieldEmpty, setIsAnyFieldEmpty] = useState(false);
  const [errorKey, setErrorKey] = useState<string[]>([]);

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef =  useRef<HTMLInputElement>(null);
  const addressRef =  useRef<HTMLInputElement>(null);
  const cityRef =  useRef<HTMLInputElement>(null);
  const countryRef =  useRef<HTMLInputElement>(null);
  const postalCodeRef =  useRef<HTMLInputElement>(null);
  const phoneNumberRef =  useRef<HTMLInputElement>(null);

  const handleOnChange = useCallback((keyVal: string, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if(keyVal === "phoneNumber" && createOrUpdateContact[keyVal]?.length < 10) {
      return;
    }
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

      if(Object.values(createOrUpdateContact).some(value => value === '')) {
        setIsAnyFieldEmpty(true);
      }
    }
  },[createOrUpdateContact, errorKey]);

  const handleSubmit = () => {
    const fieldsToCheck = ["name", "email", "address", "city", "country", "postalCode", "phoneNumber"];
    let focusRef = null;

    const emptyFields = fieldsToCheck.filter(field => !createOrUpdateContact[field as keyof ModifyOrCreateContact]);

    if (emptyFields.length > 0) {
      setErrorKey(emptyFields);
      focusRef = emptyFields[0] === "name" ? nameRef :
                  emptyFields[0] === "email" ? emailRef :
                  emptyFields[0] === "address" ? addressRef : 
                  emptyFields[0] === "city" ? cityRef :
                  emptyFields[0] === "country" ?  countryRef : 
                  emptyFields[0] === "postalCode" ? postalCodeRef : phoneNumberRef;
    }

    if (focusRef) {
      focusRef.current?.focus();
      setIsAnyFieldEmpty(true);
    } else {
      axios.put("http://localhost:3000/posts/createPost", {
        title: createOrUpdateContact[fieldsToCheck[0] as keyof ModifyOrCreateContact],
        message: createOrUpdateContact[fieldsToCheck[1] as keyof ModifyOrCreateContact],
        creator: createOrUpdateContact[fieldsToCheck[2] as keyof ModifyOrCreateContact],
        tags: createOrUpdateContact[fieldsToCheck[3] as keyof ModifyOrCreateContact], 
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

  const getErrorStatus = (getErrorStatus: string) => {
    return errorKey.includes(getErrorStatus) ? true :false;
  }

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
    <Card sx={{ maxWidth: 500, maxHeight: 600, overflowX: "auto" }}>
      <CardHeader
        title="Create a Contact"
      />
      {isAnyFieldEmpty && <span className="ms-3" style={{color: red[500]}}>*All fields Should have some value.</span>}
      <CardContent>
        <form  onSubmit={handleSubmit}>
          <TextField 
            fullWidth
            id="outlined-basic"
            label="Name"
            variant="outlined"
            className="mt-2"
            value={createOrUpdateContact.name}
            onChange={item => {
              return handleOnChange("name", item);
            }}
            inputRef={nameRef}
            error={getErrorStatus("name")}
          />
          <TextField 
            fullWidth
            id="outlined-basic"
            label="Email"
            variant="outlined"
            className="mt-2"
            value={createOrUpdateContact.email}
            onChange={item => {
              return handleOnChange("email", item);
            }}
            inputRef={emailRef}
            error={getErrorStatus("email")}
          />
          <TextField
            fullWidth
            id="outlined-basic"
            label="Address"
            variant="outlined"
            multiline
            rows={4}
            className="mt-2"
            value={createOrUpdateContact.address}
            onChange={item => {
              return handleOnChange("address", item);
            }}
            inputRef={addressRef}
            error={getErrorStatus("address")}
          />
          <TextField
            fullWidth
            id="outlined-basic"
            label="City"
            variant="outlined"
            className="mt-2"
            value={createOrUpdateContact.city}
            onChange={item => {
              return handleOnChange("city", item);
            }}
            inputRef={cityRef}
            error={getErrorStatus("city")}
          />

          <TextField
            fullWidth
            id="outlined-basic"
            label="Country"
            variant="outlined"
            className="mt-2"
            value={createOrUpdateContact.country}
            onChange={item => {
              return handleOnChange("country", item);
            }}
            inputRef={countryRef}
            error={getErrorStatus("country")}
          />

          <TextField
            fullWidth
            id="outlined-basic"
            label="Postal"
            variant="outlined"
            className="mt-2"
            value={createOrUpdateContact.country}
            onChange={item => {
              return handleOnChange("postal", item);
            }}
            inputRef={countryRef}
            error={getErrorStatus("postal")}
          />
          <input type="file" className="mt-3" onChange={handleUploadFile}/>
          <hr className="ms-2 me-2"/>
          <CardActions sx={{display:"flex", flexDirection:"column"}}>
            <Button variant="contained" type="submit" fullWidth>Submit</Button>
            <Button variant="contained" fullWidth className={`mt-2 ${styles.clearButton}`} onClick={()=> {
              setIsAnyFieldEmpty(false);
              setErrorKey([]);
              return setCreateOrUpdateContact(initialState);
            }}> Clear</Button>
          </CardActions>
        </form>
      </CardContent>
    </Card>
  );
}

export default CreatingMemoryCard;