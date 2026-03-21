/* ═══════════════════════════════════════
   AgroSnapshot Sostenibilidad
   app.js — State, Routing & Events
   ═══════════════════════════════════════ */

var STATE = {
  clients: [],
  selId: null,
  selAid: null,
  search: "",
  view: "list",  // list | detail
  tab: "overview" // overview | evolution | recommendations
};

var ROOT;

/* ── Render ── */
function render() {
  var html = renderHeader();

  if (STATE.view === "list") {
    html += renderListView(STATE.clients, STATE.search);
  } else if (STATE.view === "detail") {
    var cl = STATE.clients.find(function(c){return c.id===STATE.selId;});
    if (cl) {
      html += renderDetailView(cl, STATE.selAid, STATE.tab);
    }
  }

  html += renderFooter();
  ROOT.innerHTML = html;
  bindEvents();
}

/* ── Event binding ── */
function bindEvents() {
  // Search
  var searchEl = document.getElementById("search-input");
  if (searchEl) {
    searchEl.addEventListener("input", function(e) {
      STATE.search = e.target.value;
      render();
      // Refocus
      var el = document.getElementById("search-input");
      if (el) { el.focus(); el.setSelectionRange(el.value.length, el.value.length); }
    });
  }

  // New eval button
  var btnNew = document.getElementById("btn-new-eval");
  if (btnNew) btnNew.addEventListener("click", function() { showNewModal(); });

  // Client rows
  document.querySelectorAll(".client-row[data-id]").forEach(function(row) {
    row.addEventListener("click", function() {
      STATE.selId = this.getAttribute("data-id");
      STATE.selAid = null;
      STATE.tab = "overview";
      STATE.view = "detail";
      render();
      window.scrollTo(0,0);
    });
  });

  // Back button
  var btnBack = document.getElementById("btn-back");
  if (btnBack) btnBack.addEventListener("click", function() {
    STATE.view = "list"; STATE.selId = null;
    render();
  });

  // Tabs
  document.querySelectorAll(".tab-btn[data-tab]").forEach(function(btn) {
    btn.addEventListener("click", function() {
      STATE.tab = this.getAttribute("data-tab");
      render();
    });
  });

  // History items
  document.querySelectorAll(".hist-item[data-aid]").forEach(function(item) {
    item.addEventListener("click", function() {
      STATE.selAid = this.getAttribute("data-aid");
      render();
    });
  });

  // Re-eval
  var btnReeval = document.getElementById("btn-reeval");
  if (btnReeval) btnReeval.addEventListener("click", function() { showReevalModal(); });

  // Export
  var btnExport = document.getElementById("btn-export");
  if (btnExport) btnExport.addEventListener("click", function() {
    var cl = STATE.clients.find(function(c){return c.id===STATE.selId;});
    if (!cl) return;
    var la = cl.assessments[cl.assessments.length-1];
    var ca = (STATE.selAid && cl.assessments.find(function(a){return a.id===STATE.selAid;})) || la;
    exportReport(cl, ca);
  });
}

/* ═══════════════════════════════════════
   MODALS
   ═══════════════════════════════════════ */

function removeModal() {
  var m = document.getElementById("modal-overlay");
  if (m) m.remove();
}

/* ── Processing animation ── */
function runProcessing(container, steps, onDone) {
  var i = 0;
  var logEl = container.querySelector(".api-log");
  var fillEl = container.querySelector(".progress-fill");
  var pctEl = container.querySelector(".progress-pct");

  var interval = setInterval(function() {
    if (i < steps.length) {
      var pct = Math.round(((i+1) / steps.length) * 100);
      fillEl.style.width = pct + "%";
      pctEl.textContent = pct + "%";
      var step = document.createElement("div");
      step.className = "api-step";
      step.innerHTML = '<div class="api-dot" style="background:#004481"></div><div class="api-text" style="color:#004481;font-weight:600">'+steps[i]+'</div>';
      // Mark previous as done
      var prev = logEl.querySelectorAll(".api-step");
      if (prev.length > 0) {
        var last = prev[prev.length-1];
        last.querySelector(".api-dot").style.background = "#16A34A";
        last.querySelector(".api-text").style.color = "#6B7280";
        last.querySelector(".api-text").style.fontWeight = "400";
      }
      logEl.appendChild(step);
      logEl.scrollTop = logEl.scrollHeight;
      i++;
    } else {
      clearInterval(interval);
      onDone();
    }
  }, 550);
}

