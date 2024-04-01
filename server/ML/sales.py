from prophet import Prophet
import pandas as pd

# Example daily sales data (replace with your own data)
daily_sales_data = [{
  "ds": "1/4/2024",
  "y": 34.37
}, {
  "ds": "1/3/2024",
  "y": 297.93
}, {
  "ds": "1/3/2024",
  "y": 98.6
}, {
  "ds": "1/1/2024",
  "y": 28.93
}, {
  "ds": "1/8/2024",
  "y": 164.73
}, {
  "ds": "1/8/2024",
  "y": 178.15
}, {
  "ds": "1/8/2024",
  "y": 74.65
}, {
  "ds": "1/6/2024",
  "y": 275.19
}, {
  "ds": "1/1/2024",
  "y": 4.87
}, {
  "ds": "1/5/2024",
  "y": 210.36
}, {
  "ds": "1/6/2024",
  "y": 174.31
}, {
  "ds": "1/4/2024",
  "y": 137.34
}, {
  "ds": "1/9/2024",
  "y": 151.09
}, {
  "ds": "1/5/2024",
  "y": 76.91
}, {
  "ds": "1/3/2024",
  "y": 286.24
}, {
  "ds": "1/5/2024",
  "y": 5.94
}, {
  "ds": "1/9/2024",
  "y": 196.8
}, {
  "ds": "1/4/2024",
  "y": 17.86
}, {
  "ds": "1/1/2024",
  "y": 65.67
}, {
  "ds": "1/8/2024",
  "y": 181.91
}, {
  "ds": "1/5/2024",
  "y": 101.34
}, {
  "ds": "1/5/2024",
  "y": 90.74
}, {
  "ds": "1/6/2024",
  "y": 28.53
}, {
  "ds": "1/8/2024",
  "y": 275.91
}, {
  "ds": "1/4/2024",
  "y": 131.81
}, {
  "ds": "1/3/2024",
  "y": 114.74
}, {
  "ds": "1/6/2024",
  "y": 254.95
}, {
  "ds": "1/8/2024",
  "y": 267.7
}, {
  "ds": "1/3/2024",
  "y": 72.46
}, {
  "ds": "1/8/2024",
  "y": 129.31
}, {
  "ds": "1/6/2024",
  "y": 267.1
}, {
  "ds": "1/9/2024",
  "y": 294.37
}, {
  "ds": "1/6/2024",
  "y": 254.41
}, {
  "ds": "1/7/2024",
  "y": 142.05
}, {
  "ds": "1/6/2024",
  "y": 288.74
}, {
  "ds": "1/8/2024",
  "y": 77.85
}, {
  "ds": "1/3/2024",
  "y": 152.01
}, {
  "ds": "1/7/2024",
  "y": 158.51
}, {
  "ds": "1/3/2024",
  "y": 186.52
}, {
  "ds": "1/5/2024",
  "y": 198.22
}, {
  "ds": "1/7/2024",
  "y": 163.71
}, {
  "ds": "1/5/2024",
  "y": 35.36
}, {
  "ds": "1/2/2024",
  "y": 274.44
}, {
  "ds": "1/3/2024",
  "y": 26.06
}, {
  "ds": "1/3/2024",
  "y": 47.74
}, {
  "ds": "1/6/2024",
  "y": 101.15
}, {
  "ds": "1/1/2024",
  "y": 51.76
}, {
  "ds": "1/9/2024",
  "y": 130.05
}, {
  "ds": "1/10/2024",
  "y": 85.88
}, {
  "ds": "1/5/2024",
  "y": 158.19
}, {
  "ds": "1/4/2024",
  "y": 114.53
}, {
  "ds": "1/3/2024",
  "y": 166.43
}, {
  "ds": "1/9/2024",
  "y": 138.04
}, {
  "ds": "1/8/2024",
  "y": 85.84
}, {
  "ds": "1/1/2024",
  "y": 55.29
}, {
  "ds": "1/1/2024",
  "y": 206.28
}, {
  "ds": "1/9/2024",
  "y": 57.05
}, {
  "ds": "1/8/2024",
  "y": 216.52
}, {
  "ds": "1/9/2024",
  "y": 292.88
}, {
  "ds": "1/7/2024",
  "y": 243.62
}, {
  "ds": "1/4/2024",
  "y": 146.45
}, {
  "ds": "1/2/2024",
  "y": 1.1
}, {
  "ds": "1/4/2024",
  "y": 35.65
}, {
  "ds": "1/6/2024",
  "y": 198.14
}, {
  "ds": "1/6/2024",
  "y": 150.1
}, {
  "ds": "1/4/2024",
  "y": 131.7
}, {
  "ds": "1/1/2024",
  "y": 235.46
}, {
  "ds": "1/5/2024",
  "y": 120.56
}, {
  "ds": "1/5/2024",
  "y": 179.9
}, {
  "ds": "1/1/2024",
  "y": 111.39
}, {
  "ds": "1/1/2024",
  "y": 25.89
}, {
  "ds": "1/4/2024",
  "y": 23.48
}, {
  "ds": "1/9/2024",
  "y": 210.85
}, {
  "ds": "1/4/2024",
  "y": 249.13
}, {
  "ds": "1/1/2024",
  "y": 231.66
}, {
  "ds": "1/2/2024",
  "y": 143.87
}, {
  "ds": "1/6/2024",
  "y": 78.62
}, {
  "ds": "1/9/2024",
  "y": 154.68
}, {
  "ds": "1/2/2024",
  "y": 34.61
}, {
  "ds": "1/8/2024",
  "y": 282.71
}, {
  "ds": "1/6/2024",
  "y": 7.01
}, {
  "ds": "1/6/2024",
  "y": 186.41
}, {
  "ds": "1/7/2024",
  "y": 191.37
}, {
  "ds": "1/2/2024",
  "y": 6.2
}, {
  "ds": "1/4/2024",
  "y": 55.97
}, {
  "ds": "1/4/2024",
  "y": 125.13
}, {
  "ds": "1/9/2024",
  "y": 159.21
}, {
  "ds": "1/5/2024",
  "y": 32.76
}, {
  "ds": "1/9/2024",
  "y": 13.45
}, {
  "ds": "1/5/2024",
  "y": 44.63
}, {
  "ds": "1/6/2024",
  "y": 255.13
}, {
  "ds": "1/3/2024",
  "y": 151.18
}, {
  "ds": "1/3/2024",
  "y": 110.43
}, {
  "ds": "1/7/2024",
  "y": 146.06
}, {
  "ds": "1/1/2024",
  "y": 180.23
}, {
  "ds": "1/4/2024",
  "y": 216.18
}, {
  "ds": "1/9/2024",
  "y": 10.24
}, {
  "ds": "1/4/2024",
  "y": 76.93
}, {
  "ds": "1/5/2024",
  "y": 233.51
}, {
  "ds": "1/9/2024",
  "y": 140.25
}]

# Convert the data to a DataFrame
df = pd.DataFrame(daily_sales_data)

# Initialize Prophet model
model = Prophet()

# Fit the model to your data
model.fit(df)

# Make a dataframe for the next 7 days
future = model.make_future_dataframe(periods=7, freq='W')

# Generate forecasts
forecast = model.predict(future)

# Extract forecasts for the next 7 days
forecast_next_7_days = forecast[['ds', 'yhat']].tail(7)

print("Forecast for the next 7 days:")
print(forecast_next_7_days)