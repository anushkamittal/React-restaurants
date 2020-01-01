import React, { Component } from 'react';
import {Navbar,NavbarBrand } from 'reactstrap';
import {Route , Switch , Redirect} from 'react-router-dom';
import Menu from './MenuComponent';
import Dishdetail from './DishdetailComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import {DISHES} from '../shared/dishes';
import {LEADERS} from '../shared/leaders';
import {PROMOTIONS} from '../shared/promotions';
import {COMMENTS} from '../shared/comments';

class Main extends Component {

  constructor(props){
    super(props);
    this.state ={
      dishes: DISHES,
      leaders: LEADERS,
      promotions: PROMOTIONS,
      comments:COMMENTS,
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
        <Home dish={this.state.dishes.filter((dish)=> dish.featured)[0]}
              leader={this.state.leaders.filter((leader)=>leader.featured)[0]}
              promotion={this.state.promotions.filter((promotion)=> promotion.featured)[0]} />
      )
    }

    const DishWithId = ({match}) =>{
      return(
        <Dishdetail dish={this.state.dishes.filter((dish)=> dish.id === parseInt(match.params.dishId,10))[0] } 
                    comments={this.state.comments.filter((comment)=> comment.dishId === parseInt(match.params.dishId,10))}/>
      )
    }

    const Aboutus = () => {
      return (
        <About leaders={this.state.leaders}/>
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
          <Route exact path='/menu' component={()=> <Menu  dishes={this.state.dishes} onClick={(dishId)=>{this.onDishSelect(dishId)}} />} />
          <Route exact path='/contactus' component={Contact} />
          <Route path='/menu/:dishId' component={DishWithId} />
          <Route path='/aboutus' component={Aboutus} />
          <Redirect to='/home' />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default Main;
