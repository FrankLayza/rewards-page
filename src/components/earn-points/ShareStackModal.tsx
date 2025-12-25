import { memo } from "react";
import { X, Layers } from "lucide-react";

interface ShareStackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function ShareStackModal({ isOpen, onClose }: ShareStackModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-sm w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X size={20} className="text-gray-500" />
        </button>

        <div className="flex flex-col items-center text-center">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            Share Your Stack
          </h2>

          <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
            <Layers className="w-8 h-8 text-purple-600" />
          </div>

          <p className="text-gray-600 text-sm mb-6">
            You have no stack created yet, go to Tech Stack to create one.
          </p>
        </div>
      </div>
    </div>
  );
}

export default memo(ShareStackModal);
