import { html, css, LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import '../../style.css'

type Todo = {
    value: string,
    completed: boolean
}

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement('my-element')
export class MyElement extends LitElement {
  // static styles = css`
  //   :host {
  //     display: block;
  //     border: solid 1px gray;
  //     padding: 16px;
  //     max-width: 800px;
  //   }
  // `

  /**
   * The name to say "Hello" to.
   */

  @property({ type: Array })
  todos: Todo[] = []

  /**
   * The number of times the button has been clicked.
   */
  @property({ type: Number })
  completedCount = 0

  render() {
    return html`
      <link rel="stylesheet" href="../../style.css" />
      <div id="app">

        <h1 class="header">Lit</h1>

        <div class="completed-wrapper">
          <h3 class="completed-count">${this.completedCount} completed tasks</h3>
          <button class="completed-reset">Reset</button>
        </div>
      
      </div>
    `
  }

  private onClick() {
    this.completedCount++
  }

  foo(): string {
    return 'foo'
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'my-element': MyElement
  }
}
