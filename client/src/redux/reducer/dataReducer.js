


export const getDataReducer = (state = {users: []}, action) => {
    switch(action.type) {
        case 'GET_PRODUCTS_SUCCESS':
            return { users: action.payload }
        case 'GET_PRODUCTS_FAIL':
            return { users: action.payload }
        case 'EMPTY':
            return {users : [] }
        default:
            return state
    }
};


