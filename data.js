/* ═══════════════════════════════════════
   AgroSnapshot Sustentabilidad
   data.js — Constants, Config & Mock Data
   ═══════════════════════════════════════
   Datos mock con correlaciones agronómicas reales:
   - Rotación alta → mayor carbono orgánico (+37% SQI, INTA/CONICET 2024)
   - Cobertura invernal → más captura de carbono y retención hídrica
   - Gramíneas en rotación → +19.5% consumo de agua → menor riesgo inundación (INTA MJ)
   - Carbono en Pampa húmeda: 0.3-0.6 tn/ha/año con buenas prácticas
   - Deforestación: riesgo real solo en frontera agropecuaria (Chaco, norte SF/CBA)
   ═══════════════════════════════════════ */

var KPI = {
  rotation:      { label:"Rotación de Cultivos",   icon:"\u{1F504}", unit:"/5 camp.",        desc:"Campañas con diversificación efectiva de cultivos", max:5, w:.20 },
  deforestation: { label:"No Deforestación",       icon:"\u{1F333}", unit:"% cumpl.",        desc:"Verificación deforestación cero — línea base EUDR", max:100, w:.20 },
  carbon:        { label:"Captura de Carbono",     icon:"\u{1F331}", unit:"tn CO₂eq/ha/año", desc:"Secuestro de carbono estimado por hectárea", max:4.5, w:.15 },
  drought:       { label:"Mitigación de Sequía",   icon:"\u{1F4A7}", unit:"% mitigación",    desc:"Capacidad de respuesta ante estrés hídrico", max:100, w:.15 },
  coverCrop:     { label:"Cobertura Invernal",     icon:"\u{2744}\u{FE0F}", unit:"% lotes",  desc:"Lotes con cultivo de cobertura en barbecho invernal", max:100, w:.15 },
  flood:         { label:"Resiliencia Inundación", icon:"\u{1F30A}", unit:"% resiliencia",   desc:"Preparación ante riesgo de anegamiento", max:100, w:.15 },
};

var PHASES = [
  { n:1, name:"Diagnóstico",           benefit:"Bonif. 0.25% tasa" },
  { n:2, name:"Rotación Verificada",    benefit:"Bonif. 0.50% tasa" },
  { n:3, name:"Cobertura + Carbono",    benefit:"Bonif. 0.75% tasa" },
  { n:4, name:"Gestión Hídrica",        benefit:"Línea verde preferencial" },
  { n:5, name:"Certificación Integral", benefit:"Acceso Bono Verde BBVA" },
];

var RECOS = {
  rotation:[
    {t:"Incorporar gramínea en rotación",d:"Alternar soja con maíz o sorgo para mejorar estructura del suelo. Estudios INTA muestran +37% en calidad de suelo con rotación T/S-CC/M.",i:"+8 pts"},
    {t:"Eliminar monocultivo",d:"Lotes con 3+ campañas del mismo cultivo requieren diversificación. Monocultivo reduce 32% el carbono microbiano.",i:"+5 pts"}
  ],
  carbon:[
    {t:"Siembra directa continua",d:"Mantener rastrojo y minimizar laboreo para acumular materia orgánica. En Pampa húmeda, potencial de 0.3-0.6 tn C/ha/año.",i:"+6 pts"},
    {t:"Cultivos de servicio",d:"Vicia, centeno o avena para fijar carbono y nitrógeno atmosférico. Incrementan biomasa microbiana y secuestro de CO₂.",i:"+10 pts"}
  ],
  coverCrop:[{t:"Ampliar cobertura invernal a 50%+ lotes",d:"Priorizar lotes expuestos a erosión hídrica. CC reducen 60% densidad de malezas y mejoran balance hídrico.",i:"+12 pts"}],
  drought:[{t:"Estudio de factibilidad de riego",d:"Pivot central o goteo en lotes con estrés hídrico recurrente. Complementar con CC que mejoran retención de humedad.",i:"+7 pts"}],
  flood:[{t:"Incorporar gramíneas en rotación",d:"Gramíneas consumen 19.5% más agua, reduciendo excedentes hídricos que elevan napas. Sistematización de lotes anegables como complemento.",i:"+8 pts"}],
};

