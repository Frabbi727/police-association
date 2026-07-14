"use client";

import * as React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FileText, Download, Search, Info, HelpCircle, Loader2 } from "lucide-react";

interface DocumentItem {
  id: string;
  title: string;
  category: "Legal" | "Bargaining" | "Forms" | "Advisories";
  fileType: "PDF" | "DOCX";
  size: string;
}

export default function DocumentsPage() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [downloadingId, setDownloadingId] = React.useState<string | null>(null);

  const documents: DocumentItem[] = [
    { id: "DOC-01", title: "Collective Bargaining Agreement (CBA) 2025-2028", category: "Bargaining", fileType: "PDF", size: "3.2 MB" },
    { id: "DOC-02", title: "Legal Representation Request Form (Form MPA-20)", category: "Forms", fileType: "PDF", size: "420 KB" },
    { id: "DOC-03", title: "Welfare Assistance Fund Application Instructions", category: "Forms", fileType: "PDF", size: "1.1 MB" },
    { id: "DOC-04", title: "Legal Council Memo: Post-Incident Body Cam Reviews", category: "Legal", fileType: "PDF", size: "850 KB" },
    { id: "DOC-05", title: "Association Constitution & Bylaws (Revised 2024)", category: "Bargaining", fileType: "PDF", size: "2.4 MB" },
    { id: "DOC-06", title: "Voluntary Health Benefits Dental Co-Pay Plan Guide", category: "Advisories", fileType: "PDF", size: "1.8 MB" },
    { id: "DOC-07", title: "Officer Well-being Program Counseling Service Directory", category: "Advisories", fileType: "DOCX", size: "150 KB" },
  ];

  const filteredDocs = documents.filter((doc) =>
    doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDownload = async (id: string, title: string) => {
    setDownloadingId(id);
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setDownloadingId(null);
    alert(`File downloaded successfully: "${title}" (${id})`);
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight">Documents & Downloads</h1>
        <p className="text-xs text-muted-foreground mt-0.5">
          Access official bargaining agreements, bylaws, legal forms, benefit templates, and advisory memos.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Documents catalog table (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Search Card */}
          <Card className="border-border bg-card/40">
            <CardContent className="p-4">
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search by document title or category..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="rounded-xl pl-10 h-10 border-border bg-background focus-visible:ring-accent"
                />
              </div>
            </CardContent>
          </Card>

          {/* List of Documents */}
          <div className="space-y-4">
            {filteredDocs.length === 0 ? (
              <div className="text-center py-12 border border-dashed border-border rounded-2xl text-xs text-muted-foreground">
                No documents matching your search filters.
              </div>
            ) : (
              filteredDocs.map((doc) => {
                const isDownloading = downloadingId === doc.id;
                return (
                  <Card key={doc.id} className="border-border bg-card/60 hover:bg-card transition-colors text-left">
                    <CardContent className="p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      
                      <div className="flex gap-3.5 items-start">
                        <div className="p-3 bg-primary/10 border border-primary/20 text-primary rounded-xl shrink-0">
                          <FileText className="h-5 w-5 text-primary" />
                        </div>
                        <div className="space-y-1">
                          <h3 className="font-extrabold text-xs text-foreground leading-snug line-clamp-1">{doc.title}</h3>
                          <div className="flex gap-2 text-4xs text-muted-foreground font-bold uppercase tracking-wider">
                            <span className="text-accent">{doc.category}</span>
                            <span>•</span>
                            <span>Format: {doc.fileType}</span>
                            <span>•</span>
                            <span>Size: {doc.size}</span>
                          </div>
                        </div>
                      </div>

                      <Button
                        size="sm"
                        variant="outline"
                        className="rounded-xl text-3xs font-bold h-9 px-4 border-border flex items-center justify-center gap-1 hover:bg-muted self-start sm:self-center shrink-0"
                        disabled={isDownloading}
                        onClick={() => handleDownload(doc.id, doc.title)}
                      >
                        {isDownloading ? (
                          <>
                            <Loader2 className="h-3.5 w-3.5 animate-spin" />
                            <span>Downloading...</span>
                          </>
                        ) : (
                          <>
                            <Download className="h-3.5 w-3.5" />
                            <span>Download File</span>
                          </>
                        )}
                      </Button>

                    </CardContent>
                  </Card>
                );
              })
            )}
          </div>

        </div>

        {/* Right Side: Information guidelines (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          <Card className="border-border bg-card/40">
            <CardHeader className="pb-3 border-b border-border">
              <CardTitle className="text-sm font-bold flex items-center gap-1.5">
                <Info className="h-4.5 w-4.5 text-accent" />
                Legal Document Advisory
              </CardTitle>
            </CardHeader>
            <CardContent className="p-5 text-left space-y-4 text-3xs leading-relaxed">
              <p className="text-muted-foreground">
                All downloaded material is the intellectual property of the Metropolitan Police Association and is restricted under CJIS security guidelines. Sharing union documents with external organizations is prohibited.
              </p>
              <div className="p-3 bg-muted/40 border border-border/40 rounded-xl">
                <span className="font-bold text-foreground block mb-1">Need a custom contract form?</span>
                <span className="text-muted-foreground">
                  Contact the legal affairs division office directly through the Headquarters link.
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border bg-card/40">
            <CardHeader className="pb-3 border-b border-border">
              <CardTitle className="text-sm font-bold flex items-center gap-1.5">
                <HelpCircle className="h-4.5 w-4.5 text-primary" />
                Frequently Downloaded
              </CardTitle>
            </CardHeader>
            <CardContent className="p-5 text-left space-y-3">
              {[
                "Collective Bargaining Agreement (PDF)",
                "Welfare Fund Instructions (PDF)",
                "Legal Council Advisory Note (PDF)"
              ].map((faq, idx) => (
                <div key={idx} className="text-3xs font-semibold text-muted-foreground border-b border-border/40 pb-2 last:border-b-0 last:pb-0">
                  {idx + 1}. {faq}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

      </div>

    </div>
  );
}
