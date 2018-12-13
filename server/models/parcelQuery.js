const createParcel = 'INSERT INTO parcels( name,placedBy, weight, weightMetric, price, pickupAddress, destinationAddress, reciever, phoneNumber) VALUES($1,$2,$3,$4,$5,$6,$7,$8, $9) RETURNING *';
const parcel = 'SELECT * FROM parcels WHERE id = $1';

const userParcel = 'select * from parcels where placedBy = $1';

const getParcel = 'SELECT * FROM parcels LIMIT 6';

const cancelParcel = 'UPDATE parcels SET status = $1 WHERE id = $2';

const updateDestination = 'UPDATE parcels SET destinationAddress = $1 WHERE id = $2';

const updateLocation = 'UPDATE parcels SET currentLocation = $1 WHERE id = $2';

const updateStatus = 'UPDATE parcels SET status = $1 WHERE id = $2';

export {
  createParcel, parcel, userParcel, getParcel, cancelParcel,
  updateDestination, updateLocation, updateStatus,
};
