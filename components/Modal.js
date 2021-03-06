const Modal = ({ name = 'location', setModal, id = '' }) => {
  const deleteLocation = async locId => {
    const res = await fetch(`http://localhost:3000/api/locations/${locId}`, { method: 'DELETE' });
    console.log(res);
  };

  return (
    <div className="modal-outside p-3">
      <div className="modal bg-white shadow-2xl rounded p-6 m-3">
        <h3 className="text-center">Are you sure you want to delete {name}?</h3>
        <div className="btn-group flex justify-around">
          <button
            className="rounded hover:bg-red-800 hover:border-red-800 text-white border bg-red-700 border-red-700 py-2 px-4 focus:outline-none focus:shadow-outline buttText"
            type="button"
            onClick={() => deleteLocation(id)}
          >
            Yes, Delete it
          </button>
          <button
            className="rounded hover:text-gray-900 hover:border-gray-900 text-gray-700 border border-gray-700 py-2 px-4 focus:outline-none focus:shadow-outline buttText"
            type="button"
            onClick={() => setModal(false)}
          >
            No, Cancel
          </button>
        </div>
      </div>
      <style jsx>{`
      .modal-outside {
        background: rgba(0, 0, 0, 0.55);
        display: flex;
        justify-content: center;
        align-items: center;
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }
      .modal {
        width: 375px;
        max-width: 100%;
        height: 175px;
        max-height: 100%;
        z-index: 99999999;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }
      .btn-group {
        display
      }
      @media only screen and (max-width: 480px) {
        .buttText {
          font-size: 14px;
        }
      }
    `}</style>
    </div>
  );
};

export default Modal;
