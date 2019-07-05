import { Measurement } from './measurement';
//import { HttpError } from '../errors';

/**
 * Store the measurements in server's memory
 * key =  String timestamp (ISO format), value = Measurement measurement
 */
var measurements = new Map();

/**
 * Add new measurement
 * @param {Measurement} measurement to be added
 */
export function add(measurement) {
  // add a measurement to the measurements map
  // note: check for valid timestamp is done inside the measurements-route
  if (measurement) {
      let newStringDate =  measurement.timestamp.toISOString();
      measurements.set(newStringDate, measurement);
  }
  //throw new HttpError(501);
}

/**
 * Get existing measurement
 * @param {Date} timestamp when measurement was taken
 * @returns {Measurement} measurement for the particular date
 */
export function fetch(timestamp) {

  // note check for null results already done inside the measurements-route
  let result = measurements.get(timestamp.toISOString());
  return(result);
  // throw new HttpError(501);
}

/**
 * Get the measurements within the given date range
 * @param {Date} from Lower bound for the query, inclusive
 * @param {Date} to Upper bound for the query, exclusive
 * @returns {Array<Measurement>} array of valid Measurements for the date range
 */
export function queryDateRange(from, to) {
   let timelyMeasurements = [];

  // Go through all of the measurements 
  // and locate the ones that fall within the timestamp range
  measurements.forEach((value, key)=>{
    let measurementTime = new Date(key);
    if (measurementTime < to && +measurementTime>= +from){
      timelyMeasurements.push(value);
    }
  })

  return timelyMeasurements;
  // throw new HttpError(501);

}
