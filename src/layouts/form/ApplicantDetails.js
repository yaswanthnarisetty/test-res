import {React, useState,useEffect } from "react";
import { Select, MenuItem, FormHelperText, FormControl, InputLabel } from '@material-ui/core'
import '../../App.css'
import {
  Card,
  CardContent,
  Typography,
  CardHeader,
  Avatar,
  Box,
  Paper,
} from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {useParams } from "react-router-dom";
import Nav from "../dashboard/nav";


export default function ApplicantDetails() {
    const [firstName, setfirstName] = useState("");
    const [lastName, setlastName] = useState("");
    const [skills, setSelected] = useState([]);
    const [tech,setTech] = useState([])
    const [stream,setStream] = useState("");
    const [profileImage,setprofileImage] = useState("")
      const params = useParams();

      useEffect(()=>{
        getApplicantDetails();
    },[])
    const StyledTableCell = styled(TableCell)(({ theme }) => ({
      [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
      },
      [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
      },
    }));
    
    const StyledTableRow = styled(TableRow)(({ theme }) => ({
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
      // hide last border
      '&:last-child td, &:last-child th': {
        border: 0,
      },
    }));

      const getApplicantDetails = async () =>{
        let result = await fetch(`http://v-resume-backend-1610023060.ap-south-1.elb.amazonaws.com/getdetails/${params.id}`,{
            headers:{
                authorization:JSON.parse(localStorage.getItem('token'))
            }
        });
        result = await result.json();
        console.log(skills);
        setfirstName(result.firstName)
        setlastName(result.lastName)
        setStream(result.stream)
       setprofileImage(result.profileImage)
       setTech(result.skills)
        delete result._id
        delete result.profileImage
        delete result.profileResume
        delete result.__v
        delete result.skills
        setSelected(Object.entries(result))

        
        
    }
      const name = `${firstName}  ${lastName}`
       return (
        
        <Box sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}>
        <Nav/>
        <Card sx={{ padding:"0 5em"}}>
        <CardHeader
          avatar={
            <Avatar alt={'y'} src={profileImage} />
          }
          title={name}
          subheader={stream}
        />
         <CardContent>
        <Typography variant="body2" color="text.secondary">
          {skills.map((item) => {
                  console.log(item);
                  return (
                    
                    <TableContainer component={Paper} sx={{textTransform: "capitalize"}}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                      <TableHead>
                        <TableRow>
                          <StyledTableCell>{item[0]}</StyledTableCell>
                          <StyledTableCell align="right">{item[1]}</StyledTableCell>
                        </TableRow>
                      </TableHead>

                    </Table>
                  </TableContainer>
                    
                  )
                })}
                 <TableContainer component={Paper}>
                 <Table sx={{ minWidth: 700 }} aria-label="customized table">
                 <TableHead>
                        <TableRow>
                          <StyledTableCell>Skills</StyledTableCell>
                          <StyledTableCell sx={{ display: "flex"}}>
                          {tech.map((item,i) =>{
                          return(
                            <TableRow sx={{ minWidth: "auto", display:"flex" }}>
                                <StyledTableCell>{item}</StyledTableCell> 
                            </TableRow>
                              )
                          })}
                          </StyledTableCell>
                        </TableRow>
                      </TableHead>
                    </Table>
                    </TableContainer>
                

        </Typography>
      </CardContent>

        </Card> 
        </Box>
      );
}