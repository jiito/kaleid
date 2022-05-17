function AABB(min, max) {
  this.min = min || vec3.create(); //vec3
  this.max = max || vec3.create(); // vec3
}

AABB.prototype.hit = function (ray, tmin, tmax) {
  // iterate over dimensions
  for (let d = 0; d < 3; d++) {
    let invD = 1.0 / ray.direction[d];

    let t0 = (this.min[d] - ray.x0[d]) * invD;
    let t1 = (this.max[d] - ray.x0[d]) * invD;

    if (invD < 0.0) {
      let temp = t0;
      t0 = t1;
      t1 = temp;
    }

    tmin = t0 > tmin ? t0 : tmin;
    tmax = t1 < tmax ? t1 : tmax;
    if (tmax <= tmin) {
      return undefined;
    }
  }
  return true;
};
