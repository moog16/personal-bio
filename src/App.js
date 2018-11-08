import React, { Component } from 'react';
import Headshot from './Headshot';
import TopAppBar, {TopAppBarFixedAdjust} from '@material/react-top-app-bar';
import './App.scss';

// constants
const margin = 30;
const topAppBarActionItemPadding = 12;
const halfHeadshotWidth = 24;

class App extends Component {
  mainTopper = React.createRef();

  state = {
    headshotStyle: {},
  };

  calculateHeadshotTranslation = (_, isInitializing) => {
    const {innerWidth, pageYOffset} = window;
    const {offsetHeight} = this.mainTopper.current;

    const halfScreenWidth = innerWidth/2
    const maxTranslation = halfScreenWidth - halfHeadshotWidth - topAppBarActionItemPadding;
    const multiple = pageYOffset/offsetHeight;

    const translation = Math.min(halfScreenWidth * multiple, maxTranslation);
    this.setState({headshotStyle: {transform: `translate(${translation}px)`}});
  }

  shouldShowActionItems = () => {
    if (!(this.mainTopper && this.mainTopper.current)) return;
    const {offsetHeight} = this.mainTopper.current;
    return window.pageYOffset - halfHeadshotWidth - topAppBarActionItemPadding - offsetHeight >= 0;
  }

  componentDidMount() {
    this.calculateHeadshotTranslation(null, true);
    document.addEventListener('scroll', this.calculateHeadshotTranslation);
    window.addEventListener('resize', this.calculateHeadshotTranslation);
  }

  render() {
    let {headshotStyle} = this.state;
    const showActionItems = this.shouldShowActionItems();
    const actionItems = showActionItems ? [<Headshot />] : null;
    const hideHeadshot = showActionItems ? {fill: 'transparent'} : {};
    headshotStyle = Object.assign(headshotStyle, hideHeadshot);

    return (
      <div className='App'>
        <TopAppBar fixed title='Matt Goo' actionItems={actionItems} />
        <TopAppBarFixedAdjust tag='main' className='top-app-bar__fixed-adjust'>

          <div className='content__topper' ref={this.mainTopper}></div>
          <div className='content'>
            <Headshot raised style={headshotStyle}/>


          </div>
        </TopAppBarFixedAdjust>
      </div>
    );
  }
}

export default App;
