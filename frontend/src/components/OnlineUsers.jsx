function OnlineUsers({ users, setReceiver }) {

    return (

        <div className="sidebar">

            <h2>Online Users</h2>

            {

                users.map((user, index) => {

                    const online = user.includes("🟢");

                    const username = user.split(":")[0].trim();

                    return (

                        <div

                            key={index}

                            className="user"

                            onClick={() => {

                                console.log("Selected:", username);

                                setReceiver(username);

                            }}

                        >

                            {online ? "🟢" : "🔴"} {username}

                        </div>

                    );

                })

            }

        </div>

    );

}

export default OnlineUsers;