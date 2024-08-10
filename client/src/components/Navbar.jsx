import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import WalletIcon from '@mui/icons-material/Wallet';
import { Link } from 'react-router-dom';

export default function Navbar(){
    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <Link to="/home" style={{color:"white"}}>
            <WalletIcon />
            </Link>
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to="/home" style={{textDecoration:"none",color:"white"}}>
            Wallet
            </Link>
          </Typography>
          {
            localStorage.getItem('at')?          <Button color="inherit">
            <Link to="/login" style={{textDecoration:"none",color:"white"}}>
              Log Out
              </Link>           
            </Button>:<>
            <Button color="inherit">
            <Link to="/login" style={{textDecoration:"none",color:"white"}}>
              Login
              </Link>           
            </Button>
            <Button color="inherit">
            <Link to="/register" style={{textDecoration:"none",color:"white"}}>
              Register
              </Link>           
            </Button>
            </>
          }

        </Toolbar>
      </AppBar>
    </Box>
        </>
    )
}