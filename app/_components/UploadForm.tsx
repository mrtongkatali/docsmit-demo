import { useDropzone } from "react-dropzone";
import { RootState } from "../_redux/store";
import { useAppDispatch, useAppSelector } from "../_utils/useTypedSelector";
import * as yup from "yup";
import { useFormik } from "formik";
import {
  CreateMessagePayload,
  testCreateMessages,
} from "../_redux/_features/messageSlice";

export default function UploadForm() {
  const dispatch = useAppDispatch();
  const { auth, message } = useAppSelector((state: RootState) => state);
  const { user } = auth.data;
  const { isFileLoading, loading } = message;

  const {
    acceptedFiles,
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    maxFiles: 1,
    maxSize: user.attachmentFilesMaxLimit,
    multiple: false,
    accept: {
      "application/pdf": [".pdf"],
      "application/msword": [".doc"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        [".docx"],
    },
    onDrop: (files) => {
      formik.setFieldValue("file", files[0]);
    },
    disabled: isFileLoading || loading
  });

  const validationSchema = yup.object().shape({
    title: yup.string().required("This is a required field"),
    address: yup.string().required("This is a required field"),
    file: yup.mixed().test("file", "File is required", (value) => {
      return !!value;
    }),
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      address: "",
      file: null,
    },
    validationSchema,
    onSubmit: (values: CreateMessagePayload) => {
      const payload = {
        // Assumed values
        rtnOrganization: "Studio Corsair",
        rtnAddress1: "1234 Main St.",
        rtnState: "NJ",
        rtnZip: "12345-1234",

        // Required
        ...values,
      };
      dispatch(testCreateMessages(payload));
    },
  });

  return (
    <>
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4 text-center text-black">
            Mail Form
          </h2>
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="title"
                className="block text-gray-700 font-bold mb-2"
              >
                Title <span className="error-message">*</span>
              </label>
              <input
                type="text"
                id="title"
                className="w-full px-3 py-2 border rounded placeholder-gray-400 focus:outline-none focus:border-blue-500"
                placeholder="Enter title"
                {...formik.getFieldProps("title")}
              />
              {formik.touched.title && Boolean(formik.errors.title) && (
                <p className="error-message">{formik.errors.title}</p>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="address"
                className="block text-gray-700 font-bold mb-2"
              >
                Mailing Address <span className="error-message">*</span>
              </label>
              <input
                type="text"
                id="address"
                className="w-full px-3 py-2 border rounded placeholder-gray-400 focus:outline-none focus:border-blue-500"
                placeholder="Enter mailing address"
                {...formik.getFieldProps("address")}
              />

              {formik.touched.address && Boolean(formik.errors.address) && (
                <p className="error-message">{formik.errors.address}</p>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="title"
                className="block text-gray-700 font-bold mb-2"
              >
                Document <span className="error-message">*</span>
              </label>
              <div className="border border-dashed border-gray-400 rounded-md p-4 text-center">
                <div
                  {...getRootProps({
                    className: `cursor-pointer ${
                      isDragActive
                        ? "bg-green-100 border-green-500"
                        : "bg-gray-100 border-gray-400"
                    } ${isDragAccept ? "bg-green-200" : ""} ${
                      isDragReject ? "bg-red-200" : ""
                    }`,
                  })}
                >
                  <input {...getInputProps()} />
                  <p className="text-gray-600">
                    Drag and drop some files here, or click to select files
                  </p>
                </div>
              </div>
              {formik.errors.file && formik.touched.file && (
                <p className="error-message">{formik.errors.file}</p>
              )}
              <div className="mt-2">
                {acceptedFiles && acceptedFiles.length > 0 && (
                  <>
                    <h3 className="text-black">
                      {acceptedFiles[0].name}{" "}
                      {
                        isFileLoading ? 
                        <span className="text-green-500">[Uploading...]</span>
                        :
                        <a className="ml-1 text-red-500 focus:outline-none small-link">
                          Remove
                        </a>
                      }
                    </h3>
                  </>
                )}
              </div>
            </div>
            <div className="flex items-center justify-center">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                disabled={isFileLoading || loading}
              >
                {isFileLoading || loading ? "Processing..." : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
