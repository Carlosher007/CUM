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
    modelo: 'EcoPower',
    year: 2020,
    marca: 'CUM',
    carrocesria: 'Sedan',
    puertas: 4,
    motor: 'Motor electrico de imanes permanentes',
    potencia: '100',
    rango: '300',
    capacidadBateria: '50',
    tiempoCarga: '2',
    velocidadMax: '200',
    frenos: 'Frenos de disco en cuatro ruedas',
    suspension: 'Suspencion independiente en cuatro ruedas',
    imgURL: img01,    precio: 20000,
    color: 'amarillo',
    descripcion:
      'Vehículo eléctrico de alta gama con amplio espacio interior y gran autonomía.',
  },
  {
    id: 2,
    modelo: 'CityRide',
    year: 2022,
    marca: 'CUM',
    carroceria: 'Hatchback',
    puertas: 5,
    motor: 'Motor de Inducción',
    potencia: '80',
    rango: '250',
    capacidadBateria: '45',
    tiempoCarga: '3',
    velocidadMax: '180',
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
    modelo: 'EcoSUV',
    year: 2021,
    marca: 'CUM',
    carroceria: 'SUV',
    puertas: 5,
    motor: 'Motor electrico de corriente continua',
    potencia: '120',
    rango: '350',
    capacidadBateria: '60',
    tiempoCarga: '4',
    velocidadMax: '220',
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
    modelo: 'UrbanX',
    year: 2023,
    marca: 'CUM',
    carroceria: 'Crossover',
    puertas: 5,
    motor: 'Motor electrico de imanes permanentes',
    potencia: '90',
    rango: '280',
    capacidadBateria: '55',
    tiempoCarga: '3.5',
    velocidadMax: '190',
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
    modelo: 'CargoMax',
    year: 2022,
    marca: 'CUM',
    carroceria: 'Furgoneta',
    puertas: 4,
    motor: 'Motor de Inducción',
    potencia: '110',
    rango: '320',
    capacidadBateria: '65',
    tiempoCarga: '4.5',
    velocidadMax: '200',
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
    modelo: 'SportyGT',
    year: 2023,
    marca: 'CUM',
    carroceria: 'Sedan',
    puertas: 4,
    motor: 'Motor electrico de corriente continua',
    potencia: '130',
    rango: '350',
    capacidadBateria: '70',
    tiempoCarga: '3.5',
    velocidadMax: '220',
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
    modelo: 'UrbanFun',
    year: 2022,
    marca: 'CUM',
    carroceria: 'Hatchback',
    puertas: 3,
    motor: 'Motor electrico de imanes permanentes',
    potencia: '95',
    rango: '280',
    capacidadBateria: '50',
    tiempoCarga: '3',
    velocidadMax: '200',
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
    modelo: 'PowerMax',
    year: 2023,
    marca: 'CUM',
    carroceria: 'SUV',
    puertas: 5,
    motor: 'Motor electrico de imanes permanentes',
    potencia: '150',
    rango: '400',
    capacidadBateria: '80',
    tiempoCarga: '5',
    velocidadMax: '240',
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
    modelo: 'CompactCity',
    year: 2021,
    marca: 'CUM',
    carroceria: 'Crossover',
    puertas: 5,
    motor: 'Motor de Inducción',
    potencia: '85',
    rango: '250',
    capacidadBateria: '40',
    tiempoCarga: '2.5',
    velocidadMax: '180',
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
    modelo: 'CargoPro',
    year: 2022,
    marca: 'CUM',
    carroceria: 'Furgoneta',
    puertas: 3,
    motor: 'Motor de Inducción',
    potencia: '120',
    rango: '350',
    capacidadBateria: '60',
    tiempoCarga: '4',
    velocidadMax: '200',
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
