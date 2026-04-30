export const DATA = {
  "policy-data": {
    cols: ["Title", "Code", "Type", "Version", "Effective Date", "Action"],
    rows: [
      ["Palm Oil Sourcing Policy", "—", "Policy", "1", "May 3, 2024", "Download"],
      ["Code of Conduct", "—", "Policy", "1", "Aug 1, 2025", "Download"],
    ],
  },
  "procedure-data": {
    cols: ["Title", "Code", "Type", "Version", "Effective Date", "Action"],
    rows: [
      ["Emergency Response Procedure", "ERP-001", "Procedure", "2", "Jan 15, 2024", "Download"],
      ["Waste Management Procedure", "WMP-002", "Procedure", "1", "Mar 1, 2024", "Download"],
      ["Water Usage Monitoring Procedure", "WUM-003", "Procedure", "1", "Jun 10, 2024", "Download"],
    ],
  },
  "sustreport-data": {
    cols: ["Title", "Period", "Scope", "Version", "Published Date", "Action"],
    rows: [
      ["Sustainability Report 2023", "Jan–Dec 2023", "Group Consolidated", "1", "Apr 30, 2024", "Download"],
      ["Sustainability Report 2022", "Jan–Dec 2022", "Group Consolidated", "1", "May 12, 2023", "Download"],
    ],
  },
  "regulation-data": {
    cols: ["Title", "Code", "Jurisdiction", "Version", "Effective Date", "Action"],
    rows: [
      ["Environmental Protection Act", "UU No. 32/2009", "Indonesia", "—", "Oct 3, 2009", "View"],
      ["Greenhouse Gas Reporting Regulation", "PP No. 71/2011", "Indonesia", "—", "Sep 30, 2011", "View"],
      ["EU Deforestation Regulation (EUDR)", "EUDR 2023/1115", "European Union", "—", "Jun 29, 2023", "View"],
    ],
  },
  "standards-data": {
    cols: ["Title", "Code", "Body", "Version", "Effective Date", "Action"],
    rows: [
      ["Quality Management System", "ISO 9001:2015", "ISO", "2015", "Sep 15, 2015", "View"],
      ["Environmental Management System", "ISO 14001:2015", "ISO", "2015", "Sep 15, 2015", "View"],
      ["RSPO Principles & Criteria", "RSPO P&C 2018", "RSPO", "2018", "Nov 1, 2018", "View"],
      ["ISCC System Document", "ISCC 201", "ISCC", "3.3", "Nov 1, 2022", "View"],
    ],
  },
  "grievance-data": {
    cols: ["Title", "Reference No.", "Category", "Status", "Submitted Date", "Action"],
    rows: [
      ["Land Rights Complaint — Site A", "GRV-2024-001", "Land & Community", "Resolved", "Feb 14, 2024", "View"],
      ["Worker Welfare Report", "GRV-2024-002", "Labour", "In Review", "Apr 3, 2024", "View"],
      ["Supplier Environmental Breach", "GRV-2025-001", "Environment", "Open", "Jan 22, 2025", "View"],
    ],
  },
  "certificate-data": {
    cols: ["Name", "Issuer", "Certificate No.", "Issued", "Expires", "Action"],
    rows: [
      ["ISCC EU", "SBC Asia Sertifikasi", "#EU-ISCC-Cert-ID230-20250026", "Jun 21, 2025", "Jun 20, 2026", "View"],
      ["Halal Certificate", "Badan Penyelenggara Jaminan Produk Halal", "#ID00410000402570622", "Sep 8, 2022", "Sep 8, 2026", "View"],
      ["Kosher Certificate", "Rabbi Mordechai Abergel", "—", "Sep 11, 2025", "Sep 11, 2026", "View"],
      ["Good Manufacturing Practices", "Badan POM Republik Indonesia", "#PW-S.04.09.1.54.533.09.21-0011", "Sep 13, 2021", "Sep 12, 2026", "View"],
      ["ISO 9001:2015", "Bureau Veritas", "#BV-ISO-9001-2024", "Mar 5, 2024", "Mar 4, 2027", "View"],
      ["ISO 14001:2015", "Bureau Veritas", "#BV-ISO-14001-2024", "Mar 5, 2024", "Mar 4, 2027", "View"],
      ["RSPO Supply Chain", "Control Union Certifications", "#CUC-RSPO-SC-2024-0341", "Jan 15, 2024", "Jan 14, 2027", "View"],
      ["ISCC PLUS", "SBC Asia Sertifikasi", "#PLUS-ISCC-2025-GR-0018", "Apr 10, 2025", "Apr 9, 2026", "View"],
    ],
  },
  "license-data": {
    cols: ["Name", "License No.", "Issued By", "Issued", "Expires", "Action"],
    rows: [
      ["Business License (NIB)", "1234567890123", "OSS – BKPM Indonesia", "Jan 10, 2020", "—", "View"],
      ["Environmental Permit (AMDAL)", "AMDAL-GR-2021-04", "Kementerian LHK", "Apr 20, 2021", "Apr 19, 2026", "View"],
      ["Palm Oil Processing License", "IUI-CPO-2022-001", "Kementerian Perindustrian", "Mar 1, 2022", "Feb 28, 2027", "View"],
    ],
  },
  "update-data": {
    cols: ["Title", "Description", "Updated By", "Date", "Action"],
    rows: [
      ["ISCC EU Certificate Renewed", "Annual renewal completed for Green Resources Pte. Ltd", "Admin", "Jun 21, 2025", "View"],
      ["Code of Conduct v1 Published", "New Code of Conduct effective August 2025", "Admin", "Aug 1, 2025", "View"],
      ["ISO 14001 Certificate Uploaded", "Uploaded to Green Resources operational unit", "Admin", "Mar 5, 2024", "View"],
    ],
  },
};

