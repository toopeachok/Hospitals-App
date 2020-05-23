import {$} from "@/modal/base"

$.modal = function (options) {

  function noop() {
  }

  function _createModalFooter(buttons = []) {

    if (buttons.length === 0) {
      return document.createElement('div')
    }

    const wrap = document.createElement('div');

    wrap.classList.add('modal-footer');

    buttons.forEach(btn => {
      const $btn = document.createElement('button');
      $btn.textContent = btn.text;
      $btn.classList.add('btn');
      $btn.classList.add(`btn-${btn.class || 'secondary'}`);
      $btn.onclick = btn.handler || noop;
      if (btn.type) {
        $btn.setAttribute('type', `${btn.type}`);
      }
      if (btn.for) {
        $btn.setAttribute('for', `${btn.for}`);
      }
      wrap.append($btn);
    });

    return wrap;

  }

  function _createModal(options) {

    const DEFAULT_WIDTH = '300px';

    const modal = document.createElement('div');

    modal.classList.add('vmodal');

    let modalHTML = `
      <div class="modal-overlay" data-close="true">
    
        <div class="modal-window" style="width: ${options.width || DEFAULT_WIDTH}">
    
          <div class="modal-header">
    
            <span class="modal-title"> ${options.title || `Default title`} </span>
    
            ${options.closable ? `<span class="modal-close" data-close="true">&times</span>` : ``}
    
          </div>
    
          <div class="modal-body" data-content>
          
            ${options.content || ``}
    
          </div>
    
        </div>
    
      </div>
    `;

    modal.insertAdjacentHTML('afterbegin', modalHTML);

    const footer = _createModalFooter(options.footerButtons);

    modal.querySelector('.modal-window').append(footer);

    document.body.append(modal);

    return modal;
  }

  const ANIMATION_SPEED = 200;

  let closing = false;

  let destroyed = false;

  const modal = {
    open() {

      if (destroyed) {
        return console.log('Modal is destroyed');
      }

      !closing && $modal.classList.add('open');
    },
    close() {
      closing = true;
      $modal.classList.remove('open');
      $modal.classList.add('hide');
      setTimeout(() => {
        $modal.classList.remove('hide');
        closing = false;
        if (typeof options.onClose === 'function') {
          options.onClose();
        }
      }, ANIMATION_SPEED);
    },
  };

  const listener = event => {
    if (event.target.dataset.close) {
      modal.close();
    }
  };

  const $modal = _createModal(options);

  $modal.addEventListener('click', listener);

  return Object.assign(modal, {
    destroy() {
      $modal.parentNode.removeChild($modal);
      $modal.removeEventListener('click', listener);
      destroyed = true;
    },
    setContent(html) {
      $modal.querySelector('[data-content]').innerHTML = html;
    },
    setTitle(html) {
      $modal.querySelector('.modal-title').innerHTML = html;
    },
  });
};