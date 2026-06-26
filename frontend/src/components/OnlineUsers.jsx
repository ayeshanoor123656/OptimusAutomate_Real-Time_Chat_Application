function OnlineUsers({ users }) {

    return (

        <div className="sidebar">

            <h2>Online Users</h2>

            {

                users.map((user, index) => {

                    const online = user.includes("🟢");

                    return (

                        <div
                            key={index}
                            className="user"
                        >

                            <span>

                                {online ? "🟢" : "🔴"}

                            </span>

                            {" "}

                            {

                                user
                                    .replace("🟢", "")
                                    .replace("🔴", "")

                            }

                        </div>

                    );

                })

            }

        </div>

    );

}

export default OnlineUsers;