var NAMES = [
  "Estancia Los Alamos S.A.","Agrícola Don Mario S.R.L.","La Catalina Agropecuaria","Campos del Sur S.A.","Ganadera El Remanso",
  "AgroInversiones Paraná S.A.","Cereales del Litoral S.R.L.","Don Valentín Agro S.A.","Las Margaritas S.A.","Santa Lucía Agropecuaria",
  "El Progreso Agro S.A.","Agroservicios del Norte S.R.L.","Estancia La Primavera","Molinos del Plata S.A.","Agrícola San Martín",
  "La Esperanza Agropecuaria S.A.","Campo Grande S.R.L.","Fideicomiso Agro Sur","Granos del Oeste S.A.","Productora Pampeana S.R.L.",
  "Estancia El Ombú S.A.","AgroCentro Litoral","La Biznaga S.A.","Cooperativa Agro Unión","Don Segundo Agro S.R.L.",
  "Campos Australes S.A.","Semillas del Paraná S.R.L.","Estancia La Morocha","AgroVida S.A.","Chacarera del Sur S.R.L.",
  "El Trébol Agropecuaria","Inversiones Rurales S.A.","La Lomada S.R.L.","Grupo Agrotech S.A.","Estancia San Pedro",
  "AgriNova Pampa S.A.","Campos de Irigoyen S.R.L.","La Querencia Agro S.A.","Suelos Fértiles S.R.L.","AgroPatagonia S.A.",
  "El Centenario Agro","Estancia Bella Vista S.A.","Granos Premium S.R.L.","La Abundancia S.A.","Productora El Molino",
  "Campo Serrano S.R.L.","AgroFe S.A.","Estancia Los Talas","Fideicomiso AgroNorte","Cosecha Dorada S.A."
];

var LOCS = [
  "Pergamino, Buenos Aires","Marcos Juárez, Córdoba","Venado Tuerto, Santa Fe","Trenque Lauquen, Buenos Aires","Río Cuarto, Córdoba",
  "Victoria, Entre Ríos","Rosario, Santa Fe","General Pico, La Pampa","Rafaela, Santa Fe","Bell Ville, Córdoba",
  "Junín, Buenos Aires","San Francisco, Córdoba","Reconquista, Santa Fe","Laboulaye, Córdoba","Casilda, Santa Fe",
  "9 de Julio, Buenos Aires","Villa María, Córdoba","Rufino, Santa Fe","General Villegas, Buenos Aires","Charata, Chaco",
  "Bragado, Buenos Aires","Crespo, Entre Ríos","Las Rosas, Santa Fe","Tandil, Buenos Aires","Río Tercero, Córdoba",
  "Paraná, Entre Ríos","Sunchales, Santa Fe","Bolívar, Buenos Aires","Jesús María, Córdoba","Esperanza, Santa Fe",
  "Chacabuco, Buenos Aires","San Jorge, Santa Fe","Gualeguaychú, Entre Ríos","Henderson, Buenos Aires","Canals, Córdoba",
  "Cañada de Gómez, Santa Fe","Lincoln, Buenos Aires","Morteros, Córdoba","Firmat, Santa Fe","Viedma, Río Negro",
  "Salto, Buenos Aires","Armstrong, Santa Fe","Concordia, Entre Ríos","Lobos, Buenos Aires","Totoras, Santa Fe",
  "Cruz Alta, Córdoba","San Justo, Santa Fe","Dolores, Buenos Aires","Reconquista, Santa Fe","Pehuajó, Buenos Aires"
];

