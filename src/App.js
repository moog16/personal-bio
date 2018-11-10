import React, { Component } from 'react';
import Headshot from './Headshot';
import TopAppBar, {TopAppBarFixedAdjust} from '@material/react-top-app-bar';
import Feed from 'rss-to-json';
import './App.scss';
import './fonts.scss';


// constants
const topAppBarActionItemPadding = 12;
const headshotWidth = 48;
const halfHeadshotWidth = headshotWidth/2;

class App extends Component {
  heroImage = React.createRef();
  headshotMain = React.createRef();

  state = {
    headshotStyle: {},
  };

  fetchMediumPosts = (async () => {
    const mediumUrl = 'https://medium.com/feed/@moog16';
    const response = await fetch(mediumUrl);
    console.log(response)
  })

  calculateHeadshotTranslation = (_, isInitializing) => {
    const {innerWidth, pageYOffset} = window;
    const {offsetHeight} = this.heroImage.current;

    const halfScreenWidth = innerWidth/2
    const maxTranslation = halfScreenWidth - halfHeadshotWidth - topAppBarActionItemPadding;
    const multiple = pageYOffset / offsetHeight;
    const minScale = headshotWidth / this.headshotMain.current.width();

    const translation = Math.min(halfScreenWidth * multiple, maxTranslation);
    const scale = Math.max(1-multiple, minScale);

    this.setState({headshotStyle: {
      transform: `translate(${translation}px) scale(${scale})`,
    }});
  }

  shouldShowActionItems = () => {
    if (!(this.heroImage && this.heroImage.current)) return;
    const {offsetHeight} = this.heroImage.current;
    return window.pageYOffset - halfHeadshotWidth - topAppBarActionItemPadding - offsetHeight >= 0;
  }

  componentDidMount() {
    this.calculateHeadshotTranslation(null, true);
    document.addEventListener('scroll', this.calculateHeadshotTranslation);
    window.addEventListener('resize', this.calculateHeadshotTranslation);

    this.fetchMediumPosts();
  }

  render() {
    let {headshotStyle} = this.state;
    const showActionItems = this.shouldShowActionItems();
    const actionItems = showActionItems ? [<Headshot />] : null;
    const hideHeadshot = showActionItems ? {visibility: 'hidden'} : {};
    headshotStyle = Object.assign(headshotStyle, hideHeadshot);

    return (
      <div className='App'>
        <TopAppBar fixed title='Matt Goo' actionItems={actionItems} />
        <TopAppBarFixedAdjust tag='main' className='top-app-bar__fixed-adjust'>

          <div className='hero-image__container' ref={this.heroImage}>
            <div className='hero-image'></div>
            <h1 className='header header--1'>
              Aloha
            </h1>
          </div>
          <div className='content'>
            <Headshot ref={this.headshotMain} raised style={headshotStyle}/>


          </div>
        </TopAppBarFixedAdjust>
      </div>
    );
  }
}

export default App;
