import sys
from pathlib import Path
import uuid
from fastapi import FastAPI, UploadFile, File, HTTPException
import strawberry
from strawberry.fastapi import GraphQLRouter

sys.path.append("/workspaces/Image-to-SVG/star-vector")

from starvector.model import StarVector  # persisting import issue 

app = FastAPI()

UPLOAD_DIR = Path("./uploads")
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)

model = StarVector.from_pretrained("/workspaces/Image-to-SVG/star-vector/pretrained") 


@strawberry.type
class SVGResponse:
    filename: str
    svg_code: str

@strawberry.type
class Query:
    hello: str = "Welcome to Image-to-SVG API"

@strawberry.type
class Mutation:
    @strawberry.mutation
    async def upload_image(self, file: UploadFile = File(...)) -> SVGResponse:
        file_extension = file.filename.split(".")[-1].lower()
        if file_extension not in ["png", "jpg", "jpeg"]:
            raise HTTPException(status_code=400, detail="Unsupported file type")

        unique_filename = f"{uuid.uuid4()}.{file_extension}"
        file_path = UPLOAD_DIR / unique_filename

        with open(file_path, "wb") as buffer:
            buffer.write(await file.read())

        # conversion
        svg_code = model.vectorize_image(str(file_path))

        return SVGResponse(filename=unique_filename, svg_code=svg_code)


schema = strawberry.Schema(query=Query, mutation=Mutation)
graphql_app = GraphQLRouter(schema)
app.include_router(graphql_app, prefix="/graphql")