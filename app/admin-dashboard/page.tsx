"use client";

import { useState, useEffect, Fragment } from "react";
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
  X,
  Menu,
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
  SheetTrigger,
} from "@/components/ui/sheet";

/* ---------- Types ---------- */

type UIStatus = "new" | "contacted" | "scheduled" | "converted" | "lost";

interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string;
  treatment?: string;
  procedure?: string;
  message?: string;
  city?: string;
  age?: string;
  consent: boolean;
  source?: string;
  formName?: string;
  status: string;   // NOTE: comes from DB in UPPERCASE
  telecrmSynced: boolean;
  telecrmId?: string;
  hairLossStage?: string;
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

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/contact-form");
      const data = await res.json();
      setLeads(res.ok && data.success ? data.leads || [] : []);
    } catch {
      setLeads([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  useEffect(() => {
    if (!autoRefresh) return;
    const interval = setInterval(fetchLeads, refreshInterval);
    return () => clearInterval(interval);
  }, [autoRefresh, refreshInterval]);

  /* ---------- Sorting ---------- */

  const handleSort = (key: keyof Lead) => {
    setSortConfig((prev) => ({
      key,
      direction: prev?.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const sortedLeads = [...leads].sort((a, b) => {
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

  const filteredLeads = sortedLeads.filter((l) => {
    const uiStatus = dbToUIStatus(l.status);

    const matchesSearch =
      safe(l.name).includes(safe(searchTerm)) ||
      safe(l.phone).includes(safe(searchTerm)) ||
      safe(l.email).includes(safe(searchTerm)) ||
      safe(l.treatment).includes(safe(searchTerm)) ||
      safe(l.message).includes(safe(searchTerm)) ||
      safe(l.city).includes(safe(searchTerm)) ||
      safe(l.formName).includes(safe(searchTerm)) ||
      safe(l.hairLossStage).includes(safe(searchTerm));

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

  /* ---------- UI Helpers ---------- */

  const getStatusBadge = (status: UIStatus) => {
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
  };

  const getFormBadge = (name?: string) => {
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
      hairtreatment: {
        label: "Hair Treatment",
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
  };

  const getTelecrmBadge = (v: boolean) =>
    v ? (
      <Badge className="bg-green-100 text-green-800 border-green-200 text-xs">
        {isMobile ? "✓" : "Synced"}
      </Badge>
    ) : (
      <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200 text-xs">
        {isMobile ? "⏳" : "Pending"}
      </Badge>
    );

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
    } catch {
      /* no-op */
    }
  };

  const formatDate = (d: string) => {
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
  };

  const toggleLeadExpansion = (id: string) =>
    setExpandedLead((c) => (c === id ? null : id));

  /* ---------- CSV Export ---------- */

  const exportToCSV = () => {
    const headers = [
      "Name","Phone","Email","Treatment","Hair Loss Stage","Message",
      "City","Age","Status","Form Name","Source","TeleCRM Synced","Created At",
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
  };

  const handleCall = (p?: string) => p && window.open(`tel:${p}`, "_self");
  const handleEmail = (e?: string) =>
    e && window.open(`mailto:${e}`, "_self");

  const uniqueFormNames = Array.from(
    new Set(leads.map((l) => l.formName).filter(Boolean))
  );

  /* ---------- Mobile Filters Sheet ---------- */

  const MobileFiltersSheet = () => (
    <Sheet open={showMobileFilters} onOpenChange={setShowMobileFilters}>
      <SheetContent side="bottom" className="h-[85vh] rounded-t-2xl">
        <SheetHeader className="mb-6">
          <SheetTitle className="text-left">Filters</SheetTitle>
        </SheetHeader>
        
        <div className="space-y-6">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search leads..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Status Filter */}
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

          {/* Treatment Filter */}
          <div>
            <label className="text-sm font-medium mb-2 block">Treatment</label>
            <Select value={treatmentFilter} onValueChange={setTreatmentFilter}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Treatment" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Treatments</SelectItem>
                <SelectItem value="Baldness">Baldness</SelectItem>
                <SelectItem value="Hair thinning">Hair thinning</SelectItem>
                <SelectItem value="Receding hairline">Receding hairline</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Form Filter */}
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

          {/* Date Filter */}
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

          {/* Action Buttons */}
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
  );

  /* ---------- Mobile Lead Card ---------- */

  const MobileLeadCard = ({ lead }: { lead: Lead }) => {
    const uiStatus = dbToUIStatus(lead.status);
    const date = formatDate(lead.createdAt);
    const isExpanded = expandedLead === lead.id;

    return (
      <Card className="mb-3 overflow-hidden">
        <CardContent className="p-4">
          <div className="space-y-3">
            {/* Header Row */}
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

            {/* Details Row */}
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

            {/* Sync Status */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500">Sync Status</p>
                <div className="mt-1">{getTelecrmBadge(lead.telecrmSynced)}</div>
              </div>
              
              {/* Action Buttons */}
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
                >
                  <Mail className="h-4 w-4" />
                </Button>
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

            {/* Expandable Details */}
            {isExpanded && (
              <div className="pt-3 border-t mt-3 space-y-3">
                <div>
                  <h4 className="font-medium text-sm mb-2">Lead Details</h4>
                  <div className="space-y-1 text-sm">
                    <div>
                      <span className="text-gray-500">Source:</span>{" "}
                      <span>{lead.source || "-"}</span>
                    </div>
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
  };

  /* ---------- UI ---------- */

  return (
    <div className="min-h-screen bg-gray-50 p-3 sm:p-4 md:p-6">
      {/* Mobile Filters Sheet */}
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
                {/* Mobile Filter Button */}
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
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export CSV
                </Button>
              </div>
            </div>

            {/* Desktop Filters */}
            {!isMobile && (
              <div className="grid grid-cols-1 md:grid-cols-6 gap-3 p-4 bg-gray-50 rounded-lg border">
                <div className="md:col-span-2 relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                  <Input
                    placeholder="Search name, phone, email, stage..."
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
                    <SelectItem value="Baldness">Baldness</SelectItem>
                    <SelectItem value="Hair thinning">Hair thinning</SelectItem>
                    <SelectItem value="Receding hairline">Receding hairline</SelectItem>
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
          {/* Results Count */}
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

          {loading ? (
            <div className="py-12 text-center">
              <RefreshCw className="h-6 w-6 mr-2 inline animate-spin" />
              <span className="text-gray-600">Loading leads...</span>
            </div>
          ) : filteredLeads.length === 0 ? (
            <div className="py-12 text-center">
              <p className="text-gray-600">No leads found</p>
              <p className="text-sm text-gray-500 mt-2">
                Try adjusting your filters
              </p>
            </div>
          ) : isMobile ? (
            /* Mobile Card View */
            <div className="space-y-2">
              {filteredLeads.map((lead) => (
                <MobileLeadCard key={lead.id} lead={lead} />
              ))}
            </div>
          ) : (
            /* Desktop Table View */
            <div className="border rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th
                        className="px-4 py-3 cursor-pointer whitespace-nowrap text-left"
                        onClick={() => handleSort("name")}
                      >
                        <div className="flex items-center gap-1">
                          Name
                          {sortConfig?.key === "name" &&
                            (sortConfig.direction === "asc" ? (
                              <ChevronUp className="h-4 w-4" />
                            ) : (
                              <ChevronDown className="h-4 w-4" />
                            ))}
                        </div>
                      </th>
                      <th className="px-4 py-3 whitespace-nowrap text-left">Contact</th>
                      <th className="px-4 py-3 whitespace-nowrap text-left">Treatment</th>
                      <th className="px-4 py-3 whitespace-nowrap text-left">Form</th>
                      <th className="px-4 py-3 whitespace-nowrap text-left">Status</th>
                      <th className="px-4 py-3 whitespace-nowrap text-left">Sync</th>
                      <th
                        className="px-4 py-3 cursor-pointer whitespace-nowrap text-left"
                        onClick={() => handleSort("createdAt")}
                      >
                        <div className="flex items-center gap-1">
                          Date
                          {sortConfig?.key === "createdAt" &&
                            (sortConfig.direction === "asc" ? (
                              <ChevronUp className="h-4 w-4" />
                            ) : (
                              <ChevronDown className="h-4 w-4" />
                            ))}
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
                                  {["new", "contacted", "scheduled", "converted", "lost"].map(
                                    (s) => (
                                      <DropdownMenuItem
                                        key={s}
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          updateLeadStatus(
                                            lead.id,
                                            s as UIStatus
                                          );
                                        }}
                                      >
                                        Set as {s}
                                      </DropdownMenuItem>
                                    )
                                  )}
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
                                >
                                  <Mail className="h-3 w-3" />
                                </Button>
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

          {/* Mobile Pagination Info */}
          {isMobile && filteredLeads.length > 0 && (
            <div className="mt-4 pt-4 border-t">
              <p className="text-center text-sm text-gray-600">
                Showing {filteredLeads.length} leads
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}