const ModalHeader = ({ title }) => {
  return (
    <h4
      style={{ color: "#9aafff" }}
      className="border-blue-dark border-bottom border-3 text-center m-0 mb-3 py-3  px-0 shadow-none rounded-top py-2 position-relative"
    >
      {title}
      <button
        className="btn p-0 border-0 text-white position-absolute p-0 closeModalBtn"
        style={{ left: "1%", top: "8%" }}
        type="button"
        data-bs-dismiss="modal"
      >
        <svg fill="#f00" width="50" height="50" viewBox="0 0 16 16">
          <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
        </svg>
      </button>
    </h4>
  );
};
export default ModalHeader;
