import {$} from "@/modal/base";

$.editCardModal = function (options) {

  return new Promise((resolve, reject) => {

    const modal = $.modal({
      title: options.title,
      width: '300px',
      closable: false,
      content: options.content,
      onClose() {
        modal.destroy();
      } ,
      footerButtons: [
        {
          text: 'Сохранить',
          class: 'success',
          type: options.formSubmitButtonOptions[0],
          for: options.formSubmitButtonOptions[1],
          handler() {
            resolve();
            modal.close();
          }
        },
        {
          text: 'Отменить',
          class: 'secondary',
          handler() {
            modal.close();
          }
        }
      ],
    });

    setTimeout(() => {
      modal.open();
    }, 0);
  })
};
