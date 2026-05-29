import { useState } from "react";

const theme = {
  bg: "#faf8f5",
  surface: "#f3f0eb",
  surfaceElevated: "#edeae4",
  border: "#ddd9d2",
  borderHover: "#c9c4bc",
  gold: "#9a7a52",
  goldLight: "#b8966e",
  goldDim: "#c4aa88",
  text: "#1a1714",
  textMuted: "#6b6560",
  textDim: "#a09b95",
  white: "#faf8f5",
};

const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Jost:wght@200;300;400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    background: ${theme.bg};
    color: ${theme.text};
    font-family: 'Jost', sans-serif;
    font-weight: 300;
    min-height: 100vh;
  }

  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: ${theme.surface}; }
  ::-webkit-scrollbar-thumb { background: ${theme.goldDim}; border-radius: 2px; }

  ::selection { background: ${theme.goldDim}; color: ${theme.white}; }

  input, textarea, select {
    background: transparent;
    border: none;
    outline: none;
    color: ${theme.text};
    font-family: 'Jost', sans-serif;
    font-weight: 300;
    width: 100%;
  }

  textarea { resize: none; }
`;

const sections = [
  {
    id: "intro",
    type: "intro",
  },
  {
    id: "datos",
    title: "I. Datos Generales",
    subtitle: "Comenzamos con lo esencial.",
    fields: [
      { id: "nombre", label: "Nombre completo", type: "text", required: true },
      { id: "edad", label: "Edad", type: "text", required: true },
      { id: "ciudad", label: "Ciudad y estado o provincia", type: "text", required: true },
      { id: "correo", label: "Correo electronico", type: "text", required: true },
      { id: "whatsapp", label: "Numero de WhatsApp con codigo de pais", type: "text", required: true },
      { id: "instagram", label: "Usuario de Instagram", placeholder: "@...", type: "text", required: true },
      { id: "tiktok", label: "Usuario de TikTok", placeholder: "@...", type: "text", required: true },
      { id: "otras_redes", label: "Otras redes activas (YouTube, Pinterest, etc.)", type: "text", required: false },
    ],
  },
  {
    id: "digital",
    title: "II. Presencia Digital",
    subtitle: "Tu mundo en linea dice mas de ti que cualquier CV.",
    fields: [
      {
        id: "red_principal",
        label: "En que red social eres mas activa o activo",
        type: "radio",
        required: true,
        options: ["Instagram", "TikTok", "Ambas por igual", "Otra"],
      },
      {
        id: "seguidores",
        label: "Cuantos seguidores tienes en tu red principal",
        type: "radio",
        required: true,
        options: ["Menos de 500", "500 a 2K", "2K a 10K", "10K a 50K", "Mas de 50K"],
      },
      {
        id: "frecuencia",
        label: "Con que frecuencia publicas contenido actualmente",
        type: "radio",
        required: true,
        options: ["Todos los dias", "3 a 4 veces por semana", "1 a 2 veces por semana", "Pocas veces al mes"],
      },
      {
        id: "tipo_contenido",
        label: "Que tipo de contenido subes normalmente",
        type: "checkbox",
        required: true,
        options: ["Lifestyle", "Moda y outfits", "Maquillaje y belleza", "Resenas de productos", "Humor", "Motivacional", "Otro"],
      },
      {
        id: "colaboraciones",
        label: "Has colaborado con alguna marca antes",
        type: "radio",
        required: true,
        options: ["Si, con varias marcas", "Si, con una marca", "No, pero me interesa", "No, prefiero empezar desde cero"],
      },
      { id: "marcas_previas", label: "Si has colaborado, con que marcas fue (opcional)", type: "text", required: false },
      {
        id: "exp_ventas",
        label: "Tienes experiencia en ventas, afiliados o recomendando productos",
        type: "radio",
        required: true,
        options: ["Si, tengo experiencia en ventas", "Si, he sido afiliada o afiliado", "Solo recomendando a conocidos", "No, pero aprendo rapido"],
      },
    ],
  },
  {
    id: "imagen",
    title: "III. Contenido e Imagen",
    subtitle: "Tu estetica es tu marca. Queremos entender tu vision.",
    fields: [
      {
        id: "estetica",
        label: "Como describirias tu estetica o estilo visual",
        type: "radio",
        required: true,
        options: ["Minimalista y elegante", "Dark y misterioso", "Colorido y expresivo", "Neutral y clean", "Lifestyle aspiracional", "Mezcla de varios"],
      },
      { id: "estilo_personal", label: "Describenos tu estilo personal con tus propias palabras", type: "textarea", required: true },
      {
        id: "camara",
        label: "Que tan comoda o comodo te sientes grabando y apareciendo en contenido",
        type: "scale",
        required: true,
        min: 1,
        max: 5,
        minLabel: "Muy timida o timido",
        maxLabel: "Me encanta estar frente a la camara",
      },
      {
        id: "equipo",
        label: "Con que equipo cuentas para crear contenido",
        type: "checkbox",
        required: false,
        options: ["Camara o celular de buena calidad", "Ring light o iluminacion", "Tripode", "Aplicaciones de edicion", "Solo tengo mi celular"],
      },
      { id: "link_perfil", label: "Comparte el link de tu Instagram o TikTok principal", type: "text", required: true },
      { id: "aporte", label: "Que crees que podrias aportar a NYXUS como embajadora o embajador", type: "textarea", required: true },
    ],
  },
  {
    id: "compromiso",
    title: "IV. Compromiso y Disponibilidad",
    subtitle: "El programa NYXUS es para personas que van en serio.",
    fields: [
      {
        id: "horas",
        label: "Cuantas horas a la semana podrias dedicarle al programa",
        type: "radio",
        required: true,
        options: ["Menos de 3 horas", "3 a 5 horas", "5 a 10 horas", "Mas de 10 horas"],
      },
      {
        id: "constancia",
        label: "Que tan constante te consideras",
        type: "scale",
        required: true,
        min: 1,
        max: 5,
        minLabel: "Me cuesta mantener el ritmo",
        maxLabel: "Soy muy constante y disciplinada o disciplinado",
      },
      {
        id: "publicar_regular",
        label: "Estarias dispuesta o dispuesto a publicar contenido relacionado con NYXUS de forma regular",
        type: "radio",
        required: true,
        options: ["Si, sin problema", "Si, pero necesito flexibilidad", "Depende de los requisitos", "No estoy segura o seguro"],
      },
      {
        id: "objetivo",
        label: "Cual es tu objetivo principal dentro del programa",
        type: "checkbox",
        required: true,
        options: ["Ganar dinero por comisiones", "Crecer mi presencia digital", "Colaborar con una marca premium", "Obtener productos", "Desarrollar experiencia en ventas", "Todo lo anterior"],
      },
      {
        id: "situacion",
        label: "Actualmente estudias, trabajas o ambos",
        type: "radio",
        required: true,
        options: ["Solo estudio", "Solo trabajo", "Ambos", "Ninguno"],
      },
    ],
  },
  {
    id: "ventas",
    title: "V. Ventas y Promocion",
    subtitle: "NYXUS crece con personas que mueven, convencen e inspiran.",
    fields: [
      {
        id: "facilidad_venta",
        label: "Que tan facil se te hace recomendar o convencer a alguien de comprar algo",
        type: "scale",
        required: true,
        min: 1,
        max: 5,
        minLabel: "Me cuesta mucho",
        maxLabel: "Es algo natural en mi",
      },
      {
        id: "plataformas_venta",
        label: "En que plataformas crees que tendrias mejores resultados promoviendo NYXUS",
        type: "checkbox",
        required: true,
        options: ["Instagram Stories", "Instagram Feed", "TikTok", "WhatsApp", "Grupos o comunidades", "Reels", "Otra"],
      },
      { id: "como_promocionar", label: "Si fueras embajadora o embajador de NYXUS hoy, como lo promocionarias", type: "textarea", required: true },
      {
        id: "comisiones",
        label: "Estarias comoda o comodo trabajando bajo un esquema de comisiones por ventas",
        type: "radio",
        required: true,
        options: ["Si, me motiva", "Si, aunque preferiria un sueldo fijo tambien", "No estoy segura o seguro", "No, prefiero otro modelo"],
      },
    ],
  },
  {
    id: "filtro",
    title: "VI. Filtro Estrategico",
    subtitle: "Esta seccion nos ayuda a conocer tu forma de pensar. No hay respuestas correctas ni incorrectas.",
    fields: [
      { id: "objecion", label: "Si alguien te dice no me interesa al ofrecerle un producto, que harias", type: "textarea", required: true },
      { id: "resiliencia", label: "Como reaccionas cuando algo no sale como esperabas", type: "textarea", required: true },
      { id: "lujo", label: "Que hace que una marca de lujo sea percibida como premium", type: "textarea", required: true },
      { id: "organizacion", label: "Como te mantienes organizada o organizado con tus compromisos digitales o de trabajo", type: "textarea", required: true },
      { id: "campana", label: "Si pudieras crear una campana para NYXUS con total libertad, que harias", type: "textarea", required: true },
      { id: "descripcion_nyxus", label: "Como describirias a NYXUS a alguien que no la conoce, responde como si ya fueras parte del equipo", type: "textarea", required: true },
      {
        id: "afinidad",
        label: "En una escala del 1 al 10, que tan alineada o alineado te sientes con una marca de estetica premium, lujo y lifestyle",
        type: "scale",
        required: true,
        min: 1,
        max: 10,
        minLabel: "Para nada alineada o alineado",
        maxLabel: "Completamente alineada o alineado",
      },
    ],
  },
  {
    id: "cierre",
    title: "VII. Cierre y Autorizacion",
    subtitle: "Ultimo paso. Gracias por llegar hasta aqui.",
    fields: [
      { id: "adicional", label: "Hay algo mas que quieras contarnos sobre ti que no haya sido preguntado (opcional)", type: "textarea", required: false },
      {
        id: "como_conociste",
        label: "Como te enteraste del programa de embajadores y embajadoras de NYXUS",
        type: "radio",
        required: true,
        options: ["Instagram", "TikTok", "Un amigo o amiga", "WhatsApp", "Otro"],
      },
      {
        id: "autorizacion",
        label: "Acepto que NYXUS puede revisar mis perfiles publicos en redes sociales como parte del proceso de seleccion, y que la informacion proporcionada es verdadera.",
        type: "accept",
        required: true,
      },
    ],
  },
  {
    id: "thanks",
    type: "thanks",
  },
];

function ScaleField({ field, value, onChange }) {
  const steps = Array.from({ length: field.max - field.min + 1 }, (_, i) => field.min + i);
  return (
    <div style={{ marginTop: 8 }}>
      <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
        {steps.map((n) => (
          <button
            key={n}
            onClick={() => onChange(n)}
            style={{
              width: 40,
              height: 40,
              border: `1px solid ${value === n ? theme.gold : theme.border}`,
              background: value === n ? theme.gold : "transparent",
              color: value === n ? theme.bg : theme.textMuted,
              cursor: "pointer",
              fontFamily: "'Jost', sans-serif",
              fontWeight: 300,
              fontSize: 13,
              letterSpacing: "0.05em",
              transition: "all 0.2s",
            }}
          >
            {n}
          </button>
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span style={{ fontSize: 11, color: theme.textDim, letterSpacing: "0.08em", maxWidth: "40%" }}>{field.minLabel}</span>
        <span style={{ fontSize: 11, color: theme.textDim, letterSpacing: "0.08em", maxWidth: "40%", textAlign: "right" }}>{field.maxLabel}</span>
      </div>
    </div>
  );
}

function CheckboxField({ field, value = [], onChange }) {
  const toggle = (opt) => {
    if (value.includes(opt)) onChange(value.filter((v) => v !== opt));
    else onChange([...value, opt]);
  };
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 8 }}>
      {field.options.map((opt) => (
        <label key={opt} style={{ display: "flex", alignItems: "center", gap: 12, cursor: "pointer" }}>
          <div
            onClick={() => toggle(opt)}
            style={{
              width: 18,
              height: 18,
              border: `1px solid ${value.includes(opt) ? theme.gold : theme.border}`,
              background: value.includes(opt) ? theme.gold : "transparent",
              flexShrink: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.2s",
            }}
          >
            {value.includes(opt) && (
              <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                <path d="M1 4L3.5 6.5L9 1" stroke={theme.bg} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </div>
          <span style={{ fontSize: 13, color: value.includes(opt) ? theme.text : theme.textMuted, letterSpacing: "0.05em", transition: "color 0.2s" }}>{opt}</span>
        </label>
      ))}
    </div>
  );
}

function RadioField({ field, value, onChange }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 8 }}>
      {field.options.map((opt) => (
        <label key={opt} style={{ display: "flex", alignItems: "center", gap: 12, cursor: "pointer" }}>
          <div
            onClick={() => onChange(opt)}
            style={{
              width: 18,
              height: 18,
              border: `1px solid ${value === opt ? theme.gold : theme.border}`,
              borderRadius: "50%",
              background: "transparent",
              flexShrink: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.2s",
            }}
          >
            {value === opt && <div style={{ width: 8, height: 8, borderRadius: "50%", background: theme.gold }} />}
          </div>
          <span style={{ fontSize: 13, color: value === opt ? theme.text : theme.textMuted, letterSpacing: "0.05em", transition: "color 0.2s" }}>{opt}</span>
        </label>
      ))}
    </div>
  );
}

function TextField({ field, value, onChange }) {
  return (
    <div style={{ borderBottom: `1px solid ${value ? theme.goldDim : theme.border}`, paddingBottom: 8, marginTop: 8, transition: "border-color 0.2s" }}>
      <input
        type="text"
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder={field.placeholder || ""}
        style={{ fontSize: 13, letterSpacing: "0.05em", color: theme.text, caretColor: theme.gold }}
      />
    </div>
  );
}

function TextareaField({ value, onChange }) {
  return (
    <div style={{ borderBottom: `1px solid ${value ? theme.goldDim : theme.border}`, paddingBottom: 8, marginTop: 8, transition: "border-color 0.2s" }}>
      <textarea
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        rows={4}
        style={{ fontSize: 13, letterSpacing: "0.05em", color: theme.text, caretColor: theme.gold, lineHeight: 1.8 }}
      />
    </div>
  );
}

function AcceptField({ value, onChange }) {
  return (
    <label style={{ display: "flex", alignItems: "flex-start", gap: 14, cursor: "pointer", marginTop: 12 }}>
      <div
        onClick={() => onChange(!value)}
        style={{
          width: 20,
          height: 20,
          border: `1px solid ${value ? theme.gold : theme.border}`,
          background: value ? theme.gold : "transparent",
          flexShrink: 0,
          marginTop: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "all 0.2s",
        }}
      >
        {value && (
          <svg width="11" height="9" viewBox="0 0 10 8" fill="none">
            <path d="M1 4L3.5 6.5L9 1" stroke={theme.bg} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </div>
      <span style={{ fontSize: 12, color: theme.textMuted, letterSpacing: "0.06em", lineHeight: 1.7 }}>
        Acepto que NYXUS puede revisar mis perfiles publicos en redes sociales como parte del proceso de seleccion, y confirmo que la informacion proporcionada es veridica.
      </span>
    </label>
  );
}

function FieldRenderer({ field, value, onChange }) {
  switch (field.type) {
    case "text": return <TextField field={field} value={value} onChange={onChange} />;
    case "textarea": return <TextareaField value={value} onChange={onChange} />;
    case "radio": return <RadioField field={field} value={value} onChange={onChange} />;
    case "checkbox": return <CheckboxField field={field} value={value} onChange={onChange} />;
    case "scale": return <ScaleField field={field} value={value} onChange={onChange} />;
    case "accept": return <AcceptField value={value} onChange={onChange} />;
    default: return null;
  }
}

function ProgressBar({ current, total }) {
  const pct = Math.round((current / total) * 100);
  return (
    <div style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100 }}>
      <div style={{ height: 2, background: theme.bg }}>
        <div style={{ height: "100%", width: `${pct}%`, background: `linear-gradient(90deg, ${theme.goldDim}, ${theme.gold})`, transition: "width 0.5s ease" }} />
      </div>
    </div>
  );
}

export default function NyxusForm() {
  const [sectionIndex, setSectionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [errors, setErrors] = useState({});

  const contentSections = sections.filter((s) => s.type !== "intro" && s.type !== "thanks");
  const currentSection = sections[sectionIndex];
  const isIntro = currentSection.type === "intro";
  const isThanks = currentSection.type === "thanks";
  const totalContent = contentSections.length;
  const currentContentIndex = isIntro ? 0 : isThanks ? totalContent : contentSections.findIndex((s) => s.id === currentSection.id) + 1;

  const setAnswer = (fieldId, value) => {
    setAnswers((prev) => ({ ...prev, [fieldId]: value }));
    setErrors((prev) => ({ ...prev, [fieldId]: false }));
  };

  const validate = () => {
    if (!currentSection.fields) return true;
    const newErrors = {};
    currentSection.fields.forEach((f) => {
      if (!f.required) return;
      const val = answers[f.id];
      if (f.type === "checkbox") { if (!val || val.length === 0) newErrors[f.id] = true; }
      else if (f.type === "accept") { if (!val) newErrors[f.id] = true; }
      else if (f.type === "scale") { if (val === undefined || val === null) newErrors[f.id] = true; }
      else { if (!val || val.toString().trim() === "") newErrors[f.id] = true; }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const next = () => {
    if (!isIntro && !validate()) return;
    setSectionIndex((i) => Math.min(i + 1, sections.length - 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const back = () => {
    setSectionIndex((i) => Math.max(i - 1, 0));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <style>{globalStyles}</style>
      {!isIntro && !isThanks && <ProgressBar current={currentContentIndex} total={totalContent} />}

      <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>

        {/* INTRO */}
        {isIntro && (
          <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", padding: "80px 40px", maxWidth: 680, margin: "0 auto", width: "100%" }}>
            <div style={{ marginBottom: 60 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 48 }}>
                <div style={{ width: 40, height: 1, background: theme.goldDim }} />
                <span style={{ fontSize: 10, letterSpacing: "0.3em", color: theme.goldDim, fontWeight: 400, textTransform: "uppercase" }}>Programa Exclusivo</span>
              </div>
              <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "clamp(48px, 8vw, 80px)", lineHeight: 1.05, color: theme.white, marginBottom: 32, letterSpacing: "-0.01em" }}>
                NYXUS<br />
                <em style={{ color: theme.gold, fontStyle: "italic" }}>Embajadores</em>
              </h1>
              <div style={{ width: 1, height: 60, background: `linear-gradient(to bottom, ${theme.goldDim}, transparent)`, marginBottom: 32 }} />
              <p style={{ fontSize: 14, lineHeight: 2, color: theme.textMuted, letterSpacing: "0.08em", marginBottom: 24 }}>
                NYXUS no busca seguidores. Busca personas.
              </p>
              <p style={{ fontSize: 13, lineHeight: 2, color: theme.textDim, letterSpacing: "0.06em", marginBottom: 16 }}>
                Este formulario es el primer paso para formar parte de un programa exclusivo de embajadores y afiliados de NYXUS, una marca digital premium enfocada en maquillaje, perfumes de lujo, moda, accesorios y tecnologia.
              </p>
              <p style={{ fontSize: 13, lineHeight: 2, color: theme.textDim, letterSpacing: "0.06em", marginBottom: 48 }}>
                No necesitas miles de seguidores. Necesitas actitud, estetica y ganas reales de crecer. Tomarte el tiempo en responder cada seccion. Solo aceptamos perfiles seleccionados.
              </p>
              <button
                onClick={next}
                style={{ background: "transparent", border: `1px solid ${theme.gold}`, color: theme.gold, padding: "16px 48px", fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase", cursor: "pointer", transition: "all 0.3s" }}
                onMouseEnter={(e) => { e.target.style.background = theme.gold; e.target.style.color = theme.bg; }}
                onMouseLeave={(e) => { e.target.style.background = "transparent"; e.target.style.color = theme.gold; }}
              >
                Comenzar solicitud
              </button>
            </div>
          </div>
        )}

        {/* SECTION */}
        {!isIntro && !isThanks && (
          <div style={{ maxWidth: 680, margin: "0 auto", width: "100%", padding: "80px 40px 120px" }}>
            <div style={{ marginBottom: 56 }}>
              <span style={{ fontSize: 10, letterSpacing: "0.3em", color: theme.goldDim, textTransform: "uppercase" }}>
                {currentContentIndex} de {totalContent}
              </span>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "clamp(28px, 5vw, 42px)", color: theme.white, marginTop: 12, marginBottom: 10, letterSpacing: "-0.01em" }}>
                {currentSection.title}
              </h2>
              <p style={{ fontSize: 12, color: theme.textDim, letterSpacing: "0.1em", lineHeight: 1.8 }}>{currentSection.subtitle}</p>
              <div style={{ width: 40, height: 1, background: theme.goldDim, marginTop: 20 }} />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 44 }}>
              {currentSection.fields?.map((field) => (
                <div key={field.id}>
                  <label style={{ display: "block", fontSize: 12, letterSpacing: "0.12em", color: errors[field.id] ? "#c0624a" : theme.textMuted, marginBottom: 4, textTransform: "uppercase", lineHeight: 1.6 }}>
                    {field.label}
                    {field.required && <span style={{ color: theme.goldDim, marginLeft: 4 }}>*</span>}
                  </label>
                  <FieldRenderer field={field} value={answers[field.id]} onChange={(val) => setAnswer(field.id, val)} />
                  {errors[field.id] && <span style={{ fontSize: 11, color: "#c0624a", letterSpacing: "0.08em", marginTop: 6, display: "block" }}>Este campo es requerido</span>}
                </div>
              ))}
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 72, paddingTop: 40, borderTop: `1px solid ${theme.border}` }}>
              <button
                onClick={back}
                style={{ background: "transparent", border: "none", color: theme.textDim, fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", cursor: "pointer", padding: "12px 0" }}
              >
                Atras
              </button>
              <button
                onClick={next}
                style={{ background: "transparent", border: `1px solid ${theme.gold}`, color: theme.gold, padding: "14px 40px", fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", cursor: "pointer", transition: "all 0.3s" }}
                onMouseEnter={(e) => { e.target.style.background = theme.gold; e.target.style.color = theme.bg; }}
                onMouseLeave={(e) => { e.target.style.background = "transparent"; e.target.style.color = theme.gold; }}
              >
                {sectionIndex === sections.length - 2 ? "Enviar solicitud" : "Continuar"}
              </button>
            </div>
          </div>
        )}

        {/* THANKS */}
        {isThanks && (
          <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", padding: "80px 40px", maxWidth: 680, margin: "0 auto", width: "100%", textAlign: "center" }}>
            <div style={{ width: 1, height: 80, background: `linear-gradient(to bottom, transparent, ${theme.goldDim})`, margin: "0 auto 48px" }} />
            <span style={{ fontSize: 10, letterSpacing: "0.35em", color: theme.goldDim, textTransform: "uppercase", display: "block", marginBottom: 32 }}>Solicitud recibida</span>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "clamp(36px, 6vw, 60px)", color: theme.white, lineHeight: 1.1, marginBottom: 40, letterSpacing: "-0.01em" }}>
              Gracias por<br /><em style={{ color: theme.gold, fontStyle: "italic" }}>aplicar.</em>
            </h2>
            <p style={{ fontSize: 13, color: theme.textDim, letterSpacing: "0.08em", lineHeight: 2, marginBottom: 16 }}>
              Tu solicitud ha sido recibida y sera revisada por el equipo de NYXUS.
            </p>
            <p style={{ fontSize: 13, color: theme.textDim, letterSpacing: "0.08em", lineHeight: 2, marginBottom: 48 }}>
              Si tu perfil es seleccionado, nos pondremos en contacto a traves de WhatsApp o correo electronico en los proximos dias.
            </p>
            <div style={{ width: 40, height: 1, background: theme.goldDim, margin: "0 auto 40px" }} />
            <span style={{ fontSize: 10, letterSpacing: "0.3em", color: theme.goldDim, textTransform: "uppercase" }}>NYXUS — Elevate your world</span>
            <div style={{ width: 1, height: 80, background: `linear-gradient(to bottom, ${theme.goldDim}, transparent)`, margin: "48px auto 0" }} />
          </div>
        )}
      </div>
    </>
  );
}