/* ── NEW EVALUATION MODAL ── */
function showNewModal() {
  var overlay = document.createElement("div");
  overlay.id = "modal-overlay";
  overlay.className = "overlay";

  var modal = document.createElement("div");
  modal.className = "modal";
  modal.onclick = function(e){e.stopPropagation();};
  overlay.onclick = function(){removeModal();};
  overlay.appendChild(modal);
  document.body.appendChild(overlay);

  var step = 1;
  var form = {name:"",cuit:"",loc:"",ha:"",lots:""};
  var fileName = "";

  function renderStep() {
    var html = '<div class="modal-head"><div>' +
      '<div class="modal-title">Nueva Evaluación de Sostenibilidad</div>' +
      '<div class="modal-subtitle">'+(step===1?"Datos del establecimiento":step===2?"Carga de polígonos":step===3?"Procesando con BoldOS":"Evaluación completa")+'</div>' +
      '</div><div class="modal-steps">';
    for (var s=1;s<=4;s++) html += '<div class="modal-step" style="width:'+(s===step?'24':'8')+'px;background:'+(s<=step?'#004481':'#E5E7EB')+'"></div>';
    html += '</div></div><div class="modal-body">';

    if (step === 1) {
      html += '<div class="form-group"><label class="form-label">Razón Social</label><input class="form-input" id="f-name" placeholder="Ej: Estancia Los Alamos S.A." value="'+form.name+'"></div>' +
        '<div class="form-row"><div class="form-group"><label class="form-label">CUIT</label><input class="form-input" id="f-cuit" placeholder="30-12345678-9" value="'+form.cuit+'"></div>' +
        '<div class="form-group"><label class="form-label">Localidad / Provincia</label><input class="form-input" id="f-loc" placeholder="Pergamino, Buenos Aires" value="'+form.loc+'"></div></div>' +
        '<div class="form-row"><div class="form-group"><label class="form-label">Superficie Total (ha)</label><input class="form-input" id="f-ha" type="number" placeholder="2500" value="'+form.ha+'"></div>' +
        '<div class="form-group"><label class="form-label">Cantidad de Lotes</label><input class="form-input" id="f-lots" type="number" placeholder="8" value="'+form.lots+'"></div></div>' +
        '<div style="display:flex;justify-content:flex-end;gap:10px;margin-top:24px"><button class="btn btn-secondary" id="m-cancel">Cancelar</button><button class="btn btn-primary" id="m-next1">Continuar →</button></div>';
    }

    if (step === 2) {
      html += '<div class="upload-zone'+(fileName?" has-file":"")+'" id="upload-zone">';
      if (!fileName) {
        html += '<div style="font-size:36px;margin-bottom:12px">📍</div>' +
          '<div class="upload-zone-title">Subí el archivo con los polígonos</div>' +
          '<div class="upload-zone-desc">Arrastrá o hacé click para seleccionar</div>' +
          '<div><span class="upload-ext">.KMZ</span><span class="upload-ext">.KML</span><span class="upload-ext">.GeoJSON</span><span class="upload-ext">.SHP</span></div>';
      } else {
        html += '<div style="display:flex;align-items:center;gap:12px;justify-content:center">' +
          '<div style="width:40px;height:40px;border-radius:10px;background:#004481;display:flex;align-items:center;justify-content:center;font-size:18px;color:#fff">📍</div>' +
          '<div style="text-align:left"><div style="font-size:13px;font-weight:700;color:#1F2937">'+fileName+'</div>' +
          '<div style="font-size:11px;color:#16A34A;font-weight:600">✓ Archivo listo</div></div></div>';
      }
      html += '</div><input type="file" id="file-input" accept=".kmz,.kml,.zip,.geojson,.shp" style="display:none">';
      html += '<div class="upload-hint"><span style="font-size:16px">💡</span><div class="upload-hint-text">El archivo debe contener los polígonos de los lotes. BoldOS procesará las señales multitemporales para generar los indicadores automáticamente.</div></div>';
      html += '<div style="display:flex;justify-content:space-between;gap:10px;margin-top:24px"><button class="btn btn-secondary" id="m-prev2">← Volver</button><button class="btn btn-primary'+(fileName?"":" btn-disabled")+'" id="m-next2">Procesar con BoldOS →</button></div>';
    }

    if (step === 3) {
      html += '<div style="text-align:center;margin-bottom:16px"><div class="processing-badge">' + boldLogo(12,"#06ffe1") + '<span class="processing-label">Procesando...</span></div>' +
        '<div class="progress-bar"><div class="progress-fill" style="width:0"></div></div><div class="progress-pct">0%</div></div>' +
        '<div class="api-log"></div>';
    }

    if (step === 4) {
      // Will be filled by processing completion
    }

    html += '</div>';
    modal.innerHTML = html;
    bindModalEvents();
  }

  function bindModalEvents() {
    var cancel = document.getElementById("m-cancel");
    if (cancel) cancel.onclick = removeModal;

    var next1 = document.getElementById("m-next1");
    if (next1) next1.onclick = function() {
      form.name = document.getElementById("f-name").value;
      form.cuit = document.getElementById("f-cuit").value;
      form.loc = document.getElementById("f-loc").value;
      form.ha = document.getElementById("f-ha").value;
      form.lots = document.getElementById("f-lots").value;
      if (form.name && form.cuit && form.loc && form.ha && form.lots) { step=2; renderStep(); }
    };

    var zone = document.getElementById("upload-zone");
    var fileInput = document.getElementById("file-input");
    if (zone) {
      zone.onclick = function(){ if(fileInput) fileInput.click(); };
      zone.ondragover = function(e){e.preventDefault();zone.style.borderColor="#004481";};
      zone.ondragleave = function(){zone.style.borderColor=fileName?"#004481":"#D1D5DB";};
      zone.ondrop = function(e){e.preventDefault();var f=e.dataTransfer.files[0];if(f){fileName=f.name;renderStep();}};
    }
    if (fileInput) fileInput.onchange = function(){var f=this.files[0];if(f){fileName=f.name;renderStep();}};

    var prev2 = document.getElementById("m-prev2");
    if (prev2) prev2.onclick = function(){step=1;renderStep();};

    var next2 = document.getElementById("m-next2");
    if (next2 && fileName) next2.onclick = function() {
      step = 3; renderStep();
      var steps = [
        "Validando CUIT contra base BBVA...",
        "Parseando geometrías del KMZ...",
        "Identificando lotes y límites parcelarios...",
        "Consultando BoldOS Daredevil — señales multitemporales...",
        "Analizando historial de cultivos (5 campañas)...",
        "Calculando índice de rotación...",
        "Verificando deforestación contra línea base EUDR...",
        "Estimando captura de carbono por biomasa...",
        "Evaluando estrés hídrico y cobertura invernal...",
        "Procesando riesgo de inundación...",
        "BoldOS Thot — generando score de sostenibilidad...",
        "Compilando informe y recomendaciones...",
      ];
      runProcessing(modal, steps, function() {
        // Generate result
        var rot=Math.floor(Math.random()*4)+1, def=Math.random()>0.1?100:Math.floor(Math.random()*10)+90;
        var car=parseFloat((Math.random()*3+0.5).toFixed(1)), dr=Math.floor(Math.random()*60)+20;
        var cc=Math.floor(Math.random()*50)+10, fl=Math.floor(Math.random()*50)+20;
        var nR=(rot/5)*100, nC=(car/4.5)*100;
        var score=Math.round(nR*0.2+def*0.2+nC*0.15+dr*0.15+cc*0.15+fl*0.15);
        var phase=score>=85?5:score>=70?4:score>=50?3:score>=30?2:1;
        var now=new Date().toISOString().split("T")[0];

        var newClient = {
          id:"c"+Date.now(), name:form.name, cuit:form.cuit, loc:form.loc,
          ha:parseInt(form.ha), lots:parseInt(form.lots), eha:Math.round(parseInt(form.ha)*0.85), phase:phase,
          assessments:[{id:"a"+Date.now(),date:now,score:score,phase:phase,kpis:{rotation:rot,deforestation:def,carbon:car,drought:dr,coverCrop:cc,flood:fl}}]
        };

        // Show result
        var body = modal.querySelector(".modal-body");
        body.innerHTML = '<div style="text-align:center;margin-bottom:20px">' +
          '<div class="result-ok">✓</div>' +
          '<div class="result-title">Evaluación Completada</div>' +
          '<div style="font-size:12px;color:#6B7280">'+form.name+' · CUIT '+form.cuit+'</div></div>' +
          '<div style="background:#F9FAFB;border-radius:12px;padding:20px;border:1px solid #E5E7EB;margin-bottom:20px;text-align:center">' +
          renderRing(score, 80) +
          '<div style="font-size:13px;font-weight:700;color:#004481;margin-top:8px">Score de Sostenibilidad</div>' +
          '<div style="font-size:12px;color:#6B7280">Estadio: <span style="font-weight:700;color:'+scoreColor(score)+'">'+statusLabel(score)+'</span> · Fase '+phase+'</div></div>' +
          '<button class="btn btn-primary btn-full" id="m-save-new">Ver Informe Completo →</button>';

        document.getElementById("m-save-new").onclick = function() {
          STATE.clients.unshift(newClient);
          saveClients(STATE.clients);
          removeModal();
          STATE.selId = newClient.id; STATE.selAid = null; STATE.tab = "overview"; STATE.view = "detail";
          render();
        };
      });
    };
  }

  renderStep();
}

