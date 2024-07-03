import axios from "axios";


export const getUserss = (socket) => async (dispatch) => {
    try {
        const { data } = await axios.get(`http://localhost:8000/user`);
        if(socket){
            socket.emit('ok', data) 
        }
    } catch (error) {
        dispatch({ type: 'GET_PRODUCTS_FAIL', payload: error.response });
    }
};  


export const OfflineStatus = (socket,currentUser,getUsers,is_online) =>async () =>{
    try{
        await axios.post(`http://localhost:8000/is_online`, {data : currentUser , is_online : is_online});
        socket.emit('ok', getUsers)
    } catch (error) {   
       console.log(error)

    }
}



