"use client";
import React, { useState } from "react";

export default function TopNav() {
  const [loggedin, setLoggedin] = useState(true);

  return (
    <nav className="flex w-full items-center justify-between border-b p-4 text-xl font-semibold">
      <div>Fragrance</div>
      {loggedin ? (
        <div className="just flex gap-10">profile</div>
      ) : (
        <p>sign up</p>
      )}
    </nav>
  );
}
