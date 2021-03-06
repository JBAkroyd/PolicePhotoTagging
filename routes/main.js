
module.exports = app => {
	//login a user
	require('./login')(app);
	// register a user
	require('./reg')(app);
	// Adding to the S3 Bucket
	require('./bucket')(app);
	// Updating the imageName Array in the Tags group
	require('./update')(app);
	// search mongo for  immagename array
	require('./search')(app);
};
