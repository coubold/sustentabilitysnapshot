/* ═══════════════════════════════════════
   AgroSnapshot Sostenibilidad
   charts.js — SVG Charts (no dependencies)
   ═══════════════════════════════════════ */

/* ── Ring / Donut Score ── */
function renderRing(score, size) {
  size = size || 120;
  var r = (size/2) - 10;
  var circ = 2 * Math.PI * r;
  var off = circ - (score/100) * circ;
  var c = scoreColor(score);
  return '<div style="position:relative;width:'+size+'px;height:'+size+'px">' +
    '<svg viewBox="0 0 '+size+' '+size+'" width="'+size+'" height="'+size+'">' +
    '<circle cx="'+size/2+'" cy="'+size/2+'" r="'+r+'" fill="none" stroke="#1f2937" stroke-width="7"/>' +
    '<circle cx="'+size/2+'" cy="'+size/2+'" r="'+r+'" fill="none" stroke="'+c+'" stroke-width="7" stroke-linecap="round" ' +
    'stroke-dasharray="'+circ+'" stroke-dashoffset="'+off+'" ' +
    'style="transform:rotate(-90deg);transform-origin:center;transition:stroke-dashoffset .8s ease"/>' +
    '</svg>' +
    '<div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);text-align:center">' +
    '<div style="font-size:'+Math.round(size*.26)+'px;font-weight:800;color:'+c+';line-height:1">'+score+'</div>' +
    '<div style="font-size:10px;color:#9CA3AF">/100</div>' +
    '</div></div>';
}

/* ── Radar Chart ── */
function renderRadar(kpis, size) {
  size = size || 240;
  var cx = size/2, cy = size/2, maxR = size/2 - 30;
  var keys = Object.keys(KPI);
  var n = keys.length;
  var angleStep = (2 * Math.PI) / n;

  var svg = '<svg viewBox="0 0 '+size+' '+size+'" width="'+size+'" height="'+size+'">';

  // Grid rings
  for (var ring = 1; ring <= 4; ring++) {
    var rr = maxR * (ring/4);
    var pts = [];
    for (var i = 0; i < n; i++) {
      var a = -Math.PI/2 + i * angleStep;
      pts.push((cx + rr * Math.cos(a)).toFixed(1) + "," + (cy + rr * Math.sin(a)).toFixed(1));
    }
    svg += '<polygon points="'+pts.join(" ")+'" fill="none" stroke="#1f2937" stroke-width="1"/>';
  }

  // Axis lines
  for (var i = 0; i < n; i++) {
    var a = -Math.PI/2 + i * angleStep;
    svg += '<line x1="'+cx+'" y1="'+cy+'" x2="'+(cx+maxR*Math.cos(a)).toFixed(1)+'" y2="'+(cy+maxR*Math.sin(a)).toFixed(1)+'" stroke="#1f2937" stroke-width="1"/>';
  }

  // Data polygon
  var dataPts = [];
  for (var i = 0; i < n; i++) {
    var k = keys[i];
    var val = normalize(k, kpis[k]) / 100;
    var a = -Math.PI/2 + i * angleStep;
    var dr = maxR * val;
    dataPts.push((cx + dr * Math.cos(a)).toFixed(1) + "," + (cy + dr * Math.sin(a)).toFixed(1));
  }
  svg += '<polygon points="'+dataPts.join(" ")+'" fill="rgba(6,255,225,0.12)" stroke="#06ffe1" stroke-width="2"/>';

  // Labels
  for (var i = 0; i < n; i++) {
    var a = -Math.PI/2 + i * angleStep;
    var lx = cx + (maxR + 18) * Math.cos(a);
    var ly = cy + (maxR + 18) * Math.sin(a);
    var label = KPI[keys[i]].label.split(" ")[0];
    var anchor = Math.abs(Math.cos(a)) < 0.1 ? "middle" : Math.cos(a) > 0 ? "start" : "end";
    svg += '<text x="'+lx.toFixed(1)+'" y="'+ly.toFixed(1)+'" text-anchor="'+anchor+'" dominant-baseline="central" fill="#8a96a8" font-size="10">'+label+'</text>';
  }

  svg += '</svg>';
  return svg;
}

