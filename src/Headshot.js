import React from 'react';
import './Headshot.scss';
import headshot from './images/headshot.png';

class Headshot extends React.Component {
  headshotEl = React.createRef();

  width = () => {
    if(this.headshotEl.current) {
      return this.headshotEl.current.offsetWidth;
    }
  }

  render() {
    return (
      <img
        ref={this.headshotEl}
        alt=''
        src={headshot}
        style={this.props.style}
        className={`headshot ${this.props.raised ? 'headshot--raised' : ''}`}
      />
    );
  }
}

export default Headshot;
