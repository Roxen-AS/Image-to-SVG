import uuid
from pathlib import Path
from fastapi import FastAPI, UploadFile, File, HTTPException
import strawberry
from strawberry.fastapi import GraphQLRouter
from PIL import Image
import torch
from transformers import AutoModelForCausalLM, AutoProcessor


MODEL_NAME = "starvector/starvector-8b-im2svg"  
model = AutoModelForCausalLM.from_pretrained(
    MODEL_NAME, 
    torch_dtype=torch.float16, 
    trust_remote_code=True  
)
processor = AutoProcessor.from_pretrained(MODEL_NAME)

model.cuda()
model.eval()


app = FastAPI()

UPLOAD_DIR = Path("./uploads")
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)

@strawberry.type
class TextResponse:
    filename: str
    extracted_text: str

@strawberry.type
class Query:
    hello: str = "Welcome to Image-to-Text API"

@strawberry.type
class Mutation:
    @strawberry.mutation
    async def upload_image(self, file: UploadFile = File(...)) -> TextResponse:
        file_extension = file.filename.split(".")[-1].lower()
        if file_extension not in ["png", "jpg", "jpeg"]:
            raise HTTPException(status_code=400, detail="Unsupported file type")

        unique_filename = f"{uuid.uuid4()}.{file_extension}"
        file_path = UPLOAD_DIR / unique_filename

        with open(file_path, "wb") as buffer:
            buffer.write(await file.read())

        # Process Image
        image_pil = Image.open(file_path).convert("RGB")
        image = processor(image_pil, return_tensors="pt")["pixel_values"].cuda()

        with torch.no_grad():
            outputs = model.generate(image)

        extracted_text = processor.batch_decode(outputs, skip_special_tokens=True)[0]

        return TextResponse(filename=unique_filename, extracted_text=extracted_text)

schema = strawberry.Schema(query=Query, mutation=Mutation)
app.include_router(GraphQLRouter(schema), prefix="/graphql")

@app.get("/")
def read_root():
    return {"message": "Image Processing FastAPI Server is running!"}
