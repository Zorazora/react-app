import {getUser} from "../api/user";
import {history} from "../util/historyUtil";

export const userActions = {
    setUser,
    logout
};

function setUser(mailaddress) {
    return dispatch => {
        let mailInfo = {};
        mailInfo.mailaddress = mailaddress;
        getUser(mailInfo).then(res => {
            localStorage.setItem("user", JSON.stringify(res.data.data))
            dispatch({type: 'SET_USER', user: res.data.data});
            history.push('/arcan')
        })
    };
}

function logout() {
    return dispatch => {
        localStorage.removeItem("user");
        dispatch({type: 'LOGOUT'});
        history.push('/arcan');
        window.location.reload();
    };
}

