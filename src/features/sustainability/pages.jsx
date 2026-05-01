import { useEffect, useMemo, useState } from "react";
import { Icon } from "./icons";
import { Card, PageHeader } from "./layout";

const COLUMN_FIELD_MAP = {
  Title: ["title"],
  Name: ["title"],
  Code: ["code"],
  Type: ["type"],
  Version: ["version"],
  "Effective Date": ["effective_date"],
  Action: ["action"],
  Period: ["period"],
  Scope: ["scope"],
  "Published Date": ["updated_at", "effective_date"],
  Jurisdiction: ["jurisdiction"],
  Body: ["body"],
  "Reference No.": ["reference_no"],
  Category: ["type"],
  Status: ["status"],
  "Submitted Date": ["submitted_date"],
  Issuer: ["issuer"],
  "Certificate No.": ["certificate_no"],
  Issued: ["issued"],
  Expires: ["expires"],
  "License No.": ["license_no"],
  "Issued By": ["issued_by"],
  Description: ["description"],
  "Updated By": ["updated_by"],
  Date: ["updated_at"],
};

function formatValue(value) {
  if (value === null || value === undefined || value === "") return "—";
  if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}/.test(value)) {
    const date = new Date(value);
    if (!Number.isNaN(date.getTime())) {
      return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
    }
  }
  return String(value);
}

function mapDocumentToRow(doc, cols) {
  return cols.map((col) => {
    const candidates = COLUMN_FIELD_MAP[col] || [];
    for (const field of candidates) {
      if (doc[field] !== null && doc[field] !== undefined && doc[field] !== "") {
        return formatValue(doc[field]);
      }
    }
    return "—";
  });
}

const overviewCards = [
  {
    title: "Sustainability",
    desc: "Access certifications, licenses, policies, and compliance documentation.",
    page: "sustainability",
    icon: <Icon.Globe />,
  },
  {
    title: "Operational Unit",
    desc: "View certifications, licenses, and documents for each operational unit.",
    page: "ou",
    icon: <Icon.Building />,
  },
  {
    title: "Updates",
    desc: "Stay informed on the latest changes, uploads, and compliance activities.",
    dataKey: "update-data",
    icon: <Icon.Upload />,
  },
];

const sustainCards = [
  { title: "Policy", dataKey: "policy-data", icon: <Icon.PolicyDoc /> },
  { title: "Procedure", dataKey: "procedure-data", icon: <Icon.Procedure /> },
  { title: "Sustainability Report", dataKey: "sustreport-data", icon: <Icon.Report /> },
  { title: "Regulation", dataKey: "regulation-data", icon: <Icon.Regulation /> },
  { title: "Standards", dataKey: "standards-data", icon: <Icon.Standards /> },
  { title: "Grievance", dataKey: "grievance-data", icon: <Icon.Grievance /> },
];

const ouDetailCards = [
  { title: "Certificate", dataKey: "certificate-data", icon: <Icon.Certificate /> },
  { title: "Procedure", dataKey: "procedure-data", icon: <Icon.Procedure /> },
  { title: "License", dataKey: "license-data", icon: <Icon.License /> },
];

function SubCardGrid({ items, onCardClick }) {
  return (
    <div className="sp-subcard-grid">
      {items.map((c) => (
        <Card key={`${c.title}-${c.dataKey}`} onClick={() => onCardClick(c)} className="sp-subcard">
          <div className="sp-card-icon sp-card-icon-dark">{c.icon}</div>
          <div>
            <h3 className="sp-subcard-title">{c.title}</h3>
            <p className="sp-subcard-desc">Access certifications, policies, and compliance documentation.</p>
          </div>
        </Card>
      ))}
    </div>
  );
}

function StatusBadge({ value }) {
  const classes = {
    Resolved: "sp-status-resolved",
    "In Review": "sp-status-review",
    Open: "sp-status-open",
  };
  const className = classes[value];
  if (!className) return <span className="sp-status-fallback">{value}</span>;
  return <span className={`sp-status-badge ${className}`}>{value}</span>;
}

function TableRow({ row, cols, isLast }) {
  return (
    <tr className="sp-table-row">
      {row.map((cell, ci) => {
        const isFirst = ci === 0;
        const isLastCell = ci === row.length - 1;
        const isDash = cell === "—";
        const isStatus = cols[ci] === "Status";
        const tdClass = [isLast ? "no-border" : "", isDash ? "is-dash" : "", isFirst ? "is-first" : "is-regular"].join(" ");
        return (
          <td key={`${ci}-${cell}`} className={`sp-table-cell ${tdClass}`}>
            {isLastCell ? <button className="sp-table-action">{cell}</button> : isStatus ? <StatusBadge value={cell} /> : cell}
          </td>
        );
      })}
    </tr>
  );
}

function GridItem({ row, cols }) {
  return (
    <button className="sp-grid-item">
      <div className="sp-grid-icon">
        <Icon.File />
      </div>
      <p className="sp-grid-title">{row[0]}</p>
      <p className="sp-grid-meta">{row[cols.length - 2] || ""}</p>
    </button>
  );
}

