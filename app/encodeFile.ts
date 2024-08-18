// http://www.hacksparrow.com/base64-encoding-decoding-in-node-js.html
import fs from 'fs';


export const encodeFile = () => {

    // function to encode file data to base64 encoded string
function base64_encode(file:any) {
    // read binary data
    const bitmap = fs.readFileSync(file);
    // convert binary data to base64 encoded string
    return new Buffer(bitmap).toString('base64');
}

// function to create file from base64 encoded string
function base64_decode(base64str:string, file:any) {
    // create buffer object from base64 encoded string, it is important to tell the constructor that the string is base64 encoded
    const bitmap = new Buffer(base64str, 'base64');
    // write buffer to file
    fs.writeFileSync(file, bitmap);
    console.log('******** File created from base64 encoded string ********');
}

// convert image to base64 encoded string
const base64strFile = base64_encode('./images/bbt1.jpg');
console.log(base64strFile);
// convert base64 string back to image
base64_decode(base64strFile, './out/sample.png');

}
