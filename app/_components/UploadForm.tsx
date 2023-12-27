import { useDropzone } from "react-dropzone";

export default function UploadForm() {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

  return (
    <>
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4 text-center text-black">
            Mail Form
          </h2>
          <form>
            <div className="mb-4">
              <label
                htmlFor="username"
                className="block text-gray-700 font-bold mb-2"
              >
                Title <span className="error-message">*</span>
              </label>
              <input
                type="text"
                id="title"
                name="title"
                className="w-full px-3 py-2 border rounded placeholder-gray-400 focus:outline-none focus:border-blue-500"
                placeholder="Enter title"
              />
              <p className="error-message">Please enter a valid title</p>
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 font-bold mb-2"
              >
                Mailing Address <span className="error-message">*</span>
              </label>
              <input
                type="address"
                id="address"
                name="address"
                className="w-full px-3 py-2 border rounded placeholder-gray-400 focus:outline-none focus:border-blue-500"
                placeholder="Enter mailing address"
              />
              <p className="error-message">
                Please enter a valid mailing address
              </p>
            </div>
            <div className="flex items-center justify-center">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
