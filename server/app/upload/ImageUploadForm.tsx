"use client";

import { useState } from "react";

export default function UploadForm() {
  const [files, setFiles] = useState<FileList | null>(null);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!files) return;

    try {
      const data = new FormData();
      Array.from(files).forEach((file) => data.append("files", file));

      const res = await fetch("/api/upload", {
        method: "POST",
        body: data,
      });
      if (!res.ok) throw new Error(await res.text());
    } catch (e: any) {
      console.error(e);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        type="file"
        name="files"
        multiple
        onChange={(e) => setFiles(e.target.files)}
      />
      <input
        type="file"
        name="files"
        multiple
        onChange={(e) => setFiles(e.target.files)}
      />
      <button type="submit">Upload</button>
    </form>
  );
}
