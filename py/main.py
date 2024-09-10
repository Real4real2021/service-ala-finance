from flask import Flask
from langchain.chains import LLMChain
from langchain_openai import OpenAI
from langchain_core.prompts import PromptTemplate
import os
import openai

openai_api_key = os.environ.get("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")

if not openai_api_key:
    raise ValueError("OPENAI_API_KEY environmnet varible is not set")

# app = Flask(__name__)

# @app.route('/')
# def hello():
#     return "Hello, world!"

# if __name__ == '__main__':
#     app.run(debug=True)

openai.api_key = openai_api_key

response = openai_api_key.Completion.create(
    engine="text-davinci-003",
    prompt="which city is the biggest in south africa",
    max_tokens=100,
    n=1,
    stop=None,
    temparatue=0.7
)

prompt_template = """
Question: {question}
Answer:
"""
prompt = PromptTemplate(template=prompt_template, input_variable=["question"])

llm_chain = LLMChain(llm=llm, prompt=prompt)

question = "what is the biggest city in south africa?"
response = llm_chain.run(question)
print(response)