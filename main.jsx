function DisplaySegment({ on, horizontal, align }) {
  
  var classToApply = 'display-segment'
  if (on) classToApply += ' on'
  if (horizontal) classToApply += ' horizontal'
  if (align == undefined) align = 'left'
  
  return (
    <div className={ align }>
      <div className={ classToApply }>
        <div className="display-segment__edge-bottom"></div>
        <div className="display-segment__edge-top"></div>
      </div>
    </div>
  )
}

function DisplayNumber({ num }) {
  var truthTable =
      [
      // TL  - TR  - TM  - MM   - BL  - BR  - BM
/* 0 */ [true, true, true, false, true, true, true],
/* 1 */ [false, true, false, false, false, true, false],
/* 2 */ [false, true, true, true, true, false, true],
/* 3 */ [false, true, true, true, false, true, true],
/* 4 */ [true, true, false, true, false, true, false],
/* 5 */ [true, false, true, true, false, true, true],
/* 6 */ [true, false, true, true, true, true, true],
/* 7 */ [false, true, true, false, false, true, false],
/* 8 */ [true, true, true, true, true, true, true],
/* 9 */ [true, true, true, true, false, true, true]
      ]
  var truth = truthTable[num]
  return (
    <div className="display-number">
      <div>
        <DisplaySegment on={truth[0]} />
        <DisplaySegment on={truth[1]} align='right' />
        <DisplaySegment on={truth[2]} horizontal={true} align='top middle' />
        <DisplaySegment on={truth[3]} horizontal={true} align='middle center' />
        <DisplaySegment on={truth[4]} align='left center' />
        <DisplaySegment on={truth[5]} align='right center' />
        <DisplaySegment on={truth[6]} horizontal={true} align='bottom middle' />
      </div>
    </div>
  )
}

class Counter extends React.Component {
  constructor(props) {
    super(props)
    this.increaseCounter = this.increaseCounter.bind(this)
    this.initCounter()
  }
  
  initCounter(initial = 0, step = 1, stepTime = 1000) {
    this.state = {
      count: initial
    }
    setInterval(() => {
      this.increaseCounter(step)
    }, stepTime)
  }
  
  increaseCounter(qty) {
    this.setState(prevState => ({ count: prevState.count + qty }))
  }
  
  render() {
    return (
    <div className="display-counter">
        <DisplayNumber num={Math.floor((this.state.count % 100) / 10)} />
        <DisplayNumber num={Math.floor(this.state.count % 10)} />
    </div>
  )
  }
}

ReactDOM.render(<Counter/>, document.getElementById('app'))
