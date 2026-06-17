import { Suspense } from "react";
import AddEditBlogClient from "./AddEditBlogClient";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AddEditBlogClient />
    </Suspense>
  );
}