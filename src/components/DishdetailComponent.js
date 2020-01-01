import React, {Component} from 'react';
import {Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle,CardColumns } from 'reactstrap';

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
                <div className="col-12 col-md-5 m-1">
                    <Card>
                        <CardTitle>
                            <h4>Comments</h4>
                        </CardTitle>
                        <CardText>
                            <RenderComments comments={dish.comments}/>   
                        </CardText> 
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
                <RenderDish dish = {props.dish} />
            </div>
        )
} 

export default Dishdetail; 