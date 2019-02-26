import React, {Component} from 'react';
import NavBarComponent from './components/NavBarComponent';
import PlantsComponent from './components/PlantsComponent';
import AuthHandler from './Authorise'; 

class App extends Component {
  
  constructor(props) {
    super(props) 
    this.state = {plants: []}
    this.Auth = new AuthHandler('/api');
}
  
  componentWillMount() { // Check before loading the app if the user is logged in (NOTE: DEPRECATED)
    if(!this.Auth.loggedIn()) {
      this.props.history.replace('/login'); // Don't allow through  
    }
  }

  componentDidMount() { // Make a call to our plants API and get our plants.
    if(this.Auth.loggedIn()) {
      return this.Auth.fetch('/plants') 
        .then(res => {return res.json()
        .then(plantsArray => {this.setState({plants:plantsArray})})})
    }
  }

  render() {
    return (
      <div>
        <NavBarComponent history={this.props.history} /> 
        <PlantsComponent plants={this.state.plants} history={this.props.history}/>
      </div>
    );
  }
}

export default App;