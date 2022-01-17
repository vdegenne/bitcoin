import { LitElement, html, css } from 'lit'
import { customElement, state } from 'lit/decorators.js'
import '@material/mwc-snackbar'
import '@material/mwc-button'
import clipboard from '@vdegenne/clipboard-copy'
// import '@material/mwc-icon-button'
// import '@material/mwc-dialog'
// import '@material/mwc-textfield'
// import '@material/mwc-checkbox'

declare global {
  interface Window {
    app: AppContainer;
    toast: (labelText: string, timeoutMs?: number) => void;
  }
}

@customElement('app-container')
export class AppContainer extends LitElement {
  @state()
  private address: string = '';

  static styles = css`
  :host {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }
  `

  constructor () {
    super()
    fetch('./address').then(async res => {
      this.address = await res.text()
    })
  }

  render () {
    return html`
    <mwc-button
      @click=${() => this.onAddressClick()}>${this.address}</mwc-button>
    `
  }

  private onAddressClick() {
    clipboard(this.address)
    window.toast('copied!')
  }
}
