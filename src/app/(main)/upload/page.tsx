"use client"

import * as React from "react"
import { FileText, Trash2 } from "lucide-react"
import { toast } from "sonner"

import { FileDropzone } from "@/components/file-dropzone"
import { Button } from "@/components/ui/button"

export default function UploadPage() {
  const [files, setFiles] = React.useState<File[]>([])

  const handleFilesAdded = (addedFiles: File[]) => {
    const pdfFiles = addedFiles.filter(
      (file) => file.type === "application/pdf"
    )

    if (pdfFiles.length !== addedFiles.length) {
      toast.error("Only PDF files are accepted.")
    }

    // Prevent duplicate files
    const newFiles = pdfFiles.filter(
      (newFile) => !files.some((existingFile) => existingFile.name === newFile.name)
    );

    setFiles((prevFiles) => [...prevFiles, ...newFiles])
  }

  const removeFile = (fileToRemove: File) => {
    setFiles((prevFiles) =>
      prevFiles.filter((file) => file !== fileToRemove)
    )
  }

  const handleProcess = () => {
    if (files.length === 0) {
      toast.warning("Please select at least one file to process.")
      return
    }
    // NOTE: This is where the call to the MCP server will be made.
    // For now, it just shows a success message.
    console.log("Processing files:", files)
    toast.success(
      `Starting to process ${files.length} statement(s).`
    )
  }

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-bold">Upload Statements</h1>
        <p className="text-muted-foreground">
          Upload your PDF bank statements to get started.
        </p>
      </div>

      <FileDropzone
        onFilesAdded={handleFilesAdded}
        accept="application/pdf"
      />

      {files.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Selected Files</h2>
          <ul className="space-y-2">
            {files.map((file, index) => (
              <li
                key={index}
                className="flex items-center justify-between rounded-md border bg-muted/50 p-3"
              >
                <div className="flex items-center gap-3 overflow-hidden">
                  <FileText className="h-5 w-5 flex-shrink-0 text-muted-foreground" />
                  <span className="truncate text-sm font-medium" title={file.name}>{file.name}</span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeFile(file)}
                >
                  <Trash2 className="h-5 w-5 text-destructive" />
                  <span className="sr-only">Remove file</span>
                </Button>
              </li>
            ))}
          </ul>
          <div className="flex justify-end">
            <Button onClick={handleProcess} disabled={files.length === 0}>
              Process {files.length} Statement(s)
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}