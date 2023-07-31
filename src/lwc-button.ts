/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
import {LitElement, html} from 'lit';
import {customElement, property, state} from 'lit/decorators.js';
import './lwc-modal.js';
import {withTwind} from './twind/withTwind';
import {loadFonts} from './loadFonts';

/**
 * An example element.
 *
 * @fires count-changed - Indicates when the count changes
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement('lwc-button')
export class LwcButton extends withTwind(LitElement) {
  @state()
  private _modalOpen = false;

  /**
   * Called when user successfully connects to a webln-compatible wallet.
   * It will expose window.webln
   */
  @property({
    attribute: 'on-connect',
    converter: (v) => (v && typeof v === 'string' ? eval(v) : v),
  })
  onConnect?: () => void;

  constructor() {
    super();
    loadFonts();
  }

  override render() {
    return html` <div>
      <button
        @click=${this._onClick}
        part="button"
        class="w-64 py-2 px-7 font-medium font-sans shadow rounded-md flex gap-2 justify-center items-center"
        style="
      background: linear-gradient(180deg, #FFDE6E 63.72%, #F8C455 95.24%);"
      >
        <svg
          width="25"
          height="24"
          viewBox="0 0 25 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M14.1287 5.03035L21.4952 12.43L21.4962 12.431C21.9034 12.84 22.3607 13.0639 22.7796 13.1062C23.1718 13.1459 23.5673 13.0322 23.9225 12.6949L19.9036 2.22631C19.4497 1.2345 18.1428 0.998839 17.3711 1.7739L14.1287 5.03035ZM21.0966 12.8275L21.0967 12.8277L21.0965 12.8278C22.0558 13.7912 23.3871 14.021 24.3507 13.062L21.0884 16.3089L19.5591 17.8311L18.4915 18.8936L16.6182 17.0135C17.526 15.6331 17.3781 13.7598 16.1662 12.5404L14.8908 11.2571C14.7095 11.0747 14.4176 11.0738 14.2351 11.2551L13.6055 11.8808L12.0093 10.2746C11.7323 9.99591 11.2744 10.0124 11.0176 10.3194C10.7928 10.5905 10.8315 10.9904 11.0786 11.239L12.6549 12.8251L11.4035 14.0683L9.8073 12.4622C9.53028 12.1835 9.07051 12.1979 8.81561 12.507C8.5928 12.7762 8.63155 13.1761 8.87864 13.4247L10.4549 15.0107L9.82725 15.6344C9.64479 15.8157 9.64392 16.1076 9.82523 16.29L11.1006 17.5733C12.3123 18.7926 14.1847 18.9525 15.5709 18.0538L17.4452 19.9349L16.8577 20.5195L14.8527 22.5151C13.8889 23.4742 12.3301 23.4706 11.3708 22.507L1.21706 12.3075C0.257903 11.3438 0.261373 9.78528 1.22516 8.82609L7.46087 2.61976C8.42465 1.66071 9.9834 1.66432 10.9427 2.62785L21.0966 12.8275Z"
            fill="black"
          />
        </svg>
        Connect Wallet
      </button>
      ${this._modalOpen
        ? html`<lwc-modal
            .onClose=${this._closeModal}
            .onConnect=${this.onConnect}
          />`
        : html``}
    </div>`;
  }

  private _closeModal = () => {
    this._modalOpen = false;
  };

  private _onClick() {
    this._modalOpen = true;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lwc-button': LwcButton;
  }
}
