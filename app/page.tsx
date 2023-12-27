"use client";

import { useAppDispatch } from "./_utils/useTypedSelector";
import { useAppSelector } from "./_utils/useTypedSelector";
import { getToken, deleteToken } from "./_redux/_features/authSlice";
import { RootState } from "./_redux/store";
import UploadForm from "./_components/UploadForm";

export default function Index() {
  const dispatch = useAppDispatch();
  const authState = useAppSelector((state: RootState) => state.auth);
  const { user } = authState.data;

  const authenticateUser = async () => {
    dispatch(getToken());
  };

  const clearToken = () => {
    dispatch(deleteToken());
  };

  return (
    <>
      <div className="container mx-auto max-w-full sm:px-4 md:px-10 mt-8 text-center">
        <h1 className="text-3xl font-bold mb-4">Docsmit Integration Demo</h1>
        {!user.token ? (
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded-full text-sm"
            onClick={authenticateUser}
            disabled={authState.loading}
          >
            {!authState.loading
              ? "Get the token to begin"
              : "Authenticating..."}
          </button>
        ) : (
          <>
            <h3 className="mb-5">
              Howdy, {user.name}!
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded text-sm ml-2"
                onClick={clearToken}
              >
                Logout
              </button>
            </h3>
          </>
        )}
      </div>
      {user.token && <UploadForm />}
    </>
  );
}
