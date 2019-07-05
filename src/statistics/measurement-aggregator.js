// import { HttpError } from '../errors';
import { Measurement } from '../measurements/measurement';

/**
 * Compute statistics for given measurements
 * @param {Measurement} measurements
 * @param {String[]} metrics
 * @param {String[]} stats
 * @return {Objects[]}
 */
export function computeStats(measurements, metrics, stats) {
    
  // We will pass back an array of statistics
  let statistics = [];

  // 1. loop through the metrics
  for (let i=0; i<metrics.length; i++)
  {
    let vals = [];
    // 2. loop through all measurements grabbing their value for a given metric
    for (let j=0; j<measurements.length; j++)
    {
      let newVal = measurements[j].metrics.get(metrics[i]);
      // if there is a value found push it into the vals array
      if (newVal){
       vals.push(measurements[j].metrics.get(metrics[i]));         
      }
    }
    
    // if we have values
    if (vals.length > 0){
    
        // 3. loop through the stats
        let newStat = 0.0;
        for (let k=0; k<stats.length; k++)
        {
          switch(stats[k]){
            case "min":
                newStat = Math.min(...vals);
              break;
            case "max":
                newStat= Math.max(...vals);
              break;
            case "average":
                newStat= calcAverage(vals);
              break;
          }
         // 4. Now we have the required data to save the stat
         statistics.push({   
          metric : metrics[i], // i.e. temperature
          stat: stats[k], // i.e. average
          value: newStat // i.e. the value of average temperature
          });
        }
     }
  }

  return statistics;
  // throw new HttpError(501);
}

/**
 * Compute average for given numbers
 * @param {Numbers[]} nums
 * @return {Number} average The average of the nums with a precision of 2 decimal places
 */
function calcAverage(nums){
  var total = 0;
  for (let i=0; i<nums.length; i++)
  {
    total = total + nums[i];
  }
  return (parseFloat((total/nums.length).toFixed(2)));
}