import { type ReactNode } from "react";

import { closeModal } from "../store/modal.ts";

import CloseButton from "../components/buttons/CloseButton.tsx";

function ModalLayout({ children }: { children: ReactNode }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={closeModal}
    >
      <div
        className="bg-panel relative max-h-screen w-full max-w-xl overflow-y-visible rounded-lg p-6 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        {children}

        <CloseButton onClick={closeModal} />
      </div>
    </div>
  );
}

export default ModalLayout;
