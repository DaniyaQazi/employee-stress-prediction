import joblib
import pandas as pd
from fastapi import FastAPI
from schemas.prediction import PredictionInput

app = FastAPI(title="Employee Stress ML Service")

model = joblib.load("models/stress_model.joblib")


@app.get("/health")
def health_check():
    return {
        "success": True,
        "message": "ML service is healthy"
    }


@app.post("/predict")
def predict_stress(data: PredictionInput):

    input_data = data.model_dump()

    input_df = pd.DataFrame([input_data])

    # Match the exact training feature order
    input_df = input_df[model.feature_names_in_]

    prediction = model.predict(input_df)[0]

    # Keep the displayed stress score within a valid range
    prediction = max(10, min(39, prediction))

    return {
        "success": True,
        "predicted_stress_score": round(float(prediction), 2)
    }