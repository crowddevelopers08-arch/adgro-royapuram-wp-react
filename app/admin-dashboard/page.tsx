"use client";

import { useState, useEffect, Fragment, useCallback, useMemo } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Filter,
  Download,
  Phone,
  Mail,
  Calendar,
  RefreshCw,
  Users,
  ChevronDown,
  ChevronUp,
  MoreVertical,
  Eye,
  EyeOff,
  Globe,
  AlertCircle,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Alert, AlertDescription } from "@/components/ui/alert";

/* ---------- Types ---------- */

type UIStatus = "new" | "contacted" | "scheduled" | "converted" | "lost";

interface Lead {
  id: string;
  name: string;
  phone: string;
  email?: string | null;
  treatment?: string;
  procedure?: string;
  message?: string;
  city?: string;
  age?: string;
  pincode?: string;
  pageUrl?: string;
  consent: boolean;
  source?: string;
  formName?: string;
  status: string;
  telecrmSynced: boolean;
  telecrmId?: string;
  hairLossStage?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

interface LeadsTableProps {
  initialLeads?: Lead[];
  autoRefresh?: boolean;
  refreshInterval?: number;
}

/* ---------- Status Helpers ---------- */

const dbToUIStatus = (v?: string): UIStatus => {
  return (v?.toLowerCase() as UIStatus) ?? "new";
};

const uiToDbStatus = (v: UIStatus) => {
  return v.toUpperCase();
};

/* ---------- Component ---------- */

export default function LeadsTable({
  initialLeads = [],
  autoRefresh = false,
  refreshInterval = 30000,
}: LeadsTableProps) {

  const [leads, setLeads] = useState<Lead[]>(initialLeads);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [treatmentFilter, setTreatmentFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [formFilter, setFormFilter] = useState("all");
  const [expandedLead, setExpandedLead] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<any>(null);

  const [sortConfig, setSortConfig] = useState<{
    key: keyof Lead;
    direction: "asc" | "desc";
  } | null>(null);

  useEffect(() => {
    setIsClient(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  /* ---------- Fetch Leads ---------- */

  const fetchLeads = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      console.log("🔍 Fetching leads from /api/contact-form");
      const res = await fetch("/api/contact-form");
      
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      
      const data = await res.json();
      console.log("📊 API Response:", data);
      
      if (data.success && Array.isArray(data.leads)) {
        setLeads(data.leads);
        if (data.stats) {
          setStats(data.stats);
        }
        console.log(`✅ Loaded ${data.leads.length} leads`);
      } else {
        throw new Error(data.error || "Invalid data format");
      }
    } catch (err) {
      console.error("❌ Fetch error:", err);
      setError(err instanceof Error ? err.message : "Failed to fetch leads");
      setLeads([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  useEffect(() => {
    if (!autoRefresh) return;
    const interval = setInterval(fetchLeads, refreshInterval);
    return () => clearInterval(interval);
  }, [autoRefresh, refreshInterval, fetchLeads]);

  /* ---------- Sorting ---------- */

  const handleSort = (key: keyof Lead) => {
    setSortConfig((prev) => ({
      key,
      direction: prev?.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const sortedLeads = useMemo(() => {
    return [...leads].sort((a, b) => {
      if (!sortConfig) return 0;

      let aVal = a[sortConfig.key];
      let bVal = b[sortConfig.key];

      if (sortConfig.key === "createdAt" || sortConfig.key === "updatedAt") {
        aVal = new Date(aVal as string).getTime();
        bVal = new Date(bVal as string).getTime();
      } else {
        aVal = (aVal ?? "").toString().toLowerCase();
        bVal = (bVal ?? "").toString().toLowerCase();
      }

      if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [leads, sortConfig]);

  /* ---------- Filters ---------- */

  const safe = (v: unknown) => (v ? String(v).toLowerCase() : "");

  const isWithinDateRange = (date: string, range: string) => {
    const d = new Date(date);
    const now = new Date();
    if (range === "today") return d.toDateString() === now.toDateString();
    if (range === "week") {
      const w = new Date(now);
      w.setDate(now.getDate() - 7);
      return d >= w;
    }
    if (range === "month") {
      const m = new Date(now);
      m.setMonth(now.getMonth() - 1);
      return d >= m;
    }
    return true;
  };

  const filteredLeads = useMemo(() => {
    return sortedLeads.filter((l) => {
      const uiStatus = dbToUIStatus(l.status);

      const matchesSearch =
        safe(l.name).includes(safe(searchTerm)) ||
        safe(l.phone).includes(safe(searchTerm)) ||
        (l.email && safe(l.email).includes(safe(searchTerm))) ||
        safe(l.treatment).includes(safe(searchTerm)) ||
        safe(l.message).includes(safe(searchTerm)) ||
        safe(l.city).includes(safe(searchTerm)) ||
        safe(l.formName).includes(safe(searchTerm)) ||
        safe(l.hairLossStage).includes(safe(searchTerm)) ||
        safe(l.pincode).includes(safe(searchTerm)) ||
        (l.pageUrl && safe(l.pageUrl).includes(safe(searchTerm)));

      const matchesStatus =
        statusFilter === "all" || uiStatus === statusFilter;

      const matchesTreatment =
        treatmentFilter === "all" || l.treatment === treatmentFilter;

      const matchesDate =
        dateFilter === "all" || isWithinDateRange(l.createdAt, dateFilter);

      const matchesForm = formFilter === "all" || l.formName === formFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesTreatment &&
        matchesDate &&
        matchesForm
      );
    });
  }, [sortedLeads, searchTerm, statusFilter, treatmentFilter, dateFilter, formFilter]);

  /* ---------- UI Helpers ---------- */

  const getStatusBadge = useCallback((status: UIStatus) => {
    const map = {
      new: "bg-blue-100 text-blue-800 border-blue-200",
      contacted: "bg-yellow-100 text-yellow-800 border-yellow-200",
      scheduled: "bg-purple-100 text-purple-800 border-purple-200",
      converted: "bg-green-100 text-green-800 border-green-200",
      lost: "bg-red-100 text-red-800 border-red-200",
    } as const;

    return (
      <Badge variant="outline" className={`${map[status]} border text-xs md:text-sm`}>
        {isMobile ? status.charAt(0).toUpperCase() : status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  }, [isMobile]);

  const getFormBadge = useCallback((name?: string) => {
    if (!name)
      return (
        <Badge className="bg-gray-100 text-gray-700 border-gray-200 text-xs">
          {isMobile ? "?" : "Unknown"}
        </Badge>
      );

    const n = name.toLowerCase();
    const map: Record<string, { label: string; shortLabel: string; color: string }> = {
      "contact-form": {
        label: "Contact Form",
        shortLabel: "Contact",
        color: "bg-blue-100 text-blue-800 border-blue-200",
      },
      "common-form": {
        label: "Common Form",
        shortLabel: "Common",
        color: "bg-emerald-100 text-emerald-800 border-emerald-200",
      },
      "hair-consult-form": {
        label: "Hair Consultation",
        shortLabel: "Hair",
        color: "bg-purple-100 text-purple-800 border-purple-200",
      },
      "hair consultation form": {
        label: "Hair Consultation",
        shortLabel: "Hair",
        color: "bg-purple-100 text-purple-800 border-purple-200",
      },
      "skin and hair leads": {
        label: "Skin & Hair",
        shortLabel: "S&H",
        color: "bg-indigo-100 text-indigo-800 border-indigo-200",
      },
    };

    const cfg = map[n] || {
      label: name,
      shortLabel: name.length > 8 ? name.substring(0, 8) + "..." : name,
      color: "bg-gray-100 text-gray-800 border-gray-200",
    };

    return (
      <Badge variant="outline" className={`${cfg.color} border text-xs`}>
        {isMobile ? cfg.shortLabel : cfg.label}
      </Badge>
    );
  }, [isMobile]);

  const getTelecrmBadge = useCallback((v: boolean) =>
    v ? (
      <Badge className="bg-green-100 text-green-800 border-green-200 text-xs">
        {isMobile ? "✓" : "Synced"}
      </Badge>
    ) : (
      <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200 text-xs">
        {isMobile ? "⏳" : "Pending"}
      </Badge>
    ), [isMobile]);

  const updateLeadStatus = async (id: string, status: UIStatus) => {
    try {
      const res = await fetch(`/api/leads/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setLeads((prev) =>
          prev.map((l) =>
            l.id === id ? { ...l, status: uiToDbStatus(status) } : l
          )
        );
      }
    } catch (error) {
      console.error("Status update error:", error);
    }
  };

  const formatDate = useCallback((d: string) => {
    if (!isClient || !d) return { date: "", time: "" };
    const dt = new Date(d);
    
    if (isMobile) {
      return {
        date: dt.toLocaleDateString("en-IN", { day: "2-digit", month: "short" }),
        time: dt.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }),
      };
    }
    
    return {
      date: dt.toLocaleDateString("en-IN"),
      time: dt.toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
  }, [isClient, isMobile]);

  const toggleLeadExpansion = (id: string) =>
    setExpandedLead((c) => (c === id ? null : id));

  /* ---------- CSV Export ---------- */

  const exportToCSV = useCallback(() => {
    const headers = [
      "Name","Phone","Email","Treatment","Hair Loss Stage","Message",
      "City","Age","Pincode","Page URL","Status","Form Name","Source","TeleCRM Synced","Created At",
    ];

    const rows = filteredLeads.map((l) => [
      l.name ?? "",
      l.phone ?? "",
      l.email ?? "",
      l.treatment ?? "",
      l.hairLossStage ?? "",
      `"${(l.message ?? "").replace(/"/g, '""')}"`,
      l.city ?? "",
      l.age ?? "",
      l.pincode ?? "",
      l.pageUrl ?? "",
      dbToUIStatus(l.status),
      l.formName ?? "",
      l.source ?? "",
      l.telecrmSynced ? "Yes" : "No",
      isClient ? new Date(l.createdAt).toLocaleString("en-IN") : l.createdAt,
    ]);

    const csv = [headers, ...rows].map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `leads-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }, [filteredLeads, isClient]);

  const handleCall = (p?: string) => p && window.open(`tel:${p}`, "_self");
  const handleEmail = (e?: string | null) =>
    e && window.open(`mailto:${e}`, "_self");
  
  const handleOpenUrl = (url?: string) => {
    if (url) {
      window.open(url, "_blank");
    }
  };

  const uniqueFormNames = useMemo(() => 
    Array.from(new Set(leads.map((l) => l.formName).filter(Boolean))),
  [leads]);

  /* ---------- Mobile Filters Sheet ---------- */

  const MobileFiltersSheet = useCallback(() => (
    <Sheet open={showMobileFilters} onOpenChange={setShowMobileFilters}>
      <SheetContent side="bottom" className="h-[85vh] rounded-t-2xl">
        <SheetHeader className="mb-6">
          <SheetTitle className="text-left">Filters</SheetTitle>
        </SheetHeader>
        
        <div className="space-y-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search leads..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Status</label>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="contacted">Contacted</SelectItem>
                <SelectItem value="scheduled">Scheduled</SelectItem>
                <SelectItem value="converted">Converted</SelectItem>
                <SelectItem value="lost">Lost</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Treatment</label>
            <Select value={treatmentFilter} onValueChange={setTreatmentFilter}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Treatment" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Treatments</SelectItem>
                <SelectItem value="Hair Fall">Hair Fall</SelectItem>
                <SelectItem value="Dandruff">Dandruff</SelectItem>
                <SelectItem value="Thin Hair">Thin Hair</SelectItem>
                <SelectItem value="Bald Patches">Bald Patches</SelectItem>
                <SelectItem value="Receding Hairline">Receding Hairline</SelectItem>
                <SelectItem value="Alopecia">Alopecia</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Form</label>
            <Select value={formFilter} onValueChange={setFormFilter}>
              <SelectTrigger className="w-full">
                <Users className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Form" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Forms</SelectItem>
                {uniqueFormNames.map((f) => (
                  <SelectItem key={f} value={f!}>
                    {f}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Date</label>
            <Select value={dateFilter} onValueChange={setDateFilter}>
              <SelectTrigger className="w-full">
                <Calendar className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Date" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-3 pt-4 border-t">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => {
                setStatusFilter("all");
                setTreatmentFilter("all");
                setDateFilter("all");
                setFormFilter("all");
                setSearchTerm("");
              }}
            >
              Clear All
            </Button>
            <Button
              className="flex-1"
              onClick={() => setShowMobileFilters(false)}
            >
              Apply Filters
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  ), [showMobileFilters, searchTerm, statusFilter, treatmentFilter, formFilter, dateFilter, uniqueFormNames]);

  /* ---------- Mobile Lead Card ---------- */

  const MobileLeadCard = useCallback(({ lead }: { lead: Lead }) => {
    const uiStatus = dbToUIStatus(lead.status);
    const date = formatDate(lead.createdAt);
    const isExpanded = expandedLead === lead.id;

    return (
      <Card className="mb-3 overflow-hidden">
        <CardContent className="p-4">
          <div className="space-y-3">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="font-semibold text-base truncate">
                  {lead.name || "Unknown"}
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  {lead.phone || "-"}
                </p>
                {lead.email && (
                  <p className="text-xs text-gray-500 truncate mt-1">
                    {lead.email}
                  </p>
                )}
              </div>
              <div className="flex flex-col items-end gap-1">
                {getStatusBadge(uiStatus)}
                <span className="text-xs text-gray-500">
                  {date.date} {date.time}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <p className="text-xs text-gray-500">Treatment</p>
                <p className="text-sm font-medium truncate">
                  {lead.treatment || lead.procedure || "-"}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Form</p>
                <div className="mt-1">{getFormBadge(lead.formName)}</div>
              </div>
            </div>

            {lead.pincode && (
              <div>
                <p className="text-xs text-gray-500">Pincode</p>
                <p className="text-sm font-medium">{lead.pincode}</p>
              </div>
            )}

            {lead.pageUrl && (
              <div>
                <p className="text-xs text-gray-500">Page URL</p>
                <p className="text-sm font-medium truncate" title={lead.pageUrl}>
                  {lead.pageUrl.length > 30 
                    ? lead.pageUrl.substring(0, 30) + "..." 
                    : lead.pageUrl}
                </p>
              </div>
            )}

            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500">Sync Status</p>
                <div className="mt-1">{getTelecrmBadge(lead.telecrmSynced)}</div>
              </div>
              
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCall(lead.phone);
                  }}
                  disabled={!lead.phone}
                  className="h-8 w-8 p-0"
                  title="Call"
                >
                  <Phone className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEmail(lead.email);
                  }}
                  disabled={!lead.email}
                  className="h-8 w-8 p-0"
                  title="Email"
                >
                  <Mail className="h-4 w-4" />
                </Button>
                {lead.pageUrl && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenUrl(lead.pageUrl);
                    }}
                    className="h-8 w-8 p-0"
                    title="Open Page URL"
                  >
                    <Globe className="h-4 w-4" />
                  </Button>
                )}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-8 w-8 p-0"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleLeadExpansion(lead.id);
                      }}
                    >
                      {isExpanded ? (
                        <>
                          <EyeOff className="h-4 w-4 mr-2" />
                          Hide Details
                        </>
                      ) : (
                        <>
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </>
                      )}
                    </DropdownMenuItem>
                    {["new", "contacted", "scheduled", "converted", "lost"].map((s) => (
                      <DropdownMenuItem
                        key={s}
                        onClick={(e) => {
                          e.stopPropagation();
                          updateLeadStatus(lead.id, s as UIStatus);
                        }}
                      >
                        Set as {s}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {isExpanded && (
              <div className="pt-3 border-t mt-3 space-y-3">
                <div>
                  <h4 className="font-medium text-sm mb-2">Lead Details</h4>
                  <div className="space-y-1 text-sm">
                    <div>
                      <span className="text-gray-500">Source:</span>{" "}
                      <span>{lead.source || "-"}</span>
                    </div>
                    {lead.pincode && (
                      <div>
                        <span className="text-gray-500">Pincode:</span>{" "}
                        <span>{lead.pincode}</span>
                      </div>
                    )}
                    {lead.hairLossStage && (
                      <div>
                        <span className="text-gray-500">Hair Loss Stage:</span>{" "}
                        <span>{lead.hairLossStage}</span>
                      </div>
                    )}
                    {lead.pageUrl && (
                      <div>
                        <span className="text-gray-500">Page URL:</span>{" "}
                        <a 
                          href={lead.pageUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline truncate block"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {lead.pageUrl}
                        </a>
                      </div>
                    )}
                    {lead.telecrmId && (
                      <div>
                        <span className="text-gray-500">TeleCRM ID:</span>{" "}
                        <span>{lead.telecrmId}</span>
                      </div>
                    )}
                  </div>
                </div>

                {lead.message && (
                  <div>
                    <h4 className="font-medium text-sm mb-2">Message</h4>
                    <div className="p-3 border rounded bg-gray-50 text-sm">
                      {lead.message}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }, [expandedLead, formatDate, getStatusBadge, getFormBadge, getTelecrmBadge, updateLeadStatus, toggleLeadExpansion]);

  /* ---------- Stats Cards ---------- */

  const StatsCards = useCallback(() => {
    if (!stats) return null;

    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-gray-500">Total Leads</p>
            <p className="text-2xl font-bold">{stats.total || leads.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-gray-500">Today</p>
            <p className="text-2xl font-bold">{stats.today || 0}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-gray-500">This Week</p>
            <p className="text-2xl font-bold">{stats.week || 0}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-gray-500">This Month</p>
            <p className="text-2xl font-bold">{stats.month || 0}</p>
          </CardContent>
        </Card>
      </div>
    );
  }, [stats, leads.length]);

  /* ---------- Main Render ---------- */

  return (
    <div className="min-h-screen bg-gray-50 p-3 sm:p-4 md:p-6">
      <MobileFiltersSheet />

      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row justify-between gap-3">
              <div>
                <CardTitle className="text-xl sm:text-2xl font-bold">
                  Leads Management
                </CardTitle>
                <CardDescription className="text-sm sm:text-base">
                  Manage and track consultation requests
                </CardDescription>
              </div>

              <div className="flex flex-col sm:flex-row gap-2">
                {isMobile && (
                  <Button
                    variant="outline"
                    onClick={() => setShowMobileFilters(true)}
                    className="w-full sm:w-auto"
                  >
                    <Filter className="h-4 w-4 mr-2" />
                    Filters
                  </Button>
                )}

                <Button
                  variant="outline"
                  onClick={fetchLeads}
                  disabled={loading}
                  size="sm"
                  className="w-full sm:w-auto"
                >
                  <RefreshCw
                    className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`}
                  />
                  {loading ? "Refreshing..." : "Refresh"}
                </Button>

                <Button
                  onClick={exportToCSV}
                  size="sm"
                  className="w-full sm:w-auto"
                  disabled={filteredLeads.length === 0}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export CSV
                </Button>
              </div>
            </div>

            <StatsCards />

            {!isMobile && (
              <div className="grid grid-cols-1 md:grid-cols-6 gap-3 p-4 bg-gray-50 rounded-lg border">
                <div className="md:col-span-2 relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                  <Input
                    placeholder="Search name, phone, pincode, stage, url..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>

                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="contacted">Contacted</SelectItem>
                    <SelectItem value="scheduled">Scheduled</SelectItem>
                    <SelectItem value="converted">Converted</SelectItem>
                    <SelectItem value="lost">Lost</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={treatmentFilter} onValueChange={setTreatmentFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Treatment" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Treatments</SelectItem>
                    <SelectItem value="Hair Fall">Hair Fall</SelectItem>
                    <SelectItem value="Dandruff">Dandruff</SelectItem>
                    <SelectItem value="Thin Hair">Thin Hair</SelectItem>
                    <SelectItem value="Bald Patches">Bald Patches</SelectItem>
                    <SelectItem value="Receding Hairline">Receding Hairline</SelectItem>
                    <SelectItem value="Alopecia">Alopecia</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={formFilter} onValueChange={setFormFilter}>
                  <SelectTrigger>
                    <Users className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Form" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Forms</SelectItem>
                    {uniqueFormNames.map((f) => (
                      <SelectItem key={f} value={f!}>
                        {f}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={dateFilter} onValueChange={setDateFilter}>
                  <SelectTrigger>
                    <Calendar className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Date" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Time</SelectItem>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="week">This Week</SelectItem>
                    <SelectItem value="month">This Month</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
        </CardHeader>

        <CardContent>
          <div className="mb-4 flex justify-between items-center">
            <p className="text-sm text-gray-600">
              Showing {filteredLeads.length} of {leads.length} leads
            </p>
            {isMobile && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setStatusFilter("all");
                  setTreatmentFilter("all");
                  setDateFilter("all");
                  setFormFilter("all");
                  setSearchTerm("");
                }}
                className="text-xs"
              >
                Clear filters
              </Button>
            )}
          </div>

          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {loading ? (
            <div className="py-12 text-center">
              <RefreshCw className="h-6 w-6 mx-auto animate-spin text-gray-400" />
              <p className="mt-2 text-gray-600">Loading leads...</p>
            </div>
          ) : filteredLeads.length === 0 ? (
            <div className="py-12 text-center">
              <p className="text-gray-600">No leads found</p>
              <p className="text-sm text-gray-500 mt-2">
                {leads.length === 0 
                  ? "No leads in the database yet. Submit a form to create your first lead!" 
                  : "Try adjusting your filters"}
              </p>
            </div>
          ) : isMobile ? (
            <div className="space-y-2">
              {filteredLeads.map((lead) => (
                <MobileLeadCard key={lead.id} lead={lead} />
              ))}
            </div>
          ) : (
            <div className="border rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="px-4 py-3 cursor-pointer whitespace-nowrap text-left" onClick={() => handleSort("name")}>
                        <div className="flex items-center gap-1">
                          Name
                          {sortConfig?.key === "name" && (
                            sortConfig.direction === "asc" ? 
                              <ChevronUp className="h-4 w-4" /> : 
                              <ChevronDown className="h-4 w-4" />
                          )}
                        </div>
                      </th>
                      <th className="px-4 py-3 whitespace-nowrap text-left">Contact</th>
                      <th className="px-4 py-3 whitespace-nowrap text-left">Treatment</th>
                      <th className="px-4 py-3 whitespace-nowrap text-left">Form</th>
                      <th className="px-4 py-3 whitespace-nowrap text-left">Status</th>
                      <th className="px-4 py-3 whitespace-nowrap text-left">Sync</th>
                      <th className="px-4 py-3 cursor-pointer whitespace-nowrap text-left" onClick={() => handleSort("createdAt")}>
                        <div className="flex items-center gap-1">
                          Date
                          {sortConfig?.key === "createdAt" && (
                            sortConfig.direction === "asc" ? 
                              <ChevronUp className="h-4 w-4" /> : 
                              <ChevronDown className="h-4 w-4" />
                          )}
                        </div>
                      </th>
                      <th className="px-4 py-3 whitespace-nowrap text-left">Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredLeads.map((lead) => {
                      const uiStatus = dbToUIStatus(lead.status);
                      const d = formatDate(lead.createdAt);

                      return (
                        <Fragment key={lead.id}>
                          <tr
                            className="border-b hover:bg-gray-50 cursor-pointer"
                            onClick={() => toggleLeadExpansion(lead.id)}
                          >
                            <td className="px-4 py-3 font-medium whitespace-nowrap">
                              {lead.name || "Unknown"}
                            </td>
                            <td className="px-4 py-3">
                              <div className="flex flex-col gap-1">
                                <span className="whitespace-nowrap">
                                  {lead.phone || "-"}
                                </span>
                                {lead.email && (
                                  <span className="text-xs text-gray-600 truncate max-w-[150px]">
                                    {lead.email}
                                  </span>
                                )}
                                {lead.pincode && (
                                  <span className="text-xs text-gray-500">
                                    Pin: {lead.pincode}
                                  </span>
                                )}
                              </div>
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap">
                              {lead.treatment || lead.procedure || "-"}
                            </td>
                            <td className="px-4 py-3">
                              {getFormBadge(lead.formName)}
                            </td>
                            <td className="px-4 py-3">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <div className="cursor-pointer">
                                    {getStatusBadge(uiStatus)}
                                  </div>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                  {["new", "contacted", "scheduled", "converted", "lost"].map((s) => (
                                    <DropdownMenuItem
                                      key={s}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        updateLeadStatus(lead.id, s as UIStatus);
                                      }}
                                    >
                                      Set as {s}
                                    </DropdownMenuItem>
                                  ))}
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </td>
                            <td className="px-4 py-3">
                              {getTelecrmBadge(lead.telecrmSynced)}
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap">
                              {d.date}
                              <br />
                              <span className="text-xs text-gray-500">
                                {d.time}
                              </span>
                            </td>
                            <td className="px-4 py-3">
                              <div className="flex gap-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleCall(lead.phone);
                                  }}
                                  disabled={!lead.phone}
                                  title="Call"
                                >
                                  <Phone className="h-3 w-3" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleEmail(lead.email);
                                  }}
                                  disabled={!lead.email}
                                  title="Email"
                                >
                                  <Mail className="h-3 w-3" />
                                </Button>
                                {lead.pageUrl && (
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleOpenUrl(lead.pageUrl);
                                    }}
                                    title="Open Page URL"
                                  >
                                    <Globe className="h-3 w-3" />
                                  </Button>
                                )}
                              </div>
                            </td>
                          </tr>

                          {expandedLead === lead.id && (
                            <tr className="bg-gray-50">
                              <td colSpan={8} className="p-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div>
                                    <h4 className="font-medium mb-2">
                                      Lead Details
                                    </h4>
                                    <div className="space-y-1 text-sm">
                                      <div>
                                        <b>Source:</b> {lead.source || "-"}
                                      </div>
                                      {lead.pincode && (
                                        <div>
                                          <b>Pincode:</b> {lead.pincode}
                                        </div>
                                      )}
                                      {lead.hairLossStage && (
                                        <div>
                                          <b>Hair Loss Stage:</b> {lead.hairLossStage}
                                        </div>
                                      )}
                                      {lead.pageUrl && (
                                        <div>
                                          <b>Page URL:</b>{" "}
                                          <a 
                                            href={lead.pageUrl} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="text-blue-600 hover:underline break-all"
                                            onClick={(e) => e.stopPropagation()}
                                          >
                                            {lead.pageUrl}
                                          </a>
                                        </div>
                                      )}
                                      {lead.telecrmId && (
                                        <div>
                                          <b>TeleCRM ID:</b> {lead.telecrmId}
                                        </div>
                                      )}
                                    </div>
                                  </div>

                                  {lead.message && (
                                    <div>
                                      <h4 className="font-medium mb-2">
                                        Message
                                      </h4>
                                      <div className="p-3 border rounded bg-white max-h-40 overflow-y-auto">
                                        {lead.message}
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </td>
                            </tr>
                          )}
                        </Fragment>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}