export const OUS = [
  { name: "PT Cisadane Raya Chemical", label: "PT CRC", color: "#2a6a2a" },
  { name: "PT. Energi Unggul Persada", label: "EUP", color: "#22aa22" },
  { name: "PT. Energi Unggul Persada II", label: "EUP II", color: "#22aa22" },
  { name: "AASTAR", label: "AAST★R", color: "#c8a000" },
  { name: "Green Resources Pte. Ltd", label: "Green Resources", color: "#22aa22" },
  { name: "TPG Agro", label: "TPG Agro", color: "#009999" },
  { name: "TPG Palm", label: "TPG Palm", color: "#009999" },
  { name: "EUP Medan", label: "EUP Medan", color: "#22aa22" },
  { name: "EUP Riau", label: "EUP Riau", color: "#22aa22" },
  { name: "EUP Kalimantan", label: "EUP Kalimantan", color: "#22aa22" },
  { name: "TPG Sulawesi", label: "TPG Sulawesi", color: "#009999" },
  { name: "TPG Sumatra", label: "TPG Sumatra", color: "#009999" },
  { name: "EUP Jambi", label: "EUP Jambi", color: "#22aa22" },
  { name: "EUP Bengkulu", label: "EUP Bengkulu", color: "#22aa22" },
  { name: "EUP Lampung", label: "EUP Lampung", color: "#22aa22" },
  { name: "TPG Borneo", label: "TPG Borneo", color: "#009999" },
  { name: "TPG Java", label: "TPG Java", color: "#009999" },
  { name: "EUP Aceh", label: "EUP Aceh", color: "#22aa22" },
  { name: "EUP Papua", label: "EUP Papua", color: "#22aa22" },
  { name: "EUP NTB", label: "EUP NTB", color: "#22aa22" },
];

export const NOTIFS = [
  { title: "Certificate Expiry", body: "ISCC EU expires Jun 20, 2026" },
  { title: "New Policy", body: "Code of Conduct updated Aug 2025" },
  { title: "Report Ready", body: "Sustainability Report Q2 2025 uploaded" },
];
