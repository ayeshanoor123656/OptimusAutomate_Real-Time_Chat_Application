function OnlineUsers({users}){

    return(

        <div className="sidebar">

            <h2>

                Online Users

            </h2>

            {

                users.map((user,index)=>(

                    <div
                        className="user"
                        key={index}
                    >

                        {user}

                    </div>

                ))

            }

        </div>

    );

}

export default OnlineUsers;