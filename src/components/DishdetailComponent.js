import React, {Component} from 'react';
import { Card, CardImg, CardText, CardBody,Modal, ModalHeader , ModalBody,
    CardTitle, Breadcrumb, BreadcrumbItem, Label, Row, Button,Col,Form,FormGroup,Input} from 'reactstrap';
import { Link } from 'react-router-dom';
import {LocalForm,Control, Errors} from 'react-redux-form';
import {Loading} from './LoadingComponent';
import {baseUrl } from '../shared/baseUrl';

const required = (val) => (val) && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <=len);
const minLength = (len) => (val) => (val) && (val.length >= len);

class CommentForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            isModalOpen: false
        }

        this.toggleModal = this.toggleModal.bind(this);
        this.handleComments = this.handleComments.bind(this);
    }

    toggleModal(){
        this.setState({
            isModalOpen: !this.state.isModalOpen
        })
    }

    handleLogin(event){
        this.toggleModal();
        alert("Username: " + this.username.value + " Password: " + this.password.value + " Remember me: " + this.remember.checked);
        event.preventDefault();
    }


    handleComments(values){
        this.toggleModal();
        this.props.addComment(this.props.dishId,values.rating,values.yourname,values.comment);
    }

    render(){
        return(
            <div className="container">
                <div className="row">
                        <Button outline onClick={this.toggleModal}>
                            <span className="fa fa-sign-in fa-lg"></span> Submit Comments
                        </Button>
                </div>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader> Submit Comment </ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleComments(values)}>
                            <Row className="form-group">
                                <Label htmlFor="rating" md={3}> Rating</Label>
                                <Col md={{size:3, offset:1}}>
                                    <Control.select model=".rating" name="rating" className="form-control" >
                                         <option>1</option>
                                         <option>2</option>
                                         <option>3</option>
                                         <option>4</option>
                                         <option>5</option>
                                     </Control.select>
                                 </Col>
                             </Row>
                             <Row className="form-group">
                                 <Label htmlFor="yourname" md={3}>Your Name</Label>
                                 <Col md={9}>
                                     <Control.text model=".yourname" id="yourname" name="yourname" className="form-control" 
                                        validators={{
                                            required,minLength: minLength(3) , maxLength:maxLength(15)
                                        }}/>
                                </Col>
                                <Errors
                                    className="text-danger"
                                    model=".yourname"
                                    show = "touched"
                                    messages ={{
                                        required: 'Required',
                                        minLength: 'min characters should be greater than 3',
                                        maxLength: "max characters should be less then 15",
                                    }}

                                />
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="comment" md={3}>Comment</Label>
                                <Col md={9}>
                                    <Control.textarea model=".comment" id="comment" name="comment" className="form-control" />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={{size:10 ,offset:2}}>
                                    <Button type="submit" value="submit" color="primary"> Submit Comments </Button>
                                </Col>
                            </Row>
                        </LocalForm> 
                    </ModalBody>
                </Modal>
        </div>
        );
    }
}

function RenderComments({comments,errMess,addComment,dishId}){
    if(errMess){
        return(
            <div className="container">
                <div className="row">
                    <h4>{errMess}</h4>
                </div>
            </div>
        )
    }
    else if(comments!=null){

            const comment = comments.map((com)=>{
                return(
                    <div>
                        <p>{com.comment}</p>
                        <p>{com.date}</p>
                    </div>
                )
            });

            return(
                <div>
                    {comment}
                    <CommentForm dishId = {dishId} addComment={addComment}/>
                </div>
            )   
    }
    else{
        return(
            <div></div>
        )
    }
}

function RenderDish({dish,isLoading,errMess}){
    if(isLoading){
        return(
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        )
    }
    else if(errMess){
        return(
            <div className="container">
                <div className="row">
                    <h4>{errMess}</h4>
                </div>
            </div>
        )
    }
    else if(dish != null){
        return (
            <div className="row">
                 <div className="col-12 col-md-5 m-1">
                <Card>
                    <CardImg top src={baseUrl + dish.image} alt={dish.name} />
                    <CardBody>
                        <CardTitle>
                            {dish.name}
                        </CardTitle>
                        <CardText>
                            {dish.description}
                        </CardText>
                    </CardBody>
                </Card>
                </div>
            </div>
        )
    }
    else{
        return(
            <div></div>
        )
    }
}


const Dishdetail = (props) => {

    if(props.dishesLoading){
        return(
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        )
    }
    else if(props.dishesErrMess){
        return(
            <div className="container">
                <div className="row">
                    <h4>{props.dishesErrMess}</h4>
                </div>
            </div>
        )
    }
    else
            return(
                <div className="container">
                    <div className="row">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12">
                            <h3>{props.dish.name}</h3>
                            <hr />
                        </div>                
                    </div>
                    <div className="row">
                        <div className="col-12 col-md-5 m-1">
                            <RenderDish dish={props.dish} isLoading={props.dishesLoading} errMess={props.dishesErrMess}/>
                        </div>
                        <div className="col-12 col-md-5 m-1">
                            <RenderComments comments={props.comments}
                                errMess={props.commentsErrMess} 
                                addComment={props.addComment}
                                dishId={props.dish.id} />
                        </div>
                    </div>
                </div>
            )
        } 

export default Dishdetail; 