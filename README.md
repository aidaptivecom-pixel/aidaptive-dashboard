# Aidaptive Dashboard

Panel de control para el sistema de automatizacion WhatsApp de **Aidaptive**.

## Descripcion

Dashboard moderno para visualizar y gestionar conversaciones automatizadas de WhatsApp:

- **KPIs en tiempo real**: Conversaciones, turnos, tasa de resolucion
- **Graficos de actividad**: Mensajes totales vs. resueltos automaticamente
- **Tabla de conversaciones**: Actividad reciente con estado de cada interaccion
- **Gestion de agentes**: Visualizacion de que agente maneja cada conversacion

## Stack Tecnologico

- **React 18** + TypeScript
- **Tailwind CSS** para estilos
- **Recharts** para graficos
- **Lucide React** para iconos
- **Vite** como bundler

## Instalacion

```bash
git clone https://github.com/aidaptivecom-pixel/aidaptive-dashboard.git
cd aidaptive-dashboard
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Personalizacion

Colores en `tailwind.config.js`:

```javascript
colors: {
  primary: {
    DEFAULT: '#722F37', // Bordo Aidaptive
    light: '#8B3A44',
    dark: '#5A252C',
  }
}
```

---

**Desarrollado para [InfoPartes](https://infopartes.com.ar)** - Servicio Tecnico Apple

Powered by **Aidaptive**