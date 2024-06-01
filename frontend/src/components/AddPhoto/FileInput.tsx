import {Button, Grid, TextField} from "@mui/material";
import React, {useRef, useState} from "react";

interface Props {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    name: string;
    label: string;
}

const FileInput:React.FC<Props> = ({onChange, name,label }) => {

    const [fileName, setFileName] = useState('');

    const inputRef = useRef<HTMLInputElement>(null);
    const activeInput = () => {
        if (inputRef.current){
            inputRef.current.click()
        }
    };

    const onFileChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.files && e.target.files[0]){
            setFileName(e.target.files[0].name);
        } else {
            setFileName('')
        }
        onChange(e)
    };



    return (
        <>
            <input
                style={{display: 'none'}}
                name={name}
                type='file'
                onChange={onFileChange}
                ref={inputRef}
            />
            <Grid container direction="row" spacing={2} alignItems='center'>
                <Grid item xs sx={{mb: 2}}>
                    <TextField
                        disabled
                        value={fileName}
                        label={label}
                        onClick={activeInput}
                    />
                </Grid>
            </Grid>
            <Grid item>
                <Button
                    variant='contained'
                    onClick={activeInput}
                >Browse</Button>
            </Grid>
        </>
    );
};

export default FileInput