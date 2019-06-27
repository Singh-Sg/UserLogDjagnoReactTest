import React from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import AccountCircle from '@material-ui/icons/AccountCircle';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';


const classes = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    marginTop: 200,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    margin: 'auto',
    maxWidth: 500,
  },
  logo:{
    'marginTop': 100,
    'height': 204,
  }
}));


export default class Login extends React.Component {
  constructor(){
     super();
     this.state={
      username:'',
      password:'',
      redirectToReferrer: false
     }
     this.login = this.login.bind(this);
     this.onChange = this.onChange.bind(this);
    };

    login(){
      var bodyFormData = new FormData();
      if(this.state.username && this.state.password){
        bodyFormData.set('username', this.state.username);
        bodyFormData.set('password', this.state.password);

        axios({
              method: 'post',
              url: 'http://127.0.0.1:8000/api-token-auth/',
              data: bodyFormData,
              config: { headers: {'Content-Type': 'multipart/form-data' }}
                        })
            .then(function (response,status, xhr) {
                if (response.status === 200){
                    window.localStorage.setItem('access_token',response.data.token)
                    window.localStorage.setItem('username',response.data.username)
                    this.setState({ open: false });
                    // this.props.setToken()
                    this.props.history.push('/home');
                }
                console.log(response);
            }.bind(this))
            .catch(function (response) {
                //handle error
                console.log(response);
            });
      }
    }
  onChange(e){
    this.setState({[e.target.name]:e.target.value});
  }

  render() {
    return (
      <div>
        <React.Fragment>
          <CssBaseline />
          <Container maxWidth="sm" >
                <img style={{'height': 204, 'marginTop':40, marginLeft: 106}} src="https://www.brucerossmeyer.com/images/brucerossmeyer-HD-LiveWire-logo.png" alt='Logo' />
          </Container>
        </React.Fragment>

        <React.Fragment>
          <CssBaseline />
          <Container maxWidth="sm" >
                <Typography component="p" >
                    <TextField autoFocus 
                      margin="normal" 
                      name="username" 
                      label="Username" 
                      onChange={this.onChange} 
                      type="text"
                      fullWidth 
                      variant="outlined"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <AccountCircle />
                          </InputAdornment>
                        ),
                      }}/>

                    <TextField autoFocus margin="normal" name="password" label="Password" onChange={this.onChange} type="password" fullWidth 
                      variant="outlined"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Visibility />
                          </InputAdornment>
                        ),
                      }}/>
                  </Typography>
              <ButtonGroup fullWidth aria-label="Full width outlined button group"  style={{'marginTop':40}}>
                  <Button onClick={this.login} color="primary" value="Login" >
                      Login
                  </Button>
              </ButtonGroup>
          </Container>
        </React.Fragment>

        <React.Fragment>
          <CssBaseline />
          <Container maxWidth="sm">
              <Paper className={classes.paper} style={{'marginTop':40}}>
                <Typography variant="h5" component="h3">

                  <ButtonGroup fullWidth color="primary" variant="contained" aria-label="Full width outlined button group">
                    <Button>SignUp</Button>
                   </ButtonGroup>
                </Typography>
              </Paper>
          </Container>
        </React.Fragment>
      </div>
    );
  }
}
