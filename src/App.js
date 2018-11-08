import React, { Component } from 'react';
import Headshot from './Headshot';
import TopAppBar, {TopAppBarFixedAdjust} from '@material/react-top-app-bar';
import './App.scss';

class App extends Component {
  mainTopper = React.createRef();

  state = {
    headshotStyle: {},
  };

  calculateHeadshotTranslation = (_, isInitializing) => {
    const {innerWidth, pageYOffset} = window;
    const {offsetHeight} = this.mainTopper.current;
    const margin = 30;
    // when main__topper is at top of page - margin
    const stopPoint = offsetHeight - pageYOffset - margin;
    const multiple = pageYOffset/offsetHeight;
    const maxMultiple = Math.min(multiple, 0.92);

    if (stopPoint <= 0 && !isInitializing) return;
    const translation = innerWidth/2 * maxMultiple;
    this.setState({headshotStyle: {transform: `translate(${translation}px)`}});
  }

  componentDidMount() {
    this.calculateHeadshotTranslation(null, true);
    document.addEventListener('scroll', this.calculateHeadshotTranslation);
  }

  render() {
    const {headshotStyle} = this.state;

    return (
      <div className='App'>
        <TopAppBar fixed title='Matt Goo' actionItems={[<Headshot />]} />
        <TopAppBarFixedAdjust tag='main' className='top-app-bar__fixed-adjust'>

          <div className='content__topper' ref={this.mainTopper}></div>
          <div className='content'>

            <Headshot style={headshotStyle}/>

          </div>
        </TopAppBarFixedAdjust>
      </div>
    );
  }
}

export default App;
