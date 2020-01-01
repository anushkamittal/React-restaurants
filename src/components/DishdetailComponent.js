import React, {Component} from 'react';
import { Card, CardImg, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';

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
                {/* <div className="col-12 col-md-5 m-1">
                    <Card>
                        <CardTitle>
                            <h4>Comments</h4>
                        </CardTitle>
                        <CardText>
                            <RenderComments comments={props.comments}/>   
                        </CardText> 
                    </Card>
                </div> */}
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
                        <RenderComments comments={props.comments} />
                    </div>
                </div>
            </div>
        )
} 

export default Dishdetail; 