# 🧠 AI Notes Summarizer

AI-powered PDF Notes Summarizer built using **React + Django + OpenRouter AI**.

Upload your study notes or PDFs and get:

- 📌 Smart AI Summary
- 🔑 Key Points
- 🧠 Important Concepts
- ❓ Quiz Questions
- 📄 Downloadable Notes

---

## 🚀 Live Demo

🔗 https://ai-notes-summarizer-eight.vercel.app

---

## ✨ Features

✅ PDF Upload  
✅ Drag & Drop Support  
✅ AI Summarization  
✅ Structured Study Notes  
✅ Key Points Extraction  
✅ Quiz Question Generation  
✅ Copy Summary Button  
✅ Download TXT Notes  
✅ Error Handling  
✅ Retry Logic  
✅ Free AI Integration using OpenRouter  

---

## 🛠 Tech Stack

### Frontend
- React
- Vite
- Axios
- React Dropzone
- React Markdown
- React Spinners

### Backend
- Django
- Django REST Framework
- PyMuPDF
- OpenRouter API
- Python

### Deployment
- Vercel (Frontend)
- Render (Backend)

---

## 📸 Screenshots

### Home Page

<img width="1280" height="1022" alt="image" src="https://github.com/user-attachments/assets/399750a6-68db-4ed3-a933-370aaff4c3a2" />

```md
![Home](screenshots/home.png)
```

### AI Generated Summary

<img width="1234" height="1080" alt="image" src="https://github.com/user-attachments/assets/fd9e7923-1632-4553-bb9c-96d031b734be" />
<img width="1205" height="882" alt="image" src="https://github.com/user-attachments/assets/02fd3f7a-90ad-40be-aa72-4eeb0417c008" />
<img width="1123" height="820" alt="image" src="https://github.com/user-attachments/assets/655400bf-9716-49ab-b5e3-9b27f337bb39" />


```md
![Summary](screenshots/summary.png)
```

---

## 📂 Project Structure

```bash
ai-notes-summarizer/
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── api/
│   ├── backend/
│   ├── manage.py
│   └── requirements.txt
│
└── README.md
```

---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/Bhavdeepq/ai-notes-summarizer.git
```

---

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:

```bash
http://localhost:5173
```

---

### Backend Setup

Create virtual environment:

```bash
cd backend
python -m venv venv
```

Activate:

Windows:

```bash
venv\Scripts\activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Run server:

```bash
python manage.py runserver
```

Backend runs on:

```bash
http://127.0.0.1:8000
```

---

## 🔑 Environment Variables

Create `.env` inside backend:

```env
OPENROUTER_API_KEY=your_api_key_here
```

Get API key from:

https://openrouter.ai

---

## 💡 How It Works

1. User uploads PDF
2. Backend extracts text using PyMuPDF
3. Text sent to OpenRouter AI model
4. AI generates:
   - Summary
   - Key Points
   - Concepts
   - Quiz Questions
5. Frontend displays formatted notes

---


## 👨‍💻 Author

**Bhavdeep Singh**

GitHub:  
https://github.com/Bhavdeepq

---

⭐ If you liked this project, consider starring the repository.
