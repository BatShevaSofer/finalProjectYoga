// import React, { Component } from 'react';
// import PropTypes from 'prop-types';

// class CreateMessage extends Component {
//   constructor() {
//     super();
//     this.state = {
//       messageContent: ''
//     }
//   }

//   handlerChangeMessageContent = (e) => {
//     this.setState({
//       messageContent: e.target.value
//     });
//   }

//   handlerSubmit = (e) => {
//     e.preventDefault();

//     const message = {
//       content: this.state.messageContent
//     }

//     this.setState({
//       messageContent: ''
//     })

//     this.props.handlerCreateMessage(message);
//   }

//   render() {
//     return (
//       <form className="create-message" onSubmit={this.handlerSubmit}>
//         <input type="text" value={this.state.messageContent} onChange={this.handlerChangeMessageContent} placeholder="Please enter message" />
//         <input type="submit" value="SEND" />
//       </form>
//     );
//   }
// }

// CreateMessage.propTypes = {
//   handlerCreateMessage: PropTypes.func.isRequired,
// };

// export default CreateMessage;
import React, { Component } from 'react';

class CreateMessage extends Component {
  constructor() {
    super();
    this.state = {
      messageContent: ''
    }
  }
  render() {
    return (
      <form className="create-message" onSubmit={this.handlerSubmit}>
        <input type="text" value={this.state.messageContent} onChange={this.handlerChangeMessageContent} placeholder="Please enter message" />
        <input type="submit" value="SEND" />
      </form>
    );
  }
  handlerChangeMessageContent = (e) => {
    this.setState({
      messageContent: e.target.value
    });
  }
  handlerSubmit = (e) => {
    e.preventDefault();

    const message = {
      content: this.state.messageContent
    }

    this.setState({
      messageContent: ''
    })

    this.props.handlerCreateMessage(message);
  }
}

export default CreateMessage;