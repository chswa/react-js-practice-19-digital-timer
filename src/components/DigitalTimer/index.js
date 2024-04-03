// Write your code here
import {Component} from 'react'

import './index.css'

class DigitalTimer extends Component {
  state = {
    isTimerRunning: false,
    timerElapsedInSeconds: 0,
    timerLimitInMinutes: 25,
  }

  componentWillUnmount() {
    this.clearTimerInterval()
  }

  clearTimerInterval = () => {
    clearInterval(this.intervalId)
  }

  onDecreaseTimerLimitInMinutes = () => {
    const {timerLimitInMinutes} = this.state

    if (timerLimitInMinutes > 1) {
      this.setState(prevState => ({
        timerLimitInMinutes: prevState.timerLimitInMinutes - 1,
      }))
    }
  }

  onIncreaseTimerLimitInMinutes = () => {
    this.setState(prevState => ({
      timerLimitInMinutes: prevState.timerLimitInMinutes + 1,
    }))
  }

  onResetTimer = () => {
    this.clearTimerInterval()
    this.setState({
      isTimerRunning: false,
      timerElapsedInSeconds: 0,
      timerLimitInMinutes: 25,
    })
  }

  increamentTimeElapsedInSeconds = () => {
    const {timerLimitInMinutes, timerElapsedInSeconds} = this.state
    const isTimerCompleted = timerElapsedInSeconds === timerLimitInMinutes * 60

    if (isTimerCompleted) {
      this.clearTimerInterval()
      this.setState({isTimerRunning: false})
    } else {
      this.setState(prevState => ({
        timerElapsedInSeconds: prevState.timerElapsedInSeconds + 1,
      }))
    }
  }

  onStartOrPauseTimer = () => {
    const {isTimerRunning, timerElapsedInSeconds, timerLimitInMinutes} =
      this.state
    const isTimerCompleted = timerElapsedInSeconds === timerLimitInMinutes * 60
    if (isTimerCompleted) {
      this.setState({timeElapsedInSeconds: 0})

      //6. If the timer is completed(isTimerCompleted is true)//6.1. set the state variable timeElapsedInSeconds to zero.
    }
    if (isTimerRunning) {
      this.clearTimerInterval()

      //7. If the timer is running(isTimerRunning is true)//7.1 clear the timer interval
    } else {
      this.intervalId = setInterval(this.incrementTimeElapsedInSeconds, 1000)

      // 8. if the timer is not running(isTimerRunning is false)//8.1 set the interval
    }
    this.setState(prevState => ({isTimerRunning: !prevState.isTimerRunning}))
    //9. Toggling the state isTimerRunning based on the previous state
  }

  getElapsedSecondsInTimeFormat = () => {
    const {timerElapsedInSeconds, timerLimitInMinutes} = this.state
    const totalRemainingSeconds =
      timerLimitInMinutes * 60 - timerElapsedInSeconds
    const minutes = Math.floor(totalRemainingSeconds / 60)
    const seconds = Math.floor(totalRemainingSeconds % 60)
    const stringifiedMinutes = minutes > 9 ? minutes : `0${minutes}`
    const stringifiedSeconds = seconds > 9 ? seconds : `0${seconds}`

    return `${stringifiedMinutes}:${stringifiedSeconds}`
  }

  render() {
    const {isTimerRunning, timerLimitInMinutes, timerElapsedInSeconds} =
      this.state
    const isButtonsDisabled = timerElapsedInSeconds > 0

    const labelText = isTimerRunning ? 'Running' : 'Paused'

    const starOrPauseImageUrl = isTimerRunning
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'

    const startOrPauseAltText = isTimerRunning ? 'pause icon' : 'play icon'
    return (
      <div className="bg-container">
        <h1 className="digital-timer-heading">Digital Timer</h1>
        <div className="timer-container">
          <div className="bg-timer">
            <div className="timer-display-container">
              <h1 className="timer">{this.getElapsedSecondsInTimeFormat()}</h1>
              <p className="time-status">{labelText}</p>
            </div>
          </div>

          <div className="interaction-timer-container">
            <div className="start-reset-container">
              <div className="status-change-container">
                <button
                  className="play-button status-change-container"
                  type="button"
                  onClick={this.onStartOrPauseTimer}
                >
                  <img
                    src={starOrPauseImageUrl}
                    className="play-icon"
                    alt={startOrPauseAltText}
                  />
                  <p className="start">{isTimerRunning ? 'Pause' : 'Start'}</p>
                </button>
              </div>
              <div className="reset-container">
                <button
                  className="play-button reset-container"
                  onClick={this.onResetTimer}
                  type="button"
                >
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                    className="play-icon"
                    alt="reset icon"
                  />
                  <p className="start">Reset</p>
                </button>
              </div>
            </div>
            <div className="timer-set-container">
              <p className="set-timer">Set Timer Limit</p>
              <div className="increase-decrease-container">
                <button
                  className="decrease-btn"
                  disabled={isButtonsDisabled}
                  onClick={this.onDecreaseTimerLimitInMinutes}
                  type="button"
                >
                  -
                </button>
                <p className="set-time">{timerLimitInMinutes}</p>
                <button
                  className="increase-btn"
                  disabled={isButtonsDisabled}
                  onClick={this.onIncreaseTimerLimitInMinutes}
                  type="button"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default DigitalTimer
