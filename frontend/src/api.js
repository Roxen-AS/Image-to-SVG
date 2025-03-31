import { GraphQLClient } from "graphql-request";

const client = new GraphQLClient("http://localhost:8000/graphql");

export const uploadImage = async (file) => {
  const query = `
    mutation ($file: Upload!) {
      uploadImage(file: $file) {
        filename
        svgCode
      }
    }
  `;

  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch("http://localhost:8000/graphql", {
    method: "POST",
    body: formData,
  });

  return response.json();
};
