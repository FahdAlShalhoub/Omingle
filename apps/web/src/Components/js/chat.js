import React from 'react'
import ChatInput from './chat-input';
import Message from './message';
import '../css/styles.css';
import '../css/fonts.css';

class Chat extends React.Component
    {

        constructor(props){
            super(props)
            this.state=({
            show:false ,
            sentMessages:[],
            receivedMessages:[]
                    });
            this.sendMessage= this.sendMessage.bind(this);
            this.sendMessage= this.sendMessage.bind(this);
            this.scrollToBottom=this.scrollToBottom.bind(this);

        }

        sendMessage = () => {

        const listItems = this.state.sentMessages.map((message) =>
        <Message sender="Stranger" message={message} id="right"/> );
         return listItems 
        }

          send = (message) => {
            this.setState({sentMessages:this.state.sentMessages.concat(message)});
        }
        
        componentDidUpdate(prevState) {
          this.scrollToBottom();
            if (this.state.sentMessages !== prevState.sentMessages) {
              if(!this.state.show) {
               this.setState({show:true});
               
                }
            }
          }

          scrollToBottom= ()=> {
            this.el.scrollIntoView({ behavior: 'smooth' });
          }

       render() {
           return <div className="bg2 border-2 border-gray-600 mx-auto
           max-w-4xl h-auto flex-auto relative">
            <div className="overflow-y-auto h-new">           
            {this.state.show && this.sendMessage(this.state.sentMessages)}
        
            <div ref={el => { this.el = el; }} />

            </div>
            <ChatInput send={this.send}/>
           </div>
           
           }
     }

export default Chat;