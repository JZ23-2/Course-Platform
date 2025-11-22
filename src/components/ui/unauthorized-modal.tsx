import React from "react";

export function UnauthorizedModal() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="p-6 rounded-xl border shadow-md max-w-md text-center">
        <h1 className="text-2xl font-semibold mb-2">Subscription Required</h1>
        <p className="text-muted-foreground mb-4">
          You must have an active subscription to access this course.
        </p>
        <a
          href="/pricing"
          className="
    px-4 py-2 
    rounded-lg 
    bg-primary text-white 
    dark:bg-white dark:text-black
  "
        >
          View Plans
        </a>
      </div>
    </div>
  );
}
