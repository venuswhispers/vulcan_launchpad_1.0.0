// //@ts-nocheck
// import React from 'react';
// import ReactCrop, { type Crop } from 'react-image-crop'

// const Cropper = () => {
//   const [crop, setCrop] = React.useState<Crop>({
//     unit: '%', // Can be 'px' or '%'
//     x: 25,
//     y: 25,
//     width: 50,
//     height: 50
//   });

//   const [completedCrop, setCompletedCrop] = React.useState<Crop|undefined>(undefined);
//   const previewCanvasRef = React.useRef(null);
//   const imgRef = React.useRef(null);
//   const [previewUrl, setPreviewUrl] = React.useState();

//   const onSelectFile = e => {
//     if (e.target.files && e.target.files.length > 0) {
//       const reader = new FileReader();
//       reader.addEventListener('load', () => setUpImg(reader.result));
//       reader.readAsDataURL(e.target.files[0]);
//     }
//   };



//   const makeClientCrop = async crop => {
//     createCropPreview(imgRef.current, crop, 'newFile.jpeg');
//   };

//   const createCropPreview = async (image, crop, fileName) => {
//     const canvas = document.createElement('canvas');
//     const scaleX = image.naturalWidth / image.width;
//     const scaleY = image.naturalHeight / image.height;
//     canvas.width = crop.width;
//     canvas.height = crop.height;
//     const ctx = canvas.getContext('2d');

//     ctx.drawImage(
//       image,
//       crop.x * scaleX,
//       crop.y * scaleY,
//       crop.width * scaleX,
//       crop.height * scaleY,
//       0,
//       0,
//       crop.width,
//       crop.height
//     );

//     return new Promise((resolve, reject) => {
//       canvas.toBlob(blob => {
//         if (!blob) {
//           reject(new Error('Canvas is empty'));
//           return;
//         }
//         blob.name = fileName;
//         window.URL.revokeObjectURL(previewUrl);
//         setPreviewUrl(window.URL.createObjectURL(blob));

//         const img = new Image()
//         img.onload = function() {
//           const _img: HTMLImageElement = this
//           console.log('onload', _img.width, _img.height)
//         }
//         img.src = window.URL.createObjectURL(blob)
//       }, 'image/jpeg');
//     });
//   };

//   return (
//     <div className='fixed top-0 right-0 bottom-0 left-0 backdrop-filter backdrop-blur-[5px] z-50 flex justify-center items-center'>
//       <div className='flex flex-col px-8 py-10 rounded-xl bg-[#1A1D21]'>
//         <ReactCrop 
//           aspect={1.5/1} 
//           style={{width:'400px', height: '400px'}} 
//           crop={crop} 
//           // onImageLoaded={onLoad}
//           onChange={c => setCrop(c)}
//           onComplete={makeClientCrop}
//         >
//           <img ref={imgRef} className='w-full h-full object-contain' src={'/images/preview.png'} />
//         </ReactCrop>
//         {previewUrl && <img alt="Crop preview" src={previewUrl} />}

//       </div>
//     </div>
//   )
// }

// export default Cropper;