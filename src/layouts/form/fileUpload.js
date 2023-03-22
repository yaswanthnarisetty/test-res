import { Button } from '@mui/material';
import React, { useState } from 'react';
import {useDropzone} from 'react-dropzone';

export default function FileUpload(props) {
  const [files, setFiles] = useState([]);
  const {
    acceptedFiles,
    getRootProps,
    getInputProps
  } = useDropzone({
    accept: {
      'file/docx':['.doc','.docx'],
      'file/pdf': ['.pdf']
    },
    onDrop: acceptedFiles => {
      setFiles(acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      })));

    const data = new FormData();
    data.append("file",acceptedFiles[0]);
    props.setprofileResume(data)
      
    }
  });

  const ErrorMessage = ({ children }) => (
    <div
      style={{
        fontStyle: 'italic',
        color: 'red',
        }}
      >
      {children}
    </div>
  )

  
  const MAX_SIZE=2097152
  const acceptedFileItems = acceptedFiles.map(file => (
   
    <div key={file.path}>
        {file.size > MAX_SIZE ?  (
                  <ErrorMessage>
                    {'file is too big, max file size 2 MB'} 	&nbsp;
                    {file.name}
                  </ErrorMessage>
                ) : (
                  <div>
                    {file.path} - {file.size} bytes
                </div>
                ) 
              }
      
    </div>
  ));
  return (
    
    <section className="container">
      <div {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        <Button variant='contained' sx={{marginTop: "1em", marginLeft: "0.75em"}} fullWidth>Upload your resume</Button>
      </div>
      {acceptedFileItems}
    </section>
  );
}

