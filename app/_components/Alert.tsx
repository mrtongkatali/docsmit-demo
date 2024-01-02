"use client";

interface AlertProps {
  message: string;
}

export default function Alert({ message }: AlertProps) {
  return (
    <div
      className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 mb-5 rounded relative"
      role="alert"
    >
      <strong className="font-bold pr-1">Error!</strong>
      <span className="block sm:inline">{message}</span>
    </div>
  );
}