export function OverviewPage({ nav, openDoc }) {
  return (
    <div className="sp-overview">
      <div className="sp-overview-header">
        <p className="sp-overview-kicker">Welcome to</p>
        <h1 className="sp-overview-title">SLMS Sustainability Portal</h1>
        <p className="sp-overview-subtitle">Transparency &amp; accountability in every step of our sustainability journey</p>
      </div>
      <div className="sp-overview-grid">
        {overviewCards.map((c) => (
          <Card key={c.title} onClick={() => (c.page ? nav(c.page) : openDoc("Updates", "update-data", "overview"))} className="sp-overview-card">
            <div className="sp-card-icon">{c.icon}</div>
            <div className="sp-overview-card-body">
              <h2 className="sp-overview-card-title">{c.title}</h2>
              <p className="sp-overview-card-desc">{c.desc}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

export function SustainabilityPage({ nav, openDoc }) {
  return (
    <div className="sp-page">
      <PageHeader title="Sustainability" onBack={() => nav("overview")} />
      <SubCardGrid items={sustainCards} onCardClick={(c) => openDoc(`${c.title}s`, c.dataKey, "sustainability")} />
    </div>
  );
}

export function OUPage({ nav, openOU, ous }) {
  return (
    <div className="sp-page">
      <PageHeader title="Operational Unit" onBack={() => nav("overview")} />
      <div className="sp-ou-grid">
        {ous.map((ou) => (
          <button key={ou.name} onClick={() => openOU(ou.name)} className="sp-ou-btn">
            <span className="sp-ou-label" style={{ color: ou.color }}>
              {ou.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

export function OUDetailPage({ name, nav, openDoc }) {
  return (
    <div className="sp-page">
      <PageHeader title={name} onBack={() => nav("ou")} leftAligned />
      <SubCardGrid items={ouDetailCards} onCardClick={(c) => openDoc(`${c.title}s`, c.dataKey, "ou-detail")} />
    </div>
  );
}

export function DocListPage({ config, nav, search, setSearch, viewMode, setViewMode }) {
  const { title, data, dataKey, backPage } = config;
  if (!data) return null;

  const [remoteRows, setRemoteRows] = useState(null);
  const [loading, setLoading] = useState(false);
  const [remoteError, setRemoteError] = useState("");

  useEffect(() => {
    let isMounted = true;
    const fetchDocuments = async () => {
      if (!dataKey) {
        if (isMounted) setRemoteRows(null);
        return;
      }

      setLoading(true);
      setRemoteError("");
      try {
        const response = await fetch(`/api/documents?category=${encodeURIComponent(dataKey)}`);
        if (!response.ok) {
          throw new Error("Failed to fetch documents");
        }
        const payload = await response.json();
        const rows = (payload.data || []).map((doc) => mapDocumentToRow(doc, data.cols));
        if (isMounted) setRemoteRows(rows);
      } catch (err) {
        if (isMounted) setRemoteError(err.message || "Failed to load remote data");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchDocuments();
    return () => {
      isMounted = false;
    };
  }, [dataKey, data.cols]);

  const dbOnlyMode = import.meta.env.PROD || import.meta.env.VITE_DB_ONLY === "true";

  const effectiveRows = useMemo(() => {
    if (remoteRows && remoteRows.length > 0) return remoteRows;
    if (dbOnlyMode) return [];
    return data.rows;
  }, [remoteRows, data.rows, dbOnlyMode]);

  const filtered = effectiveRows.filter((row) => row.join(" ").toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="sp-page">
      <div className="sp-doc-header">
        <button onClick={() => nav(backPage)} className="sp-back-btn" aria-label="Go back">
          <Icon.ArrowLeft />
        </button>
        <h1 className="sp-doc-title">{title}</h1>
      </div>
      <div className="sp-doc-wrap">
        <div className="sp-doc-card">
          <div className="sp-toolbar">
            <div className="sp-search-box">
              <Icon.Search />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search..."
                className="sp-search-input"
                aria-label="Search documents"
              />
            </div>
            <div className="sp-view-toggle">
              {[{ mode: "list", C: Icon.List }, { mode: "grid", C: Icon.Grid }].map(({ mode, C }) => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode)}
                  className={`sp-view-btn ${viewMode === mode ? "is-active" : ""}`}
                  aria-label={`Switch to ${mode} view`}
                >
                  <C />
                </button>
              ))}
            </div>
          </div>
          <p className="sp-item-count">
            Showing {filtered.length} item{filtered.length !== 1 ? "s" : ""}
          </p>
          {loading && <p className="sp-item-count">Syncing from database...</p>}
          {remoteError && (
            <p className="sp-item-count">
              {dbOnlyMode ? "Database unavailable. Please check server/API setup." : "Using local fallback data."}
            </p>
          )}

          {viewMode === "list" && (
            <div className="sp-table-scroll">
              <table className="sp-table">
                <thead>
                  <tr>
                    {data.cols.map((col, i) => (
                      <th key={`${col}-${i}`}>{col}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((row, ri) => (
                    <TableRow key={`row-${ri}`} row={row} cols={data.cols} isLast={ri === filtered.length - 1} />
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {viewMode === "grid" && (
            <div className="sp-doc-grid">
              {filtered.map((row, i) => (
                <GridItem key={`grid-${i}`} row={row} cols={data.cols} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
