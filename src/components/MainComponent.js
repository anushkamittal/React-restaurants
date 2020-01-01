import React, { Component } from 'react';
import {Navbar,NavbarBrand } from 'reactstrap';
import Menu from './MenuComponent';
import {DISHES} from '../shared/dishes';
import Dishdetail from './DishdetailComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import {Route , Switch , Redirect} from 'react-router-dom';

class Main extends Component {

  constructor(props){
    super(props);
    this.state ={
      dishes: DISHES,
      selectedDish: null
    }
  }

  onDishSelect(dishId){
    this.setState({
        selectedDish: dishId
    });
}

  render(){

    const Homepage = ()=>{
      return (
        <Home />
      )
    }

    return (
      <div className="App">
        <Navbar dark color="primary">
          <div className="container">
            <NavbarBrand href="/"> My Restaurant</NavbarBrand>
          </div>
        </Navbar>
        <Header />
        <Switch>
          <Route path='/home' component={Homepage} />
          <Route path='/menu' component={()=> <Menu  dishes={this.state.dishes} onClick={(dishId)=>{this.onDishSelect(dishId)}} />} />
          <Redirect to='/home' />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default Main;
