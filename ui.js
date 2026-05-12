/* ═══════════════════════════════════════
   AgroSnapshot Sostenibilidad
   ui.js — DOM Rendering
   ═══════════════════════════════════════ */

var BOLD_LOGO = '<svg viewBox="0 0 842 232" height="##H##" style="display:block"><path fill="##C##" d="M435.8,164.2c-21.5,0-32.3-6.8-32.3-20.4v-70.3c0-3.9,2.4-5.9,7.2-5.9s7.3,2,7.3,5.9v70.3c0,5.9,5.7,8.9,17.1,8.9h68.1c3.6,0,5.4,2,5.4,6.1s-1.8,5.4-5.4,5.4h-67.3Z"/><path fill="##C##" d="M644.2,92c0-8.2-7.7-12.2-23.1-12.2h-71.6c-3.9,0-5.9-1.8-5.9-5.5s2-6,5.9-6h71.9c24.6,0,36.9,7.9,36.9,23.7v47c0,16.8-12.4,25.2-37.3,25.2h-72.8c-3.1,0-4.6-1.6-4.6-4.9v-43.4c0-4.4,2.4-6.5,7.2-6.5s7.3,2.2,7.3,6.5v36.8h62.7c15.6,0,23.4-4.6,23.4-13.7v-47Z"/><path fill="##C##" d="M713.4,143.7c-1,.5-2,.7-3.2.7s-1.9-.2-2.7-.6-1.6-.9-2.2-1.5c-.6-.6-1.1-1.3-1.5-2.1-.4-.8-.5-1.6-.5-2.4s.3-2,.9-3c.6-.9,1.7-1.7,3.1-2.3l35.2-16-35.6-16.3c-1.4-.6-2.4-1.4-3.1-2.4-.7-1.1-1-2.2-1-3.4,0-1.8.6-3.4,1.8-4.9,1.2-1.5,2.8-2.2,4.7-2.2.6,0,1.1.2,1.6.3.5.1,1.1.3,1.7.7l46.7,22.9c2.3,1.2,3.5,3,3.5,5.5s-1.2,4.5-3.6,5.4l-45.8,21.6Z"/><path fill="##C##" d="M192.8,96.1v-5.7c0-14.8-13.3-22.2-39.8-22.2H85.1c-4.1,0-6.1,1.9-6.1,5.8s2,5.7,6.1,5.7h71.7c14.4,0,21.5,3.3,21.5,9.9v9.3c0,7-7,10.4-21.1,10.4H85.5c-3.4,0-5.4,1.4-5.9,4.2-.4.8-.6,1.6-.6,2.5v42.5c0,3.1,2.5,5.6,5.6,5.6h1s0,0,0,0h68.6c25.8,0,38.6-8.2,38.6-24.5v-5.5c0-9.8-5-16.3-15-19.5,10-3.4,15-9.6,15-18.6ZM178.4,131v9.4c0,8.2-7.2,12.2-21.7,12.2H91.5v-31.6h65.7c14.1,0,21.2,3.3,21.2,9.9Z"/><path fill="##C##" d="M355,93.4c0-16.8-14.1-25.2-42.2-25.2h-26.7c-28.1,0-42.2,8.4-42.2,25.2v45.8c0,16.6,14.1,24.9,42.2,24.9h26.7c28.1,0,42.2-8.4,42.2-25.1V93.4ZM316.6,152.7H283c-16.5,0-24.7-4.6-24.7-13.8V94c0-9.5,8.2-14.2,24.7-14.2h34.5c15.5,0,23.2,4.7,23.2,14.2,0,0,0,44.7,0,45-.1,9.1-8.2,13.6-24.2,13.6Z"/></svg>';

