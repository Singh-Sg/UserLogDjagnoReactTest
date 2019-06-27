import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import DirectionsIcon from '@material-ui/icons/Directions';
import axios from 'axios';
import Header from './header.js';
import Userinfo from './userinfo.js';
import Chart from './chart.js';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';


const useStyles = makeStyles({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
    margin: "auto",
    marginTop: 100,
    marginBottom: 10

  },
  input: {
    marginLeft: 8,
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  iconButton1: {
    padding: 10,
    width:388,
  },
  divider: {
    width: 1,
    height: 28,
    margin: 4,
  },
  resultDiv:{
    // marginLeft: 494,
    justifyContent:'center'
  }
});

function Search(props) {
  const classes = useStyles();

  return (
   <div> 
      <Paper className={classes.root}>
        <IconButton className={classes.iconButton} aria-label="Menu">
          <MenuIcon />
        </IconButton>
        <InputBase
          className={classes.input}
          onChange={props.onChange}
          placeholder="Search users by user name"
          value={props.selectedOption}
          name="search"
          inputProps={{ 'aria-label': 'Search Users' }}
        />
        <IconButton className={classes.iconButton} aria-label="Search">
          <SearchIcon />
        </IconButton>
        <Divider className={classes.divider} />
        <IconButton color="primary" className={classes.iconButton} aria-label="Directions">
          <DirectionsIcon />
        </IconButton>
      </Paper>
        {props.users && props.users.length !== 0 && props.users.map(user => {
            return (
              <div>
                <MenuItem className={classes.resultDiv}>
                  <Paper  className={classes.iconButton1} key={user.id} onClick={() => { props.handleSelect(user.username, user.id) }}>{user.username}</Paper>
                </MenuItem>
              </div>
            )
          })
        }
   </div> 
  );
}


export default class Home extends Component {
	constructor(){
     super();
     this.state={
      users:[],
      connections:[],
      selectedOption: '',
      active: false,
      userData:[]
     }
     this.handelSearch = this.handelSearch.bind(this);
    };

    handelSearch(e){
      this.setState({ selectedOption: e.target.value })
      if (!e.target.value) {
        this.setState({ users: [] })
      }
      const token = localStorage.getItem('access_token')
      axios({
            method: 'get',
            url: `http://127.0.0.1:8000/search/${e.target.value}/`,
            headers: {'Authorization': `Token ${token}` }
            })
          .then(function (response,status, xhr) {
              if (response.status === 200){
                 this.setState({users: response.data});
              }
              console.log(response);
          }.bind(this))
          .catch(function (response) {
              console.log(response);
          });

	    this.setState({[e.target.name]:e.target.value});
    }

    connections(user_id){
      const token = localStorage.getItem('access_token')
      const user = user_id
      axios({
            method: 'get',
            url: `http://127.0.0.1:8000/api/users/${user}/logins/`,
            headers: {'Authorization': `Token ${token}` }
            })
          .then(function (response,status, xhr) {
              if (response.status === 200){
                 this.setState({connections: response.data});
              }
              console.log(response);
          }.bind(this))
          .catch(function (response) {
              console.log(response);
          });

      axios({
            method: 'get',
            url: `http://127.0.0.1:8000/api/users/${user}/`,
            headers: {'Authorization': `Token ${token}` }
            })
          .then(function (response,status, xhr) {
              if (response.status === 200){
                 this.setState({userData: response.data});
              }
              console.log(response);
          }.bind(this))
          .catch(function (response) {
              console.log(response);
          });
    }

    handleSelect = (selectedOption, id) => {
      this.setState({ selectedOption, users: [], active: true  })
      this.connections(id);
    }

 	render(){
 		return(
		<div>
      <Header/>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Search users={this.state.users} selectedOption={this.state.selectedOption} onChange={this.handelSearch} handleSelect={this.handleSelect}/>
        </Grid>
        {this.state.active && <Grid item xs={12} sm={6}>
          <Userinfo user={this.state.userData} count={this.state.connections}/>
        </Grid>}
        {this.state.active && <Grid item xs={12} sm={6}>
         <Chart connections={this.state.connections}/>
        </Grid>}
      </Grid> 
		</div>
		)
 	}
}



