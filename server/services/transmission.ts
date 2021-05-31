import Transmission from 'transmission-promise';

const {
  TRANSMISSION_HOST,
  TRANSMISSION_PORT,
  TRANSMISSION_PASSWORD,
  TRANSMISSION_USERNAME,
} = process.env;

const transmission = new Transmission({
  host: TRANSMISSION_HOST,
  port: TRANSMISSION_PORT,
  username: TRANSMISSION_USERNAME,
  password: TRANSMISSION_PASSWORD,
});

export default transmission;
