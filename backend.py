# from flask import Flask, request, jsonify
# from flask_cors import CORS
# import pickle
# import numpy as np

# app = Flask(__name__)
# CORS(app)

# try:
#     model = pickle.load(open('best_model.pkl', 'rb'))
#     print("Model loaded successfully!")
# except Exception as e:
#     print(f"Error loading model: {e}")
#     model = None

# @app.route('/api/predict', methods=['POST'])
# def predict():
#     """Predict cardiovascular disease risk"""
    
#     if model is None:
#         return jsonify({
#             'error': 'Model not loaded',
#             'status': 'error'
#         }), 500
    
#     try:
#         data = request.get_json()
        
#         patient_id = int(data.get('id', 0))
#         age = float(data['age'])
#         gender = int(data.get('gender', 1))
#         height = float(data['height'])
#         weight = float(data['weight'])
#         ap_hi = float(data['ap_hi'])
#         ap_lo = float(data['ap_lo'])
#         cholesterol = int(data['cholesterol'])
#         gluc = int(data['gluc'])
#         smoke = int(data['smoke'])
#         alco = int(data['alco'])
#         active = int(data['active'])
        
#         bmi = weight / ((height / 100) ** 2)
        
#         features = np.array([[patient_id, age, gender, height, weight, ap_hi, ap_lo, cholesterol, gluc, smoke, alco, active, bmi]])
        
#         print(f"\n{'='*60}")
#         print(f"PREDICTION REQUEST")
#         print(f"{'='*60}")
#         print(f"Input features: {features[0]}")
#         print(f"Feature names: ['id', 'age', 'gender', 'height', 'weight', 'ap_hi', 'ap_lo', 'cholesterol', 'gluc', 'smoke', 'alco', 'active', 'bmi']")
        
#         prediction = model.predict(features)[0]
#         probabilities = model.predict_proba(features)[0]
        
#         print(f"\nPrediction: {prediction} ({'Disease' if prediction == 1 else 'No Disease'})")
#         print(f"Probabilities: [No Disease: {probabilities[0]:.4f}, Disease: {probabilities[1]:.4f}]")
#         print(f"{'='*60}\n")
        
#         confidence = float(probabilities[int(prediction)])
        
#         return jsonify({
#             'prediction': int(prediction),
#             'result': 'Disease Detected' if prediction == 1 else 'No Disease',
#             'confidence': round(confidence * 100, 2),
#             'bmi': round(bmi, 2),
#             'probabilities': {
#                 'no_disease': round(float(probabilities[0]) * 100, 2),
#                 'disease': round(float(probabilities[1]) * 100, 2)
#             },
#             'status': 'success'
#         }), 200
    
#     except Exception as e:
#         print(f"ERROR: {str(e)}")
#         import traceback
#         traceback.print_exc()
#         return jsonify({
#             'error': str(e),
#             'status': 'error'
#         }), 500

# @app.route('/api/health', methods=['GET'])
# def health():
#     """Health check endpoint"""
#     return jsonify({
#         'status': 'healthy',
#         'model_loaded': model is not None
#     }), 200

# if __name__ == '__main__':
#     print("Starting Flask Backend...")
#     print("Server running on http://localhost:5000")
#     app.run(debug=True, host='0.0.0.0', port=5000)


from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np
import os

app = Flask(__name__)
CORS(app)

try:
    BASE_DIR = os.path.dirname(os.path.abspath(__file__))
    MODEL_PATH = os.path.join(BASE_DIR, 'best_model.pkl')
    model = joblib.load(MODEL_PATH)
    print("Model loaded successfully!")
except Exception as e:
    print(f"Error loading model: {e}")
    model = None


@app.route('/')
def home():
    return "Cardiovascular Disease Prediction API is running.."


@app.route('/api/predict', methods=['POST'])
def predict():
    if model is None:
        return jsonify({'error': 'Model not loaded'}), 500

    try:
        data = request.get_json()

        patient_id = int(data.get('id', 0))
        age = float(data['age'])
        gender = int(data['gender'])
        height = float(data['height'])
        weight = float(data['weight'])
        ap_hi = float(data['ap_hi'])
        ap_lo = float(data['ap_lo'])
        cholesterol = int(data['cholesterol'])
        gluc = int(data['gluc'])
        smoke = int(data['smoke'])
        alco = int(data['alco'])
        active = int(data['active'])

        bmi = weight / ((height / 100) ** 2)

        features = np.array([[patient_id, age, gender, height, weight,
                              ap_hi, ap_lo, cholesterol, gluc,
                              smoke, alco, active, bmi]])

        prediction = model.predict(features)[0]
        probabilities = model.predict_proba(features)[0]

        return jsonify({
            'prediction': int(prediction),
            'result': 'Disease Detected' if prediction == 1 else 'No Disease',
            'confidence': round(float(probabilities[prediction]) * 100, 2),
            'bmi': round(bmi, 2),
            'status': 'success'
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/api/health', methods=['GET'])
def health():
    return jsonify({
        'status': 'healthy',
        'model_loaded': model is not None
    })


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
