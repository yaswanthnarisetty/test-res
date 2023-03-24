import { Button } from '@mui/material';
import React, {useEffect, useState} from 'react';
import {useDropzone} from 'react-dropzone';
// import AWS from 'aws-sdk'

const thumbsContainer = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: 16
};

const thumb = {
  display: 'inline-flex',
  borderRadius: 2,
  border: '1px solid #eaeaea',
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: 'border-box'
};

const thumbInner = {
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden'
};

const img = {
  display: 'block',
  width: 'auto',
  height: '100%'
};


function ImgUpload(props) {
  const [files, setFiles] = useState([]);
  const {getRootProps, getInputProps} = useDropzone({
    accept: {
      'image/jpeg': [],
      'image/png': [],
      'image/jpg': [],
    },
    onDrop: acceptedFiles => {
      setFiles(acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      })));

    const data = new FormData();
    data.append("file",acceptedFiles[0]);
    props.setprofileImage(data)

    }
  });
  
  const thumbs = files.map(file => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img
          src={file.preview}
          style={img}
          alt='img'
          // Revoke data uri after image is loaded
          onLoad={() => { URL.revokeObjectURL(file.preview) }}
        />
      </div>
    </div>
  ));

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach(file => URL.revokeObjectURL(file.preview));
  }, []);

  return (
    <section className="container">
      <div {...getRootProps({className: 'dropzone'})}>
        <input {...getInputProps()} />
        <Button variant='contained' sx={{marginTop: "1em", marginLeft: "0.75em"}} fullWidth>select your picture</Button>
      </div>
      <aside style={thumbsContainer}>
        {thumbs}
      </aside>
    </section>
  );
}




// AWS.config.update({
//   accessKeyId: 'your-access-key-id',
//   secretAccessKey: 'your-secret-access-key',
//   region: 'your-bucket-r2egion'
// });

// const s3 = new AWS.S3();

// function uploadImage(file) {

//   const params = {
//     Bucket: 'your-bucket-name',
//     Key: file.name,
//     ContentType: file.type,
//     ACL: 'public-read',
//     Body: file
//   };

//   return s3.putObject(params).promise();
// }

export default ImgUpload