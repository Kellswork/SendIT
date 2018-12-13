const userSignup = `INSERT INTO users(firstName, lastName, userName, email, password, phoneNumber)
VALUES($1,$2,$3,$4,$5,$6) RETURNING id, firstname, lastname, userName, email, phoneNumber, isAdmin`;

const userDetails = 'SELECT * FROM users WHERE email = $1';

const fullName = 'SELECT firstname ||\' \'|| lastname as name FROM users WHERE email=$1';

export { userSignup, userDetails, fullName };
