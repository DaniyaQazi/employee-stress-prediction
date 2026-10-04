const { z } = require("zod");

const predictionSchema = z.object({
  Openness: z.number(),
  Conscientiousness: z.number(),
  Extraversion: z.number(),
  Agreeableness: z.number(),
  Neuroticism: z.number(),

  sleep_time: z.number(),
  wake_time: z.number(),
  sleep_duration: z.number(),
  PSQI_score: z.number(),
  PSS_score: z.number(),

  call_duration: z.number(),
  num_calls: z.number(),
  num_sms: z.number(),

  screen_on_time: z.number(),
  skin_conductance: z.number(),
  accelerometer: z.number(),
  mobility_radius: z.number(),
  mobility_distance: z.number()
});

module.exports = predictionSchema;