/* ── Helpers ── */
function semaphore(k, v) {
  var t = {rotation:{g:4,o:2},deforestation:{g:90,o:50},carbon:{g:3,o:1.5},drought:{g:60,o:30},coverCrop:{g:50,o:20},flood:{g:70,o:40}}[k];
  return v >= t.g ? "green" : v >= t.o ? "orange" : "red";
}
function scoreColor(s) { return s >= 75 ? "#16A34A" : s >= 50 ? "#D97706" : "#DC2626"; }
function scoreSem(s) { return s >= 75 ? "green" : s >= 50 ? "orange" : "red"; }
function formatDate(d) { return new Date(d+"T12:00:00").toLocaleDateString("es-AR",{day:"numeric",month:"short",year:"numeric"}); }
function statusLabel(s) { return s>=85?"Ejemplar":s>=70?"Avanzado":s>=50?"Transición":s>=30?"Inicial":"Crítico"; }
function normalize(k, v) { return k==="rotation"?(v/5)*100:k==="carbon"?(v/4.5)*100:v; }
function displayKpi(k, v) { return k==="rotation"?v+"/5":k==="carbon"?v+" tn":k==="drought"||k==="flood"?(v>=60?"Alto":v>=30?"Medio":"Bajo"):v+"%"; }
function semLabel(s) { return s==="green"?"CUMPLE":s==="orange"?"EN PROGRESO":"REQUIERE ACCIÓN"; }

/* ── Seeded random ── */
function seededRand(seed) { var s=seed; return function(){s=(s*16807)%2147483647;return(s-1)/2147483646;}; }

/* ══════════════════════════════════════════
   GENERACIÓN CON PERFILES DE MANEJO
   ══════════════════════════════════════════ */

