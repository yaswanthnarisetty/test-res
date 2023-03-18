import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');

  const [showPassword, setShowPassword] = useState(false);

  // const handleClick = () => {
  //   navigate('/dashboard', { replace: true });
  // };
  useEffect(() =>{
    const auth = localStorage.getItem('user');
    if (auth){
    navigate('/dashboard', { replace: true });
    }
})
  const handleLogin =async () => {
    console.log(email , password)
    let result = await fetch('http://localhost:6001/login',{
        method:'post',
        body:JSON.stringify({email,password}),
        headers:{
            'Content-Type':'application/json'
        }
    });
     result = await result.json();
        console.log(result)
        if(result.email){
            console.log(result);
            alert('login success');
            localStorage.setItem('user',JSON.stringify(result));
            localStorage.setItem('token',JSON.stringify(result.auth));
            navigate('/dashboard', { replace: true });
        }
        else{
            console.log(result)
            alert("please enter correct details");
        }
}

  return (
    <>
      <Stack spacing={3}>
        <TextField
         name="email" 
         label="Email address"
         onChange={(e) => setEmail(e.target.value)}
         value = {email}
         />

        <TextField
          name="password"
          label="Password"
          onChange={(e) => setPassword(e.target.value)} 
          value = {password}
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <Checkbox name="remember" label="Remember me" />
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleLogin}>
        Login
      </LoadingButton>
    </>
  );
}
