"use client";

import { useEffect } from "react";
import { fetchWithResponse } from "./_utils/restClient";
import { useAppDispatch } from "./_utils/useTypedSelector";
import { useAppSelector } from "./_utils/useTypedSelector";
import { getToken } from "./_redux/_features/auth-slice";

export default function Index() {
  const dispatch = useAppDispatch();
  const authReducer = useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getToken());
  });

  return (
    <div className="container mx-auto max-w-full sm:px-4 md:px-10 mt-8">
      <h1 className="text-3xl font-bold mb-4">Docsmit Integration Demo</h1>

      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded-full text-sm">
        {!authReducer.loading ? "Get Test Token" : "Loading"}
      </button>
    </div>
  );
}
