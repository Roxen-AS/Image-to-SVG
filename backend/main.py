from fastapi import FastAPI
from starlette.graphql import GraphQLApp
import graphene

app = FastAPI()

class Query(graphene.ObjectType):
    hello = graphene.String(default_value="Hello, World!")

schema = graphene.Schema(query=Query)

app.add_route("/graphql", GraphQLApp(schema=schema))
