import * as ActionTypes from './actionTypes';

export const Comments = (state = {
    isLoading:true,
    errMess:null,
    comments:[]
}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_DISHES:
                return {...state,isLoading:false,errMess:null,promotions:action.payload}

        case ActionTypes.DISHES_FAILED:
                return {...state,isLoading:false,errMess:action.payload}

        case ActionTypes.ADD_COMMENT:
            var comment = action.payload;
            comment.id = state.comments.length;
            comment.date = new Date().toISOString();
            console.log("comment: ",comment);
            return {...state, comments: state.comments.concat(comment)};

        default:
            return state;
    }
};