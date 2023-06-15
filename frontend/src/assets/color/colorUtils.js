export const colorNameToCode = (colorName) => {
  switch (colorName.toLowerCase()) {
    case 'Rojo':
      return '#FF0000';
    case 'Azul':
      return '#0000FF';
    case 'Dorado':
      return '#BF930D';
    case 'Negro':
      return '#000000';
    case 'Gris':
      return '#AAADAC';
    default:
      return '';
  }
};

export const codeToColorName = (colorCode) => {
  switch (colorCode) {
    case '#FF0000':
      return 'Rojo';
    case '#0000FF':
      return 'Azul';
    case '#000000':
      return 'Negro';
    case '#BF930D':
      return 'Dorado';
    case '#AAADAC':
      return 'Gris';
    default:
      return '';
  }
};


export const colorOptions = ['#FF0000', '#0000FF', '#BF930D', '#000000', '#AAADAC'];
