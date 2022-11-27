export const closeBootstrapModal = () => {
  const closeModalBtns = document.querySelectorAll('[data-bs-dismiss="modal"]');
  if (closeModalBtns) {
    for (const btn of closeModalBtns) {
      btn.click();
    }
  }
};
