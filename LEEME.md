# Ecografías — guía de instalación (versión 4)

## Novedades de la versión 4
- **Ícono nuevo** (equipo de ecografía) para el Dock, la pantalla de inicio y la pestaña del navegador.
- **Mensajes de conexión claros:** si la sincronización falla, la app explica la causa probable en vez de mostrar «Failed to fetch».

**Para actualizar:** sube a GitHub `index.html`, `sw.js`, `version.json`, `manifest.webmanifest` y los 5 archivos `.png`. `Code.gs` no cambia. Después ve a **Ajustes → Buscar actualización**.

**El ícono ya instalado no cambia solo:** Mac e iPhone lo guardan al momento de agregar la app.
- **Mac:** quita la app del Dock y bórrala de la carpeta **Aplicaciones** de tu usuario (`~/Aplicaciones`). Luego ábrela en Safari y usa **Archivo → Agregar al Dock**.
- **iPhone:** mantén presionado el ícono → **Eliminar app** → **Eliminar de la pantalla de inicio**. Luego ábrela en Safari → **Compartir → Agregar a pantalla de inicio**.
- **Los datos no se pierden si la sincronización está configurada.** Si no lo está, primero ve a **Ajustes → Exportar datos (.json)**.


## Novedades de la versión 3

- **Montos líquidos:** todos los montos estimados descuentan la retención de la boleta de honorarios (15,25% en 2026, 16% en 2027, 17% desde 2028), según el año del día trabajado. Se muestran también el bruto y la retención. Las tasas se editan en **Ajustes**, y cada centro puede desactivar la retención en **Valores**.
- **Tarifas con vigencia:** en **Valores → + Nueva tarifa** eliges desde qué fecha rige. Los días anteriores conservan el valor que tenían.
- **Horas trabajadas:** campo opcional al registrar un día. La app calcula ecografías por hora y líquido por hora, por centro y por mes.
- **Casuística:** pestaña nueva con totales por tipo, por año y, en partes blandas/MSK, por región (hombro, rodilla, etc.). Se exporta a Excel.
- **Atajos de iOS y Siri:** suma ecografías sin abrir la app. Las instrucciones están en **Ajustes → Atajos de iOS y Siri**.
- **Conexión con finanzas:** la hoja de Google tiene una pestaña nueva, **Resumen mensual** (bruto, retención y líquido por centro y mes), y la dirección de sincronización entrega ese resumen a la app de finanzas.

### Cómo actualizar desde la versión 2
1. Sube a GitHub `index.html`, `sw.js` y `version.json`.
2. En Apps Script, reemplaza todo el contenido por el nuevo `Code.gs`, guarda y ejecuta una vez `configurar`, que crea las pestañas nuevas. Luego ve a **Implementar → Gestionar implementaciones → Editar (lápiz) → Versión: Nueva versión → Implementar**. La dirección `/exec` no cambia.
3. En la app: **Ajustes → Buscar actualización**.
4. Revisa en **Valores** que tus centros tengan la casilla de boleta como corresponde.


La app tiene dos partes:
- **La app** (`index.html` y demás archivos), alojada en GitHub Pages e instalada en el iPhone y el Mac. Funciona sin internet.
- **La sincronización** (`Code.gs`), un script de Google Apps Script que guarda tus datos en una hoja de Google de tu cuenta.

Tus datos nunca quedan en GitHub: solo en tus dispositivos y en tu hoja de Google.

## 1. Subir la app a GitHub

**Si ya subiste la versión 1:** en tu repositorio, usa **Add file → Upload files**, sube todos los archivos del ZIP (reemplazan a los anteriores) y toca **Commit changes**.

**Si es la primera vez:**
1. En github.com: **+ → New repository**, por ejemplo `ecografias`, **Public**, **Create repository**.
2. **Add file → Upload files**: arrastra todos los archivos del ZIP, menos `Code.gs` y `LEEME.md` (no hacen daño si los subes). Luego **Commit changes**.
3. **Settings → Pages → Deploy from a branch → main / (root) → Save**.
4. En uno o dos minutos tendrás la dirección `https://TU-USUARIO.github.io/ecografias/`.

