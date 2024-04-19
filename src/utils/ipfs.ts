import { PINATA_KEY } from "../constants/config";
import axios from 'axios';

/**
 * 
 * @param {*} data data to upload file to IPFS
 * @param {*} progress callback to display progress (progress: number) => {}
 * @returns Promise
 */
export const uploadToIPFS = (data: string, progress: any) => new Promise(async(resolve, reject) => {
    const formData = new FormData();
    formData.append('file', data)
    formData.append('pinataMetadata', JSON.stringify({ name: 'mint.bidify.cloud' }));
    formData.append('pinataOptions', JSON.stringify({ cidVersion: 0 }));
    
    const res = await axios.post('https://api.pinata.cloud/pinning/pinFileToIPFS', formData, {
        //@ts-ignore
        maxBodyLength: "Infinity",
        headers: {
            //@ts-ignore
            'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
            'Authorization' : `Bearer ${PINATA_KEY}`,
        },
        onUploadProgress: progress
    }).catch(err => {
        reject("IPFS projectInfo upload failed");
    });
    //@ts-ignore
    resolve("https://ipfs.io/ipfs/" + res.data.IpfsHash);
});