// import all images from assets/images directory
import img02 from '../all-images/cars-img/bmw-offer.png';
import img03 from '../all-images/cars-img/mercedes-offer.png';
import img01 from '../all-images/cars-img/nissan-offer.png';
import img04 from '../all-images/cars-img/offer-toyota.png';
import img05 from '../all-images/cars-img/toyota-offer-2.png';

/*
Carroceria [Sedan, Hatchback, SUV, Crossover, Furgoneta]
Motor [Motor electrico de imanes permanentes, Motor electrico de corriente continua, Motor de Inducción]
Frenos [Frenos de disco en cuatro ruedas, Frenos de tambor, EBA, ABS]
Suspension [Suspencion independiente en cuatro ruedas, Suspensionde doble horquilla, Suspencion MacPherson]
Img Url [img01, img02, img03, img04, img05]
*/

/*
Potencia en kw
Rango en km
Capacidad de la bateria en kwh
Tiempo de carga en horas
*/

const carData = [
  {
    id: 1,
    model: 'EcoPower',
    year: 2020,
    marca: 'CUM',
    carrocesria: 'Sedan',
    puertas: 4,
    motor: 'Motor electrico de imanes permanentes',
    potencia: '100',
    rango: '300',
    capacidad_bateria: '50',
    tiempo_carga: '2',
    velocidad_maxima: '200',
    frenos: 'Frenos de disco en cuatro ruedas',
    suspension: 'Suspencion independiente en cuatro ruedas',
    imgURL: img01,    precio: 20000,
    color: 'amarillo',
    descripcion:
      'Vehículo eléctrico de alta gama con amplio espacio interior y gran autonomía.',
  },
  {
    id: 2,
    model: 'CityRide',
    year: 2022,
    marca: 'CUM',
    carroceria: 'Hatchback',
    puertas: 5,
    motor: 'Motor de Inducción',
    potencia: '80',
    rango: '250',
    capacidad_bateria: '45',
    tiempo_carga: '3',
    velocidad_maxima: '180',
    frenos: 'Frenos de tambor',
    suspension: 'Suspension de doble horquilla',
    imgURL: img02,
    precio: 18000,
    color: 'amarillo',
    descripcion:
      'Compacto y ágil, perfecto para la ciudad con bajo consumo de energía.',
  },
  // Agrega aquí más objetos de carro con diferentes datos
  {
    id: 3,
    model: 'EcoSUV',
    year: 2021,
    marca: 'CUM',
    carroceria: 'SUV',
    puertas: 5,
    motor: 'Motor electrico de corriente continua',
    potencia: '120',
    rango: '350',
    capacidad_bateria: '60',
    tiempo_carga: '4',
    velocidad_maxima: '220',
    frenos: 'EBA',
    suspension: 'Suspension MacPherson',
    imgURL: img03,
    precio: 25000,
    color: 'amarillo',
    descripcion:
      'SUV de alto rendimiento con amplia capacidad de carga y tracción en todas las ruedas.',
  },
  {
    id: 4,
    model: 'UrbanX',
    year: 2023,
    marca: 'CUM',
    carroceria: 'Crossover',
    puertas: 5,
    motor: 'Motor electrico de imanes permanentes',
    potencia: '90',
    rango: '280',
    capacidad_bateria: '55',
    tiempo_carga: '3.5',
    velocidad_maxima: '190',
    frenos: 'ABS',
    suspension: 'Suspension independiente en cuatro ruedas',
    imgURL: img04,
    precio: 22000,
    color: 'amarillo',
    descripcion:
      'Crossover versátil y moderno con diseño aerodinámico y eficiencia energética.',
  },
  {
    id: 5,
    model: 'CargoMax',
    year: 2022,
    marca: 'CUM',
    carroceria: 'Furgoneta',
    puertas: 4,
    motor: 'Motor de Inducción',
    potencia: '110',
    rango: '320',
    capacidad_bateria: '65',
    tiempo_carga: '4.5',
    velocidad_maxima: '200',
    frenos: 'Frenos de disco en cuatro ruedas',
    suspension: 'Suspencion independiente en cuatro ruedas',
    imgURL: img05,
    precio: 28000,
    color: 'amarillo',
    descripcion:
      'Furgoneta espaciosa y robusta con capacidad de carga elevada y tecnología avanzada.',
  },
  {
    id: 6,
    model: 'SportyGT',
    year: 2023,
    marca: 'CUM',
    carroceria: 'Sedan',
    puertas: 4,
    motor: 'Motor electrico de corriente continua',
    potencia: '130',
    rango: '350',
    capacidad_bateria: '70',
    tiempo_carga: '3.5',
    velocidad_maxima: '220',
    frenos: 'Frenos de disco en cuatro ruedas',
    suspension: 'Suspencion independiente en cuatro ruedas',
    imgURL: img01,
    precio: 24000,
    color: 'amarillo',
    descripcion:
      'Sedan deportivo con diseño elegante y rendimiento excepcional en carretera.',
  },
  {
    id: 7,
    model: 'UrbanFun',
    year: 2022,
    marca: 'CUM',
    carroceria: 'Hatchback',
    puertas: 3,
    motor: 'Motor electrico de imanes permanentes',
    potencia: '95',
    rango: '280',
    capacidad_bateria: '50',
    tiempo_carga: '3',
    velocidad_maxima: '200',
    frenos: 'Frenos de tambor',
    suspension: 'Suspension de doble horquilla',
    imgURL: img02,
    precio: 18000,
    color: 'amarillo',
    descripcion:
      'Hatchback ágil y divertido con estilo moderno y eficiencia en el consumo de energía.',
  },
  {
    id: 8,
    model: 'PowerMax',
    year: 2023,
    marca: 'CUM',
    carroceria: 'SUV',
    puertas: 5,
    motor: 'Motor electrico de imanes permanentes',
    potencia: '150',
    rango: '400',
    capacidad_bateria: '80',
    tiempo_carga: '5',
    velocidad_maxima: '240',
    frenos: 'EBA',
    suspension: 'Suspension MacPherson',
    imgURL: img03,
    precio: 30000,
    color: 'amarillo',
    descripcion:
      'SUV de lujo y alto rendimiento con amplio espacio interior y tecnología avanzada.',
  },
  {
    id: 9,
    model: 'CompactCity',
    year: 2021,
    marca: 'CUM',
    carroceria: 'Crossover',
    puertas: 5,
    motor: 'Motor de Inducción',
    potencia: '85',
    rango: '250',
    capacidad_bateria: '40',
    tiempo_carga: '2.5',
    velocidad_maxima: '180',
    frenos: 'ABS',
    suspension: 'Suspension independiente en cuatro ruedas',
    imgURL: img04,
    precio: 20000,
    color: 'amarillo',
    descripcion:
      'Crossover compacto y ágil, perfecto para la ciudad con bajo consumo de energía.',
  },
  {
    id: 10,
    model: 'CargoPro',
    year: 2022,
    marca: 'CUM',
    carroceria: 'Furgoneta',
    puertas: 3,
    motor: 'Motor de Inducción',
    potencia: '120',
    rango: '350',
    capacidad_bateria: '60',
    tiempo_carga: '4',
    velocidad_maxima: '200',
    frenos: 'Frenos de disco en cuatro ruedas',
    suspension: 'Suspencion independiente en cuatro ruedas',
    imgURL: img05,
    precio: 26000,
    color: 'amarillo',
    descripcion:
      'Furgoneta espaciosa y versátil con capacidad de carga elevada y tecnología avanzada.',
  },
  
];

export default carData;
