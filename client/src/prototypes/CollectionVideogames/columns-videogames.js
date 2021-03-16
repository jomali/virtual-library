export const videogameColumns = [
  {
    label: 'Título',
    prop: 'title',
    style: { fontWeight: 700 },
  },
  {
    format: (developers) => {
      let result = '';
      if (developers && developers.length > 0) {
        result = developers[0].name;
        if (developers.length > 1) {
          result += '…';
        }
      }
      return result;
    },
    label: 'Desarrollador(es)',
    prop: 'developers',
  },
  {
    format: (publishers) => {
      let result = '';
      if (publishers && publishers.length > 0) {
        result = publishers[0].name;
        if (publishers.length > 1) {
          result += '…';
        }
      }
      return result;
    },
    label: 'Distribuidora(s)',
    prop: 'publishers',
  },
  {
    format: (platforms) => {
      let result = '';
      if (platforms && platforms.length > 0) {
        result = (platforms[0].shortName) ? platforms[0].shortName : platforms[0].name;
        if (platforms.length > 1) {
          result += '…';
        }
      }
      return result;
    },
    label: 'Plataforma(s)',
    prop: 'platforms',
  },
  // {
  //   format: (release) => (release[0]) ? release[0].date : null,
  //   label: 'Fecha',
  //   prop: 'release',
  // },
  // {
  //   format: (series) => (series) ? series.title : null,
  //   label: 'Serie',
  //   prop: 'series',
  //   style: { fontStyle: 'italic' },
  // },
  // {
  //   format: (engine) => (engine) ? engine.name : null,
  //   label: 'Motor',
  //   prop: 'engine',
  // },
  // {
  //   format: (completed) => (completed) ? 'Si' : 'No',
  //   label: 'Completado',
  //   prop: 'completed',
  // },
];