function boldLogo(h, c) { return BOLD_LOGO.replace(/##H##/g, h||12).replace(/##C##/g, c||"#1F2937"); }

/* ── Header ── */
function renderHeader() {
  return '<div class="header">' +
    '<div class="header-left">' + boldLogo(20, '#06ffe1') +
      '<div class="header-sep"></div>' +
      '<div><div class="header-product">AgroSnapshot Sostenibilidad</div>' +
      '<div class="header-product-sub">Inteligencia agronómica para evaluación de sostenibilidad</div></div>' +
    '</div>' +
    '<span class="header-badge">BoldOS</span>' +
    '</div>';
}

/* ── Footer ── */
function renderFooter() {
  return '<div class="footer">' +
    '<div class="footer-brand"><span class="footer-label">Powered by</span>' + boldLogo(10, '#06ffe1') + '</div>' +
    '<div class="footer-text">Sensorización multitemporal + IA agronómica · Datos generados por BoldOS Daredevil & Thot</div>' +
    '</div>';
}

/* ── KPI Card ── */
function renderKpiCard(k, v) {
  var cfg = KPI[k];
  var s = semaphore(k, v);
  var disp = displayKpi(k, v);
  return '<div class="kpi-card '+s+'">' +
    '<div class="kpi-header"><span class="kpi-icon">'+cfg.icon+'</span><div class="kpi-dot '+s+'"></div></div>' +
    '<div class="kpi-label">'+cfg.label+'</div>' +
    '<div class="kpi-value '+s+'">'+disp+'</div>' +
    '<div class="kpi-desc">'+cfg.desc+'</div>' +
    '</div>';
}

/* ── Phase Bar ── */
function renderPhaseBar(current) {
  var html = '<div class="phase-bar">';
  for (var i = 0; i < PHASES.length; i++) {
    var p = PHASES[i];
    var st = p.n < current ? "done" : p.n === current ? "now" : "lock";
    html += '<div class="phase-item '+st+'">' +
      '<div class="phase-item-num">'+(st==="done"?"✓ ":"")+'Fase '+p.n+'</div>' +
      '<div class="phase-item-name">'+p.name+'</div>' +
      '<div class="phase-item-benefit">'+p.benefit+'</div>' +
      '</div>';
  }
  html += '</div>';
  return html;
}

/* ── Recommendations ── */
function renderRecos(kpis) {
  var weak = Object.keys(kpis).filter(function(k){return k!=="deforestation";})
    .map(function(k){return {key:k, n:normalize(k,kpis[k])};})
    .sort(function(a,b){return a.n-b.n;}).slice(0,3);

  var recs = [];
  weak.forEach(function(w) {
    (RECOS[w.key]||[]).forEach(function(r) {
      recs.push({t:r.t, d:r.d, i:r.i, kpi:w.key});
    });
  });

  var html = '<div class="reco-list">';
  recs.forEach(function(r) {
    html += '<div class="reco-item">' +
      '<span class="reco-icon">'+KPI[r.kpi].icon+'</span>' +
      '<div><div class="reco-title">'+r.t+'</div>' +
      '<div class="reco-desc">'+r.d+'</div>' +
      '<div class="reco-impact">↑ Score '+r.i+'</div></div></div>';
  });
  html += '</div>';
  return html;
}

/* ── Sidebar History ── */
function renderSidebar(client, selAid) {
  var list = client.assessments.slice().reverse();
  var activeId = selAid || list[0].id;
  var html = '<div class="sidebar-box">' +
    '<div class="sidebar-title">Historial</div>' +
    '<div class="sidebar-note">Evaluaciones generadas automáticamente por BoldOS vía API.</div>' +
    '<div class="hist-list">';

  list.forEach(function(a) {
    html += '<div class="hist-item'+(a.id===activeId?" active":"")+'" data-aid="'+a.id+'">' +
      '<div class="hist-dot" style="background:'+scoreColor(a.score)+'"></div>' +
      '<div class="hist-info"><div class="hist-date">'+formatDate(a.date)+'</div>' +
      '<div class="hist-phase">Fase '+a.phase+' · '+statusLabel(a.score)+'</div></div>' +
      '<div class="hist-score" style="color:'+scoreColor(a.score)+'">'+a.score+'</div>' +
      '</div>';
  });

  html += '</div></div>';
  return html;
}

/* ── LIST VIEW ── */
function renderListView(clients, search) {
  var filtered = clients.filter(function(c) {
    return c.name.toLowerCase().indexOf(search.toLowerCase()) >= 0 || c.cuit.indexOf(search) >= 0;
  });
  var sorted = filtered.slice().sort(function(a,b) {
    return b.assessments[b.assessments.length-1].score - a.assessments[a.assessments.length-1].score;
  });

  var totalHa = clients.reduce(function(s,c){return s+c.ha;},0);
  var avgScore = Math.round(clients.reduce(function(s,c){return s+c.assessments[c.assessments.length-1].score;},0)/clients.length);
  var eudrPct = Math.round(clients.filter(function(c){return c.assessments[c.assessments.length-1].kpis.deforestation>=90;}).length/clients.length*100);

  var html = '<div class="container">';

  // Header
  html += '<div class="list-header"><div>' +
    '<div class="list-title">Cartera de Clientes</div>' +
    '<div class="list-subtitle">Portfolio agro · Establecimientos monitoreados por BoldOS</div>' +
    '</div><button class="btn btn-primary" id="btn-new-eval">+ Nueva Evaluación</button></div>';

  // Search
  html += '<input type="text" class="search-input" placeholder="Buscar por nombre o CUIT..." value="'+search+'" id="search-input"/>';

  // Summary
  html += '<div class="summary-grid">' +
    '<div class="summary-card" style="background:rgba(6,255,225,.06);border:1px solid rgba(6,255,225,.18)"><div class="summary-label">Hectáreas Totales</div><div class="summary-value" style="color:#06ffe1">'+totalHa.toLocaleString()+'</div></div>' +
    '<div class="summary-card" style="background:rgba(255,181,71,.08);border:1px solid rgba(255,181,71,.2)"><div class="summary-label">Score Promedio</div><div class="summary-value" style="color:#ffb547">'+avgScore+'</div></div>' +
    '<div class="summary-card" style="background:rgba(34,211,154,.08);border:1px solid rgba(34,211,154,.2)"><div class="summary-label">EUDR Compliant</div><div class="summary-value" style="color:#22d39a">'+eudrPct+'%</div></div>' +
    '</div>';

  // Client rows
  html += '<div class="client-list">';
  sorted.forEach(function(c) {
    var last = c.assessments[c.assessments.length-1];
    var prev = c.assessments.length > 1 ? c.assessments[c.assessments.length-2].score : null;
    var d = prev !== null ? last.score - prev : null;

    html += '<div class="client-row" data-id="'+c.id+'">' +
      renderRing(last.score, 56) +
      '<div class="client-info">' +
      '<div class="client-name">'+c.name+'</div>' +
      '<div class="client-cuit">'+c.cuit+'</div>' +
      '<div class="client-meta">'+c.loc+' · '+c.ha.toLocaleString()+' ha · '+c.lots+' lotes</div>' +
      '</div>' +
      '<div class="client-right">' +
      '<div class="phase-dots">';
    for (var pi = 0; pi < 5; pi++) {
      html += '<div class="phase-dot '+(pi<c.phase?"done":pi===c.phase?"current":"lock")+'"></div>';
    }
    html += '<span class="phase-label">F'+c.phase+'</span></div>' +
      '<div class="client-status">'+statusLabel(last.score)+'</div>';
    if (d !== null) {
      html += '<div class="client-delta '+(d>0?"up":d<0?"down":"same")+'">'+(d>0?"↑":d<0?"↓":"=")+' '+Math.abs(d)+' pts</div>';
    }
    html += '</div><div class="client-arrow">›</div></div>';
  });
  html += '</div></div>';

  return html;
}

/* ── DETAIL VIEW ── */
function renderDetailView(client, selAid, tab) {
  var la = client.assessments[client.assessments.length-1];
  var ca = (selAid && client.assessments.find(function(a){return a.id===selAid;})) || la;
  tab = tab || "overview";

  var html = '<div class="container container-detail">';

  // Header
  html += '<div class="detail-header">' +
    '<button class="btn btn-secondary" id="btn-back">← Cartera</button>' +
    '<div class="detail-client"><div class="detail-name">'+client.name+'</div>' +
    '<div class="detail-meta">'+client.cuit+' · '+client.loc+' · '+client.ha.toLocaleString()+' ha</div></div>' +
    '<button class="btn btn-outline" id="btn-reeval">🔄 Evaluar Nuevamente</button>' +
    '<button class="btn btn-primary" id="btn-export">📄 Exportar Informe</button>' +
    '</div>';

  // Score + Phase
  html += '<div class="score-phase-grid">';
  html += '<div class="score-box">' + renderRing(ca.score, 120) +
    '<div class="score-label">Índice de Sostenibilidad</div>' +
    '<div class="score-sublabel"><span style="color:'+scoreColor(ca.score)+';font-weight:700">'+statusLabel(ca.score)+'</span> · Fase '+ca.phase+'</div>';
  if (ca.kpis.deforestation >= 90) html += '<div class="eudr-badge"><div class="eudr-dot"></div> EUDR Compliant</div>';
  html += '<div class="score-date">'+formatDate(ca.date)+'</div></div>';

  html += '<div class="phase-box"><div class="phase-title">Snapshot Sustainability — Hoja de ruta del cliente</div>' + renderPhaseBar(client.phase) + '</div>';
  html += '</div>';

  // Tabs
  html += '<div class="tabs">' +
    '<button class="tab-btn'+(tab==="overview"?" active":"")+'" data-tab="overview">Semáforo KPIs</button>' +
    '<button class="tab-btn'+(tab==="evolution"?" active":"")+'" data-tab="evolution">Evolución</button>' +
    '<button class="tab-btn'+(tab==="recommendations"?" active":"")+'" data-tab="recommendations">Plan de Acción</button>' +
    '</div>';

  // Content + Sidebar
  html += '<div class="content-grid"><div>';

  if (tab === "overview") {
    html += '<div class="kpi-grid">';
    Object.keys(KPI).forEach(function(k) { html += renderKpiCard(k, ca.kpis[k]); });
    html += '</div>';
    html += '<div class="panel"><div class="panel-title">Perfil Radar</div>' +
      '<div class="chart-container">' + renderRadar(ca.kpis) + '</div></div>';
  }

  if (tab === "evolution") {
    html += '<div class="panel"><div class="panel-title">Evolución del Score y KPIs</div>' +
      '<div class="evo-legend"><div class="evo-legend-item"><div class="evo-legend-dot" style="background:#06ffe1"></div>Score</div>' +
      '<div class="evo-legend-item"><div class="evo-legend-dot" style="background:#ffb547"></div>Carbono</div></div>' +
      '<div class="chart-container">' + renderLineChart(client.assessments) + '</div></div>';
    html += '<div class="panel"><div class="panel-title">Score por Evaluación</div>' +
      '<div class="chart-container">' + renderBarChart(client.assessments) + '</div></div>';
  }

  if (tab === "recommendations") {
    html += '<div class="panel"><div class="panel-title">Recomendaciones Priorizadas</div>' +
      '<div class="panel-desc">Acciones de mayor impacto según los KPIs más débiles — generadas por BoldOS Thot.</div>' +
      renderRecos(ca.kpis) + '</div>';
  }

  html += '</div>';

  // Sidebar
  html += '<div class="sidebar">' + renderSidebar(client, selAid || la.id) + '</div>';
  html += '</div></div>';

  return html;
}

/* ── EXPORT REPORT ── */
function exportReport(cl, a) {
  var rows = "";
  Object.keys(KPI).forEach(function(k) {
    var cfg = KPI[k], v = a.kpis[k], s = semaphore(k, v);
    var disp = displayKpi(k, v);
    var sl = semLabel(s);
    var bgC = s==="green"?"#F0FDF4":s==="orange"?"#FFFBEB":"#FEF2F2";
    var txC = s==="green"?"#16A34A":s==="orange"?"#D97706":"#DC2626";
    var bdC = s==="green"?"#BBF7D0":s==="orange"?"#FDE68A":"#FECACA";
    rows += '<tr><td style="padding:10px 14px;border-bottom:1px solid #E5E7EB">'+cfg.icon+' '+cfg.label+'</td><td style="padding:10px 14px;border-bottom:1px solid #E5E7EB;font-weight:700;font-family:monospace">'+disp+'</td><td style="padding:10px 14px;border-bottom:1px solid #E5E7EB"><span style="display:inline-block;padding:3px 10px;border-radius:12px;font-size:11px;font-weight:600;background:'+bgC+';color:'+txC+';border:1px solid '+bdC+'">'+sl+'</span></td></tr>';
  });

  var pRows = "";
  PHASES.forEach(function(p) {
    var st = p.n < cl.phase ? "✅ Completada" : p.n === cl.phase ? "🔵 Activa" : "⬜ Pendiente";
    pRows += '<tr><td style="padding:8px 14px;border-bottom:1px solid #E5E7EB">Fase '+p.n+': '+p.name+'</td><td style="padding:8px 14px;border-bottom:1px solid #E5E7EB">'+st+'</td><td style="padding:8px 14px;border-bottom:1px solid #E5E7EB">'+p.benefit+'</td></tr>';
  });

  var html = '<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8"><title>Informe Sostenibilidad — '+cl.name+'</title>' +
    '<style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:system-ui,sans-serif;color:#1F2937;padding:40px;max-width:800px;margin:0 auto}' +
    'h1{font-size:22px;color:#0a0e14;margin-bottom:4px;letter-spacing:-.3px}h2{font-size:16px;color:#0a0e14;margin:28px 0 12px;padding-bottom:8px;border-bottom:2px solid #06ffe1}' +
    '.meta{color:#6B7280;font-size:13px;margin-bottom:24px}.sb{text-align:center;padding:24px;background:linear-gradient(135deg,#e6fffd,#f5fdfc);border:1px solid #b8f0e7;border-radius:12px;margin:20px 0}' +
    '.sn{font-size:48px;font-weight:800;line-height:1}.sl{font-size:14px;color:#6B7280;margin-top:4px}' +
    'table{width:100%;border-collapse:collapse;margin:12px 0}th{text-align:left;padding:10px 14px;background:#F9FAFB;border-bottom:2px solid #E5E7EB;font-size:12px;text-transform:uppercase;letter-spacing:.5px;color:#6B7280}' +
    '.ft{margin-top:40px;padding-top:16px;border-top:1px solid #E5E7EB;text-align:center;color:#9CA3AF;font-size:11px}' +
    '.eu{display:inline-block;padding:6px 16px;border-radius:20px;background:#F0FDF4;color:#16A34A;font-weight:600;font-size:13px;border:1px solid #BBF7D0;margin-top:12px}' +
    '@media print{body{padding:20px}}</style></head><body>' +
    '<h1>Informe de Sostenibilidad Agro</h1><div class="meta">'+cl.name+' · CUIT '+cl.cuit+'<br>'+cl.loc+' · '+cl.ha.toLocaleString()+' ha · '+cl.lots+' lotes</div>' +
    '<div class="sb"><div class="sn" style="color:'+scoreColor(a.score)+'">'+a.score+'/100</div><div class="sl">Estadio: '+statusLabel(a.score)+' · Fase '+a.phase+' de 5</div>' +
    (a.kpis.deforestation>=90?'<div class="eu">✓ EUDR Compliant — Deforestación Cero</div>':'')+'</div>' +
    '<h2>Indicadores de Sostenibilidad</h2><table><thead><tr><th>Indicador</th><th>Valor</th><th>Estado</th></tr></thead><tbody>'+rows+'</tbody></table>' +
    '<h2>Fases Snapshot Sustainability</h2><table><thead><tr><th>Fase</th><th>Estado</th><th>Beneficio</th></tr></thead><tbody>'+pRows+'</tbody></table>' +
    '<div class="ft">Powered by BoldOS · Sensorización multitemporal + IA agronómica<br>'+new Date().toLocaleDateString("es-AR")+'</div></body></html>';

  var blob = new Blob([html], {type:"text/html"});
  var url = URL.createObjectURL(blob);
  var el = document.createElement("a");
  el.href = url; el.download = "informe-sostenibilidad-"+cl.cuit+".html";
  document.body.appendChild(el); el.click(); document.body.removeChild(el);
  URL.revokeObjectURL(url);
}
