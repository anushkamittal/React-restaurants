import React, { Component } from 'react';
import {Navbar,NavbarBrand } from 'reactstrap';
import {Route , Switch , Redirect , withRouter} from 'react-router-dom';
import { connect } from 'react-redux';

import Menu from './MenuComponent';
import Dishdetail from './DishdetailComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import { addComment ,fetchDishes,fetchComments,fetchPromos} from '../redux/actionCreaters';
import { actions } from 'react-redux-form';

const mapDispatchToProps = (dispatch) =>({
    addComment: (dishId, rating, author, comment) => dispatch(addComment(dishId,rating,author,comment)),
    fetchDishes: () => {dispatch(fetchDishes())},
    fetchComments: () => {dispatch(fetchComments())},
    fetchPromos: () => {dispatch(fetchPromos())},
    resetFeedbackForm: ()=> {dispatch(actions.reset('feedback'))}
})

const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  }
} 

class Main extends Component {

  constructor(props){
    super(props);
  }

  componentDidMount(){
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
  }

  onDishSelect(dishId){
    this.setState({
        selectedDish: dishId
    });
}

  render(){

    const Homepage = ()=>{
      return (
        <Home dish={this.props.dishes.dishes.filter((dish)=> dish.featured)[0]}
              leader={this.props.leaders.filter((leader)=>leader.featured)[0]}
              promotion={this.props.promotions.promotions.filter((promotion)=> promotion.featured)[0]}
              dishesLoading={this.props.dishes.isLoading}
              dishesErrMess={this.props.dishes.errMess}
              promosLoading={this.props.promotions.isLoading}
              promosErrMess={this.props.promotions.errMess} />
      )
    }

    const DishWithId = ({match}) =>{
      return(
          <Dishdetail dish={this.props.dishes.dishes.filter((dish)=> dish.id === parseInt(match.params.dishId,10))[0] } 
                      comments={this.props.comments.comments.filter((comment)=> comment.dishId === parseInt(match.params.dishId,10))}
                      addComment={this.props.addComment}
                      dishesLoading={this.props.dishes.isLoading}
                      dishesErrMess={this.props.dishes.errMess}
                      promosErrMess={this.props.comments.errMess} />
      )
    }

    const Aboutus = () => {
      return (
        <About leaders={this.props.leaders}/>
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
          <Route exact path='/menu' component={()=> <Menu  dishes={this.props.dishes} onClick={(dishId)=>{this.onDishSelect(dishId)}} />} />
          <Route exact path='/contactus' component={()=> <Contact resetFeedbackForm = {this.props.resetFeedbackForm}/>} />
          <Route path='/menu/:dishId' component={DishWithId} /> 
          <Route path='/aboutus' component={Aboutus} />
          <Redirect to='/home' />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Main));
