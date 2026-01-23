# Cartelera de la Vecindad

Aplicación híbrida desarrollada con Ionic + Angular que permite gestionar una cartelera de avisos comunitarios, con creación, edición, visualización y eliminación de publicaciones, incluyendo fotos y categorización visual por horario.

## 🚀 Características principales

- CRUD completo de publicaciones (crear, listar, editar, eliminar).
- Captura de foto desde la cámara del dispositivo (Capacitor Camera).
- Persistencia local de datos (Capacitor Preferences).
- Colores dinámicos según horario de publicación (madrugada, mañana, tarde, noche).
- Modal para ver detalles ampliados de cada publicación.
- Formularios reactivos con validación y mensajes de error claros.
- Componentes reutilizables y arquitectura modular.
- App híbrida: ejecutable en navegador, Android e iOS.

## 🛠 Tecnologías utilizadas

- **Ionic Framework 8.x**
- **Angular 17.x**
- **TypeScript 5.x**
- **CapacitorJS 6.x**
- **Node.js** y **NPM**
- **SCSS**
- **RxJS**

## 📂 Estructura del proyecto

```text
src/
├── app/
│   ├── components/
│   │   ├── formulario-publicacion/
│   │   │   ├── formulario-publicacion.component.ts
│   │   │   ├── formulario-publicacion.component.html
│   │   │   └── formulario-publicacion.component.scss
│   │   └── publicacion-item/
│   │       ├── publicacion-item.component.ts
│   │       ├── publicacion-item.component.html
│   │       └── publicacion-item.component.scss
│   ├── home/
│   │   ├── home.page.ts
│   │   ├── home.page.html
│   │   └── home.page.scss
│   ├── models/
│   │   └── publicacion.model.ts
│   ├── services/
│   │   └── publicaciones.service.ts
│   └── app.routes.ts
└── index.html
📸 Funcionalidades clave
Publicaciones:

Título, descripción, imagen en base64, fecha (timestamp).

Ordenadas por fecha (más recientes primero).

Colores por horario:

Madrugada (0–6 h): morado suave.

Mañana (6–12 h): verde suave.

Tarde (12–18 h): naranja suave.

Noche (18–24 h): azul suave.

Validación de formularios:

Título requerido, mínimo 5 caracteres.

Descripción requerida, mínimo 20 caracteres.

Foto obligatoria.

Botón de guardar desactivado si el formulario es inválido.

🔁 Flujo general de la app
El usuario inicia en la pantalla Home, donde ve la lista de publicaciones.

Desde el botón flotante “+” navega al Formulario de Publicación.

Completa título, descripción y captura una foto.

La publicación se guarda mediante el PublicacionesService, que:

Genera un ID único.

Asigna la fecha actual.

Persiste los datos en Capacitor Preferences.

En Home puede:

Ver detalles en un modal.

Editar una publicación existente.

Eliminar una publicación con confirmación previa.

📦 Instalación y ejecución
Clonar el repositorio:

bash
git clone https://github.com/tu-usuario/cartelera-vecindad.git
cd cartelera-vecindad
Instalar dependencias:

bash
npm install
Ejecutar en el navegador (modo desarrollo):

bash
ionic serve
Compilar para producción:

bash
ionic build
(Opcional) Integrar con plataformas móviles:

bash
ionic cap add android
ionic cap add ios
ionic cap sync
🧱 Archivos destacados
app.routes.ts: define las rutas (/home, /nuevo) con lazy loading.

publicacion.model.ts: interfaz Publicacion (id, titulo, descripcion, imagen, fecha).

publicaciones.service.ts: lógica CRUD y acceso a Camera/Preferences.

home.page.*: listado de publicaciones, modal de detalles, confirmación de eliminación.

formulario-publicacion.component.*: formulario reactivo, validación y captura de foto.

publicacion-item.component.*: componente para mostrar cada tarjeta con modal y acciones.

✅ Estado del proyecto
Versión inicial funcional.

CRUD completo operativo.

Persistencia local implementada.
