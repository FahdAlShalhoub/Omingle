import React from 'react';
import './Components/css/styles.css';
import Chat from './Components/js/chat';
import Start from './Components/js/start';
import Close from './Components/js/close';
import Spinner from './Components/js/spinner';
import SocketServices from './Services/SocketServices'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hash: null,
      PrivateSocket: null,
      PublicSocket: null, 
      start: "show", // display or hide start component 
      loading: null, // waiting for the connection to be estableshed 
      connected:false  //it means the connection id establshed
    }

    const socketServices = new SocketServices();
    socketServices.getHash = socketServices.getHash.bind(this);
    socketServices.initPrivateSocket = socketServices.initPrivateSocket.bind(this);
    socketServices.initPublicSocket = socketServices.initPublicSocket.bind(this);
    this.connect = this.connect.bind(this);
    
  }

  connect = () => {
    this.setState({ start: "hide" });
    setTimeout(() => { this.setState({ loading: true }) }, 250);
    setTimeout(() => { this.setState({ loading: false }) }, 2500);
  }

  render() {
    return (
      <div className=" bg1 min-w-full min-h-screen flex">
        {this.state.start === "show" && <Start connect={this.connect} />}
        {this.state.loading && <Spinner />}
        {this.state.loading === false && <Chat/>}
    </div>
    );
  }
}
export default App;