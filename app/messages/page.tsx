"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../_utils/useTypedSelector";
import { getSentMessages } from "../_redux/_features/messageSlice";
import { RootState } from "../_redux/store";

export default function Index() {
  const dispatch = useAppDispatch();
  const messageState = useAppSelector((state: RootState) => state.message);
  const { messages } = messageState.data;

  useEffect(() => {
    const getSentMessageList = async () => {
      dispatch(getSentMessages());
    };

    getSentMessageList();
  }, []);

  return (
    <>
      <div className="container mx-auto max-w-full sm:px-4 md:px-10 mt-8 text-center">
        <h1 className="text-3xl font-bold mb-4">Messages</h1>
      </div>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              ID
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Title
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Email
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Sent
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {messageState.isFetchingMessages && (
            <td
              colSpan={4}
              className="px-6 py-4 whitespace-nowrap text-gray-500"
            >
              <h3>Loading...</h3>
            </td>
          )}
          {!messageState.isFetchingMessages &&
            messages.map((message: any, index: number) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                  {message.messageID}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                  {message.title}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                  {message.from}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                  {message.accepted}
                </td>
              </tr>
            ))}

          {!messageState.isFetchingMessages && messages.length === 0 && (
            <td
              colSpan={4}
              className="px-6 py-4 whitespace-nowrap text-gray-500"
            >
              <h3>No results found</h3>
            </td>
          )}
        </tbody>
      </table>
    </>
  );
}
