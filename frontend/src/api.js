import { request, gql } from "graphql-request";

const API_URL = "http://localhost:8000/graphql";

const UPLOAD_IMAGE_MUTATION = gql`
  mutation UploadImage($file: Upload!) {
    uploadImage(file: $file) {
      filename
      extracted_text
    }
  }
`;

export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(API_URL, {
    method: "POST",
    body: formData,
  });

  return response.json();
};
