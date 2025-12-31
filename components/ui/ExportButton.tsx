"use client";

import React, { useState } from "react";
import { Button } from "./button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./dialog";
import { DownloadCloud, FileSpreadsheet, FileText } from "lucide-react";

export interface ExportData {
  headers: string[];
  rows: (string | number)[][];
  filename?: string;
}

interface ExportButtonProps {
  data: ExportData;
  buttonText?: string;
  buttonVariant?: "default" | "outline" | "ghost" | "link" | "destructive" | "secondary";
  buttonSize?: "default" | "sm" | "lg" | "icon";
  className?: string;
}

function ExportButton({
  data,
  buttonText = "Exporter",
  buttonVariant = "outline",
  buttonSize = "sm",
  className = "",
}: ExportButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleExportCSV = () => {
    const csvContent = [
      data.headers.join(","),
      ...data.rows.map((row) => row.join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${data.filename || "export"}.csv`;
    link.click();
    URL.revokeObjectURL(link.href);
    setIsOpen(false);
  };

  const handleExportExcel = () => {
    // Create Excel-compatible XML format
    const excelContent = `<?xml version="1.0" encoding="UTF-8"?>
<?mso-application progid="Excel.Sheet"?>
<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet"
  xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet">
  <Worksheet ss:Name="Sheet1">
    <Table>
      <Row>
        ${data.headers.map((h) => `<Cell><Data ss:Type="String">${h}</Data></Cell>`).join("")}
      </Row>
      ${data.rows
        .map(
          (row) => `<Row>
        ${row
          .map((cell) => {
            const type = typeof cell === "number" ? "Number" : "String";
            return `<Cell><Data ss:Type="${type}">${cell}</Data></Cell>`;
          })
          .join("")}
      </Row>`
        )
        .join("")}
    </Table>
  </Worksheet>
</Workbook>`;

    const blob = new Blob([excelContent], { type: "application/vnd.ms-excel" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${data.filename || "export"}.xls`;
    link.click();
    URL.revokeObjectURL(link.href);
    setIsOpen(false);
  };

  return (
    <>
      <Button
        variant={buttonVariant}
        size={buttonSize}
        onClick={() => setIsOpen(true)}
        className={className}
      >
        <DownloadCloud className="mr-2 h-4 w-4" />
        {buttonText}
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-xs p-4">
          <DialogHeader className="pb-2">
            <DialogTitle className="text-base">Exporter</DialogTitle>
            <DialogDescription className="text-xs">
              Choisissez le format
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="flex-1 flex-col gap-1 h-16 hover:bg-gray-50 dark:hover:bg-gray-800"
              onClick={handleExportCSV}
            >
              <FileText className="h-5 w-5 text-green-600" />
              <span className="text-xs font-medium">CSV</span>
            </Button>

            <Button
              variant="outline"
              className="flex-1 flex-col gap-1 h-16 hover:bg-gray-50 dark:hover:bg-gray-800"
              onClick={handleExportExcel}
            >
              <FileSpreadsheet className="h-5 w-5 text-blue-600" />
              <span className="text-xs font-medium">Excel</span>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default ExportButton;
