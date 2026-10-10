import { EN_EXTRA } from '@/lib/i18n/dictionary-extra'

export type Locale = 'es' | 'en'

export function normalizeI18nKey(text: string): string {
  return text.replace(/\s+/g, ' ').trim()
}

/** Spanish source copy → English. Whitespace-normalized match. */
const EN_BASE: Record<string, string> = {
  // Nav
  Marcas: 'Trademarks',
  Patentes: 'Patents',
  'Trámites digitales': 'Digital procedures',
  'Preguntas frecuentes': 'Frequently asked questions',
  Contacto: 'Contact',
  'Acerca de INAPI': 'About INAPI',
  'Conoce más': 'Learn more',
  Glosario: 'Glossary',
  Observancia: 'Enforcement',
  'Centro de documentación': 'Documentation centre',
  Conecta: 'Connect',
  'Gasto presupuestario': 'Budget spending',
  Inicio: 'Home',
  Buscar: 'Search',
  Secciones: 'Sections',
  'Más enlaces': 'More links',
  'Buscar en el sitio': 'Search the site',
  'Saltar al contenido principal': 'Skip to main content',
  'Abrir menú': 'Open menu',
  'Cerrar menú': 'Close menu',
  'Menú de navegación': 'Navigation menu',
  'Ruta de navegación': 'Breadcrumb',
  'Enlaces del portal': 'Portal links',
  'Secciones principales': 'Main sections',
  'Enlaces legales': 'Legal links',
  'Instituto Nacional de Propiedad Industrial': 'National Institute of Industrial Property',

  // Header actions
  'Cambiar idioma a inglés': 'Switch language to English',
  'Cambiar idioma a español': 'Switch language to Spanish',
  'Activar modo claro': 'Switch to light mode',
  'Activar modo oscuro': 'Switch to dark mode',
  'Ir al Sitio de Trámites': 'Go to the Procedures Site',
  'Sitio de Trámites': 'Procedures Site',
  'Accesos del encabezado': 'Header shortcuts',

  // Canonical tools
  'Buscador de marcas': 'Trademark search',
  'Buscador de productos y servicios': 'Goods and services search',
  'Buscador de patentes': 'Patent search',
  'Notificaciones INAPI': 'INAPI notifications',
  'Notificaciones diarias': 'INAPI notifications',
  'Notificaciones INAPI de marcas': 'INAPI trademark notifications',
  'Notificaciones INAPI de patentes': 'INAPI patent notifications',
  'Notificaciones INAPI — INAPI': 'INAPI notifications — INAPI',

  // Canonical procedures
  'Solicitud de marca': 'Trademark application',
  'Solicitud de patente': 'Patent application',
  'Solicitud de marca Sistema de Madrid': 'Madrid System trademark application',
  'Tipos de pago en línea': 'Online payment types',
  'Presentación de escritos de marca o patente': 'Trademark or patent submissions',
  'Renovación de marca': 'Trademark renewal',
  'Solicitud de anotación de marca': 'Trademark annotation request',
  'Presentación de demanda de oposición': 'Opposition claim',
  'Presentación de escritos de marca': 'Trademark submissions',
  'Custodia de poderes y personerías': 'Power of attorney custody',
  'Solicitud de anotación de patentes': 'Patent annotation request',
  'Mostrar trámites secundarios': 'Show follow-up procedures',
  'Ocultar trámites secundarios': 'Hide follow-up procedures',
  'Revisa los tipos de herramientas de INAPI': 'Review INAPI tool types',
  'Revisa los tipos de trámites en INAPI': 'Review INAPI procedure types',
  'Ir a los buscadores': 'Go to the search tools',
  'Iniciar un trámite': 'Start a procedure',

  // Footer
  'Dónde estamos': 'Where we are',
  Conversemos: 'Get in touch',
  Accesos: 'Shortcuts',
  'Formulario de contacto': 'Contact form',
  'Formulario de contacto (SIAC)': 'Contact form (SIAC)',
  'Facebook de INAPI': 'INAPI on Facebook',
  'INAPI en X (Twitter)': 'INAPI on X (Twitter)',
  'Instagram de INAPI': 'INAPI on Instagram',
  'LinkedIn de INAPI': 'INAPI on LinkedIn',
  'Registrar una marca': 'File a trademark',
  'Glosario de propiedad industrial': 'Industrial property glossary',
  'Política de privacidad': 'Privacy policy',
  '©2026 INAPI. Todos los derechos reservados': '©2026 INAPI. All rights reserved',
  'Última actualización: 09-10-2026': 'Last updated: 09-10-2026',
  'Av. Libertador Bernardo O’Higgins 194, Santiago': 'Av. Libertador Bernardo O’Higgins 194, Santiago',
  "Av. Libertador Bernardo O'Higgins 194, Santiago": 'Av. Libertador Bernardo O’Higgins 194, Santiago',

  // Home hero
  'Registra y protege tu marca o patente en Chile': 'Register and protect your trademark or patent in Chile',
  'Descubre cómo buscar, solicitar y proteger tus ideas e invenciones en línea.':
    'Find out how to search, apply for and protect your ideas and inventions online.',
  Qué: 'What',
  Cómo: 'How',
  Dónde: 'Where',
  Cuándo: 'When',
  'Para quién': 'Who it is for',
  'Qué es INAPI y qué protege': 'What INAPI is and what it protects',
  'Cómo iniciar y realizar un trámite': 'How to start and complete a procedure',
  'Dónde te informas y dónde tramitas': 'Where to get information and where to file',
  'Cuánto demora y qué pasa si se atrasa': 'How long it takes and what happens if it is delayed',
  'A quién están dirigidos estos servicios': 'Who these services are for',
  'Leer qué puedes proteger': 'Read what you can protect',
  'Ver cómo iniciar el trámite': 'See how to start the procedure',
  'Revisar plazos del registro': 'Review registration timelines',
  'Ver quién puede solicitar': 'See who can apply',

  // Home sections
  'Qué puedes proteger': 'What you can protect',
  'Ver todas las noticias': 'See all news',
  Noticias: 'News',
  Transparencia: 'Transparency',
  'Cuenta pública': 'Public account',
  'Cuenta Pública Participativa 2026': '2026 participatory public account',
  'Sala de Prensa': 'Press room',
  'Datos abiertos': 'Open data',
  'Resultados de búsqueda': 'Search results',
  SIAC: 'SIAC',
  PCT: 'PCT',
  'Sello de Origen': 'Seal of Origin',
  'Cómo registrar una marca': 'How to register a trademark',
  'Cómo registrar una patente': 'How to register a patent',
  'Solicitud nueva de marca': 'New trademark application',
  'Solicitud nueva': 'New application',
  'Sistema de Madrid': 'Madrid System',
  INAPI: 'INAPI',
  Estadísticas: 'Statistics',
  'Aprende de propiedad industrial': 'Learn about industrial property',
  'Récord de patentes nacionales': 'Record of national patents',
  Noticia: 'News item',

  // Contact
  'Vía web': 'Online',
  Teléfono: 'Phone',
  'Correo electrónico': 'Email',
  'Oficinas presenciales': 'In-person offices',
  'Ir al formulario (SIAC)': 'Go to the form (SIAC)',
  'Envía tus consultas, opiniones, sugerencias, felicitaciones o reclamos.':
    'Send your questions, opinions, suggestions, compliments or complaints.',
  '(56 2) 2 887 0400. Lunes a jueves de 09:00 a 18:00 hrs. Viernes de 09:00 a 17:00 hrs.':
    '(56 2) 2 887 0400. Monday to Thursday 09:00 to 18:00. Friday 09:00 to 17:00.',

  // Digital procedures
  'Iniciar sesión en el Sitio de Trámites': 'Sign in to the Procedures Site',
  'Registro de marcas comerciales': 'Trademark registration',
  'Registro de patente de invención': 'Invention patent registration',
  'Ingresar solicitud de marca': 'File a trademark application',
  'Ver trámite de patentes': 'See the patent procedure',

  // Marcas page
  'Ingresar una solicitud de marca': 'File a trademark application',
  'Completa el formulario en línea y paga las tasas.': 'Complete the online form and pay the fees.',
  'Compara tu marca con las ya inscritas antes de solicitar.':
    'Compare your mark with those already on file before you apply.',
  'Conocer las tarifas': 'See the fees',
  'Revisa cuánto pagas al solicitar y al obtener el registro.':
    'See how much you pay when you apply and when the registration is granted.',
  'Tasa de presentación por cada clase.': 'Filing fee per class.',
  'Plazo habitual si no hay oposiciones.': 'Usual time if there are no oppositions.',
  'Presentación, publicación y examen.': 'Filing, publication and examination.',
  '¿Quién puede pedir el registro?': 'Who can apply for registration?',
  '¿Qué necesitas?': 'What do you need?',
  '¿Qué es una marca?': 'What is a trademark?',
  '¿Qué ganas al registrar tu marca?': 'What do you gain by registering your trademark?',
  '¿Cómo se registra una marca?': 'How is a trademark registered?',
  '¿Cuánto cuesta registrar una marca?': 'How much does it cost to register a trademark?',
  'Tipos de marca': 'Types of trademark',
  'Marca comercial': 'Trade mark',
  'Marca colectiva': 'Collective mark',
  'Marca de certificación': 'Certification mark',
  'Frase de propaganda': 'Advertising slogan',
  'Herramientas para tu marca': 'Tools for your trademark',
  'Trámites de marcas': 'Trademark procedures',
  '¿Qué pasa después?': 'What happens next?',
  'Accesos rápidos': 'Quick access',
  '6 a 8 meses': '6 to 8 months',
  '3 etapas': '3 stages',
  '5 etapas': '5 stages',
  'Hasta 20 años': 'Up to 20 years',

  // Patents page
  'Ingresar una solicitud de patente': 'File a patent application',
  'Presenta tu invención en línea y paga la tasa inicial.': 'File your invention online and pay the initial fee.',
  'Buscar patentes existentes': 'Search existing patents',
  'Revisa si tu invento ya fue solicitado antes.': 'Check whether your invention has already been filed.',
  'Tasa de presentación de la solicitud.': 'Application filing fee.',
  'Vigencia desde la fecha de presentación.': 'Term from the filing date.',
  'Presentación, forma, publicación, peritaje y registro.':
    'Filing, formality check, publication, expert report and grant.',
  '¿Quién puede pedir una patente?': 'Who can apply for a patent?',
  '¿Qué es una patente?': 'What is a patent?',
  '¿Qué ganas al registrar una patente?': 'What do you gain by registering a patent?',
  '¿Qué requisitos cumple un invento?': 'What requirements must an invention meet?',
  '¿Cuánto cuesta registrar una patente?': 'How much does it cost to register a patent?',
  'Tipos de patente': 'Types of patent',
  Invención: 'Invention',
  'Modelo de utilidad': 'Utility model',
  'Diseño industrial': 'Industrial design',
  'Esquema de trazado de circuitos': 'Layout-design of integrated circuits',
  'Herramientas y guías': 'Tools and guides',
  'Trámites de patentes': 'Patent procedures',
  'Ser nuevo': 'Be new',
  'Tener nivel inventivo': 'Involve an inventive step',
  'Aplicarse en la industria': 'Be industrially applicable',

  // Misc CTAs
  'Qué es una marca': 'What a trademark is',
  'Qué es una patente': 'What a patent is',
  'Solicitud y pago en línea': 'Online filing and payment',
  'Leer la cuenta pública 2026': 'Read the 2026 public account',
  'Ver más accesos': 'See more links',
  'Ver accesos anteriores': 'See previous links',
  'Volver al inicio de la página': 'Back to top',
  'Abrir Asistente GRI': 'Open GRI assistant',
  'Abrir el buscador de patentes': 'Open the patent search',
  'Diseños industriales': 'Industrial designs',
  'Indicaciones geográficas': 'Geographical indications',

  'Una marca identifica lo que ofreces. En esta página ves qué es, quién puede pedirla, qué necesitas, cuánto cuesta, cuánto demora y cómo seguir el trámite.':
    'A trademark identifies what you offer. This page explains what it is, who can apply, what you need, how much it costs, how long it takes and how to follow the procedure.',
  'Una patente protege un invento en Chile. Aquí ves qué es, quién puede pedirla, qué se necesita, cuánto cuesta, cuánto demora y cómo seguir el trámite.':
    'A patent protects an invention in Chile. Here you see what it is, who can apply, what is needed, how much it costs, how long it takes and how to follow the procedure.',
  'Compara marcas, elige las clases de Niza y busca patentes antes de presentar. Estas herramientas son de consulta: no inician un trámite ni reemplazan el examen de INAPI.':
    'Compare trademarks, choose Nice classes and search patents before you file. These tools are for consultation: they do not start a procedure or replace INAPI’s examination.',
  'El formulario, el pago y el expediente están en el Sitio de Trámites, con ClaveÚnica. Aquí ves qué es cada trámite, para qué sirve y qué necesitas.':
    'The form, payment and file are on the Procedures Site, with ClaveÚnica. Here you see what each procedure is, what it is for and what you need.',
  'Respuestas a las dudas más comunes sobre marcas, patentes y otros derechos.':
    'Answers to the most common questions about trademarks, patents and other rights.',
  'Canales de contacto y oficinas presenciales de INAPI.': 'INAPI contact channels and in-person offices.',
  'Compara tu signo con marcas ya solicitadas o registradas. Los resultados se muestran aquí, sin cambiar de dirección.':
    'Compare your sign with trademarks already filed or registered. Results appear here, without changing the address.',

  // Home editorial lists
  'Marcas comerciales y frases de propaganda': 'Trade marks and advertising slogans',
  'Patentes de invención y modelos de utilidad': 'Invention patents and utility models',
  'Diseños industriales y esquemas de trazado': 'Industrial designs and layout-designs',
  'Indicaciones geográficas y denominaciones de origen': 'Geographical indications and appellations of origin',
  'Selecciona el área: marcas, patentes u otro derecho.': 'Choose the area: trademarks, patents or another right.',
  'Haz la búsqueda previa en los buscadores oficiales.': 'Run a prior search in the official search tools.',
  'Inicia la solicitud en línea, paga y adjunta documentos.': 'Start the online application, pay and attach documents.',
  'Aquí lees requisitos, plazos, tasas y avisos.': 'Here you read requirements, timelines, fees and notices.',
  'En el Sitio de Trámites entras con ClaveÚnica.': 'On the Procedures Site you sign in with ClaveÚnica.',
  'No necesitas ir a una oficina para presentar.': 'You do not need to go to an office to file.',
  'Atención ciudadana responde dudas de canal y estado.': 'Citizen support answers questions about channels and status.',
  'La publicación abre un plazo legal de oposición.': 'Publication opens a legal opposition period.',
  'Una oposición o un examen de fondo alarga el plazo.': 'An opposition or a substantive examination extends the timeline.',
  'Si rechazan, puedes apelar en el Tribunal de PI.': 'If it is refused, you can appeal before the IP Court.',
  'Un pago fuera de plazo puede dejar sin efecto el trámite.': 'A late payment can void the procedure.',
  'Personas naturales': 'Natural persons',
  'Micro, pequeñas, medianas y grandes empresas': 'Micro, small, medium and large companies',
  'Emprendedores e inventores': 'Entrepreneurs and inventors',
  'Científicos, académicos y representantes legales': 'Scientists, academics and legal representatives',
  'Presentación': 'Overview',
  'Qué, cómo, dónde, cuándo y para quién': 'What, how, where, when and who it is for',
  'Herramientas': 'Tools',
  'Trámites': 'Procedures',
}

export const EN: Record<string, string> = { ...EN_BASE, ...EN_EXTRA }

export function translateText(locale: Locale, text: string): string {
  if (locale === 'es') return text
  const key = normalizeI18nKey(text)
  if (!key) return text
  return EN[key] ?? text
}
