from rest_framework.response import Response
from rest_framework.decorators import api_view
import fitz
import os
from dotenv import load_dotenv
from openai import OpenAI
import traceback

load_dotenv()

client = OpenAI(
    base_url="https://openrouter.ai/api/v1",
    api_key=os.getenv("OPENROUTER_API_KEY"),
)


@api_view(['GET'])
def test_api(request):
    return Response({
        "message": "Backend connected successfully!"
    })


@api_view(['POST'])
def upload_pdf(request):

    uploaded_file = request.FILES.get('file')

    if not uploaded_file:
        return Response({
            "error": "No file uploaded"
        }, status=400)

    pdf = fitz.open(
        stream=uploaded_file.read(),
        filetype="pdf"
    )

    text = ""

    for page in pdf:
        text += page.get_text()

    try:

        completion = client.chat.completions.create(
          model="openai/gpt-oss-120b",
             messages=[
        {
            "role": "system",
            "content": "You are an expert academic study assistant that creates clean, structured, and easy-to-understand study notes."
        },
        {
            "role": "user",
            "content": f"""
Analyze the following notes and provide output in this exact format:

📌 SUMMARY
Write a concise summary in 5–8 lines.

🔑 KEY POINTS
Provide clear bullet points of important ideas.

🧠 IMPORTANT CONCEPTS
List and briefly explain the major concepts.

❓ QUIZ QUESTIONS
Generate 5 quiz questions with answers.

Keep the formatting neat and readable.

Notes:
{text[:4000]}
"""
        }
    ]
        )

        summary = completion.choices[0].message.content

        return Response({
            "summary": summary
        })

    except Exception as e:

        return Response({
            "error": str(e),
            "trace": traceback.format_exc()
        }, status=500)