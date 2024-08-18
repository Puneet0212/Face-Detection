import '@tensorflow/tfjs-node';

import * as faceapi from 'face-api.js';

import { canvas, faceDetectionNet, faceDetectionOptions, saveFile } from '../commons';

const REFERENCE_IMAGE = './images/pan3.jpg'
const QUERY_IMAGE = './images/grp4.jpg'


export const faceRecognition = async (known : string, unknown: string) => {

  await faceDetectionNet.loadFromDisk('./weights')
  await faceapi.nets.faceLandmark68Net.loadFromDisk('./weights')
  await faceapi.nets.faceRecognitionNet.loadFromDisk('./weights')

  const referenceImage = await canvas.loadImage(known || REFERENCE_IMAGE) as unknown as HTMLImageElement;
  const queryImage = await canvas.loadImage(unknown || QUERY_IMAGE)as unknown as HTMLImageElement;

  const resultsRef = await faceapi.detectAllFaces(referenceImage, faceDetectionOptions)
    .withFaceLandmarks()
    .withFaceDescriptors()

  const resultsQuery = await faceapi.detectAllFaces(queryImage, faceDetectionOptions)
    .withFaceLandmarks()
    .withFaceDescriptors()

  const faceMatcher = new faceapi.FaceMatcher(resultsRef)

  const bestMatch = faceMatcher.findBestMatch(resultsQuery[0].descriptor)
  console.log("***** Works For ONLY ONE FACE *****")
  console.log(bestMatch.label," : ",bestMatch.distance);

  return bestMatch.distance;

}
