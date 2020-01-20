import React, {Component} from 'react';
import { Card, CardImg, CardText, CardBody,Modal, ModalHeader , ModalBody,
    CardTitle, Breadcrumb, BreadcrumbItem, Label, Row, Button} from 'reactstrap';
import { Link } from 'react-router-dom';
import {LocalForm, Control, Errors} from 'react-redux-form';

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

    handleComments(values){
        this.toggleModal();
        console.log('Current state is ' + JSON.stringify(values));
        alert('Current state is ' + JSON.stringify(values));
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
                        <LocalForm onSubmit={this.handleComments}>
                            <Row className="form-group">
                                <Label htmlFor="rating"> Rating</Label>
                                <Control.select modal=".rating" id="rating" name="rating" className="form-control" /*innerRef={(input) => this.rating = input}*/>
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Control.select>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="yourName">Your Name</Label>
                                <Control.text model=".yourName" id="yourName" name="yourName" className="form-control" /*innerRef={(input)=> this.yourName = input}*/ 
                                    validators={{
                                        required,minLength: minLength(3) , maxLength:maxLength(15)
                                    }}/>
                                <Errors
                                    className="text-danger"
                                    model=".yourName"
                                    show = "touched"
                                    messages ={{
                                        required: 'Required',
                                        minLength: 'min characters should be greater than 3',
                                        maxLength: "max characters should be less then 15",
                                    }}

                                />
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="comment">Comment</Label>
                                <Control.textarea model=".comment" id="comment" name="comment" className="form-control" /*innerRef={(input)=> this.comment = input}*/ />
                            </Row>
                            <Button type="submit" value="submit" color="primary"> Submit Comments </Button>
                        </LocalForm>
                    </ModalBody>
                </Modal>
        </div>
        );
    }
}

function RenderComments({comments}){
    if(comments!=null){

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
                    <CommentForm />
                </div>
            )   
    }
    else{
        return(
            <div></div>
        )
    }
}

function RenderDish({dish}){
    if(dish != null){
        return (
            <div className="row">
                 <div className="col-12 col-md-5 m-1">
                <Card>
                    <CardImg top src={dish.image} alt={dish.name} />
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
                            <RenderDish dish={props.dish} />
                        </div>
                        <div className="col-12 col-md-5 m-1">
                            <RenderComments comments={props.comments}  />
                        </div>
                    </div>
                </div>
            )
        } 

export default Dishdetail; 