/* ── RE-EVALUATION MODAL ── */
function showReevalModal() {
  var cl = STATE.clients.find(function(c){return c.id===STATE.selId;});
  if (!cl) return;
  var prev = cl.assessments[cl.assessments.length-1];

  var overlay = document.createElement("div");
  overlay.id = "modal-overlay";
  overlay.className = "overlay";
  var modal = document.createElement("div");
  modal.className = "modal";
  modal.onclick = function(e){e.stopPropagation();};
  overlay.onclick = function(){removeModal();};
  overlay.appendChild(modal);
  document.body.appendChild(overlay);

  modal.innerHTML = '<div class="modal-head"><div>' +
    '<div class="modal-title">Reevaluación de Sostenibilidad</div>' +
    '<div class="modal-subtitle">'+cl.name+' · '+cl.cuit+'</div></div></div>' +
    '<div class="modal-body">' +
    '<div style="background:#F9FAFB;border-radius:10px;padding:12px 16px;border:1px solid #E5E7EB;margin-bottom:20px;display:flex;align-items:center;gap:12px">' +
    renderRing(prev.score, 48) +
    '<div><div style="font-size:12px;font-weight:600;color:#1F2937">Última evaluación: '+formatDate(prev.date)+'</div>' +
    '<div style="font-size:11px;color:#6B7280">Score '+prev.score+' · Fase '+prev.phase+' · '+statusLabel(prev.score)+'</div></div></div>' +
    '<div style="text-align:center;margin-bottom:16px"><div class="processing-badge">' + boldLogo(12,"#06ffe1") + '<span class="processing-label">Procesando...</span></div>' +
    '<div class="progress-bar"><div class="progress-fill" style="width:0"></div></div><div class="progress-pct">0%</div></div>' +
    '<div class="api-log"></div></div>';

  var steps = [
    "Recuperando polígonos de "+cl.name+"...",
    "Consultando "+cl.lots+" lotes · "+cl.ha.toLocaleString()+" ha...",
    "Descargando señales multitemporales — BoldOS Daredevil...",
    "Procesando imágenes campaña 2025/26...",
    "Analizando índice de vegetación (NDVI) por lote...",
    "Recalculando índice de rotación vs. campañas anteriores...",
    "Verificando deforestación contra línea base EUDR (31/12/2020)...",
    "Midiendo biomasa y estimando captura de carbono...",
    "Detectando cultivo de cobertura invernal...",
    "Evaluando estrés hídrico y reserva de agua en suelo...",
    "Analizando riesgo de inundación — recurrencia histórica...",
    "BoldOS Thot — recalculando score de sostenibilidad...",
    "Comparando con evaluación anterior...",
    "Generando informe actualizado y recomendaciones...",
  ];

  runProcessing(modal, steps, function() {
    // Evolve KPIs
    var rot = Math.min(5, prev.kpis.rotation + (Math.random()>0.5?1:0));
    var def = prev.kpis.deforestation >= 100 ? 100 : Math.min(100, prev.kpis.deforestation + Math.floor(Math.random()*3));
    var car = Math.min(4.5, parseFloat((prev.kpis.carbon + (Math.random()-0.25)*0.8).toFixed(1)));
    var dr = Math.min(100, Math.round(prev.kpis.drought + (Math.random()-0.25)*15));
    var cc = Math.min(100, Math.round(prev.kpis.coverCrop + (Math.random()-0.25)*18));
    var fl = Math.min(100, Math.round(prev.kpis.flood + (Math.random()-0.25)*12));
    car = Math.max(0.3, car); dr = Math.max(5, dr); cc = Math.max(2, cc); fl = Math.max(10, fl);
    var nR=(rot/5)*100, nC=(car/4.5)*100;
    var score = Math.round(nR*0.2+def*0.2+nC*0.15+dr*0.15+cc*0.15+fl*0.15);
    var phase = score>=85?5:score>=70?4:score>=50?3:score>=30?2:1;
    var now = new Date().toISOString().split("T")[0];
    var result = {id:"a"+Date.now(),date:now,score:score,phase:phase,kpis:{rotation:rot,deforestation:def,carbon:car,drought:dr,coverCrop:cc,flood:fl}};

    var d = result.score - prev.score;
    var dColor = d>0?"#16A34A":d<0?"#DC2626":"#6B7280";
    var dBg = d>0?"#F0FDF4":d<0?"#FEF2F2":"#F9FAFB";
    var dBd = d>0?"#BBF7D0":d<0?"#FECACA":"#E5E7EB";

    var body = modal.querySelector(".modal-body");
    var html = '<div style="text-align:center;margin-bottom:20px">' +
      '<div class="result-ok">✓</div>' +
      '<div class="result-title">Evaluación Actualizada</div>' +
      '<div style="font-size:12px;color:#6B7280">'+formatDate(result.date)+'</div></div>';

    // Comparison
    html += '<div class="compare-row">' +
      '<div style="text-align:center;opacity:0.5">' + renderRing(prev.score, 70) + '<div class="compare-label" style="color:#9CA3AF">Anterior</div></div>' +
      '<div class="compare-arrow" style="color:'+dColor+'">→</div>' +
      '<div style="text-align:center">' + renderRing(result.score, 70) + '<div class="compare-label" style="color:#004481;font-weight:600">Nueva</div></div>' +
      '<div class="compare-delta" style="background:'+dBg+';border:1px solid '+dBd+'"><div class="compare-delta-val" style="color:'+dColor+'">'+(d>0?"+":"")+d+'</div><div style="font-size:10px;color:#6B7280">puntos</div></div>' +
      '</div>';

    // KPI comparison
    html += '<div class="kpi-compare-grid">';
    Object.keys(KPI).forEach(function(k) {
      var cfg = KPI[k], vNew = result.kpis[k], vOld = prev.kpis[k], s = semaphore(k, vNew);
      var disp = displayKpi(k, vNew);
      var delta = k==="carbon"?parseFloat((vNew-vOld).toFixed(1)):vNew-vOld;
      var bgC = s==="green"?"#F0FDF4":s==="orange"?"#FFFBEB":"#FEF2F2";
      var bdC = s==="green"?"#BBF7D0":s==="orange"?"#FDE68A":"#FECACA";
      var txC = s==="green"?"#16A34A":s==="orange"?"#D97706":"#DC2626";
      html += '<div class="kpi-mini" style="background:'+bgC+';border:1px solid '+bdC+'">' +
        '<div class="kpi-mini-header"><span class="kpi-mini-label">'+cfg.icon+' '+cfg.label.split(" ")[0]+'</span><div class="kpi-mini-dot" style="background:'+txC+'"></div></div>' +
        '<div class="kpi-mini-value" style="color:'+txC+'">'+disp+'</div>';
      if (delta !== 0) {
        html += '<div class="kpi-mini-delta" style="color:'+(delta>0?"#16A34A":"#DC2626")+'">'+(delta>0?"↑":"↓")+' '+(k==="carbon"?Math.abs(delta).toFixed(1):Math.abs(delta))+'</div>';
      }
      html += '</div>';
    });
    html += '</div>';

    html += '<div style="display:flex;gap:10px">' +
      '<button class="btn btn-secondary" style="flex:1" id="m-close">Cerrar</button>' +
      '<button class="btn btn-primary" style="flex:2" id="m-save-reeval">Guardar en Historial →</button></div>';

    body.innerHTML = html;

    document.getElementById("m-close").onclick = removeModal;
    document.getElementById("m-save-reeval").onclick = function() {
      STATE.clients = STATE.clients.map(function(c) {
        if (c.id !== STATE.selId) return c;
        var newPhase = Math.max(c.phase, result.phase);
        c.phase = newPhase;
        c.assessments.push(result);
        return c;
      });
      saveClients(STATE.clients);
      removeModal();
      STATE.selAid = result.id;
      render();
    };
  });
}

/* ═══════════════════════════════════════
   INIT
   ═══════════════════════════════════════ */
document.addEventListener("DOMContentLoaded", function() {
  ROOT = document.getElementById("root");
  STATE.clients = loadClients();
  render();
});