function generateClients() {
  var rng = seededRand(42);
  var r01 = function(){ return rng(); };
  var rInt = function(mn,mx){ return Math.floor(r01()*(mx-mn+1))+mn; };
  var rFloat = function(mn,mx,dec){ dec=dec||1; return parseFloat((r01()*(mx-mn)+mn).toFixed(dec)); };
  var clamp = function(v,mn,mx){ return Math.max(mn, Math.min(mx, v)); };
  var noise = function(base, spread) { return base + (r01()-0.5) * spread; };

  function regionFlags(loc) {
    var l = loc.toLowerCase();
    var isFrontier = l.indexOf("chaco")>=0 || l.indexOf("reconquista")>=0 || l.indexOf("concordia")>=0 || l.indexOf("viedma")>=0;
    var isFloodProne = l.indexOf("buenos aires")>=0 || l.indexOf("entre ríos")>=0 || l.indexOf("santa fe")>=0;
    var isDroughtProne = l.indexOf("la pampa")>=0 || l.indexOf("río negro")>=0 || l.indexOf("chaco")>=0 ||
                         l.indexOf("trenque")>=0 || l.indexOf("general villegas")>=0 || l.indexOf("pehuajó")>=0 || l.indexOf("lincoln")>=0;
    var isCoreZone = l.indexOf("córdoba")>=0 || l.indexOf("marcos juárez")>=0 || l.indexOf("bell ville")>=0 ||
                     l.indexOf("pergamino")>=0 || l.indexOf("rosario")>=0 || l.indexOf("venado tuerto")>=0;
    return { frontier:isFrontier, floodProne:isFloodProne, droughtProne:isDroughtProne, coreZone:isCoreZone };
  }

  var clients = [];
  var aid = 1;

  for (var i = 0; i < 50; i++) {
    var loc = LOCS[i];
    var reg = regionFlags(loc);

    var mq = r01();
    if (reg.coreZone) mq = clamp(mq + 0.15, 0, 1);
    if (reg.frontier) mq = clamp(mq - 0.2, 0, 1);

    var ha = rInt(600, 8000);
    var lots = Math.max(3, Math.round(ha / rInt(200, 500)));
    var cuitPre = r01() > 0.5 ? "30" : "20";
    var cuitMid = String(rInt(10000000, 99999999));
    var cuitEnd = String(rInt(0, 9));
    var numA = rInt(1, 5);

    /* Rotación: driver principal */
    var baseRot;
    if (mq >= 0.75) baseRot = rInt(3, 5);
    else if (mq >= 0.45) baseRot = rInt(2, 3);
    else baseRot = rInt(0, 1);

    /* CC correlaciona con rotación */
    var baseCc;
    if (baseRot >= 4) baseCc = rInt(50, 90);
    else if (baseRot >= 2) baseCc = rInt(15, 50);
    else baseCc = rInt(0, 15);

    /* Carbono = f(rotación, CC) */
    var rotFactor = baseRot / 5;
    var ccFactor = baseCc / 100;
    var baseCar = parseFloat((0.3 + rotFactor * 2.5 + ccFactor * 1.5 + noise(0, 0.3)).toFixed(1));
    baseCar = clamp(baseCar, 0.3, 4.5);

    /* Sequía = f(CC, región) */
    var baseDr = Math.round(ccFactor * 50 + rotFactor * 20 + noise(10, 15));
    if (reg.droughtProne) baseDr = Math.round(baseDr * 0.65);
    baseDr = clamp(baseDr, 5, 95);

    /* Inundación = f(gramíneas en rotación, CC, región) */
    var baseFl = Math.round(rotFactor * 45 + ccFactor * 30 + noise(10, 15));
    if (reg.floodProne) baseFl = Math.round(baseFl * 0.7);
    baseFl = clamp(baseFl, 10, 95);

    /* Deforestación = f(región) */
    var defor = reg.frontier ? rInt(82, 98) : 100;

    var assessments = [];
    var startDate = new Date(2023, rInt(0, 11), rInt(1, 28));

    for (var j = 0; j < numA; j++) {
      var dt = new Date(startDate);
      dt.setMonth(dt.getMonth() + j * rInt(4, 8));

      var rot, cc, car, dr, fl;
      if (j === 0) {
        rot = baseRot; cc = baseCc; car = baseCar; dr = baseDr; fl = baseFl;
      } else {
        var rotImproved = r01() > 0.6;
        rot = rotImproved ? clamp(assessments[j-1].kpis.rotation + 1, 0, 5) : assessments[j-1].kpis.rotation;

        var ccDelta = rotImproved ? rInt(8, 20) : rInt(-3, 12);
        cc = clamp(assessments[j-1].kpis.coverCrop + ccDelta, 0, 100);

        var newRotF = rot / 5;
        var newCcF = cc / 100;
        car = parseFloat((0.3 + newRotF * 2.5 + newCcF * 1.5 + noise(0, 0.3)).toFixed(1));
        car = clamp(car, 0.3, 4.5);

        dr = clamp(Math.round(assessments[j-1].kpis.drought + newCcF * 10 + noise(0, 8)), 5, 100);
        fl = clamp(Math.round(assessments[j-1].kpis.flood + newRotF * 8 + noise(0, 8)), 10, 100);
      }

      if (j > 0 && reg.frontier) {
        defor = clamp(defor + rInt(0, 2), defor, 100);
      }

      var nR = (rot/5)*100, nC = (car/4.5)*100;
      var score = Math.round(nR*0.2 + defor*0.2 + nC*0.15 + dr*0.15 + cc*0.15 + fl*0.15);
      var aPhase = score>=85?5:score>=70?4:score>=50?3:score>=30?2:1;

      assessments.push({
        id:"a"+(aid++), date:dt.toISOString().split("T")[0], score:score, phase:aPhase,
        kpis:{rotation:rot, deforestation:defor, carbon:car, drought:dr, coverCrop:cc, flood:fl}
      });
    }

    var lastPhase = assessments[assessments.length-1].phase;
    clients.push({
      id:"c"+(i+1), name:NAMES[i], cuit:cuitPre+"-"+cuitMid+"-"+cuitEnd, loc:loc,
      ha:ha, lots:lots, eha:Math.round(ha*rFloat(0.75,0.92)), phase:lastPhase, assessments:assessments
    });
  }
  return clients;
}

/* ── Persistence ── */
function loadClients() {
  try {
    var raw = localStorage.getItem("snap-v6");
    if (raw) return JSON.parse(raw);
  } catch(e) {}
  var c = generateClients();
  saveClients(c);
  return c;
}
function saveClients(clients) {
  try { localStorage.setItem("snap-v6", JSON.stringify(clients)); } catch(e) {}
}
