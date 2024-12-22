from flask import Flask, request, jsonify
from flask_cors import CORS
import PyPDF2

app = Flask(__name__)
# Permitir requisições da origem do React
CORS(app, resources={r"/*": {"origins": "*"}})

@app.route('/extract-text', methods=['POST'])
def extract_text():
    if 'file' not in request.files:
        return jsonify({"error": "Nenhum arquivo enviado"}), 400

    file = request.files['file']
    if not file.filename.endswith('.pdf'):
        return jsonify({"error": "Arquivo inválido, apenas PDFs são aceitos"}), 400

    try:
        pdf_reader = PyPDF2.PdfReader(file)
        extracted_text = ""

        for page in pdf_reader.pages:
            extracted_text += page.extract_text() + "\n\n"

        return jsonify({"text": extracted_text}), 200

    except Exception as e:
        return jsonify({"error": f"Erro ao processar o PDF: {str(e)}"}), 500

if __name__ == '__main__':
    app.run(debug=True, port=3000)