'use strict';

module.exports = (drivers, conf = {}) => {
  const configuredDrivers = Object
    .entries(drivers)
    .reduce((acc, [name, constr]) => Object.assign(acc, {
      [name]: new constr(conf[name]) // eslint-disable-line new-cap
    }), {});

  return (event, context, next) => {
    if (context.drivers) {
      // eslint-disable-next-line no-param-reassign
      context.drivers = Object.assign({}, configuredDrivers, context.drivers);
    } else {
      Object.assign(context, { drivers: configuredDrivers });
    }

    return next(null, context);
  };
};
