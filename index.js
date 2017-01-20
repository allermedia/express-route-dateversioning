/**
 * Express middleware for date based route versioning
 * 
 */
const middleware = function version_middleware(routing) {
  
  // Switch object to array for iteration purposes
  let versions = [];
  for(let version in routing) {
    
    // Make sure each date is valid and push to array
    let dateMS = Date.parse(version);
    if(Number.isNaN(dateMS)) { throw new Error(`"${version}" is not valid version string.`); }
    versions.push({date: dateMS, router: routing[version]});
  }

  // Sort the versions in descending order
  versions.sort((a, b) => {
    return a.date > b.date;
  });
  

  return function(req, res, next) {
    let requestedVersion = req.query.apiversion || req.headers['aller-apiversion'];
    if(!requestedVersion) { return next(); }

    // Make sure requested version is valid
    let requestedVersionMS = Date.parse(requestedVersion);
    if(Number.isNaN(requestedVersionMS)) { return next(Error(`"${requestedVersion}" is not valid version string.`)); }
    
    // Look for first version that is old enough
    let hit;
    for(let i = 0; i < versions.length; i++) {
      if(versions[i].date <= requestedVersionMS) {
        hit = versions[i];
        continue; // Found one, GTFO
      }
    }

    // If we found one, trigger it. If not, pass forwards with error
    if(hit) {
      hit.router(req, res, next);
    } else {
      next(new Error('No matching version found.'));
    }
  }
}


module.exports = middleware;
