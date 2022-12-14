const aws = require('aws-sdk')

aws.config.update({
    accessKeyId:"AKIAXESS2UIQN57XVYPY",
    secretAccessKey:"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",
    region:"ap-south-1"
  })
  
let uploadFile = async(file) => {
    return new Promise(function(resolve, reject) {
        // Create S3 service object
        let s3 = new aws.S3({ apiVersion: "2006-03-01" });

        var uploadParams={
            Bucket: "book-management-book-covers",  
            Key:"assignment-4/" + file.originalname,
            Body:file.buffer
        }
        // Callback - function provided as the second parameter ( most oftenly)
        s3.upload(uploadParams, function(err, data) {
            if (err) {
                return reject({ "error": err });
            }              
            // console.log(data) 
            console.log(`File uploaded successfully. ${data.Location}`);
            return resolve(data.Location);
        });
    });
};
module.exports = { uploadFile }