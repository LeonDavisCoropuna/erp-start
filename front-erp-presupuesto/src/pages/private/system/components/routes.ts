export const routes = [
  {
    title: "Datos",
    route: "datos",
    hasMenu: true,
    menu: [
      { title: "Clientes", hasMenu: false, route: "datos/clientes" },
      {
        title: "Articulos",
        hasMenu: false,
        route: "datos/articulos",
      },
      {
        title: "Ver Stock",
        hasMenu: false,
        route: "datos/stock",
      },
      {
        title: "Familia de Articulos",
        hasMenu: false,
        route: "datos/familias",
      },
      {
        title: "Unidades de Medida",
        hasMenu: false,
        route: "datos/unidades",
      },
    ],
  },
  {
    title: "Procesos",
    hasMenu: true,
    route: "procesos",
    menu: [
      {
        title: "Nuevo Presupuesto",
        hasMenu: false,
        route: "procesos/nuevo",
      },
      {
        title: "Plantillas",
        hasMenu: false,
        route: "procesos/plantillas",
      },
      {
        title: "Presupuestos",
        hasMenu: false,
        route: "procesos/presupuestos",
      },
    ],
  },
];