## 2. Crear la sincronización en Apps Script (una sola vez)

1. Abre **script.google.com → Nuevo proyecto**. Ponle de nombre «Ecografías».
2. Borra el contenido de `Código.gs` y pega el contenido de `Code.gs`. Guarda (⌘S).
3. Arriba, elige la función **configurar** y toca **Ejecutar**.
   - Google pedirá permisos: **Revisar permisos → tu cuenta → Configuración avanzada → Ir a Ecografías → Permitir**. El aviso aparece porque el script es tuyo y no está publicado.
4. Abre el **Registro de ejecución**: ahí aparecen el **TOKEN** y el enlace a la hoja «Ecografías — datos de la app». Copia el token.
5. **Implementar → Nueva implementación**.
   - Tipo: **Aplicación web**.
   - Ejecutar como: **Yo**.
   - Quién tiene acceso: **Cualquier usuario**. Sin el token nadie puede leer ni escribir tus datos.
   - Toca **Implementar** y copia la dirección que termina en **/exec**.

## 3. Instalar y conectar

**iPhone:** abre la dirección de GitHub en **Safari → Compartir → Agregar a pantalla de inicio**. Abre la app desde el ícono una vez con internet.

**Mac (macOS Sonoma o posterior):** en Safari, **Archivo → Agregar al Dock**.

**Primer dispositivo:** en la app, ve a **Ajustes**, pega la dirección `/exec` y el token, y toca **Guardar y probar conexión**. Lo que ya tenías registrado se sube a la hoja.

**Los demás dispositivos:**
1. En el que ya está conectado: **Ajustes → Copiar código para otro dispositivo**.
2. Pásalo al otro (AirDrop o Notas) y pégalo en **Ajustes → En el dispositivo nuevo → Conectar**.

## Cómo funciona la sincronización

- La app sincroniza al abrirse, al volver internet, al volver a la app después de un minuto y cada 15 minutos mientras está abierta.
- Lo que editas se sube unos segundos después. Para forzarla, toca el estado bajo el título o usa ⌘R en el Mac.
- Sin internet todo sigue funcionando; los cambios quedan pendientes y se suben solos.
- Si editas el mismo día en dos dispositivos sin conexión, queda la última edición.
- En la hoja de Google, la pestaña **Días** muestra una tabla legible (fecha, centro, cantidades y monto estimado). No edites la pestaña **registros**: es la que usa la app.

## Actualizar la app

Cuando te entregue una versión nueva:
1. Sube a GitHub los archivos que cambien (siempre `index.html`, `sw.js` y `version.json`).
2. Si también cambia `Code.gs`: pégalo en Apps Script y ve a **Implementar → Gestionar implementaciones → Editar (lápiz) → Versión: Nueva versión → Implementar**. La dirección `/exec` no cambia.
3. En la app: **Ajustes → Buscar actualización**. Al abrirla con internet también aparece un aviso cuando hay una versión nueva.

## Exportar e importar datos

En **Ajustes → Exportar e importar datos**:
- **Exportar datos (.json):** copia completa de centros, valores, días y reglas del importador.
- **Exportar todo el historial (Excel):** resumen y desglose de todos los meses.
- **Importar datos (.json):** elige **Combinar** (agrega a lo que tienes) o **Reemplazar todo**.

## Mantenimiento

- **Volver a descargar todo desde la hoja:** útil si un dispositivo quedó raro.
- **Empezar de cero:** borra todo, también en la hoja y en los otros dispositivos. Pide escribir BORRAR.
- **Cambiar el token** (si lo compartiste por error): en Apps Script ejecuta `cambiarToken` y pega el nuevo en Ajustes de cada dispositivo.

## Privacidad

- La app solo guarda fechas, centros, conteos y valores. Al importar un Excel del RIS, las columnas con nombres, RUT u otros datos del paciente se ignoran y no se guardan.
- El código de GitHub no contiene datos ni el token.
