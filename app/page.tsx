"use client";

import { useAppDispatch } from "./_utils/useTypedSelector";
import { useAppSelector } from "./_utils/useTypedSelector";
import { getToken } from "./_redux/_features/auth-slice";
import { RootState } from "./_redux/store";


const LoggedUser = () => {
  return (
    <h3>Howdy, User</h3>
  )
}

export default function Index() {
  const dispatch = useAppDispatch();
  const authState = useAppSelector((state: RootState) => state.auth);

  const authenticate = async () => {
    dispatch(getToken());
  };

  return (
    <div className="container mx-auto max-w-full sm:px-4 md:px-10 mt-8">
      <h1 className="text-3xl font-bold mb-4">Docsmit Integration Demo</h1>

      {
        authState.data.user?.token ?
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded-full text-sm"
          onClick={authenticate}
          disabled={authState.loading}
        >
          {!authState.loading ? "Get Test Token" : "Loading"}
        </button>
        : 
        <LoggedUser />
      }
    </div>
  );
}
