import { type ReactNode } from "react";

import { closeModal } from "../store/modal.ts";

import CloseButton from "../components/buttons/CloseButton.tsx";

function ModalLayout({ children }: { children: ReactNode }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 opacity-100 backdrop-blur-sm transition-all duration-300 starting:opacity-0"
      onClick={closeModal}
    >
      <div
        className="bg-panel relative flex max-h-screen w-full max-w-xl scale-100 flex-col overflow-hidden overflow-y-visible rounded-lg opacity-100 shadow-lg transition-all duration-300 starting:scale-95 starting:opacity-0"
        onClick={(e) => e.stopPropagation()}
      >
        {children}

        <CloseButton onClick={closeModal} />
      </div>
    </div>
  );
}

export default ModalLayout;
