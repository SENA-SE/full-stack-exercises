const Notification = (message) =>{
    if (!message) {
        return null;
    }else{
        return (
            <div style={{color: 'red'}}>
                {message}
            </div>
        );
    }
}

export default Notification;