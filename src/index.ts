import { LitElement, html, property, css } from 'lit-element'
import { getJPStandardDateTime, getDoubleDigits } from './utils'

class Calendar extends LitElement {
  @property({ type: Array })
  private weekdays: String[] = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']

  @property({ type: String })
  private time: String = ''

  constructor() {
    super()
  }

  get start() {
    const dateTime = new Date(getJPStandardDateTime())
    return new Date(
      dateTime.getFullYear(),
      dateTime.getMonth(),
      dateTime.getDate() - dateTime.getDay() + 1
    )
  }

  connectedCallback() {
    super.connectedCallback()
    window.setInterval(() => {
      const dateTime = new Date(getJPStandardDateTime())
      this.time = `${getDoubleDigits(dateTime.getHours())}:${getDoubleDigits(dateTime.getMinutes())}:${getDoubleDigits(dateTime.getSeconds())}`
    }, 50)
  }

  disconnectedCallback() {
    super.disconnectedCallback()
  }

  static styles = [
    css`
      body {
        user-select: none;
        pointer-events: none;
      }

      .container {
        position: relative;
        min-width: 600px;
        min-height: 400px;
      }

      /* 横向き */
      @media screen and (orientation: landscape) {
        .time {
          top: 50%;
          left: 50%;
          position: absolute;
          padding: 0;
          margin: 0 auto;
          transform: translateY(100%) translateX(-50%);
        }

        .time span {
          text-align: center;
          font-size: 2em;
        }

        .calendar {
          top: 50%;
          left: 50%;
          position: absolute;
          padding: 0;
          margin: 0 auto;
          transform: translateY(100%) translateX(-50%);
        }

        .calendar ul {
          display: flex;
          padding: 0;
          margin: 0;
        }

        .calendar li {
          list-style: none;
          width: 3.6em;
          padding: 1.2rem 1.4rem;
          margin: 0;
        }

        .calendar span {
          text-align: center;
          font-size: 2em;
        }

        .current {
          border-bottom: solid 4px #d93d33;
        }

        .sorry {
          display: none;
        }
      }

      @media screen and (max-width: 896px) {
        .time {
          top: 0;
          left: 8%;
        }

        .calendar {
          top: 0;
        }
      }

      /* 縦向き */
      @media screen and (orientation: portrait) {
        .time {
          display: none;
        }

        .calendar {
          display: none;
        }

        .sorry {
          height: 1200px;
          line-height: 1200px;
          text-align: center;
        }

        .sorry p {
          display: inline-block;
          vertical-align: middle;
          margin: 12px auto 0;
          font-size: 1.8em;
          line-height: 1.2;
        }
      }
    `
  ]

  render() {
    return html`
      <div class="container">
        <div class="time">
          <span>${this.time}</span>
        </div>
        <div class="calendar">
          <ul>
            ${this.weekdays.map(weekday => html`
              <li>
                <span>${weekday}</span>
              </li>
            `)}
          </ul>
          <ul>
            ${this.weekdays.map((weekday, i) => html`
              <li>
                <span class="${this.getStyleInCurrentDay(this.start, i)}">
                  ${this.getDay(this.start, i)}
                </span>
              </li>
            `)}
          </ul>
        </div>
        <div class="sorry">
          <p>Please start sideways</p>
        </div>
      </div>
    `
  }

  getDay(date: Date, interval: number) {
    const dateTime = new Date(getJPStandardDateTime(date))
    return new Date(dateTime.getTime() + 1000 * 60 * 60 * 24 * interval).getDate()
  }

  getStyleInCurrentDay(date: Date, interval: number) {
    const dateTime = new Date(getJPStandardDateTime())
    return this.getDay(date, interval) === dateTime.getDate() ? 'current' : ''
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'x-calendar': Calendar
  }
}

customElements.define('x-calendar', Calendar)
