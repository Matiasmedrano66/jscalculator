import React from 'react';

class Display extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    return(
      <div id='display' className='display col-12'>
      {this.props.numbers}
      </div>
    );
  }
}

export default Display;
