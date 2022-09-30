import io from 'socket.io-client';
import HttpService from './HttpServices';

const http = new HttpService();
const PrivateSocketUrl = 'http://localhost:5000/personalCh' ;
const PublicSocketUrl = 'http://localhost:5000/chatCh'; 




class SocketServices {

    initPrivateSocket = (socketUrl) => {
        const socket = new io(PrivateSocketUrl);
        socket.on('connect', () => {
          socket.emit('message', this.state.hash);
          socket.on('matchFound', (id) => {// id = public socket id  
            this.initPublicSocket(id);
          });
        });
        this.setState({ PrivateSocket: socket });
      }
    
      initPublicSocket = (id) => {
        const socket = new io(PublicSocketUrl);
        socket.on('connect', () => {
          socket.emit('connectMe', id);
        });
        this.setState({ PublicSocket: socket });
      }
    
    
      getHash = () => {
        http.getHash().then(data => {
          this.setState({ hash: data.perChannel });
        }, error => {
          console.log(error);
        }
        );
      }



}

export default SocketServices;