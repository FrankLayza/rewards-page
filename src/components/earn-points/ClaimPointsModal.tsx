import { memo, useState } from "react";
import { X, Upload } from "lucide-react";

interface ClaimPointsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (email: string, file: File) => Promise<void>;
}

function ClaimPointsModal({
  isOpen,
  onClose,
  onSubmit,
}: ClaimPointsModalProps) {
  const [email, setEmail] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async () => {
    if (!email || !file) {
      alert("Please fill in all fields");
      return;
    }
    setIsSubmitting(true);
    try {
      await onSubmit(email, file);
      setEmail("");
      setFile(null);
      onClose();
    } catch (error) {
      console.error("Error submitting claim:", error);
      alert("Failed to submit claim. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setEmail("");
    setFile(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full p-5 relative">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-1 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X size={20} className="text-gray-500" />
        </button>

        <div className="mt-1">
          <h2 className="text-xl font-bold text-gray-900 mb-3">
            Claim Your 50 Points
          </h2>

          <div className="mb-4">
            <p className="text-sm text-gray-700 mb-3">
              Sign up for Reclaim (free, no payment needed), then fill the form
              below:
            </p>
            <ol className="list-decimal list-inside space-y-1 text-sm text-gray-700">
              <li>Enter your Reclaim sign-up email.</li>
              <li>
                Upload a screenshot of your Reclaim profile showing your email.
              </li>
            </ol>
            <p className="text-sm text-gray-700 mt-3">
              After verification, you'll get 50 Flowva Points! 🎉😊
            </p>
          </div>

          <div className="space-y-3">
            <div>
              <label
                htmlFor="claim-email"
                className="block text-xs font-medium text-gray-700 mb-1.5"
              >
                Email used on Reclaim
              </label>
              <input
                id="claim-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="user@example.com"
                className="w-full border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            <div>
              <label
                htmlFor="claim-screenshot"
                className="block text-xs font-medium text-gray-700 mb-1.5"
              >
                Upload screenshot (mandatory)
              </label>
              <label
                htmlFor="claim-screenshot"
                className="flex flex-row items-center justify-center w-full h-12 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors px-4"
              >
                <Upload className="w-5 h-5 mr-2 text-gray-400" />
                <p className="text-xs text-gray-500">
                  {file ? file.name : "Choose file"}
                </p>
                <input
                  id="claim-screenshot"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const selectedFile = e.target.files?.[0];
                    if (selectedFile) {
                      setFile(selectedFile);
                    }
                  }}
                />
              </label>
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-4">
            <button
              onClick={handleClose}
              className="px-4 py-1.5 text-sm text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="px-4 py-1.5 text-sm text-white bg-purple-600 rounded-md hover:bg-purple-700 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Submitting..." : "Submit Claim"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(ClaimPointsModal);
