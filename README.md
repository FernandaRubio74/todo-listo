# Todo Listo - App para organizar tareas

Aplicación web simple de **Gestión de Tareas** construida con **React**, **Tailwind CSS** y un **backend en NestJS + SQLite**.  
Los usuarios pueden **registrarse, iniciar sesión, crear, editar, completar y eliminar tareas**, organizadas en listas de **Pendientes** y **Completadas**.

---

## Características

- Autenticación de usuarios:
  - Registro
  - Inicio de sesión
  - Cierre de sesión
- Gestión de tareas:
  - Crear nuevas tareas
  - Editar tareas existentes
  - Marcar tareas como completadas / pendientes
  - Eliminar tareas
- Las tareas se muestran en dos secciones:
  - **Pendientes**
  - **Completadas**
- UI responsiva con **Tailwind CSS**
- Formularios en modales para crear/editar tareas
- Actualización en tiempo real en la UI después de acciones sobre las tareas

---

## Tecnologías

**Frontend:**
- React
- React Router
- Tailwind CSS
- Axios
- Lucide React icons

**Backend:**
- NestJS
- TypeORM
- SQLite
- JWT Authentication

---

## Instalación

### Requisitos
- Node.js (v18+ recomendado)
- npm o yarn

### Pasos

1. **Clonar el repositorio backend y frontend (se necesita ejecutar ambos):**
**Backend**
```bash
git clone <https://github.com/FernandaRubio74/todo-app >
cd todo-app
```
**Frontend**
```bash
git clone <https://github.com/FernandaRubio74/todo-listo >
cd todo-listo
```
2. **Instalar dependencias:**

**Frontend:**
```bash
cd todo-listo
npm install
```

**Backend:**
```bash
cd todo-app
npm install
```

3. **Iniciar el backend primero:**
```bash
cd todo-app
npm run start:dev
```
El backend correrá por defecto en `http://localhost:3000`.
Para ver la documentación (Swagger) del backend `http://localhost:3000/api`.

4. **Iniciar el frontend:**
```bash
cd todo-listo
npm run dev
```
El frontend se abrirá en `http://localhost:5173` (u otro puerto si 5173 está ocupado).

> **Importante:** El proyecto no funcionará correctamente si el backend no está iniciado primero.

---

## Uso

1. Abrir el frontend en el navegador.
2. **Registrarse** o **iniciar sesión**.
3. Agregar tareas usando el botón **Nueva Tarea**.
4. Marcar tareas como **completadas** haciendo clic en el checkbox.
5. Editar o eliminar tareas usando los botones correspondientes.
6. Cerrar sesión con el botón **Logout** para volver a la pantalla de login.

---

## Estructura del Proyecto

```
frontend/
│
├─ src/
│  ├─ api/
│  │  ├─ axiosConfig.js
│  │  ├─ authService.js
│  │  └─ taskService.js
|  ├─ pages/
|  |  ├─ HomePage.jsx
│  │  ├─ LoginPage.jsx
│  │  ├─ RegisterPage.jsx
│  ├─ components/
│  │  ├─ TaskItem.jsx
│  │  └─ TaskModal.jsx
│  └─ App.jsx
└─ package.json
```

---

## Mejoras Futuras

- Agregar **fechas de vencimiento** y **prioridades** a las tareas.
- Añadir **filtros y búsqueda** de tareas.
- Integrar **notificaciones** para tareas pendientes.

---


