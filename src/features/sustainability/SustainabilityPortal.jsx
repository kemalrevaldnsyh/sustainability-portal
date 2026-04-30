"use client";
import { useState } from "react";
import "./SustainabilityPortal.css";
import { DATA, NOTIFS, OUS } from "./data";
import { Background, Navbar, NotifPanel } from "./layout";
import { DocListPage, OUDetailPage, OUPage, OverviewPage, SustainabilityPage } from "./pages";

export default function SustainabilityPortal({ onLogout }) {
  const [page, setPage] = useState("overview");
  const [ouName, setOuName] = useState("");
  const [docConfig, setDocConfig] = useState({ title: "", data: null, backPage: "" });
  const [notifOpen, setNotifOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [viewMode, setViewMode] = useState("list");
  const nav = (p) => { setPage(p); setSearch(""); window.scrollTo(0, 0); };
  const openDoc = (title, dataKey, backPage) => { setDocConfig({ title, data: DATA[dataKey], dataKey, backPage }); nav("doclist"); };
  const openOU = (name) => { setOuName(name); nav("ou-detail"); };
  return (
    <div className="sp-root" onClick={() => setNotifOpen(false)}>
      <Background />
      <Navbar onHome={() => nav("overview")} notifOpen={notifOpen} setNotifOpen={setNotifOpen} onLogout={onLogout} />
      <NotifPanel open={notifOpen} notifications={NOTIFS} />

      {page === "overview" && <OverviewPage nav={nav} openDoc={openDoc} />}
      {page === "sustainability" && <SustainabilityPage nav={nav} openDoc={openDoc} />}
      {page === "ou" && <OUPage nav={nav} openOU={openOU} ous={OUS} />}
      {page === "ou-detail" && <OUDetailPage name={ouName} nav={nav} openDoc={openDoc} />}
      {page === "doclist" && (
        <DocListPage
          config={docConfig}
          nav={nav}
          search={search}
          setSearch={setSearch}
          viewMode={viewMode}
          setViewMode={setViewMode}
        />
      )}
    </div>
  );
}
