export const colorNameToCode = (colorName) => {
  switch (colorName.toLowerCase()) {
    case 'rojo':
      return '#FF0000';
    case 'azul':
      return '#0000FF';
    case 'dorado':
      return '#BF930D';
    case 'negro':
      return '#000000';
    case 'gris':
      return '#AAADAC';
    default:
      return '';
  }
};

export const codeToColorName = (colorCode) => {
  switch (colorCode) {
    case '#FF0000':
      return 'rojo';
    case '#0000FF':
      return 'azul';
    case '#000000':
      return 'negro';
    case '#BF930D':
      return 'dorado';
    case '#AAADAC':
      return 'gris';
    default:
      return '';
  }
};


export const colorOptions = ['#FF0000', '#0000FF', '#BF930D', '#000000', '#AAADAC'];