/* ── Line Chart (Evolution) ── */
function renderLineChart(assessments, width, height) {
  width = width || 500; height = height || 200;
  var pad = {t:10,r:10,b:30,l:35};
  var w = width - pad.l - pad.r;
  var h = height - pad.t - pad.b;

  if (assessments.length < 2) return '<div style="text-align:center;color:#9CA3AF;font-size:12px;padding:20px">Se necesitan al menos 2 evaluaciones</div>';

  var svg = '<svg viewBox="0 0 '+width+' '+height+'" width="100%" preserveAspectRatio="xMidYMid meet">';

  // Grid
  for (var g = 0; g <= 4; g++) {
    var yy = pad.t + h - (g/4)*h;
    svg += '<line x1="'+pad.l+'" y1="'+yy.toFixed(1)+'" x2="'+(pad.l+w)+'" y2="'+yy.toFixed(1)+'" stroke="#1f2937" stroke-width="1"/>';
    svg += '<text x="'+(pad.l-5)+'" y="'+yy.toFixed(1)+'" text-anchor="end" dominant-baseline="central" fill="#5a6678" font-size="9">'+(g*25)+'</text>';
  }

  // X labels
  for (var i = 0; i < assessments.length; i++) {
    var x = pad.l + (i / (assessments.length - 1)) * w;
    svg += '<text x="'+x.toFixed(1)+'" y="'+(height-5)+'" text-anchor="middle" fill="#5a6678" font-size="9">'+formatDate(assessments[i].date).split(" ").slice(0,2).join(" ")+'</text>';
  }

  // Score line
  var scorePts = [];
  for (var i = 0; i < assessments.length; i++) {
    var x = pad.l + (i / (assessments.length - 1)) * w;
    var y = pad.t + h - (assessments[i].score / 100) * h;
    scorePts.push(x.toFixed(1)+","+y.toFixed(1));
  }
  svg += '<polyline points="'+scorePts.join(" ")+'" fill="none" stroke="#06ffe1" stroke-width="2.5"/>';
  // Dots
  for (var i = 0; i < assessments.length; i++) {
    var x = pad.l + (i / (assessments.length - 1)) * w;
    var y = pad.t + h - (assessments[i].score / 100) * h;
    svg += '<circle cx="'+x.toFixed(1)+'" cy="'+y.toFixed(1)+'" r="4" fill="#06ffe1" stroke="#121821" stroke-width="2"/>';
  }

  // Carbon line (secondary, normalized 0-100)
  var carbPts = [];
  for (var i = 0; i < assessments.length; i++) {
    var x = pad.l + (i / (assessments.length - 1)) * w;
    var val = normalize("carbon", assessments[i].kpis.carbon);
    var y = pad.t + h - (val / 100) * h;
    carbPts.push(x.toFixed(1)+","+y.toFixed(1));
  }
  svg += '<polyline points="'+carbPts.join(" ")+'" fill="none" stroke="#ffb547" stroke-width="1.5" stroke-dasharray="4 4"/>';

  svg += '</svg>';
  return svg;
}

/* ── Bar Chart (Scores) ── */
function renderBarChart(assessments, width, height) {
  width = width || 500; height = height || 200;
  var pad = {t:10,r:10,b:30,l:35};
  var w = width - pad.l - pad.r;
  var h = height - pad.t - pad.b;
  var n = assessments.length;
  var gap = Math.min(8, w / n * 0.2);
  var barW = (w / n) - gap;

  var svg = '<svg viewBox="0 0 '+width+' '+height+'" width="100%" preserveAspectRatio="xMidYMid meet">';

  // Grid
  for (var g = 0; g <= 4; g++) {
    var yy = pad.t + h - (g/4)*h;
    svg += '<line x1="'+pad.l+'" y1="'+yy.toFixed(1)+'" x2="'+(pad.l+w)+'" y2="'+yy.toFixed(1)+'" stroke="#1f2937" stroke-width="1"/>';
    svg += '<text x="'+(pad.l-5)+'" y="'+yy.toFixed(1)+'" text-anchor="end" dominant-baseline="central" fill="#5a6678" font-size="9">'+(g*25)+'</text>';
  }

  for (var i = 0; i < n; i++) {
    var a = assessments[i];
    var x = pad.l + i * (barW + gap) + gap/2;
    var barH = (a.score / 100) * h;
    var y = pad.t + h - barH;
    var c = scoreColor(a.score);
    svg += '<rect x="'+x.toFixed(1)+'" y="'+y.toFixed(1)+'" width="'+barW.toFixed(1)+'" height="'+barH.toFixed(1)+'" rx="4" fill="'+c+'"/>';
    svg += '<text x="'+(x+barW/2).toFixed(1)+'" y="'+(height-5)+'" text-anchor="middle" fill="#5a6678" font-size="9">'+formatDate(a.date).split(" ").slice(0,2).join(" ")+'</text>';
  }

  svg += '</svg>';
  return svg;
}
