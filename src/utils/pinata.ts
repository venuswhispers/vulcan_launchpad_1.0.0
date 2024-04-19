import axios from "axios";
import { PINATA_KEY } from "@/constants/config";
export const uploadToPinata = async (data: string, onProgress?: any) => {
  try {
    const formData = new FormData();
    const base64Response = await fetch(data);
    const newBlob = await base64Response.blob();
    formData.append("file", newBlob);
    const { data: res } = await axios
      .post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
        headers: {
          //@ts-ignore
          "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
          Authorization: `Bearer ${PINATA_KEY}`,
        },
        onUploadProgress: onProgress,
      });
    return Promise.resolve(`https://ipfs.io/ipfs/${res.IpfsHash}`);
  } catch (err) {
    console.log(err)
    return Promise.reject("failed")
  }
};