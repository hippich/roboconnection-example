import { JiboConnection, ConnectionInfo, RobotInfo, Requester } from 'roboconnection';


// const onConnected = (requester: Requester) => {
//     console.log(`onConnected: requester:`, requester);
//     // console.log(robotInfo);
//     sayHiAndDisconnect(requester);
// }
//
// const onDisconnected = () => {
//     console.log(`onDisconnected`)
// }

const connectionInfo: ConnectionInfo = {
    clientId: 'CLIENT_ID',
    clientSecret: 'SECRET_KEY',
}

const robotInfo: RobotInfo = {
    serialName: 'Example-Example-Example-Example',
    endpoint: 'portal.jibo.com',
    email: 'EMAIL',
    password: 'PASSWORD',
}

const sayHiAndDisconnect = (requester: Requester, prompt: string = "Howdy!") => {
    console.log(`sayHiAndDisconnect: ${prompt}`)
    if (requester) {
        let p = requester.play.say(prompt).complete;
        p.then( () => {
            console.log('sayHiAndDisconnect: ta-da!');
            console.log('sayHiAndDisconnect: just hanging around for for 10 seconds...');
            setTimeout(() => {
                if (jiboConnection) {
                    console.log('sayHiAndDisconnect: disconnecting');
                    jiboConnection.disconnect();
                }
            }, 10 * 1000);
        })
        .catch((result: any) => {
            console.log(`Error: `, result)
        })
    }
}

const jiboConnection: JiboConnection = new JiboConnection(robotInfo, connectionInfo);
jiboConnection.on('connected', (requester: Requester) => {
    console.log(`jiboConnection on connected: requester: `, requester);
    sayHiAndDisconnect(requester);
});
jiboConnection.on('disconnected', () => {
    console.log(`jiboConnection on disconnected`);
});
jiboConnection.connect();
