import React, { Component } from 'react';

export default class ToDontCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      quality: props.toDont.quality
    }
    this.qualities = ['😕', '🤔', '🤓']
  }

  updateQuality(direction) {
    let newQuality;
    let qualityIndex = this.qualities.indexOf(this.state.quality)
    const { quality } = this.state;

    if (direction === 'up') {
      if (qualityIndex < this.qualities.length - 1) {
        newQuality = this.qualities[qualityIndex + 1];
        qualityIndex += 1
      } else {
        newQuality = quality
      }
    } else {
      if (qualityIndex > 0) {
        newQuality = this.qualities[qualityIndex - 1];
        qualityIndex -= 1
      } else {
        newQuality = quality
      }
    }

    this.setState({ quality: newQuality }, () => {
      const newToDont = Object.assign({}, this.props.toDont, this.state)
      console.log(newToDont);
      // this.props.updateCard(newToDont)
    })
  }

  deleteCard() {
    this.props.deleteCard(this.props.toDont)
  }

  update(update, field) {
    const { toDont } = this.props
    toDont[field] = update.target.value

    this.props.updateCard(toDont)
  }

  render() {
    const { title, body } = this.props.toDont
    const { qualities, state: { quality }} = this;

    const toggleUp = () => {
      const lastIndex = qualities.length - 1;

      if (quality !== qualities[lastIndex]) {
        return <button className='card-btn' onClick={ () => this.updateQuality('up') }>⬆</button>
      } else {
        return <div className='btn-placeholder'></div>
      }
    }

    const toggleDown = () => {
      if (quality !== qualities[0]) {
        return <button className='card-btn' onClick={ () => this.updateQuality('down') }>⬇</button>
      } else {
        return <div className='btn-placeholder'></div>
      }
    }

    return (
      <div className='toDont-card'>
        <button className='delete-card card-btn'
                onClick={ () => this.deleteCard() }>✕</button>
        <input      type="text"
                    className='card-title'
                    value={ title }
                    onChange={ (e) => this.update(e, 'title') } />
        <input      type="text"
                    className='card-body'
                    onChange={ (e) => this.update(e, 'body') }
                    value={ body } />
        <div className='quality-section'>
          <div className='vote-btns'>
            { toggleUp() }
            { toggleDown() }
          </div>
          <span className='quality'>Quality: </span><span className='quality-rank'>{quality}</span>
        </div>
      </div>
    )
  }
}
