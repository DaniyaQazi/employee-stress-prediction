from pydantic import BaseModel


class PredictionInput(BaseModel):
    Openness: float
    Conscientiousness: float
    Extraversion: float
    Agreeableness: float
    Neuroticism: float

    sleep_time: float
    wake_time: float
    sleep_duration: float
    PSQI_score: float
    PSS_score: float

    call_duration: float
    num_calls: float
    num_sms: float

    screen_on_time: float
    skin_conductance: float
    accelerometer: float
    mobility_radius: float
    mobility_distance: float
