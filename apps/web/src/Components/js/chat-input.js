import React from 'react';
import '../css/styles.css';
import '../css/fonts.css';

class ChatInput extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            message: ''
        }
        this.submit = this.submit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }



    handleChange(event) {

        this.setState({ message: event.target.value});
    }

    submit = (event) => {
        if(this.state.message!==''){
            this.props.send(this.state.message);
            this.setState({message:''});
}
        event.preventDefault();
    }

    render() {
        return <form className="absolute bottom-0 inset-x-0 max-h-8 w-auto flex" onSubmit={this.submit}>
                <input type="submit" value="SEND" className="bg-gray-800 hover:bg-gray-600 text-white w-16 " />
                <input type="text" placeholder=" Write something" className="bg4 text-black flex-1"
                    value={this.state.message} onChange={this.handleChange} />
            </form>
    }
}
export default ChatInput;