import React, { useEffect, useState } from "react";
import { Select, MenuItem, FormHelperText, FormControl, InputLabel } from '@material-ui/core'
import '../../App.css'
import {
  Grid,
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import { MultiSelect } from "react-multi-select-component";
import { Navigate, useNavigate } from "react-router-dom";
import ImgUpload from "./imgUpload";
import FileUpload from "./fileUpload";
import Nav from "../dashboard/nav";



export default function ApplicationForm() {
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setEmail] = useState("");
  const [MobileNo, setMobileNo] = useState("");
  const [ExistingEmployee, setExistingEmployee] = useState("");
  const [educationQualification, seteducationQualification] = useState("");
  const [branch, setbranch] = useState("");
  const [yearOfPassout, setyearOfPassout] = useState("");
  const [DateOfBirth, setDateOfBirth] = useState("");
  const [DateOfJoin, setDateOfJoin] = useState("");
  const [city, setcity] = useState("");
  const [zipcode, setzipcode] = useState("");
  const [Percentage, setPercentage] = useState("");
  const [totalExperience, settotalExperience] = useState("");
  const [relevantExperience, setrelevantExperience] = useState("");
  const [stream, setStream] = useState("");
  const [interviewStatus, setinterviewStatus] = useState("");
  const [interviewer,setInterviewer] = useState("");
  const [shortlisted,setShortlisted] = useState("");
  const [address, setaddress] = useState("");
  const [reference , setReference] = useState("");
  const [remarks,setRemarks] = useState("");
  const [skills, setSelected] = useState([]);
  const [level,setLevel] = useState("");
  const [profileImage,setprofileImage] = useState("")
  const [profileResume,setprofileResume] = useState("")
  let options = [
    { label: "react.js ", value: "react.js" },
    { label: "NODE.js ", value: "NODE.js" },
  ] 
  const UIoptions = [
    { label: "react.js ", value: "react.js" },
    { label: "NODE.js ", value: "NODE.js" },
    { label: "MongoDB ", value: "MongoDB" },
    { label: "javaScript ", value: "javaScript" },
    { label: "HTML ", value: "HTML" },
    { label: "CSS ", value: "CSS" },
    { label: "SQL ", value: "SQL" },
    { label: "Java ", value: "Java" },
    { label: "spring ", value: "spring" },
    { label: "SalesForce ", value: "SalesForce" },
    { label: "Python ", value: "Python" },
    { label: "REST API ", value: "REST API" },
    { label: "GRAPHQL ", value: "GRAPHQL" },
  ];

  const AWSoptions = [
    { label: "AWS", value: "AWS" },
    { label: "Docker", value: "Docker" },
    { label: "Jenkins", value: "Jenkins" },
    { label: "Maven", value: "Maven" },
    { label: "Terraform ", value: "Terraform" },
   
  ];
  const DataOptions = [
    { label: "Oracle SQL", value: "OracleSQl" },
    { label: "Snowflake", value: "Snowflake" },
    { label: "Tableau", value: "Tableau" },
    { label: "PowerBI", value: "PowerBI" },
  ]
  const SFOptions = [
    { label: "Apex", value: "Apex" },
    { label: "Visual Force", value: "VisualForce" },
    { label: "Lightning aura components (LAC)", value: "LightningAuraComponents" },
    { label: "lightning web components (LWC)", value: "LightningWebComponents" },
  ]
  const ERPOptions = [
    { label: "Oracle Applications Technical", value: "OracleTechnical",options:SFOptions },
    { label: "Oracle Applications Functional", value: "OracleFunctional" },
    { label: "QA-Application Testing", value: "QAApplicationTesting" },
  ]
  if(stream === "FullStack"){
    options = UIoptions
  }
  if(stream === "DevOps"){
    options = AWSoptions
  }
  if(stream === "Data"){
    options = DataOptions
  }
  if(stream === "SalesForce"){
    options = SFOptions
  }
  if(stream === "ERP"){
    options = ERPOptions
  }
  

  const handleImageUpload = async() =>{
    const imgUrl = await fetch ("http://13.127.186.192/uploadImage",{
      method: 'POST',
      body: profileImage,
      redirect: 'follow'}).then(response => response.text())
      .then(result => setprofileImage(result))
      .catch(error => console.log('error', error))
      alert("image uploaded successfully")
  }
 
  const handleResumeUpload = async() =>{
    const resUrl = await fetch ("http://13.127.186.192/uploadFile",{
      method: 'POST',
      body: profileResume,
      redirect: 'follow'}).then(response => response.text())
      .then(result => setprofileResume(result))
      .catch(error => console.log('error', error))
      alert("resume uploaded successfully")
  }

  const handleSelectValue = (e) => {
    setSelected(Array.isArray(e) ? e.map(x => x.value) : []);
  }
  
  const navigate = useNavigate()

  const collectData = async () => {
      let result = await fetch("http://13.127.186.192/ApplyForJob", {
      method: "post",
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        MobileNo,
        ExistingEmployee,
        educationQualification,
        branch,
        yearOfPassout,
        DateOfBirth,
        city,
        zipcode,
        skills,
        level,
        Percentage,
        totalExperience,
        relevantExperience,
        stream,
        DateOfJoin,
        interviewStatus,
        interviewer,
        shortlisted,
        address,
        reference,
        remarks,
        profileImage,
        profileResume

      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    console.log(result);
    alert("resume submitted successfully");
    navigate("/dashboard")
  };
  return (
    <div>
      <Nav/>
    <div className="App">
      <Typography gutterBottom variant="h3" align="center">
        enter details
      </Typography>
      <Grid>
        <Card style={{ maxWidth: 450, padding: "20px 5px", margin: "0 auto" }}>
          <CardContent>
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              gutterBottom
            >
              Fill up the form and our team will get back to you within 24
              hours.
            </Typography>
            <form>
              <Grid container spacing={1}>
                <Grid xs={12} sm={6} item>
                  <TextField
                    placeholder="Enter first name"
                    label="First Name"
                    variant="outlined"
                    value={firstName}
                    onChange={(e) => setfirstName(e.target.value)}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid xs={12} sm={6} item>
                  <TextField
                    placeholder="Enter last name"
                    label="Last Name"
                    variant="outlined"
                    value={lastName}
                    onChange={(e) => setlastName(e.target.value)}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    type="email"
                    placeholder="Enter email"
                    label="Email"
                    variant="outlined"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    placeholder="Enter mobile number"
                    label="Mobile"
                    variant="outlined"
                    value={MobileNo}
                    onChange={(e) => setMobileNo(e.target.value)}
                    fullWidth
                    required
                  />
                  <Grid item xs={12}>
                  <FormControl variant="filled" fullWidth>
                  <InputLabel id="existing-status">ExistingEmployee(Yes/No)</InputLabel>
                  <Select
                    labelId="existing-status"
                    id="existing-status-id"
                    value={ExistingEmployee}
                    label="ExistingEmployee"
                    onChange={(e) => setExistingEmployee(e.target.value)}
                    fullWidth
                    required
                  >
                      <MenuItem value="Yes">Yes</MenuItem>
                      <MenuItem value="No">No</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                </Grid>
                <Grid item xs={12}>
                <FormControl variant="filled" fullWidth>
                <InputLabel id="demo-simple-select-label">Experience</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={level}
                  label="Level"
                  onChange={(e) => setLevel(e.target.value)}
                  fullWidth
                  required
                >
                    <MenuItem value="intern">Intern</MenuItem>
                    <MenuItem value="fresher">Fresher</MenuItem>
                    <MenuItem value="experienced">experienced</MenuItem>
                    <MenuItem value="Team Lead">Team Lead</MenuItem>
                  </Select>
                </FormControl>

                
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    placeholder="Total experience in years"
                    label="experience in years"
                    variant="outlined"
                    value={totalExperience}
                    onChange={(e) => settotalExperience(e.target.value)}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    placeholder="relevant experience"
                    label="relevant experience"
                    variant="outlined"
                    value={relevantExperience}
                    onChange={(e) => setrelevantExperience(e.target.value)}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    placeholder="interviewer"
                    label="interviewer"
                    variant="outlined"
                    value={interviewer}
                    onChange={(e) => setInterviewer(e.target.value)}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl variant="filled" fullWidth>
                  <InputLabel id="selected-status">Shortlisted(Yes/No)</InputLabel>
                  <Select
                    labelId="selected-status"
                    id="selected-status-id"
                    value={shortlisted}
                    label="Level"
                    onChange={(e) => setShortlisted(e.target.value)}
                    fullWidth
                    required
                  >
                      <MenuItem value="Yes">Yes</MenuItem>
                      <MenuItem value="NO">No</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                {/* value={stream}
                    onChange={(e) => setStream(e.target.value)} */}
                  <FormControl variant="filled" fullWidth>
                  <InputLabel id="edu-stack">education Qualification</InputLabel>
                  <Select
                    labelId="edu-stack"
                    id="demo-simple-select"
                    label="Level"
                    value={educationQualification}
                    onChange={(e) => seteducationQualification(e.target.value)}
                    fullWidth
                    required
                  >
                      <MenuItem value="B.Tech">B.Tech</MenuItem>
                      <MenuItem value="M.Tech">M.Tech</MenuItem>
                      <MenuItem value="BSC">B.S.C</MenuItem>
                      <MenuItem value="MBA">M.B.A</MenuItem>
                      <MenuItem value="others">others</MenuItem>
                      
                    </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    placeholder="enter Your branch"
                    label="Branch"
                    variant="outlined"
                    value={branch}
                    onChange={(e) => setbranch(e.target.value)}
                    fullWidth
                    required
                  />
                  
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    placeholder="enter date in dd-mm-yyyy format"
                    label="date of birth(dd-mm-yyyy)"
                    variant="outlined"
                    value={DateOfBirth}
                    onChange={(e) => setDateOfBirth(e.target.value)}
                    fullWidth
                    required
                  />
                  
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    placeholder="enter date in dd-mm-yyyy format"
                    label="date of join(dd-mm-yyyy)"
                    variant="outlined"
                    value={DateOfJoin}
                    onChange={(e) => setDateOfJoin(e.target.value)}
                    fullWidth
                    required
                  />
                  
                </Grid>
                <Grid item xs={12}>
                  <FormControl variant="filled" fullWidth>
                  <InputLabel id="interview-status">interview status</InputLabel>
                  <Select
                    labelId="interview-status"
                    id="demo-simple-select"
                    value={interviewStatus}
                    label="Level"
                    onChange={(e) => setinterviewStatus(e.target.value)}
                    fullWidth
                    required
                  >
                      <MenuItem value="yet to be done">yet to be done</MenuItem>
                      <MenuItem value="completed">Completed</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                {/* value={stream}
                    onChange={(e) => setStream(e.target.value)} */}
                  <FormControl variant="filled" fullWidth>
                  <InputLabel id="tech-stack">tech stack</InputLabel>
                  <Select
                    labelId="tech-stack"
                    id="demo-simple-select"
                    label="Level"
                    value={stream}
                    onChange={(e) => setStream(e.target.value)}
                    fullWidth
                    required
                  >
                      <MenuItem value="FullStack">fullStack</MenuItem>
                      <MenuItem value="DevOps">devops</MenuItem>
                      <MenuItem value="SalesForce">SalesForce</MenuItem>
                      <MenuItem value="Data">data</MenuItem>
                      <MenuItem value="ERP">ERP</MenuItem>
                      <MenuItem value="others">others</MenuItem>
                      
                    </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <InputLabel id="skill-set">skill set</InputLabel>
                    <MultiSelect
                      labelId="skill-set"
                      placeholder="Skills"
                      options={options}
                      value={options.filter(obj => skills.includes(obj.value))}
                      onChange={handleSelectValue}
                      labelledBy="Skills"
                    />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    placeholder="Enter year of passout"
                    label="year of passout"
                    variant="outlined"
                    value={yearOfPassout}
                    onChange={(e) => setyearOfPassout(e.target.value)}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    placeholder="Enter city"
                    label="City"
                    variant="outlined"
                    value={city}
                    onChange={(e) => setcity(e.target.value)}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    placeholder="Enter percentage"
                    label="percentage"
                    variant="outlined"
                    value={Percentage}
                    onChange={(e) => setPercentage(e.target.value)}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    placeholder="reference by"
                    label="reference"
                    variant="outlined"
                    value={reference}
                    onChange={(e) => setReference(e.target.value)}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    inputProps={{
                      style: {
                        height: "5em",
                      },
                    }}
                    placeholder="Enter address"
                    label="Address"
                    multiline
                    maxRows={4}
                    variant="outlined"
                    value={address}
                    onChange={(e) => setaddress(e.target.value)}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    inputProps={{
                      style: {
                        height: "5em",
                      },
                    }}
                    placeholder="Enter any remarks"
                    label="Remarks"
                    multiline
                    maxRows={4}
                    variant="outlined"
                    value={remarks}
                    onChange={(e) => setRemarks(e.target.value)}
                    fullWidth
                    
                  />
                </Grid>
                <Grid>
                <Grid fullWidth>
                <ImgUpload setprofileImage={setprofileImage}/>
                <Button  variant="contained" onClick={handleImageUpload}>Upload</Button>
                </Grid>
                
                <Grid fullWidth>
                <FileUpload setprofileResume = {setprofileResume}/>
                <Button variant ="contained" onClick={handleResumeUpload}>Upload</Button>
                </Grid>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    placeholder="Enter zipcode"
                    label="zipcode"
                    variant="outlined"
                    value={zipcode}
                    onChange={(e) => setzipcode(e.target.value)}
                    fullWidth
                    required
                  />
                </Grid>
               
                
                
                <Grid item xs={12}>
                  <Button
                    onClick={collectData}
                    type="button"
                    variant="contained"
                    color="primary"
                    fullWidth
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </div>
    </div>
  );
}


