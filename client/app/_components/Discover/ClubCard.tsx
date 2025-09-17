import Link from "next/link";
import React from "react";

interface CardProps {
  title: string;
  subtitle?: string;
  description: string;
  link?: string;
  image?: string;
  type: "center" | "club";
}

export const CentreClubCard = ({
  title,
  subtitle,
  description,
  link,
  image,
  type,
}: CardProps) => {
  return (
    <Link
      href={
        "club/" +
        title
          .toLowerCase()
          .trim()
          .replace(/\s+/g, "-")
          .replace(/[^a-z0-9-]/g, "")
      }
      className="w-full"
    >
      <div className="bg-[#F9F9F9] rounded-lg overflow-hidden cursor-pointer transform transition duration-100 ease-in-out hover:scale-101">
        <div className="h-40 bg-gray-200 border border-gray-100">
          {image ? (
            <img
              src={image}
              alt={title}
              className="bg-white w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-white">
              {type === "center" ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="60"
                  height="60"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-gray-400"
                >
                  <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
                  <path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9" />
                  <path d="M12 3v6" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="60"
                  height="60"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-gray-400"
                >
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              )}
            </div>
          )}
        </div>

        <div className="p-4 rounded-b-lg border border-gray-300 border-t-0">
          <h3 className="text-lg font-bold mb-1">{title}</h3>
          {subtitle && (
            <p className="text-sm text-gray-500 mb-3 font-semibold">
              {subtitle}
            </p>
          )}

          <p className="text-sm text-gray-600 mb-4 line-clamp-3">
            {description}
          </p>

          {link && (
            <div className="flex items-center gap-1 text-sm text-[#154CB3]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 -mt-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10.172 13.828a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.102 1.101"
                />
              </svg>
              <span>{link}</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};
