'use client';
import { Modal } from 'flowbite-react';
import { HiOutlineExclamationCircle } from 'react-icons/hi'

export default function PopUpModal({open, onClose}) {
  // Function to handle the closing behavior of the PopUpModal
  const handleModalClose = (confirmed) => {
    onClose(confirmed);
  };

  return (
    <>
      <Modal show={open} size="md" popup onClose={() => handleModalClose(false)}>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this product?
            </h3>
            <div className="flex justify-center gap-4">
              <button className='px-3 py-2 rounded-md bg-red-600 text-white' onClick={() => handleModalClose(true)}>
                Yes, I'm sure
              </button>
              <button className="border px-3 py-2 rounded-md border-gray-300" onClick={() => handleModalClose(false)}>
                No, cancel
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}


